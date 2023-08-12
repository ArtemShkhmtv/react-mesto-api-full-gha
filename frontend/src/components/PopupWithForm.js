function PopupWithForm({ title, name, isOpen, onClose, children, buttonText='Сохранить', onSubmit }) {
  return (
    <div className={`popup popup-${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__wrapper popup-add-card__wrapper">
        <button
          type="button"
          className="popup__close popup-add-card__close"
          aria-label="закрыть"
          onClick={onClose}
        />
        <form
          className="popup__container popup-add-card__container"
          name={`popup-${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title popup-add-card__title">{title}</h2>
          {children}
          <button
            className="popup__save-botton popup-add-card__save-botton"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
