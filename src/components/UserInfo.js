export default class UserInfo {
  /** селекторы имени пользователя и информации о нем */
  constructor({ profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  /** передача данных пользователя */
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
    };
  }

  /** получение новых данных пользователя */
  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
  }
}
