//TODo: import function to set popupPhoto
//import { handleCardClick } from "../pages/index.js";


/*export default class Card {
  constructor(data, templateSelector
    //TODO add to constructor handleCardClick to open popup with click on the card
     ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }*/

export default class Card {
  //TODO add to constructor handleCardClick to open popup with click on the card
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const userElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return userElement;
  }

  generateCard() {
    this._element = this._getTemplate();
//TODO: optimize search of elements
    this._image = this._element.querySelector('.element__image');
    this._text = this._element.querySelector('.element__text');
    this._delete = this._element.querySelector('#delete');
    this._like = this._element.querySelector('#like');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._text.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      //TODO: callback settings of popupPhoto from index.js
      this._handleCardClick(this._name, this._link);
    });
    //this._image.addEventListener('click', this._handleCardClick(this._name, this._link));
    this._delete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._like.addEventListener('click', () => {
      this._likeCard();
    });
  }

  /*
  _setEventListeners() {
    this._image.addEventListener('click', () => {
      //TODO: callback settings of popupPhoto from index.js
      handleCardClick(this._name, this._link);
    });
    //this._image.addEventListener('click', this._handleCardClick(this._name, this._link));
    this._delete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._like.addEventListener('click', () => {
      this._likeCard();
    });
  }*/

//TODO private methods for every listener
  _deleteCard() {
    const card = this._delete.closest('.element');
    card.remove();
  }

  _likeCard() {
    this._like.classList.toggle('element__like_active');
  }
}

