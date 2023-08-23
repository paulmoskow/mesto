import './index.css';
import '../images/add_button.svg';
import '../images/add_button__mobile.svg';
import '../images/close_icon.svg';
import '../images/edit_button.svg';
import '../images/edit_button__mobile.svg';
import '../images/image.jpg';
import '../images/like.svg';
import '../images/like_active.svg';
import '../images/logo.svg';
import '../images/Trash.svg';
import '../fonts/Inter-Black.woff';
import '../fonts/Inter-Black.woff2';
import '../fonts/Inter-Medium.woff';
import '../fonts/Inter-Medium.woff2';
import '../fonts/Inter-Regular.woff';
import '../fonts/Inter-Regular.woff2';
import '../fonts/inter.css';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//TODO: import all classes and arrays
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";

//TODO set user info in profile
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job'}
);

const userInfo = profileInfo.getUserInfo();
profileInfo.setUserInfo(userInfo);

const handleCardClick = (name, link) => {
  popUpPhoto.open(name, link);
}

//TODO creation of new card
const instalNewCard = (element) => {
  const card = new Card(element, '#element', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};
const newCardSection = new Section ({
  items: initialCards,
  renderer: (element) => {
    newCardSection.addInitialItem( instalNewCard (element) );
  }
}, '.elements')

newCardSection.renderItems();

//TODO add popup with photo with class PopupWithImage
const popUpPhoto = new PopupWithImage('#popup-photo');
popUpPhoto.setEventListeners();

//TODO add user cards with class Section
const handleCardSubmit = (input) => {
  const userCard = {
  name: input.placeInput,
  link: input.linkInput
  };
  newCardSection.items = userCard;
  newCardSection.renderer = (element) => {
    newCardSection.addNewItem( instalNewCard (element));
  }
  newCardSection.renderItem();
  popupCard.close();
}

//TODO class for profile popup
const handleProfileSubmit = (input) => {
    profileInfo.setUserInfo(input);
    popupProfile.close();
}

const popupProfile = new PopupWithForm(
  '#popup-profile',
  'popup-profile__form',
  { handleFormSubmit: handleProfileSubmit }
);

popupProfile.setEventListeners();
editButton.addEventListener('click', openPopupProfile.bind(popupProfile));

const popupCard = new PopupWithForm(
  '#popup-card',
  'popup-card__form',
  { handleFormSubmit: handleCardSubmit
});

popupCard.setEventListeners();
addButton.addEventListener('click', openPopupCard.bind(popupCard));

//TODO: make a const with form address
const cardForm = document.querySelector('#popup-card__form');
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

const profileForm = document.querySelector('#popup-profile__form');
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

function openPopupProfile() {
  popupProfile.open();
  profileFormValidator.toggleButtonState();
}

function openPopupCard() {
  popupCard.open();
  cardFormValidator.toggleButtonState();
}

