const formSelector = document.querySelector('.popup__form');
const inputSelector = formSelector.querySelector('.popup__input');
const formError = formSelector.querySelector(`.${inputSelector.id}-error`);

// TODO add class with error
function showInputError(formSelector, inputSelector, errorMessage) {
  const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_type_error');
  inputErrorClass.textContent = errorMessage;
  inputErrorClass.classList.add('popup__error_visible');
}

// TODO delete class with error
function hideInputError (formSelector, inputSelector) {
  const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  inputErrorClass.remove('popup__error');
  inputErrorClass.textContent = ' ';
}

// TODO check input
function isValid(formSelector, inputSelector) {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

//TODO add listeners to all inputs
function setEventListeners (formSelector) {
  const inputArr = Array.from(formSelector.querySelectorAll('.popup__input'));
  const submitButtonSelector = formSelector.querySelector('.popup__submit-button');
  toggleButtonSate(inputArr, submitButtonSelector);
  inputArr.forEach((inputSelector) => {
     inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector);
      toggleButtonSate(inputArr, submitButtonSelector);
    });
  });
}

function enableValidation() {
  const formArr = Array.from(document.querySelectorAll('.popup__form'));
  formArr.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formSelector);
  });
};

enableValidation();

//TODO block button
function hasInvalidInput(inputArr) {
  return inputArr.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

function toggleButtonSate(inputArr, submitButtonSelector) {
  if (hasInvalidInput(inputArr)) {
    submitButtonSelector.classList.add('popup__submit-button_inactive');
    submitButtonSelector.setAttribute('disabled', true);
  } else {
    submitButtonSelector.classList.remove('popup__submit-button_inactive');
    submitButtonSelector.removeAttribute('disabled');
  }
}






