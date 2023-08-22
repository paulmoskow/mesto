import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /*constructor(selector, {formSubmit}) {
    super(selector);
    this._formSubmit = formSubmit; //callback of submit of the form
  }*/

  constructor(selector, formId, { formSubmit }) {
    super(selector);
    this._form = document.getElementById(formId);
    this._formSubmit = formSubmit; //callback of submit of the form
  }

  _getInputValues() {
    const inputArr = this._form.elements;
    const data = Array.from(inputArr)
      .filter((item) => !!item.name)
      .map((input) => {
        const { name, value } = input;
        return { name, value };
      })
      this._formSubmit(data);
    }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
    });
    // super - to set listeners for close-button and background
    // add handle formSubmit
  }

  close() {
    super.close();
    this._form.reset();//to reset form with close
  }
}
