import React from 'react';
import defaultAvatar from '../images/avatar.jpg';
import pencil from '../images/edit-avatar-pencil.svg';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(defaultAvatar);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    function userInfo(user) {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
    }

    Promise.all([api.getProfileInfo(), api.getCards()])
    .then(([user, cards]) => {
        userInfo(user);
        setCards(cards);
    })
    .catch((err) => {
        console.log(err);
    });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button className="profile__edit-avatar" type="button" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="аватар Жак-Ив Кусто"/>
            <img className="profile__pencil" src={pencil}/>
          </button>
          <div className="profile__description">
            <div className="profile__name">
              <h2 className="profile__author">{userName}</h2>
              <p className="profile__status">{userDescription}</p>
            </div>
            <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {cards && cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onImageClick} />
        ))}
      </section>
      
    </main>
  );
}

export default Main;