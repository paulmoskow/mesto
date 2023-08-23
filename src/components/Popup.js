export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

//to open popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);//to close popup
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }//to close popup with Esc
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')
      || evt.target.classList.contains('popup__close-button')
      || evt.target.classList.contains('popup__container_photo')) {
        this.close();
      }
    });//set listeners for close-button and background
  }
}
