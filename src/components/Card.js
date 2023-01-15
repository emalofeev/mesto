import PopupWithForm from "./PopupWithForm";

export default class Card {
  /**  данные карточки и селектор её темплейт  */
  constructor(
    cardData,
    selectorTemplate,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
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
    this._handleLikeClick = handleLikeClick;
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

  /** метод удаления карточки */
  handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /** метод установки слушателей событий */
  _addEventListenerElement() {
    this._cardLike = this._cardElement.querySelector(".element__item-like");
    this._cardLike.addEventListener("click", () => {
      this._handleLikeClick(this._id);
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

  /** проверка моего лайка */
  isLike() {
    const checkUsersLikes = this._likes.find(
      (user) => this._userId === user._id
    );
    return checkUsersLikes;
  }

  /** метод получения и обработки лайков */
  setLikes(usersLikes) {
    this._likes = usersLikes;
    const likeAmount = this._cardElement.querySelector(".element__item-amount");
    likeAmount.textContent = this._likes.length;

    if (this.isLike()) {
      this._cardLike.classList.add("element__item-like_active");
    } else {
      this._cardLike.classList.remove("element__item-like_active");
    }
  }

  /** метод возвращения карточки */
  renderCard() {
    this._getTemplate();
    this._addEventListenerElement();
    this.setLikes(this._likes);

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
