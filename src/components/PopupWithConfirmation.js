import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirmation extends PopupWithForm {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector, handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
