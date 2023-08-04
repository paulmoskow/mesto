import { Card } from "./card.js"; //TODO export Card

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
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
  const userCard = {};
  userCard.name = `${placeInput.value}`;
  userCard.link = `${linkInput.value}`;
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

function openPopUpCard() {
  const submitButton = popUpCard.querySelector('.popup__submit-button');
  openPopUp(popUpCard);
  submitButton.classList.add('popup__submit-button_inactive');
  submitButton.setAttribute('disabled', true);
}

editButton.addEventListener('click', openPopUpProfile);
formProfileElement.addEventListener('submit', handleFormProfileSubmit);

addButton.addEventListener('click', openPopUpCard);
formCardElement.addEventListener('submit', handleFormCardSubmit);

//TODO one function for closing popups by x and overlay
popUps.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopUp(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopUp(popup);
    }
    if (evt.target.classList.contains('popup__container_photo')) {
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


