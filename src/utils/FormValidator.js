/*ниже класс валидации форм*/
export default class FormValidator {
    constructor(formObject, formName) {
        this._formName = formName;
        this._inactiveButtonClass = formObject.inactiveButtonClass;
        this._inputErrorClass = formObject.inputErrorClass;
        this._errorClass = formObject.errorClass;
        this._inputList = Array.from(formName.querySelectorAll(formObject.inputSelector));
        this._buttonSubmit = formName.querySelector(formObject.submitButtonSelector);
    }
    _showInputError(inputElement, errorMessage) {  /*показ ошибки валидации*/
        const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
    _hideInputError(inputElement) {   /*скрытие ошибки валидации*/
        const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }
    _showButtonError() {
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
        this._buttonSubmit.setAttribute('disabled', true);
    }
    _hideButtonError() {
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
        this._buttonSubmit.removeAttribute('disabled');
    }
    _checkInputValidity(inputElement) {  /*проверка валидации формы*/
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    _hasInvalidInput() {   /*проверка на неправильную валидацию*/
        return this._inputList.every((inputElement) => inputElement.validity.valid);
    }
    _toggleButtonState() {  /*активация/деактивация кнопки submit*/
        if (this._hasInvalidInput()) {
            this._hideButtonError();
        } else {
            this._showButtonError();
        }
    }
    enableValidation() {       /*запуск валидации*/
        const current = this;
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                current._toggleButtonState();
                current._checkInputValidity(inputElement);
            });
        });
    }
}