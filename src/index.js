import './pages/index.css';
import './images/add_button.svg';
import './images/add_button__mobile.svg';
import './images/close_icon.svg';
import './images/edit_button.svg';
import './images/edit_button__mobile.svg';
import './images/image.jpg';
import './images/like.svg';
import './images/like_active.svg';
import './images/logo.svg';
import './images/Trash.svg';
import './fonts/Inter-Black.woff';
import './fonts/Inter-Black.woff2';
import './fonts/Inter-Medium.woff';
import './fonts/Inter-Medium.woff2';
import './fonts/Inter-Regular.woff';
import './fonts/Inter-Regular.woff2';
import './fonts/inter.css';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popUpProfile = document.querySelector('#popup-profile');
const formProfileElement = popUpProfile.querySelector('#popup-profile__form');
const nameInput = formProfileElement.querySelector('#nameinput');
const jobInput = formProfileElement.querySelector('#jobinput');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popUpCard = document.querySelector('#popup-card');
const formCardElement = popUpCard.querySelector('#popup-card__form');
const placeInput = formCardElement.querySelector('#placeinput');
const linkInput = formCardElement.querySelector('#linkinput');

//TODO: import all classes and arrays
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import Card from "./components/Card.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";

import { initialCards } from "./utils/constants.js";
import { config } from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";

//TODO set user info in profile
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job'}
);

const userInfo = profileInfo.getUserInfo();
profileInfo.setUserInfo(userInfo.name, userInfo.info);

//TODO add initial cards with class Section
const initialCardSection = new Section ({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, '#element');
    const cardElement = card.generateCard();
    initialCardSection.addInitialItem(cardElement);
  }
}, '.elements')

initialCardSection.renderItems();

//TODO add popup with photo with class PopupWithImage
const popUpPhoto = new PopupWithImage('#popup-photo');
popUpPhoto.setEventListeners();

//TODO class and handle function for popup with photo
export function handleCardClick(name, link) {
  popUpPhoto.open(name, link);
}

//TODO class for profile popup
const popupProfile = new PopupWithForm(
  '#popup-profile',
  { formSubmit: (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupProfile.close();
  }
});

popupProfile.setEventListeners();
editButton.addEventListener('click', popupProfile.open.bind(popupProfile));

//TODO class for new card popup
const popupCard = new PopupWithForm(
  '#popup-card',
  { formSubmit: handleFormCardSubmit
});

popupCard.setEventListeners();
addButton.addEventListener('click', popupCard.open.bind(popupCard));

//TODO add user cards with class Section
function handleFormCardSubmit (evt) {
  evt.preventDefault();
  const userCard = {
  name: placeInput.value,
  link: linkInput.value
  };
  const newCardSection = new Section ({
    items: userCard,
    renderer: (element) => {
      const card = new Card(element, '#element');
      const cardElement = card.generateCard();
      newCardSection.addNewItem(cardElement);
    }
  }, '.elements');
  newCardSection.renderItem();
  popupCard.close();
  evt.target.reset();
}

//TODO: make a const with form address
const cardForm = document.querySelector('#popup-card__form');
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

const profileForm = document.querySelector('#popup-profile__form');
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

