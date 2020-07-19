import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick() {
    setSelectedCard(true);
  }

  function setCurrentImage(card) { 
    setCurrentCard(card); 
    handleCardClick(); 
    }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setCurrentCard({});
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onImageClick={setCurrentImage} />
      <Footer />
      <PopupWithForm name="form-profile" title="Редактировать профиль" submit="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
        <input id="form-author" className="popup__input" type="text" name="author" required placeholder="Ваше имя" pattern="[A-Za-zА-Яа-яЁё -]{2,40}"/>
        <span className="popup__input-error" id="form-author-error"></span>
        <input id="form-status" className="popup__input" type="text" name="status" required placeholder="Ваш статус" pattern="[A-Za-zА-Яа-яЁё, -]{2,200}"/>
        <span className="popup__input-error" id="form-status-error"></span>
      </PopupWithForm>

      <PopupWithForm name="form-avatar" title="Обновить аватар" submit="Сохранить" isOpen={isEditAvatarPopupOpen}  onClose={closeAllPopups} >
        <input id="avatar-link" className="popup__input" type="url" name="link" required placeholder="Ссылка на аватар"/>
        <span className="popup__input-error" id="avatar-link-error"></span>
      </PopupWithForm>

      <PopupWithForm name="form-card" title="Новое место" submit="Создать" isOpen={isAddPlacePopupOpen}  onClose={closeAllPopups} >
        <input id="card-name" className="popup__input" type="text" name="name" minLength="1" maxLength="30" required placeholder="Название"/>
        <span className="popup__input-error" id="card-name-error"></span>
        <input id="card-url" className="popup__input" type="url" name="link" required placeholder="Ссылка на картинку"/>
        <span className="popup__input-error" id="card-url-error"></span>
      </PopupWithForm>

      <PopupWithForm name="form-card-remove" title="Вы уверены?" submit="Да" isOpen={false}  onClose={closeAllPopups} />

      <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={currentCard} />
    </div>
  );
}

export default App;
