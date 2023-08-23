

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
