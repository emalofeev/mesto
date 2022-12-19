export default class Popup {
  // селектор попапа
  constructor(selectorPopup) {
    this._popupCard = selectorPopup;
  }

  // метод закрытия попапа клавишей Esc
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // метод открытие попапа
  open() {
    this._popupCard.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  // метод закрытие попапа
  close() {
    this._popupCard.classList.remove("popup_opened");
  }

  // метод установки слушателей событий
  setEventListeners() {
    this._popupCard.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup_opened") ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
