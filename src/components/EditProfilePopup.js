import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const nameRef = React.useRef();
  const descriptionRef = React.useRef();

  function handleChangeName() {
    nameRef.current.focus();
  }

  function handleChangeDescription() {
    descriptionRef.current.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: nameRef.current.value,
      about: descriptionRef.current.value,
    });
  }

  React.useEffect(() => {
    nameRef.current.value = currentUser.name;
    descriptionRef.current.value = currentUser.about;
  }, [currentUser]);

  return (
    <PopupWithForm name="form-profile" title="Редактировать профиль" submit="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input 
        onChange={handleChangeName} 
        id="form-author" 
        className="popup__input" 
        type="text" 
        name="author"
        ref={nameRef}
        required 
        placeholder="Ваше имя" 
        pattern="[A-Za-zА-Яа-яЁё -]{2,40}"
      />
      <span className="popup__input-error" id="form-author-error"></span>
      <input 
        onChange={handleChangeDescription}
        id="form-status" 
        className="popup__input" 
        type="text" 
        name="status"
        ref={descriptionRef}
        required 
        placeholder="Ваш статус" 
        pattern="[A-Za-zА-Яа-яЁё, -]{2,200}"
      />
      <span className="popup__input-error" id="form-status-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;