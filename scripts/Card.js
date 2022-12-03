import { popupImage, imageSrc, imageTitle } from "./index.js";
import { openPopup } from "./index.js";

class Card {
  constructor(data, selectorTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplate = selectorTemplate;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
    this._element = cardElement;
  }

  _handleCardLike() {
    this._element
      .querySelector(".element__item-like")
      .classList.toggle("element__item-like_active");
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _handleCardImage() {
    imageSrc.src = this._link;
    imageSrc.alt = this._name;
    imageTitle.textContent = this._name;
    openPopup(popupImage);
  }

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

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardImage();
      });
  }

  renderCard() {
    this._getTemplate();
    this._addEventListenerElement();

    this._element.querySelector(".element__item-name").textContent = this._name;
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;

    return this._element;
  }
}

export default Card;