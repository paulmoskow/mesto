export default class Card {
  //TODO add to constructor handleCardClick to open popup with click on the card
  constructor(data, templateSelector, handleCardClick, handleCardLike, handleDeleteCardSubmit) {
    this._name = data.name;
    this._link = data.link;
    this._likesQuantity = data.likes.length;
    this._likesArr = data.likes;
    this._cardId = data._id;
    this._cardOwner = data.owner._id;
    this._profileOwner = data.profileId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleDeleteCardSubmit = handleDeleteCardSubmit;
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
    this._likes = this._element.querySelector('.element__likes-quantity');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._text.textContent = this._name;
    this._likes.textContent = this._likesQuantity;
    this._setEventListeners();
    this.setLikeStatus();
    this._setDeleteButton();
    return this._element;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      //TODO: callback settings of popupPhoto from index.js
      this._handleCardClick(this._name, this._link);
    });
    this._delete.addEventListener('click', () => {
      this._handleDeleteCardSubmit(this.getCardId());
    });
    this._like.addEventListener('click', () => {
        this._handleCardLike(this.getCardId(), this._like, this._likes);
    });
  }

//TODO private methods for every listener
  _deleteCard() {
    const card = this._delete.closest('.element');
    card.remove();
  }

  _setDeleteButton() {
    if (this._cardOwner !== this._profileOwner) {
      this._delete.remove();
    }
  }

  _likeCard() {
    console.log(this.getCardId());
    this._like.classList.toggle('element__like_active');
  }

  getCardId() {
    return this._cardId;
  }

  setLikeStatus() {
    const myLike = this._likesArr.some((user) => {
      return user._id === this._profileOwner;
    });
    if (myLike === true) {
      this._like.classList.add('element__like_active');
    } else {
      this._like.classList.remove('element__like_active');
    }
  }


}



/*
  _likeCard() {
    this._like.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      //TODO: callback settings of popupPhoto from index.js
      this._handleCardClick(this._name, this._link);
    });
    //this._image.addEventListener('click', this._handleCardClick(this._name, this._link));
    this._delete.addEventListener('click', () => {
      this._deleteCard();
      // this._deleteCard(this._id);
    });
    this._like.addEventListener('click', () => {
       this._likeCard();
    });
  }
  */
