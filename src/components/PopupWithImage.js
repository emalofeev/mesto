import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImageTitle = this._popupCard.querySelector(
      ".popup__image-title"
    );
    this._popupImageLink = this._popupCard.querySelector(".popup__image");
  }

  open(name, link) {
    super.open();

    this._popupImageTitle.textContent = name;
    this._popupImageTitle.alt = name;
    this._popupImageLink.src = link;
  }
}
