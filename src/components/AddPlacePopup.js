import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState();
  const [link, setLink] = React.useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  return (
    <PopupWithForm name="form-card" title="Новое место" submit="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input onChange={handleChangeName} id="card-name" className="popup__input" type="text" name="name" minLength="1" maxLength="30" required placeholder="Название"/>
      <span className="popup__input-error" id="card-name-error"></span>
      <input onChange={handleChangeLink} id="card-url" className="popup__input" type="url" name="link" required placeholder="Ссылка на картинку"/>
      <span className="popup__input-error" id="card-url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;