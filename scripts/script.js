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
