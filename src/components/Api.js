export default class Api {
  constructor({ url, headers }) {
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
        link: input.linkInput,
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





