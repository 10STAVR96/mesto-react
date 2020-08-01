import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${isOwn ? 'elements__remove' : 'elements__remove_hidden'}`;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${isLiked ? 'elements__like_active' : ''}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <div key={card._id} className="elements__element">
      <img onClick={handleClick} className="elements__image" src={card.link} alt={card.name} />
      <button onClick={handleDeleteCard} className={cardDeleteButtonClassName} type="button"></button>
      <div className="elements__info">
        <h3 className="elements__name">{card.name}</h3>
        <div className="elements__like-group">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;