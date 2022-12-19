import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // селектор попапа и колбэк сабмита формы
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupItem = this._popupCard.querySelector(".popup__content");
    this._inputList = this._popupItem.querySelectorAll(".popup__input");
    this._buttonContentSubmit = this._popupItem.querySelector(
      ".popup__content-submit"
    );
    this._popupInputLink = this._popupItem.querySelector(
      ".popup__input-error-linkCard"
    );
  }

  // приватный метод получения данных полей
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  // публичный метод получения данных полей
  getValues() {
    return this._formValues;
  }

  // добавление сброса при закрытии попапа
  close() {
    super.close();
    this._popupItem.reset();
  }

  // добавление слушателя сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupItem.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
