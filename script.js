let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup__overlay_popup_opened');
let formElement = popUp.querySelector('.popup__container');
let closeButton = formElement.querySelector('.popup__close-button');

function openPopUp() {
  popUp.setAttribute('style', 'display: flex');
}

editButton.addEventListener('click', openPopUp);

function closePopUp() {
  popUp.setAttribute('style', 'display: none');
}

closeButton.addEventListener('click', closePopUp);


let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');


function handleFormSubmit (evt) {
  evt.preventDefault();
    let userName = nameInput.value;
    let userJob = jobInput.value;
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');
    profileName.textContent = userName;
    profileJob.textContent = userJob;
}

formElement.addEventListener('submit', handleFormSubmit);
