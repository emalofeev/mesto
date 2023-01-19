import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupCard.querySelector(".popup__content");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._textButton = this._popupForm.querySelector(".popup__content-submit");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading = true, title = "", subtitle = "") {
    if (isLoading) {
      this._textButton.textContent = title;
    } else {
      this._textButton.textContent = subtitle;
    }
  }
}
