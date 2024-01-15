import "./pages/index.css";
/*import { initialCards } from "./scripts/cards.js";*/
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { createCard, deleteHandler, likeHandler, popupPhoto, photo, title } from "./scripts/card.js";
import { openPopup, closePopup, closeByOverlay } from "./scripts/modal.js";
import { getInitialInfo, updateUserInfo, postNewCard, updateUserAvatar} from "./scripts/api.js";

let userId;

const cardList = document.querySelector('.cards__list');

const validationConfig = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-save",
    inactiveButtonClass: "form__button-save_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "popup__input-error_visible",
};

const popupEditProfile = document.querySelector(".popup_edit");
const popupAddPlace = document.querySelector(".popup_place");
const popupAvatar = document.querySelector(".popup_avatar");

const profileImageAvatar = document.querySelector(".profile__avatar");
const submitButtonAvatar = popupAvatar.querySelector(".form__button-save");
//const buttonClosePopupAvatar = popupAvatar.querySelector(".popup__close-button");

const profileEditButton = document.querySelector(".profile__edit-button");
const submitButtonEditProfile = popupEditProfile.querySelector(".form__button-save");
//const buttonCloseEditProfile = popupEditProfile.querySelector(".popup__close-button");

const formElementEditProfile = document.querySelector("#form_edit");
const popupNameInput = formElementEditProfile.querySelector(".form__input_type_name");
const popupAboutInput = formElementEditProfile.querySelector(".form__input_type_about");
const nameInput = document.querySelector(".profile__name");
const aboutInput = document.querySelector(".profile__caption");
const popupAvatarForm = document.forms["edit-avatar"];

const profileAddPlaceButton = document.querySelector(".profile__add-button");
//const buttonCloseAddPlace = popupAddPlace.querySelector(".popup__close-button");

const formPlaceElement = document.querySelector("#form_place");
const titleInput = formPlaceElement.querySelector(".form__input_type_title");
const linkInput = formPlaceElement.querySelector(".form__input_type_link");
const submitButtonPlace = formPlaceElement.querySelector(".form__button-save");
//const closeButtonPhotoPopup = document.querySelector(".popup-photo__close-button");
const cardsContainer = document.querySelector(".cards");

/*//вынесли отдельно появление карточки ПЕРЕД теми что уже есть на странице
const renderCard = (card) => {
    cardsContainer.prepend(card);
};

const popupArray = Array.from(document.querySelectorAll(".popup"));
popupArray.forEach((item) => {
    item.addEventListener("click", (evt) => {
        closeByOverlay(evt);
    });
});

//функция открытия редактирования профиля
function openEditProfilePopup() {
    popupNameInput.value = nameInput.textContent;
    popupAboutInput.value = aboutInput.textContent;
    openPopup(popupEditProfile);
}

//функция открытия добавления карточки
function openAddPlacePopup() {
    formPlaceElement.reset();
    submitButton.classList.add("form__button-save_disabled");
    submitButton.disabled = true;
    openPopup(popupAddPlace);
}

profileEditButton.addEventListener("click", () => {
    clearValidation(formElementEditProfile, validationConfig);
    openEditProfilePopup();
});
buttonCloseEditProfile.addEventListener("click", () => {
    closePopup(popupEditProfile);
});
profileAddPlaceButton.addEventListener("click", () => {
    clearValidation(formPlaceElement, validationConfig);
    openAddPlacePopup();
});
buttonCloseAddPlace.addEventListener("click", () => {
    closePopup(popupAddPlace);
});
closeButtonPhotoPopup.addEventListener("click", () => {
    closePopup(popupPhoto);
});
*/

//функция открытия и редактирования попапа аватара
profileImageAvatar.addEventListener('click', () => {
    clearValidation(popupAvatarForm, validationConfig);
    popupAvatarForm.reset();
    openPopup(popupAvatar);
  });
  function handleAvatarFormSubmit(evt) {
    submitButtonAvatar.textContent = submitButtonAvatar.getAttribute('data-loading');
    evt.preventDefault();
    updateUserAvatar(popupAvatarForm.link.value)
     .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
    closePopup(popupAvatar);
  })
    .catch((err) => {console.log(err);})
    .finally(() => {submitButtonAvatar.textContent = submitButtonAvatar.getAttribute('data-default-text');
  });
  }
  popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit)


//Редактирование профиля
profileEditButton.addEventListener('click', function() {
    clearValidation(popupEditProfile, validationConfig);
    openPopup(popupEditProfile);
    popupNameInput.value = nameInput.textContent;
    popupAboutInput.value = aboutInput.textContent;
  });
  function handleFormSubmit(evt) {
    submitButtonEditProfile.textContent = submitButtonEditProfile.getAttribute('data-loading');
    evt.preventDefault(); 
    updateUserInfo({  
      name: popupNameInput.value,
      about: popupAboutInput.value,
    })
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
    closePopup(popupEditProfile);
  })
    .catch((err) => {console.log(err);})
    .finally(() => {submitButtonEditProfile.textContent = submitButtonEditProfile.getAttribute('data-default-text');
    });
  };
  formElementEditProfile.addEventListener('submit', handleFormSubmit);
  

//Добавление карточки
profileAddPlaceButton.addEventListener('click', function() {
    clearValidation(popupAddPlace, validationConfig);
    openPopup(popupAddPlace);
  });
  function getNewCard(evt) {
    submitButtonPlace.textContent = submitButtonPlace.getAttribute('data-loading');
    evt.preventDefault();
    const item = {name: titleInput.value, link: linkInput.value};
    postNewCard(item)
    .then((cardData) => {
      const newCard = createCard(cardData, userId, deleteHandler, likeHandler, cardImageClickHandler);
      cardList.prepend(newCard);
    titleInput.value = '';
    linkInput.value = '';
    closePopup(popupAddPlace);
    })
    .catch((err) => {console.log(err);})
    .finally(() => {submitButtonPlace.textContent = submitButtonPlace.getAttribute('data-default-text');
    })
  };
  formPlaceElement.addEventListener('submit', getNewCard);

//Увеличение карточки
function cardImageClickHandler(cardData) {
    openPopup(popupPhoto);
    photo.src = cardData.link;
    title.textContent = cardData.name;
    photo.alt = `Фотография ${title.textContent}`;
}
  
//Закрытие карточки по клику на крестик и оверлей
document.querySelectorAll('.popup__close-button').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
    buttonsPopup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(buttonsPopup);
      };
    });
});

/*//функция Сохранения информации при редактировании профиля
function handleSaveEditProfile(evt) {
    evt.preventDefault();
    nameInput.textContent = popupNameInput.value;
    aboutInput.textContent = popupAboutInput.value;
    closePopup(popupEditProfile);
}

formElementEditProfile.addEventListener("submit", handleSaveEditProfile);

const likeHandler = (likeButton) => {
    likeButton.classList.toggle("cards__like-button_active");
};

const deleteHandler = (element) => {
    element.remove();
};

function cardImageClickHandler(cardData) {
    openPopup(popupPhoto);
    photo.src = cardData.link;
    title.textContent = cardData.name;
    photo.alt = `Фотография ${title.textContent}`;
}

initialCards.forEach((item) => {
    const card = createCard(item, likeHandler, deleteHandler, cardImageClickHandler);
    renderCard(card); //объявляем переменную карточки появляющуся ПЕРЕД всеми остальными из массива
});

//функция сохранения новой карточки
function handleSaveCreateCard(evt) {
    evt.preventDefault();
    const newCardData = { name: titleInput.value, link: linkInput.value };
    const newCard = createCard(newCardData, likeHandler, deleteHandler, cardImageClickHandler);
    renderCard(newCard);
    closePopup(popupAddPlace);
}

formPlaceElement.addEventListener("submit", handleSaveCreateCard);
*/

enableValidation(validationConfig);

//---АПИ---//
getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    fillProfileInfo(userInfo);
    renderInitialCards(initialCards, userId);})
  .catch((err) => {console.log(err);});
//Получаем данные пользователя
const fillProfileInfo = (userInfo) => {
    nameInput.textContent = userInfo.name;
    aboutInput.textContent = userInfo.about;
    profileImageAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};

//Вывод карточек на экран
function renderInitialCards(initialCards, userId) {
  initialCards.forEach(item => {
    cardList.append(createCard(item, userId, deleteHandler, likeHandler, cardImageClickHandler));
  });
}