import doneLogo from "../images/Done.svg";
import warningLogo from "../images/warning.svg";

function InfoTooltip({ isOpen, onClose, isRegIn }) {
  return isRegIn ? (
    <div className={`popup ${isOpen && "popup_opened"} `}>
      <div className="popup__wrapper">
        <button
          type="button"
          className="popup__close"
          aria-label="закрыть"
          onClick={onClose}
        />
        <div className="popup__container popup-tooltip__container">
          <img src={doneLogo} alt="Галочка" className="popup-tooltip__image" />
          <p className="popup-tooltip__massage">
            Вы успешно зарегистрировались!
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__wrapper">
        <button
          type="button"
          className="popup__close"
          aria-label="закрыть"
          onClick={onClose}
        />
        <div className="popup__container popup-tooltip__container">
          <img
            src={warningLogo}
            alt="Крестик"
            className="popup-tooltip__image"
          />
          <p className="popup-tooltip__massage">
            Что-то пошло не так! Попробуйте ещё раз.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
