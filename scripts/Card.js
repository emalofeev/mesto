// import {
//   popupImage,
//   imageSrc,
//   imageTitle,
//   //openPopup
// } from "../utils/utils.js";

class Card {
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

  // приватные методы по работе с карточкой
  _handleCardLike() {
    this._element
      .querySelector(".element__item-like")
      .classList.toggle("element__item-like_active");
  }

  _handleCardDelete() {
    this._element.remove();
  }

  // _handleCardImage() {
  //   imageSrc.src = this._link;
  //   imageSrc.alt = this._name;
  //   imageTitle.textContent = this._name;
  //   openPopup(popupImage);
  // }

  // приватный метод установки слушателей событий
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

  // публичный метод для возвращения карточки
  renderCard() {
    this._getTemplate();
    this._addEventListenerElement();

    this._element.querySelector(".element__item-name").textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    return this._element;
  }
}

export default Card;
