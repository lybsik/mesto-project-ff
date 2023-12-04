import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { enableValidation } from './scripts/validate.js';
import { createCard, popupPhoto, photo, title } from './scripts/card.js';
import { openPopup, closePopup, closeByOverlay } from './scripts/modal.js';

/*const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_visible'
};*/

const popupEditProfile = document.querySelector('.popup_edit');
const popupAddPlace = document.querySelector('.popup_place');

const profileEditButton = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');

const formElementEditProfile = document.querySelector('#form_edit');
const popupNameInput = formElementEditProfile.querySelector('.form__input_type_name');
const popupAboutInput = formElementEditProfile.querySelector('.form__input_type_about');
const nameInput = document.querySelector('.profile__name');
const aboutInput = document.querySelector('.profile__caption');

const profileAddPlaceButton = document.querySelector('.profile__add-button');
const buttonCloseAddPlace = popupAddPlace.querySelector('.popup__close-button');

const formPlaceElement = document.querySelector('#form_place');
const titleInput = formPlaceElement.querySelector('.form__input_type_title');
const linkInput = formPlaceElement.querySelector('.form__input_type_link');
const submitButton = formPlaceElement.querySelector('.form__button-save');
const closeButtonPhotoPopup = document.querySelector('.popup-photo__close-button');
const cardsContainer = document.querySelector('.cards');

//вынесли отдельно появление карточки ПЕРЕД теми что уже есть на странице
const renderCard = (card) => {
  cardsContainer.prepend(card)
}

const popupArray = Array.from(document.querySelectorAll('.popup'))
popupArray.forEach((item) => {
  item.addEventListener('click', (evt) => {closeByOverlay(evt)})
})

//функция открытия редактирования профиля
function openEditProfilePopup(){
  popupNameInput.value = nameInput.textContent; /*В первый элемент формы даем значение равное первому тексту (у нас это имя) и говорим что это текст-Это для редактирования информации*/
  popupAboutInput.value = aboutInput.textContent; /*Во второй элемент формы даем значение равное второму тексту (профессия) и говорим что это текст*/
  openPopup(popupEditProfile);
}

//функция открытия добавления карточки
function openAddPlacePopup() {
  formPlaceElement.reset();
  submitButton.classList.add('form__button-save_disabled');
  submitButton.disabled = true;
  openPopup(popupAddPlace);
}

profileEditButton.addEventListener('click', () => {openEditProfilePopup()}); /*кнопка редактирования слышит как при нажатии на нее запускается Функция редактирования профиля*/
buttonCloseEditProfile.addEventListener('click',() => {closePopup(popupEditProfile)}); /*кнопка закрытия на попапе слышит как при нажатии на нее запускается Функция закрытия попапа*/
profileAddPlaceButton.addEventListener('click', () => {openAddPlacePopup()});//кнопка с плюсиком слышит как при клике на нее запускается функция открытия попапа
buttonCloseAddPlace.addEventListener('click', () => {closePopup(popupAddPlace)}); //кнопка с плюсиком слышит как при клике на нее запускается функция закрытия попапа
closeButtonPhotoPopup.addEventListener('click', () => {closePopup(popupPhoto)}) //кнопка крестика на фото слышит как при клике на нее попап закрывается

//функция Сохранения информации при редактировании профиля
function handleSaveEditProfile(evt) {
  evt.preventDefault();
  nameInput.textContent = popupNameInput.value;
  aboutInput.textContent = popupAboutInput.value;
  closePopup(popupEditProfile);
}

formElementEditProfile.addEventListener('submit', handleSaveEditProfile); //наша форма для редактирования слышит как при сохранении запускается функция сохранения информации при редактировании профиля

const likeHandler = (likeButton) => {
  likeButton.classList.toggle('cards__like-button_active');
}

const deleteHandler = (element) => { 
  element.remove();  
};

function cardImageClickHandler(cardData) {
  openPopup(popupPhoto);
  photo.src = cardData.link;
  title.textContent = cardData.name;
  photo.alt = `Фотография ${title.textContent}`;
};

initialCards.forEach((item) => {
const card = createCard(item, likeHandler, deleteHandler, cardImageClickHandler);
renderCard(card); //объявляем переменную карточки появляющуся ПЕРЕД всеми остальными из массива
})
//функция сохранения новой карточки
function handleSaveCreateCard(evt) {
  evt.preventDefault();
  const newCardData = {name: titleInput.value, link: linkInput.value};
  const newCard = createCard(newCardData, likeHandler, deleteHandler, cardImageClickHandler);
  renderCard(newCard);
  closePopup(popupAddPlace);
}

formPlaceElement.addEventListener('submit', handleSaveCreateCard); //наша форма создания новой краточки слышит как при сохранении запускается функция созданная выше

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
