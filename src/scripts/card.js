import { openPopup } from './modal.js';

export const popupPhoto = document.querySelector('.popup-photo');
export const photo = popupPhoto.querySelector('.popup-photo__image');
export const title = popupPhoto.querySelector('.popup-photo__title');
const cardTemplate = document.querySelector('#card').content; //создали переменную из template из которой нам нужен будет контент

//функция для обработчика клика по изображению карточки
export function cardImageClickHandler(cardData) {
    openPopup(popupPhoto);
    photo.src = cardData.link;
    title.textContent = cardData.name;
    photo.alt = `Фотография ${title.textContent}`;
};

//функция создания новой карточки
export function createCard (cardData, likeHandler, deleteHandler) {
    const card = cardTemplate.querySelector('.cards__list-item').cloneNode(true);   
    const likeButton = card.querySelector('.cards__like-button');
    const deleteButton = card.querySelector('.cards__delete-button');
    const cardImage = card.querySelector('.cards__image');
    const cardTitle = card.querySelector('.cards__title');
    cardTitle.textContent = cardData.name;
    cardImage.src =  cardData.link;
    cardImage.alt = `Фотография ${cardTitle.textContent}`;
  
    likeButton.addEventListener('click', function() {
        const likeHandler = () => {
            likeButton.classList.toggle('cards__like-button_active');
        }; 
        likeHandler(card);         
    });

    deleteButton.addEventListener('click', function() {
        const deleteHandler = () => {
            const element = deleteButton.closest('.cards__list-item'); 
            element.remove(); 
        };
        deleteHandler(card);
    });

    cardImage.addEventListener('click', () => {
        cardImageClickHandler(cardData);
    });

    return(card); 
}

  