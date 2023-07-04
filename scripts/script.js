const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popUpProfile = document.querySelector('#popup-profile');
const formProfileElement = popUpProfile.querySelector('#popup-profile__form');
const closeProfileButton = popUpProfile.querySelector('.popup__close-button');
const nameInput = formProfileElement.querySelector('#nameInput');
const jobInput = formProfileElement.querySelector('#jobInput');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popUpCard = document.querySelector('#popup-card');
const formCardElement = popUpCard.querySelector('#popup-card__form');
const closeCardButton = popUpCard.querySelector('.popup__close-button');
const placeInput = formCardElement.querySelector('#placeInput');
const linkInput = formCardElement.querySelector('#linkInput');

const popUpPhoto = document.querySelector('#popup-photo');
const closePhotoButton = popUpPhoto.querySelector('.popup__close-button');
const popUpImage = document.querySelector('.popup__image');
const popUpCaption = document.querySelector('.popup__caption');

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

//make a function for creating cards on the page//
//TODO - SHOULD BE TWO FUNCTIONS: CREATE CARD AND ADD CARD
//WHEN TO CREATE CARD ADD POSSIBILITY OF TWO VARIATIONS: TAKE INPUTS FROM ARRAY INITIALCARDS AND FROM USERS INPUT
function createCard(element) {
  const userElement = userTemplate.querySelector('.element').cloneNode(true);
  const photoButton = userElement.querySelector('.element__image');
  const deleteButton = userElement.querySelector('#delete');
  const likeButton = userElement.querySelector('#like');
  photoButton.src = element.link;
  photoButton.alt = element.name;
  userElement.querySelector('.element__text').textContent = element.name;
  photoButton.addEventListener('click', openPopUpPhoto);
  deleteButton.addEventListener('click', () => {
    const card = deleteButton.closest('.element');
    card.remove();
  });
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like_active');
  });
  return userElement;
}

function addInitialCard(element) {
  userElements.append(createCard(element));
}

function addInitialCards(elements) {
  elements.forEach((el) => {
    addInitialCard(el);
  });
}

addInitialCards(initialCards);

function addCard(element) {
  userElements.prepend(createCard(element));
}

function handleFormCardSubmit (evt) {
  evt.preventDefault();
  const userCard = {};
  userCard.name = `${placeInput.value}`;
  userCard.link = `${linkInput.value}`;
  addCard(userCard);
  closePopUp(popUpCard);
  placeInput.value = null;
  linkInput.value = null;
}

//TODO создать универсальные функции открытия и закрытия попапа
function openPopUp(el) {
  el.classList.add('popup_opened');
}

function closePopUp(el) {
  el.classList.remove('popup_opened');
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
  openPopUp(popUpCard);
}

function closePopUpCard() {
  closePopUp(popUpCard);
}

editButton.addEventListener('click', openPopUpProfile);
closeProfileButton.addEventListener('click', closePopUpProfile);
formProfileElement.addEventListener('submit', handleFormProfileSubmit);

addButton.addEventListener('click', openPopUpCard);
closeCardButton.addEventListener('click', closePopUpCard);
formCardElement.addEventListener('submit', handleFormCardSubmit);

const photoButton = document.querySelector('.element__image');
photoButton.addEventListener('click', openPopUpPhoto);
closePhotoButton.addEventListener('click', closePopUpPhoto);

function closePopUpPhoto() {
  closePopUp(popUpPhoto);
}

//создать функции открытия и закрытия попапа с картинкой//
function openPopUpPhoto() {
  const photoButtons = document.querySelectorAll('.element__image');
  photoButtons.forEach((el) => {
    el.addEventListener('click', () => {
      const link = el.getAttribute('src');
      const name = el.getAttribute('alt');
      popUpImage.setAttribute('src', link);
      popUpImage.setAttribute('alt', name);
      popUpCaption.textContent = name;
      openPopUp(popUpPhoto);
    });
  });
}

