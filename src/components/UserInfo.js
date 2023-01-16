export default class UserInfo {
  /** селекторы имени пользователя и информации о нем */
  constructor({ profileName, profileJob, profileAvatar }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._profileAvatar = profileAvatar;
  }

  /** передача данных пользователя */
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
    };
  }

  /** получение новых данных пользователя */
  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    this._profileAvatar.src = avatar;
  }
}
