const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popUpProfile = document.querySelector('#popup-profile');
const formProfileElement = popUpProfile.querySelector('.popup__form');
const closeProfileButton = popUpProfile.querySelector('.popup__close-button');
const nameInput = formProfileElement.querySelector('#nameInput');
const jobInput = formProfileElement.querySelector('#jobInput');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popUpCard = document.querySelector('#popup-card');
const formCardElement = popUpCard.querySelector('.popup__form');
const closeCardButton = popUpCard.querySelector('.popup__close-button');
const placeInput = formCardElement.querySelector('#placeInput');
const linkInput = formCardElement.querySelector('#linkInput');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const userElements = document.querySelector('.elements');
const userTemplate = document.querySelector('#element').content;

const cardsElements = []

for (let i = 0; i < initialCards.length; i++) {
  const userElement = userTemplate.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__image').src = initialCards[i].link;
  userElement.querySelector('.element__image').alt = initialCards[i].name;
  userElement.querySelector('.element__text').textContent = initialCards[i].name;
  cardsElements[i] = userElement;
}
 for (let i = 0; i < cardsElements.length; i++) {
  userElements.append(cardsElements[i]);
}

function openPopUpProfile() {
  popUpProfile.classList.add('popup_opened');
  placeInput.value = profileName.textContent;
  linkInput.value = profileJob.textContent;
}

function closePopUpProfile() {
  popUpProfile.classList.remove('popup_opened');
}

function handleFormProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUpProfile();
}

function openPopUpCard() {
  popUpCard.classList.add('popup_opened');
}

function closePopUpCard() {
  popUpCard.classList.remove('popup_opened');
}

function handleFormCardSubmit (evt) {
  evt.preventDefault();
  const userElement = userTemplate.querySelector('.element').cloneNode(true);
  const cardsElement = userElement;
  initialCards.unshift({name: `${placeInput.value}`, link: `${linkInput.value}`});
  userElement.querySelector('.element__image').src = initialCards[0].link;
  userElement.querySelector('.element__image').alt = initialCards[0].name;
  userElement.querySelector('.element__text').textContent = initialCards[0].name;
  userElements.prepend(cardsElement);
  closePopUpCard();
}

editButton.addEventListener('click', openPopUpProfile);
closeProfileButton.addEventListener('click', closePopUpProfile);
formProfileElement.addEventListener('submit', handleFormProfileSubmit);

addButton.addEventListener('click', openPopUpCard);
closeCardButton.addEventListener('click', closePopUpCard);
formCardElement.addEventListener('submit', handleFormCardSubmit);
