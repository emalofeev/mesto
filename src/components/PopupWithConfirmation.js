import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setFormDelete(handleFormDelete) {
    this._handleFormDelete = handleFormDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupCard.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormDelete();
    });
  }
}
