import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open(); //how to add image and text?
    this._image.setAttribute('src', link);
    this._image.setAttribute('alt', name);
    this._caption.textContent = name;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__container_photo')) {
        this.close();
      }
    });//set listeners for close-button and background
  }

}


