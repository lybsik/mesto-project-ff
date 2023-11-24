import { openPopup } from './modal.js';

export const popupPhoto = document.querySelector('.popup-photo');
const photo = popupPhoto.querySelector('.popup-photo__image');
const title = popupPhoto.querySelector('.popup-photo__title');
const cardTemplate = document.querySelector('#card').content; //создали переменную из template из которой нам нужен будет контент

//функция создания новой карточки
export function createCard (cardData) {
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