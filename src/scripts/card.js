export const popupPhoto = document.querySelector('.popup-photo');
export const photo = popupPhoto.querySelector('.popup-photo__image');
export const title = popupPhoto.querySelector('.popup-photo__title');
const cardTemplate = document.querySelector('#card').content; //создали переменную из template из которой нам нужен будет контент

//функция создания новой карточки
export function createCard (cardData, likeHandler, deleteHandler, cardImageClickHandler) {
    const card = cardTemplate.querySelector('.cards__list-item').cloneNode(true);   
    const likeButton = card.querySelector('.cards__like-button');
    const deleteButton = card.querySelector('.cards__delete-button');
    const cardImage = card.querySelector('.cards__image');
    const cardTitle = card.querySelector('.cards__title');
    cardTitle.textContent = cardData.name;
    cardImage.src =  cardData.link;
    cardImage.alt = `Фотография ${cardTitle.textContent}`;
  
    likeButton.addEventListener('click', () => {
        likeHandler(likeButton);
    });

    deleteButton.addEventListener('click', function() {
        const element = deleteButton.closest('.cards__list-item');
        deleteHandler(element);         
      });

    cardImage.addEventListener('click', function() {
        cardImageClickHandler(cardData);
    });

    return(card); 
}

  