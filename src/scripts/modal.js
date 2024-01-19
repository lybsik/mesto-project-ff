//Функция открывания попапов
export function openPopup(popup) {
  popup.classList.add("popup_opened"); /*Добавляется модификатор открытия со свойством видимости*/
  document.addEventListener("keyup", closeEscButton);
}

//функция закрывания попапов
export function closePopup(popup) {
  popup.classList.remove("popup_opened"); /*Удаляется модификатор открытия, попап становится снова невидимым*/
  document.removeEventListener("keyup", closeEscButton);
}

//функция закрытия при нажатии на ESCAPE
function closeEscButton(evt) {
  if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_opened");
      closePopup(popup);
  }
}

//функция закрытия попапа через оверлей
export function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target)
  }
} 
