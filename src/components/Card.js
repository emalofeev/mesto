export default class Card {
  /**  данные карточки и селектор её темплейт  */
  constructor(cardData, selectorTemplate, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }

  /**  метод получения разметки карточки */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
    this._cardElement = cardElement;
    this._cardImage = this._cardElement.querySelector(".element__image");
  }

  /** метод лайка карточки */
  _handleCardLike() {
    this._cardLike.classList.toggle("element__item-like_active");
  }

  /** метод удаления карточки */
  _handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /** метод установки слушателей событий */
  _addEventListenerElement() {
    this._cardLike = this._cardElement.querySelector(".element__item-like");
    this._cardLike.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._cardElement
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  /** метод возвращения карточки */
  renderCard() {
    this._getTemplate();
    this._addEventListenerElement();

    this._cardElement.querySelector(".element__item-name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._cardElement;
  }
}
