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
  userElements.prepend(cardsElements[i]);
}





let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let formElement = popUp.querySelector('.popup__form');
let closeButton = popUp.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function openPopUp() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp();
}

editButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);
formElement.addEventListener('submit', handleFormSubmit);
