//TODO another file for array initialCards
import { openPopUp } from "./index.js";
import { initialCards } from "./initialCards.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopUpPhoto();
    });
    this._element.querySelector('#delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('#like').addEventListener('click', () => {
      this._likeCard();
    });
  }

//TODO private methods for every listener
  _openPopUpPhoto() {
    const popUpPhoto = document.querySelector('#popup-photo');
    document.querySelector('.popup__image').setAttribute('src', this._link);
    document.querySelector('.popup__image').setAttribute('alt', this._name);
    document.querySelector('.popup__caption').textContent = this._name;
    openPopUp(popUpPhoto);
  }

  _deleteCard() {
    const card = this._element.querySelector('#delete').closest('.element'); //TODO private methods for every listener
    card.remove();
  }

  _likeCard() {
    this._element.querySelector('#like').classList.toggle('element__like_active');
  }
}

//TODO for each initial card create Card and append
initialCards.forEach((item) => {
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});
