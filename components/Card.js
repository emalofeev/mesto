export default class Card {
  // данные карточки и селектор её темплейт элемента
  constructor(data, selectorTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }

  // метод получения разметки карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
    this._element = cardElement;
    this._elementImage = this._element.querySelector(".element__image");
  }

  // метод лайка карточки
  _handleCardLike() {
    this._element
      .querySelector(".element__item-like")
      .classList.toggle("element__item-like_active");
  }

  // метод удаления карточки
  _handleCardDelete() {
    this._element.remove();
  }

  // метод установки слушателей событий
  _addEventListenerElement() {
    this._element
      .querySelector(".element__item-like")
      .addEventListener("click", () => {
        this._handleCardLike();
      });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // метод возвращения карточки
  renderCard() {
    this._getTemplate();
    this._addEventListenerElement();

    this._element.querySelector(".element__item-name").textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    return this._element;
  }
}
