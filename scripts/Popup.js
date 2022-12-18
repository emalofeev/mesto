export default class Popup {
  constructor(selectorPopup) {
    this._popupCard = selectorPopup;
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popupCard.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupCard.classList.remove('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._popupCard.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}