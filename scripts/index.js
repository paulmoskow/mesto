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

const popUpPhoto = document.querySelector('#popup-photo');
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
//TODO send elements argument to a function via callback
  photoButton.addEventListener('click', () => openPopUpPhoto(element));
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
  evt.target.reset();
}

function openPopUp(el) {
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

function closePopUpCard() {
  closePopUp(popUpCard);
}

function openPopUpPhoto(element) {
  popUpImage.setAttribute('src', element.link);
  popUpImage.setAttribute('alt', element.name);
  popUpCaption.textContent = element.name;
  openPopUp(popUpPhoto);
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


