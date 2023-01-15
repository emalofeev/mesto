import PopupWithForm from "./PopupWithForm";

export default class Card {
  /**  данные карточки и селектор её темплейт  */
  constructor(
    cardData,
    selectorTemplate,
    handleCardClick,
    handleDeleteClick,
    userId
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._userId = userId.id;
    this._ownerId = cardData.owner._id;

    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
  handleCardDelete() {
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
        this._handleDeleteClick(this._id);
      });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  /** метод получения количества лайков */
  _setLikes() {
    const likeAmount = this._cardElement.querySelector(".element__item-amount");
    likeAmount.textContent = this._likes.length;
  }

  /** метод возвращения карточки */
  renderCard() {
    this._getTemplate();
    this._addEventListenerElement();
    this._setLikes();

    this._cardElement.querySelector(".element__item-name").textContent =
      this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector(".element__delete").style.display =
        "none";
    }

    return this._cardElement;
  }
}
