import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(name, link) {
    super.open(); //how to add image and text?
    this._popup.querySelector('.popup__image').setAttribute('src', link);
    this._popup.querySelector('.popup__image').setAttribute('alt', name);
    this._popup.querySelector('.popup__caption').textContent = name;
  }
}


