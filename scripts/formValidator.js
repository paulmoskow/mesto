const config = {
  typeErrClass: 'popup__input_type_error',
  spanErrClass: 'popup__error_visible',
  inputSelect: '.popup__input',
  formSelect: '.popup__form',
  submitSelect: '.popup__submit-button',
  submitSelectOff: 'popup__submit-button_inactive'
};

class FormValidator {
  constructor(config, formElement) {
    this._typeErrClass = config.typeErrClass;
    this._spanErrClass = config.spanErrClass;
    this._inputSelect = config.inputSelect;
    this._formSelect = config.formSelect;
    this._submitSelect = config.submitSelect;
    this._submitSelectOff = config.submitSelectOff;
    this._formElement = formElement;
  }

  //TODO - HOW TO FIND FORM
  _findForm() {
    const Form = document.querySelector(this._formElement);
    return Form;
  }

  _showInputError(errorMessage) {
    const inputErrorClass = this._formSelector.querySelector(`.${this._inputSelector.id}-error`);
    this._inputSelector.classList.add(this._typeErrClass);
    inputErrorClass.textContent = errorMessage;
    inputErrorClass.classList.add(this._spanErrClass);
  }

  _hideInputError () {
    const inputErrorClass = this._formSelector.querySelector(`.${this._inputSelector.id}-error`);
    this._inputSelector.classList.remove(this._typeErrClass);
    inputErrorClass.classList.remove(this._spanErrClass);
    inputErrorClass.textContent = ' ';
  }

  _isValid() {
    this._inputSelector = this._formSelector.querySelector(this._inputSelect);
    if (!this._inputSelector.validity.valid) {
      this._showInputError(this._inputSelector.validationMessage);
    } else {
      this._hideInputError();
    }
  }

  _hasInvalidInput() {
    return this._inputArr.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }

  _toggleButtonSate() {
    if (this._hasInvalidInput()) {
      this._submitButtonSelector.classList.add(this._submitSelectOff);
      this._submitButtonSelector.setAttribute('disabled', true);
    } else {
      this._submitButtonSelector.classList.remove(this._submitSelectOff);
      this._submitButtonSelector.removeAttribute('disabled');
    }
  }

  _setEventListeners () {
    this._inputArr = Array.from(this._formSelector.querySelectorAll(this._inputSelect));
    this._submitButtonSelector = this._formSelector.querySelector(this._submitSelect);
    this._toggleButtonSate();
    this._inputArr.forEach((inputSelector) => {
       inputSelector.addEventListener('input', () => {
       this._isValid();
       this._toggleButtonSate();
      });
    });
  }

  //TODO - HOW TO FIND FORM
  enableValidation() {
    this._formSelector = this._findForm();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

const cardForm = new FormValidator(config, '#popup-card__form');
cardForm.enableValidation();

const profileForm = new FormValidator(config, '#popup-profile__form');
profileForm.enableValidation();


