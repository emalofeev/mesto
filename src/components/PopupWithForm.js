import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /** селектор попапа и колбэк сабмита формы */
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupItem = this._popupCard.querySelector(".popup__content");
    this._inputList = this._popupItem.querySelectorAll(".popup__input");
  }

  /** приватный метод получения данных полей */
  _getInputValues() {
    this.formValues = {};
    this._inputList.forEach(
      (input) => (this.formValues[input.name] = input.value)
    );
    return this.formValues;
  }

  /** добавление сброса при закрытии попапа */
  close() {
    super.close();
    this._popupItem.reset();
  }

  /** добавление слушателя сабмита формы */
  setEventListeners() {
    super.setEventListeners();
    this._popupItem.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
