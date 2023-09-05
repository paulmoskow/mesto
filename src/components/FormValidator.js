export default class FormValidator {
  constructor(config, formElement) {
    this._typeErrClass = config.typeErrClass;
    this._spanErrClass = config.spanErrClass;
    this._inputSelect = config.inputSelect;
    this._submitSelect = config.submitSelect;
    this._submitSelectOff = config.submitSelectOff;
    this._formElement = formElement;
  }

  //TODO: send input value
  _showInputError(input, errorMessage) {
    const inputErrorClass = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._typeErrClass);
    inputErrorClass.textContent = errorMessage;
    inputErrorClass.classList.add(this._spanErrClass);
  }

    //TODO: send input value
  _hideInputError (input) {
    const inputErrorClass = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._typeErrClass);
    inputErrorClass.classList.remove(this._spanErrClass);
    inputErrorClass.textContent = ' ';
  }

    //TODO: send input value
  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputArr.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonSelector.classList.add(this._submitSelectOff);
      this._submitButtonSelector.disabled;
    } else {
      this._submitButtonSelector.classList.remove(this._submitSelectOff);
      this._submitButtonSelector.removeAttribute('disabled');
    }
  }

  _setEventListeners () {
    this._inputArr = Array.from(this._formElement.querySelectorAll(this._inputSelect));
    this._submitButtonSelector = this._formElement.querySelector(this._submitSelect);
    this.toggleButtonState();
    //TODO: set input value
    this._inputArr.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this.toggleButtonState();
      });
    });
  }

  //TODO - HOW TO FIND FORM
  enableValidation() {
    this._setEventListeners();
  }
}


