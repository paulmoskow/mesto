//TODO: import all classes and arrays
import { Card } from "./card.js"; //TODO export Card
import { FormValidator } from "./formValidator.js";
import { initialCards } from "./constants.js";
import { config } from "./constants.js";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUps = document.querySelectorAll('.popup');

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

const userElements = document.querySelector('.elements');

//TODO new addCard
function addCard(element) {
  const card = new Card(element, '#element');
  const cardElement = card.generateCard();
  userElements.prepend(cardElement);
}

function handleFormCardSubmit (evt) {
  evt.preventDefault();
  const userCard = {
    name: placeInput.value,
    link: linkInput.value
  };
  addCard(userCard);
  closePopUp(popUpCard);
  evt.target.reset();
}

export function openPopUp(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopUp(el) {
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function openPopUpProfile() {
  openPopUp(popUpProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopUpProfile() {
  closePopUp(popUpProfile);
}

function handleFormProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUpProfile();
}

export function handleOpenPopupPhoto(name, link) {
  const popUpPhoto = document.querySelector('#popup-photo');
  popUpPhoto.querySelector('.popup__image').setAttribute('src', link);
  popUpPhoto.querySelector('.popup__image').setAttribute('alt', name);
  popUpPhoto.querySelector('.popup__caption').textContent = name;
  openPopUp(popUpPhoto);
}

function openPopUpCard() {
  openPopUp(popUpCard);
  //TODO: call a validation method from Validator class
  cardFormValidator.toggleButtonSate();
}

editButton.addEventListener('click', openPopUpProfile);
formProfileElement.addEventListener('submit', handleFormProfileSubmit);

addButton.addEventListener('click', openPopUpCard);
formCardElement.addEventListener('submit', handleFormCardSubmit);

popUps.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')
    || evt.target.classList.contains('popup__close-button')
    || evt.target.classList.contains('popup__container_photo')) {
      closePopUp(popup);
    }
  });
});

//TODO close popups with esc and remove listeners after
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopUp = document.querySelector('.popup_opened');
    closePopUp(openedPopUp);
  }
}

//TODO for each initial card create Card and append
initialCards.forEach((item) => {
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});

//TODO: make a const with form adress
const cardForm = document.querySelector('#popup-card__form');
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

const profileForm = document.querySelector('#popup-profile__form');
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

