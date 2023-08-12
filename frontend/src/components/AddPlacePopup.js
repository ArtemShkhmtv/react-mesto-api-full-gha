import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // очистка инпутов при открытии
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  // стейт инпута имени
  const [name, setName] = React.useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  // стейт инпута ссылки
  const [link, setLink] = React.useState("");

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({ name, link });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        type="text"
        className="popup__text popup-add-card__text popup-add-card__text_type_name"
        name="name"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        onChange={handleNameChange}
      />
      <span className="popup__error-message popup__error-message_type_hidden name-error" />
      <input
        value={link}
        type="url"
        className="popup__text popup-add-card__text popup-add-card__text_type_description"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
      />
      <span className="popup__error-message popup__error-message_type_hidden link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
