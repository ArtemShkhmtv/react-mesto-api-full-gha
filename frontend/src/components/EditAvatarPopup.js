import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // очистка инпутов при открытии
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value, // Значение инпута, полученное с помощью рефа
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        className="popup__text popup-update-avatar__text popup-update-avatar__text_type_description"
        name="link"
        placeholder="Введите ссылку"
        required
      />
      <span className="popup__error-message popup__error-message_type_hidden link-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
