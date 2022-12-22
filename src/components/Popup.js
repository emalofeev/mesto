export default class Popup {
  /** селектор попапа */
  constructor(popup) {
    this._popupCard = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  /** метод закрытия попапа клавишей Esc */
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  /** метод открытие попапа */
  open() {
    this._popupCard.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  /** метод закрытие попапа */
  close() {
    this._popupCard.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  /** метод установки слушателей событий */
  setEventListeners() {
    this._popupCard.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
