

export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = [
      {name: 0, value: this._name.textContent},
      {name: 1, value: this._info.textContent}
    ];
    return userInfo; //return object with name and info
  }

  setUserInfo(data) {
    this._name.textContent = data[0].value;
    this._info.textContent = data[1].value;
    //get new name and info and add to the page
  }
}
