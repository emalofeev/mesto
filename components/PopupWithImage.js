import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  // селектор попапа
  constructor(selectorPopup) {
    super(selectorPopup);

    this._popupImageTitle = this._popupCard.querySelector(
      ".popup__image-title"
    );
    this._popupImageLink = this._popupCard.querySelector(".popup__image");
  }

  // метод перезаписи родительского метода open
  open(name, link) {
    super.open();
    super.setEventListeners();

    this._popupImageTitle.textContent = name;
    this._popupImageTitle.alt = name;
    this._popupImageLink.src = link;
  }
}
