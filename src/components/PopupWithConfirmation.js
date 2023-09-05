import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

  constructor(selector, formId) {
    super(selector);
    this._form = document.querySelector(formId);
  }

  setCallBack(submitCallBack) {
     this._handleSubmit = submitCallBack;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    })
  }
}
