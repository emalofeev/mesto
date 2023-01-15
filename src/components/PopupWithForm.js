import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /** селектор попапа и колбэк сабмита формы */
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupCard.querySelector(".popup__content");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  /** приватный метод получения данных полей */
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  /** добавление сброса при закрытии попапа */
  close() {
    super.close();
    this._popupForm.reset();
  }

  /** метод создания нового сабмита формы для получения айди */
  doSubmitHandler(newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler;
  }

  /** добавление слушателя сабмита формы */
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
