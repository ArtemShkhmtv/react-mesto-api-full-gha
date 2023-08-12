import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) {
  // подписка на контекс данных пользователя
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__image-overlay">
          <img
            src={currentUser.avatar}
            alt="Фото профиля"
            className="profile__photo"
            onClick={onEditAvatar}
          />
          <div className="profile__image-wrapper"></div>
        </div>
        <div>
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-botton"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-card-botton"
          aria-label="добавить карточку"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards-grid">
        {cards.map((element) => {
          return (
            <Card
              key={element._id}
              link={element.link}
              name={element.name}
              likes={element.likes}
              onCardClick={onCardClick}
              owner={element.owner}
              onCardLike={onCardLike}
              element={element}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
