import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, {formSubmit}) {
    super(selector);
    this._formSubmit = formSubmit; //callback of submit of the form
  }

  _getInputValues() {
    const inputArr = this._popup.elements;
    inputArr.forEach((input) => {
      return input.value;
    }) //to get values from every input
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._formSubmit);
    // super - to set listeners for close-button and background
    // add handle formSubmit
  }

  close() {
    super.close();
    this._popup.reset();//to reset form with close
  }
}
