import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleCurrentAvatar() {
    avatarRef.current.focus();
  }

  React.useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [currentUser]);

  return (
    <PopupWithForm name="form-avatar" title="Обновить аватар" submit="Сохранить" isOpen={props.isOpen}  onClose={props.onClose} onSubmit={handleSubmit} >
      <input onChange={handleCurrentAvatar} ref={avatarRef} id="avatar-link" className="popup__input" type="url" name="link" required placeholder="Ссылка на аватар"/>
      <span className="popup__input-error" id="avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;