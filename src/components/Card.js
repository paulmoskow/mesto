export default class Card {
  //TODO add to constructor handleCardClick to open popup with click on the card
  constructor(data, profileId, templateSelector, handleCardClick, handleCardLike, handleDeleteCardSubmit) {
    this._name = data.name;
    this._link = data.link;
    this._likesQuantity = data.likes.length;
    this._likesArr = data.likes;
    this.cardId = data._id;
    this._cardOwner = data.owner._id;

    this.profileOwner = profileId;
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
    this._deleteButton = this._element.querySelector('#delete');
    this._likeButton = this._element.querySelector('#like');
    this._likes = this._element.querySelector('.element__likes-quantity');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._text.textContent = this._name;
    this._likes.textContent = this._likesQuantity;
    this._setEventListeners();
    this.setLikesStatus();
    this._checkDeleteButtonVisibility();
    return this._element;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      //TODO: callback settings of popupPhoto from index.js
      this._handleCardClick(this._name, this._link);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCardSubmit(this);
    });
    this._likeButton.addEventListener('click', () => {
        this._handleCardLike(this);
    });
  }

  _checkDeleteButtonVisibility() {
    if (this._cardOwner !== this.profileOwner) {
      this._deleteButton.remove();
    }
  }


  setLikesStatus() {
    const isLikedByUser = this._likesArr.some((user) => {
      return user._id === this.profileOwner;
    });
    if (isLikedByUser) {
      this._likeButton.classList.add('element__like_active');
    } else {
      this._likeButton.classList.remove('element__like_active');
    }
  }

  isLiked() {
    if (this._likeButton.classList.contains('element__like_active')) {
      return true;
    }
  }

  updateLikes(data) {
    this._likesArr = data.likes;
    this._likes.textContent = data.likes.length;
  }

  deleteCard() {
    const card = this._deleteButton.closest('.element');
    card.remove();
  }
}

