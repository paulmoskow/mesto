export default class Api {
  constructor({ url, headers }) {
    // тело конструктора
    this._url = url;
    this._headers = headers;
  }

  //TODO method for checking results
  _getResponse(res){
    if (res.ok) {
      return res.json();
    }
    return res.reject(`Ошибка: ${res.status}`);
  }

  //TODO method for getting cards from server
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._getResponse);
  }

  //TODO rendering userinfo from server
  loadUserInfo() {
    return fetch(`${this._url}/users/me`, {
    headers: this._headers
    })
    .then(this._getResponse);
  }

  //TODO editing user profile on server
  editUserProfile(input) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: input.nameInput,
        about: input.jobInput
      })
    })
    .then(this._getResponse);
  }

  //TODO add new card on server
  addNewCard(input) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: input.placeInput,
        link: input.linkInput
      })
    })
    .then(this._getResponse);
  }

  //TODO add new avatar to user profile
  editUserAvatar(input) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: input.avaLinkInput,
      })
    })
    .then(this._getResponse);
  }

  //TODO methods for liking cards and remove likes
  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getResponse);
  }

  unlikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponse);
  }

//TODO method for deleting cards
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponse);
  }

}

/*
  //TODO deleting cards on server
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse);
  }
*/






/*
  getUserInfo() {

  }

}*/

  // другие методы работы с API:

  //редактирование профиля patch
  //добавление новой карточки
  //отображение количества лайков
  //постановка и снятие лайка (put и delete запросы)
  //обновление аватара patch


  //let userId;



/*
const api = new Api({
baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
headers: {
  authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
  'Content-Type': 'application/json'
}
});


//Не забывайте проверять, всё ли в порядке с ответом. Можно использовать res.ok или res.status:

getInitialCards() {
return fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}
//Учитывайте случай, когда сервер вернул ошибку.
getInitialCards() {
return fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//Обрабатывайте ошибки, попадающие в catch. Если запрос не ушёл на сервер, или тот не ответил, сработает блок catch. Обрабатывайте ошибку внутри этого блока. Если нет времени писать сложную логику, хотя бы просто выведите ошибку в консоль.
api.getInitialCards()
  .then((result) => {
    // обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
*/
