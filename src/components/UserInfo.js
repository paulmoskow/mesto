export default class UserInfo {
  constructor({ nameSelector, infoSelector, avaSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._ava = document.querySelector(avaSelector);

  }

  //TODO reset user info to upload data from server
  /*
  loadUserInfo(data) {
    const userInfo = {
      nameInput: data.name,
      jobInput: data.about,
      avaInput: data.avatar,
      userId: data._id
    };
    return userInfo; //return object with name and info
  }
*/

  getUserInfo() {
    const userInfo = {
      nameInput: this._name.textContent,
      jobInput: this._info.textContent,
      ava: this._ava.src
    };
    return userInfo; //return object with name and info
  }


  setUserInfo(userData) {
    this._name.textContent = userData.nameInput;
    this._info.textContent = userData.jobInput;
    this._ava.src = userData.avaInput;
    //get new name and info and add to the page
  }

  resetUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    //get new name and info and add to the page
  }

//TODO reset user avatar
  resetUserAvatar(data) {
    this._ava.src = data.avatar;
    //get new name and info and add to the page
  }

 /*
  getUserId(data) {
    this._userId = data.userId;
    return this._userId;
  }
*/
}

/*
export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = {
      nameInput: this._name.textContent,
      jobInput: this._info.textContent
    };
    return userInfo; //return object with name and info
  }

  setUserInfo(input) {
    this._name.textContent = input.nameInput;
    this._info.textContent = input.jobInput;
    //get new name and info and add to the page
  }
}
*/
