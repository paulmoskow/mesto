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

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//TODO add button for avatar
const avaButton = document.querySelector('.profile__ava-button');

//TODO add button to delete card
const deleteCardButton = document.querySelector('.popup__submit-button_delete-card');

//TODO: import all classes and arrays
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

//import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";

//TODO import Api from class
import Api from "../components/Api.js";

//TODO create object with data for Api
const newRequest = {
  url: 'https://nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: 'f1739fbf-cb71-4b05-a638-497fc32374c1',
    'Content-Type': 'application/json'
  }
}

const api = new Api(newRequest);

//TODO set user info in profile
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job',
  avaSelector: '.profile__image'
});

//TODO upload user info from server
let userInfo;

const handleCardClick = (name, link) => {
  popUpPhoto.open(name, link);
}

//TODO creation of new card
const instalNewCard = (element) => {
  const card = new Card(element, '#element', handleCardClick, handleCardLike, handleDeleteCardSubmit);
  const cardElement = card.generateCard();
  return cardElement;
};

//TODO global class for initialize cards
const newCardSection = new Section ({
  items: null,
  renderer: (element) => {
    newCardSection.addInitialItem( instalNewCard (element) );
  }
}, '.elements')


Promise.all([ api.loadUserInfo(), api.getInitialCards()])
  .then(([ userData, cardData ]) => {
    userInfo = profileInfo.loadUserInfo(userData);
    profileInfo.setUserInfo(userInfo);
    const userId = profileInfo.getUserId(userInfo);
    newCardSection.items = cardData;
    newCardSection.items.forEach((item) => {
      item.profileId = userId;
    })
    newCardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

//TODO add popup with photo with class PopupWithImage
const popUpPhoto = new PopupWithImage('#popup-photo');
popUpPhoto.setEventListeners();

//TODO add user cards with class Section
const handleCardSubmit = (input) => {
  popupCard.form.querySelector(config.submitSelect).textContent = "Сохранение...";
  api.addNewCard(input)
    .then((data) => {
      newCardSection.items = data;
      newCardSection.items.profileId = data.owner._id
      newCardSection.renderer = (element) => {
        newCardSection.addNewItem( instalNewCard (element));
      }
      newCardSection.renderItem();
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.form.querySelector(config.submitSelect).textContent = "Создать";
    });
  }

//TODO edit profile on server
const handleProfileSubmit = (input) => {
  popupProfile.form.querySelector(config.submitSelect).textContent = "Сохранение...";
  api.editUserProfile(input)
    .then((data) => {
      profileInfo.resetUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.form.querySelector(config.submitSelect).textContent = "Сохранить";
    });
};

//TODO popup handlefunction for avatar
const handleAvatarSubmit = (input) => {
  popupAvatar.form.querySelector(config.submitSelect).textContent = "Сохранение...";
  api.editUserAvatar(input)
    .then((data) => {
      profileInfo.resetUserAvatar(data);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.form.querySelector(config.submitSelect).textContent = "Сохранить";
    });
}

//TODO function to handle card likes
const handleCardLike = (id, like, quant) => {
  const cardLike = like;
  const likesQuant = quant;
  if (!cardLike.classList.contains('element__like_active')) {
    Promise.all([api.likeCard(id), api.loadUserInfo()])
      .then(([ likeCardData, userInfoData ]) => {
        const likes = likeCardData.likes;
        userInfo = profileInfo.loadUserInfo(userInfoData);
        const userId = profileInfo.getUserId(userInfo);
        const myLike = likes.some((user) => {
          return user._id === userId;
        })
        if (myLike === true) {
          cardLike.classList.add('element__like_active');
          likesQuant.textContent = likes.length;
        } else {
          cardLike.classList.remove('element__like_active');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    //TODO delete card like
    else {
        Promise.all([api.unlikeCard(id), api.loadUserInfo()])
      .then(([ likeCardData, userInfoData ]) => {
        const likes = likeCardData.likes;
        userInfo = profileInfo.loadUserInfo(userInfoData);
        const userId = profileInfo.getUserId(userInfo);
        const myLike = likes.some((user) => {
          return user._id === userId;
        })
        if (myLike === false) {
          cardLike.classList.remove('element__like_active');
          likesQuant.textContent = likes.length;
        } else {
          cardLike.classList.add('element__like_active');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

const popupProfile = new PopupWithForm(
  '#popup-profile',
  'popup-profile__form',
  { handleFormSubmit: handleProfileSubmit }
);

popupProfile.setEventListeners();
editButton.addEventListener('click', openPopupProfile.bind(popupProfile));

const popupCard = new PopupWithForm(
  '#popup-card',
  'popup-card__form',
  { handleFormSubmit: handleCardSubmit
});

popupCard.setEventListeners();
addButton.addEventListener('click', openPopupCard.bind(popupCard));

//TODO popup card for avatar
const popupAvatar = new PopupWithForm(
  '#popup-avatar',
  'popup-avatar__form',
  { handleFormSubmit: handleAvatarSubmit }
);

const handleDeleteCardSubmit = (id) => {
  popupDeleteCard.open();
  popupDeleteCard.form.addEventListener('submit', () => {
  api.deleteCard(id)
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      popupDeleteCard.close();
      location.reload();
    });
  });
};

//TODO popup to delete card
const popupDeleteCard = new PopupWithForm(
  '#popup-delete',
  'popup-delete__form',
  { handleFormSubmit: handleDeleteCardSubmit }
);

//TODO event listener for avatar button
popupDeleteCard.setEventListeners();

//TODO event listener for avatar button
popupAvatar.setEventListeners();
avaButton.addEventListener('click', openPopupAvatar.bind(popupAvatar));

//TODO add form validation for avatar form
const avaForm = document.querySelector('#popup-avatar__form');
const avaFormValidator = new FormValidator(config, avaForm);
avaFormValidator.enableValidation();

//TODO: make a const with form address
const cardForm = document.querySelector('#popup-card__form');
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

const profileForm = document.querySelector('#popup-profile__form');
const profileFormValidator = new FormValidator(config, profileForm);
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







//function openPopupDeleteCard() {
//  popupDeleteCard.open();
//}

//const userInfo = profileInfo.getUserInfo();
//profileInfo.setUserInfo(userInfo);

  /*
const handleCardSubmit = (input) => {
  const userCard = {
  name: input.placeInput,
  link: input.linkInput
  };
  newCardSection.items = userCard;
  newCardSection.renderer = (element) => {
    newCardSection.addNewItem( instalNewCard (element));
  }
  newCardSection.renderItem();
  popupCard.close();
}

//TODO class for profile popup
const handleProfileSubmit = (input) => {
  profileInfo.resetUserInfo(input);
  popupProfile.close();
}
*/

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
const sectionA = new Section
let userId;

const userInfo = new Promise((resolve) => {
  setTimout(() => {
    resolve({ name: 'user', id: '12345'})
    userId = { name: 'user', id: '12345'};
  }, 5000);
});


api.getInitialCards()
  .then((data) => {
    section.renderItems(data)
  });
 */

/*Promise.all([api.getUserInfo, api.getInitialCards])
  .then(([ dataUserInfo , dataInitialCards ]) => {
    setUserInfoId(dataUserInfo)
    sectionA.renderItems(dataInitialCards)
    можно использовать два массива - и карточек и userId
  }
*/

/*
api.loadUserInfo()
  .then((data) => {
    подставить значения в отрисовку userInfo

    about: "Sailor, researcher"
    avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
    name: "Jacques Cousteau"
    _id: "73804f5f0b642c9f020e1368"
  })

  api.getInitialCards()
    data

  createdAt: "2023-08-29T11:01:01.055Z"
  likes: []
  link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO9hIx-RaGYrQAtA1ODyZROL4Ae6WuwX1mUUlv8MJV&s"
  name: "Горы"
  owner: {name: 'Jacques Cousteau', about: 'Sailor, researcher', avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg', _id: 'ef916d6e5d0c8b71f481d7d2', cohort: 'cohort-74'}
  _id: "64edcfed9dcbd107000511e1"
*/


/*
api.loadUserInfo()
  .then((data) => {
    userInfo = profileInfo.loadUserInfo(data);
    profileInfo.setUserInfo(userInfo);
  });
*/


/*
api.loadUserInfo()
  .then((data) => {
    userInfo = profileInfo.loadUserInfo(data);
    console.log(profileInfo.getUserId(userInfo));
  });
*/


//TODO upload cards from server
/*
api.getInitialCards()
  .then((data) => {
    console.log(data);
    newCardSection.items = data;
    newCardSection.renderItems();
});*/
