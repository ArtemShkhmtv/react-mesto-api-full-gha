import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  link,
  name,
  likes,
  onCardClick,
  owner,
  onCardLike,
  element,
  onCardDelete,
}) {
  function handleClick() {
    onCardClick({ link, name });
  }

  function handleLikeClick() {
    onCardLike(element);
  }

  function handleDeleteClick() {
    onCardDelete(element);
  }

  // подписка на контекс данных пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_favorite"
  }`;

  return (
    <article className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__wrapper">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="сердечко"
            onClick={handleLikeClick}
          />
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className="card__delete"
          type="button"
          aria-label="урна"
          onClick={handleDeleteClick}
        />
      )}
    </article>
  );
}

export default Card;
