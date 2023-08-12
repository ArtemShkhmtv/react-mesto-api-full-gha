function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-picture ${card.link && "popup_opened"}`}>
      <div className="popup__wrapper popup-picture__wrapper">
        <button
          type="button"
          className="popup__close popup-picture__close"
          aria-label="закрыть"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="popup-picture__image" />
        <h2 className="popup-picture__title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
