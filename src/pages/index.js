import './index.css';
import '../images/add_button.svg';
import '../images/add_button__mobile.svg';
import '../images/close_icon.svg';
import '../images/edit_button.svg';
import '../images/edit_button__mobile.svg';
import '../images/image.jpg';
import '../images/like.svg';
import '../images/like_active.svg';
import '../images/logo.svg';
import '../images/Trash.svg';
import '../fonts/Inter-Black.woff';
import '../fonts/Inter-Black.woff2';
import '../fonts/Inter-Medium.woff';
import '../fonts/Inter-Medium.woff2';
import '../fonts/Inter-Regular.woff';
import '../fonts/Inter-Regular.woff2';
import '../fonts/inter.css';

//TODO: import all classes and arrays
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//import data from "../utils/constants.js";
import { validationConfig, editButton, addButton, avaButton } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";

//TODO import Api from class
import Api from "../components/Api.js";

//TODO create object with data for Api
const apiConfig = {
  url: 'https://nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: 'f1739fbf-cb71-4b05-a638-497fc32374c1',
    'Content-Type': 'application/json'
  }
}

const api = new Api(apiConfig);

//TODO set user info in profile
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job',
  avaSelector: '.profile__image'
});

//TODO set user id
let userId;

const handleCardClick = (name, link) => {
  popUpPhoto.open(name, link);
}

//TODO creation of new card
const createCard = (element) => {
  const card = new Card(element, userId, '#element', handleCardClick, handleCardLike, handleDeleteCardSubmit);
  const cardElement = card.generateCard();
  return cardElement;
};

//TODO global class for initialize cards
const cardSection = new Section ({
  renderer: (element) => {
    cardSection.appendItem( createCard (element) );
  }
}, '.elements')

Promise.all([ api.loadUserInfo(), api.getInitialCards()])
  .then(([ userData, cardData ]) => {
    profileInfo.setUserInfo({
     nameInput: userData.name,
     jobInput: userData.about,
     avaInput: userData.avatar,
    });
    userId = userData._id;

    cardSection.renderItems(cardData);
  })
  .catch((err) => {
    console.log(err);
  });

//TODO add popup with photo with class PopupWithImage
const popUpPhoto = new PopupWithImage('#popup-photo');
popUpPhoto.setEventListeners();

//TODO add user cards with class Section
const handleCardSubmit = (input) => {
  popupCard.setSubmitButtonText("Сохранение...");
  api.addNewCard(input)
    .then((data) => {
      //CardSection.items = data;
      //CardSection.items.profileId = data.owner._id
      const card = createCard(data);
      cardSection.prependItem(card);
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.setSubmitButtonText("Создать");
    });
  }

//TODO edit profile on server
const handleProfileSubmit = (input) => {
  popupProfile.setSubmitButtonText("Сохранение...");
  api.editUserProfile(input)
    .then((data) => {
      profileInfo.resetUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.setSubmitButtonText("Сохранить");
    });
};

//TODO popup handlefunction for avatar
const handleAvatarSubmit = (input) => {
  popupAvatar.setSubmitButtonText("Сохранение...");
  api.editUserAvatar(input)
    .then((data) => {
      profileInfo.resetUserAvatar(data);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.setSubmitButtonText("Сохранить");
    });
}

//TODO function to handle card likes
const handleCardLike = (card) => {
  if (!card.isLiked()) {
    api.likeCard(card.getCardId())
     .then((cardData) => {
        card.updateLikes(cardData.likes);
        card.setLikesStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //TODO delete card like
  else {
    api.unlikeCard(card.getCardId())
      .then((cardData) => {
        card.updateLikes(cardData.likes);
        card.setLikesStatus();
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

const popupProfile = new PopupWithForm(
  '#popup-profile',
  '#popup-profile__form',
  { handleFormSubmit: handleProfileSubmit }
);

popupProfile.setEventListeners();
editButton.addEventListener('click', openPopupProfile.bind(popupProfile));

const popupCard = new PopupWithForm(
  '#popup-card',
  '#popup-card__form',
  { handleFormSubmit: handleCardSubmit
});

popupCard.setEventListeners();
addButton.addEventListener('click', openPopupCard.bind(popupCard));

//TODO popup card for avatar
const popupAvatar = new PopupWithForm(
  '#popup-avatar',
  '#popup-avatar__form',
  { handleFormSubmit: handleAvatarSubmit }
);

const handleDeleteCardSubmit = (card) => {
  console.log(card);
  popupDeleteCard.open();
  popupDeleteCard.setCallBack(() => {
    api.deleteCard(card.getCardId())
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        popupDeleteCard.close();
        card.deleteCard();
      });
  });
};

//TODO popup to delete card
const popupDeleteCard = new PopupWithConfirmation (
  '#popup-delete',
  '#popup-delete__form'
);

//TODO event listener for avatar button
popupDeleteCard.setEventListeners();

//TODO event listener for avatar button
popupAvatar.setEventListeners();
avaButton.addEventListener('click', openPopupAvatar.bind(popupAvatar));

//TODO add form validation for avatar form
const avaForm = document.querySelector('#popup-avatar__form');
const avaFormValidator = new FormValidator(validationConfig, avaForm);
avaFormValidator.enableValidation();

//TODO: make a const with form address
const cardForm = document.querySelector('#popup-card__form');
const cardFormValidator = new FormValidator(validationConfig, cardForm);
cardFormValidator.enableValidation();

const profileForm = document.querySelector('#popup-profile__form');
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

function openPopupProfile() {
  const currentUserInfo = profileInfo.getUserInfo();
  popupProfile.form.nameInput.value = currentUserInfo.nameInput;
  popupProfile.form.jobInput.value = currentUserInfo.jobInput;
  popupProfile.open();
}

function openPopupCard() {
  popupCard.open();
  cardFormValidator.toggleButtonState();
}

//TODO to open popup for editing avatar
function openPopupAvatar() {
  popupAvatar.open();
  avaFormValidator.toggleButtonState();
}

