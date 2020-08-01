import React from 'react';

function PopupWithForm(props) {
  return (
    <div id={props.name} className={(props.isOpen ? "popup popup_opened" : "popup")}>
      <form onSubmit={props.onSubmit} className="popup__container" name={props.name} noValidate method="post" action="#">
        <button onClick={props.onClose} className="popup__close" type="button"></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button className="popup__save" type="submit">{props.submit}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;