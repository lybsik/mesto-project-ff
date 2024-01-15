const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
    headers: {
      authorization: 'af77d9a6-f01b-4b38-a9ad-01d6e5a49b21',
      'Content-Type': 'application/json'
    }
  };

//Проверка запроса
const checkRequest = (res) => {
    if (res.ok) {return res.json()} 
    else {return Promise.reject(`Ошибка: ${res.status}`)};
};    

//Загрузка данных о пользователе
const getUserInfo = async () => {
   return fetch(`${config.baseUrl}/users/me`, {
       headers: config.headers,
   })
   .then((res) => checkRequest(res));
}

//Получаем информацию о карточке 
const getCardsInfo = async () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then((res) => checkRequest(res));
    
}

//Получаем все данные
const getInitialInfo = async () => {
    return Promise.all([getUserInfo(), getCardsInfo()]);
  };

//Обновление  данных о пользователе
const updateUserInfo = async (userData) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
    .then((res) => checkRequest(res));
};

//Обновление аватара
const updateUserAvatar = async (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
  .then((res) => checkRequest(res));
};

//Добавление карточек
const postNewCard = async (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
    .then((res) => checkRequest(res));
  };

//Поставили лайк
const setLike = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    })
    .then((res) => checkRequest(res));
  };

//Удалили лайк
const deleteLike = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
    .then((res) => checkRequest(res));
  };  

//Удаление карточки
const deleteCardServ = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
    .then((res) => checkRequest(res));
  }; 
  
 
export {getUserInfo, getCardsInfo, getInitialInfo, updateUserInfo, 
    postNewCard, setLike, deleteLike, deleteCardServ, updateUserAvatar}