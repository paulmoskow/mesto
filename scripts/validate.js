/*const formSelector = document.querySelector('.popup__form');
const inputSelector = formSelector.querySelector('.popup__input');

//TODO validation object
const config = {
  typeErrClass: 'popup__input_type_error',
  spanErrClass: 'popup__error_visible',
  inputSelect: '.popup__input',
  formSelect: '.popup__form',
  submitSelect: '.popup__submit-button',
  submitSelectOff: 'popup__submit-button_inactive'
};

// TODO add class with error
function showInputError(formSelector, inputSelector, errorMessage, config) {
  const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(config.typeErrClass);
  inputErrorClass.textContent = errorMessage;
  inputErrorClass.classList.add(config.spanErrClass);
}

// TODO delete class with error
function hideInputError (formSelector, inputSelector, config) {
  const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(config.typeErrClass);
  inputErrorClass.classList.remove(config.spanErrClass);
  inputErrorClass.textContent = ' ';
}

// TODO check input
function isValid(formSelector, inputSelector, config) {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, config);
  } else {
    hideInputError(formSelector, inputSelector, config);
  }
};

//TODO add listeners to all inputs
function setEventListeners (formSelector, config) {
  const inputArr = Array.from(formSelector.querySelectorAll(config.inputSelect));
  const submitButtonSelector = formSelector.querySelector(config.submitSelect);
  toggleButtonSate(inputArr, submitButtonSelector, config);
  inputArr.forEach((inputSelector) => {
     inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector, config);
      toggleButtonSate(inputArr, submitButtonSelector, config);
    });
  });
}

function enableValidation(config) {
  const formArr = Array.from(document.querySelectorAll(config.formSelect));
  formArr.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formSelector, config);
  });

};

enableValidation(config);

//TODO block button
function hasInvalidInput(inputArr) {
  return inputArr.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

function toggleButtonSate(inputArr, submitButtonSelector, config) {
  if (hasInvalidInput(inputArr)) {
    submitButtonSelector.classList.add(config.submitSelectOff);
    submitButtonSelector.setAttribute('disabled', true);
  } else {
    submitButtonSelector.classList.remove(config.submitSelectOff);
    submitButtonSelector.removeAttribute('disabled');
  }
}
*/
