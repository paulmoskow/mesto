import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(selector, formId, { handleFormSubmit }) {
    super(selector);
    this.form = document.querySelector(formId);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this.form.querySelector('.popup__submit-button');
    //callback of submit of the form
  }

  _getInputValues() {
    this._inputList = this.form.elements;
    this._formValues = {};
    Array.from(this._inputList).forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

    // super - to set listeners for close-button and background
    // add handle formSubmit
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this.form.reset();//to reset form with close
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }
}

