const popupEditProfile = document.querySelector('.popup_edit');
const popupAddPlace = document.querySelector('.popup_place');
const popupPhoto = document.querySelector('.popup-photo')

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

const closeButtonPhotoPopup = document.querySelector('.popup-photo__close-button');
const photo = popupPhoto.querySelector('.popup-photo__image');
const title = popupPhoto.querySelector('.popup-photo__title');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content; //создали переменную из template из которой нам нужен будет контент

//вынесли отдельно появление карточки ПЕРЕД теми что уже есть на странице
const renderCard = (card) => {
    cardsContainer.prepend(card)
}

//Функция открывания попапов
function openPopup(popup) {
    popup.classList.add('popup_opened'); /*Добавляется модификатор открытия со свойством видимости*/
}

//функция закрывания попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened'); /*Удаляется модификатор открытия, попап становится снова невидимым*/
}

//функция открытия редактирования профиля
function openEditProfilePopup(){
    popupNameInput.value = nameInput.textContent; /*В первый элемент формы даем значение равное первому тексту (у нас это имя) и говорим что это текст-Это для редактирования информации*/
    popupAboutInput.value = aboutInput.textContent; /*Во второй элемент формы даем значение равное второму тексту (профессия) и говорим что это текст*/
    openPopup(popupEditProfile);
}

//функция открытия добавления карточки
function openAddPlacePopup() {
    titleInput.value = ''; //даем значение названия для добавления новой карточки
    linkInput.value = ''; //даем значение ссылки для добавления новой карточки
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

//функция создания новой карточки
function createCard (cardData) {
    const card = cardTemplate.querySelector('.cards__list-item').cloneNode(true);   //создали переменную выбрав из ранее созданной переменной нужный нам класс и клонируем его содержимое
    const likeButton = card.querySelector('.cards__like-button');
    const deleteButton = card.querySelector('.cards__delete-button');
    const cardImage = card.querySelector('.cards__image');
    const cardTitle = card.querySelector('.cards__title');
    cardTitle.textContent = cardData.name;
    cardImage.src =  cardData.link;
    cardImage.alt = `Фотография ${cardTitle.textContent}`;

    likeButton.addEventListener('click', function() { //кнопка лайка слушает как при клике на нее запускается функция:
        likeButton.classList.toggle('cards__like-button_active'); //в которой переключается состояние нашего сердечка на активное
    });
    deleteButton.addEventListener('click', function() { //кнопка удаления прик клике запускает функцию:...
        const element = deleteButton.closest('.cards__list-item'); //создадим переменную при которой корзина наша с классом
        element.remove(); //...при которой наша переменная с карточкой удаляется
    });
    cardImage.addEventListener('click', function(){  //картинка слушает при клике вызывается функция, при которой:
        openPopup(popupPhoto); //добавляется класс открывашки
        photo.src = cardImage.src; //фото ищется в картимэдже
        title.textContent = cardTitle.textContent; //заголовок ищется в заголовке
        photo.alt = `Фотография ${title.textContent}`;
    })
    return(card); //возвращаем готовую карточку со всем что выше мы в нее положили
}

initialCards.forEach((item) => {
  const card = createCard(item);
  renderCard(card); //объявляем переменную карточки появляющуся ПЕРЕД всеми остальными из массива
})
//функция сохранения новой карточки
function handleSaveCreateCard(evt) {
    evt.preventDefault();
    const newCardData = {name: titleInput.value, link: linkInput.value};
    const newCard = createCard(newCardData)
    renderCard(newCard);
    formPlaceElement.reset();
    closePopup(popupAddPlace);
}

  formPlaceElement.addEventListener('submit', handleSaveCreateCard); //наша форма создания новой краточки слышит как при сохранении запускается функция созданная выше

