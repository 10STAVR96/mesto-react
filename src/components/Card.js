import React from 'react';

function Card(props) {
  const card = props.card;

  function handleClick() {
    props.onCardClick(card);
  }

  return (
    <div key={card._id} className="elements__element">
      <img onClick={handleClick} className="elements__image" src={card.link} alt={card.name} />
      <button className="elements__remove" type="button"></button>
      <div className="elements__info">
        <h3 className="elements__name">{card.name}</h3>
        <div className="elements__like-group">
          <button className="elements__like" type="button"></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;