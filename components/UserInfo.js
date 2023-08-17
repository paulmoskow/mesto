

export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      info: this._info.textContent
    };
    return userInfo //return object with name and info
  }

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._info.textContent = info;
    //get new name and info and add to the page
  }
}
