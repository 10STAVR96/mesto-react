import React from 'react';

function ImagePopup(props) {
  return (
    <div id="element-image" className={(props.isOpen ? "popup popup_opened" : "popup")}>
      <div className="popup__image-container">
        <button onClick={props.onClose} className="popup__close" type="button"></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h3 className="popup__image-name">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;