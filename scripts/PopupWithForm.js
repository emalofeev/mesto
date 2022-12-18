import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
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

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  close() {
    super.close();
    this._popupItem.reset();
    this._popupInputLink.classList.remove("popup__input-error_active");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupItem.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
      this._buttonContentSubmit.classList.add("popup__content-submit_inative");
    });
  }
}
