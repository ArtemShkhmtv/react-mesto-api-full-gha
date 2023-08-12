import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // стейт инпута имени
  const [name, setName] = React.useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  // стейт инпута описания
  const [description, setDescription] = React.useState("");

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  // подписка на контекс данных пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // очистка инпутов при открытии, подстановка данных профиля при их наличии в инпуты
  React.useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name}
        className="popup__text popup-edit__text popup-edit__text_type_name"
        name="name"
        required
        minLength={2}
        maxLength={40}
        onChange={handleNameChange}
      />
      <span className="popup__error-message popup__error-message_type_hidden name-error" />
      <input
        type="text"
        value={description}
        className="popup__text popup-edit__text popup-edit__text_type_description"
        name="link"
        required
        minLength={2}
        maxLength={200}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error-message popup__error-message_type_hidden link-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
