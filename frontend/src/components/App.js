import React from "react";
import Header from "./Header";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import { authApi } from "../utils/authApi";

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  // стейт статуса регистрации
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  // стейт текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  // загрузка с сервера и отрисовка данных пользователя
  React.useEffect(() => {
    async function getUserInfo() {
      try {
        const userData = await api.getServerUserInfo();
        // console.log(userData);
        setCurrentUser(userData);
      } catch (error) {
        console.error(error);
      }
    }
    getUserInfo();
  }, []);

  // стейт карточек
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    async function getServerCards() {
      try {
        const cardsArray = await api.getCards();
        setCards(cardsArray.reverse());
        return cardsArray;
      } catch (error) {
        console.error(error);
      }
    }
    getServerCards();
  }, []);

  React.useEffect(() => {
    checkToken();
    //eslint-disable-next-line
  }, []);

  // обработчик лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // console.log(card.likes, currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточек
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => (c._id === card._id ? newCard : c));
        });
      })
      .catch((err) => console.error(err));
  }

  // обработчик добавления карточки
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  // обработчик удаления карточки
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточек
    api
      .deletCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => {
            return c._id !== card._id;
          });
        });
      })
      .catch((err) => console.error(err));
  }

  // обработчик сабмита формы редактирования профиля
  function handleUpdateUser({ name, about }) {
    api
      .saveUserInfo(name, about)
      .then((newProfileInfo) => {
        setCurrentUser(newProfileInfo);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  // обработчик данных активного пользователя
  function handleCurrentUser (newUser) {
    setCurrentUser(newUser);
  }

  // обработчик сабмита формы редактирования аватара
  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar)
      .then((newProfileInfo) => {
        setCurrentUser(newProfileInfo);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  // обработчик проверки токена

  function checkToken() {
    // const jwt = localStorage.getItem("jwt");
    // jwt &&
      authApi
        .getContent()
        .then((data) => {
          if (!data) {
            return;
          }
          // setLoggedIn(true);
          navigate("/");
          handleSelectedEmail(data.email);
        })
        .catch((err) => console.log(err));
  }

  function signOut() {
    // localStorage.removeItem("jwt");
    authApi.loggout()
    .then(() => {
      setLoggedIn(false);
      handleSelectedEmail(null);
      navigate("/sign-up", {replace: true});
    })
    .catch((err) => console.log(err));
    
  }

  // стейт выбранной карточки
  const [selectedCard, setSelectedCard] = React.useState({});

  // стейт почты пользователя
  const [selectedEmail, setSelectedEmail] = React.useState("");

  // колбэк изменения текущего пользователя
  function handleSelectedEmail(email) {
    setSelectedEmail(email);
  }

  // колбэк редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // колбэк аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // колбэк добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // колбэк успешной регистрации
  function handleInfoTooltipOpen() {
    setInfoTooltipOpen(true);
  }

  function handleLoggedIn(status) {
    setLoggedIn(status);
  }

  // колбэк закрытия попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={selectedEmail}
          handleSelectedEmail={handleSelectedEmail}
          handleSignOut={signOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                handleRegisterUser={handleInfoTooltipOpen}
                handleLoggedIn={handleLoggedIn}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleRegisterUser={handleInfoTooltipOpen}
                handleLoggedIn={handleLoggedIn}
                handleSelectedEmail={handleSelectedEmail}
                handleUserInfo={handleCurrentUser}
              />
            }
          />
        </Routes>
        <section className="cards-grid" />
        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isLoggedIn={isLoggedIn}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="confirmation"
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
