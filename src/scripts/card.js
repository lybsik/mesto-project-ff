import {deleteCardServ, setLike, deleteLike} from "./api.js"

export const popupPhoto = document.querySelector('.popup-photo');
export const photo = popupPhoto.querySelector('.popup-photo__image');
export const title = popupPhoto.querySelector('.popup-photo__title');

const cardTemplate = document.querySelector('#card').content; //создали переменную из template из которой нам нужен будет контент

//функция создания новой карточки
function createCard (cardData, userId, likeHandler, deleteHandler, cardImageClickHandler) {
    const cardElement = cardTemplate.querySelector('.cards__list-item').cloneNode(true);   
    const likeButton = cardElement.querySelector('.cards__like-button');
    const deleteButton = cardElement.querySelector('.cards__delete-button');
    const cardLikeCount = cardElement.querySelector(".cards__like-count");
    const cardImage = cardElement.querySelector('.cards__image');
    const cardTitle = cardElement.querySelector('.cards__title');
    cardTitle.textContent = cardData.name;
    cardImage.src =  cardData.link;
    cardImage.alt = `Фотография ${cardTitle.textContent}`;
    cardLikeCount.textContent = cardData.likes.length;
  
    //Проверка айди карточки и айди пользователя для функции удаления
    if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', (evt) => deleteHandler(cardData._id, cardElement));
    } else {deleteButton.remove()}
    //Проверка лайка
    const checkLike = cardData.likes.some((like) => like._id === userId);
    if (checkLike) {
      likeButton.classList.add('cards__like-button_active')
    }
    //Ставим лайк при нажатии на кнопку
    likeButton.addEventListener('click', () => {
        likeHandler(likeButton);
    });

    /*deleteButton.addEventListener('click', function() {
        const element = deleteButton.closest('.cards__list-item');
        deleteHandler(element);         
      });*/
    
    //Открытие карточки
    cardImage.addEventListener('click', function() {
        cardImageClickHandler(cardData);
    });

    return(cardElement); 
}

//Удаление карточки с сервера
function deleteHandler(cardId, cardElement) { 
    deleteCardServ(cardId)
    .then(() => {cardElement.remove();})
    .catch((err) => {console.log(err)});
  }; 
  
  //Функция постановки лайка      
  function likeHandler(evt, cardId, cardElement) {
    const counterLikes = cardElement.querySelector('.cards__like-counter')
    if (evt.target.classList.contains('cards__like-button_active')) {
        deleteLike(cardId)
      .then((card) => {
        evt.target.classList.remove('cards__like-button_active');
        counterLikes.textContent = card.likes.length;
      })
      .catch((err) => {console.log(err)}); 
    } else {
      setLike(cardId)
      .then((card) => {
        evt.target.classList.add('cards__like-button_active');
        counterLikes.textContent = card.likes.length;
      })
      .catch((err) => {console.log(err)});
    }
  };
  
  //Экспорт функций создания карточки, удаление и постановки лайка
  export {createCard, deleteHandler, likeHandler};