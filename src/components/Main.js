import React from 'react';
import pencil from '../images/edit-avatar-pencil.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button className="profile__edit-avatar" type="button" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар автора"/>
            <img className="profile__pencil" src={pencil} alt="Карандаш"/>
          </button>
          <div className="profile__description">
            <div className="profile__name">
              <h2 className="profile__author">{currentUser.name}</h2>
              <p className="profile__status">{currentUser.about}</p>
            </div>
            <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {props.cards && props.cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onImageClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
      </section>
      
    </main>
  );
}

export default Main;