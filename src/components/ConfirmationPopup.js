import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <PopupWithForm 
      name="form-card-remove" 
      title="Вы уверены?" 
      submit="Да" 
      isOpen={props.isOpen} 
      onSubmit={handleSubmit} 
      onClose={props.onClose} 
    />
  );
}

export default ConfirmationPopup;