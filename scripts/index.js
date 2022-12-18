import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, listValidation } from "./data.js";
import {
  popupImage,
  //  popupImageCloseButton,
  //  openPopup,
  //  closePopup,
} from "../utils/utils.js";

import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

const cardsContainer = document.querySelector(".elements");

const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");
const formProfile = document.querySelector(".popup__content_type_profile");
const nameProfileInput = formProfile.querySelector(".popup__input_type_name");
const jobProfileInput = formProfile.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__edit-title");
const profileJob = document.querySelector(".profile__info-subtitle");

const popupCard = document.querySelector(".popup_type_card");
const popupCardOpenButton = document.querySelector(".profile__button");
const popupCardCloseButton = popupCard.querySelector(".popup__close");

const formCard = document.querySelector(".popup__content_type_card");
const nameCardInput = formCard.querySelector(".popup__input_type_nameCard");
const linkCardInput = formCard.querySelector(".popup__input_type_linkCard");

// попап для открытия изображения карточки

const popupWithImage = new PopupWithImage(popupImage);

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// добавление исходных карточек
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#element-template", handleCardClick);
      return card.renderCard();
    },
  },
  ".elements"
);

cardsList.renderItems();

// initialCards.forEach((item) => {
//   const newCard = createCard(item);
//   cardsContainer.prepend(newCard);
// });

// добавление новых карточек

const popupWithFormCard = new PopupWithForm(popupCard, () => {
  const formData = popupWithFormCard.getInputValues();
  const card = new Card(formData, "#element-template", handleCardClick);
  const newCard = card.renderCard();
  cardsList.addItem(newCard);
  popupWithFormCard.close();
});

popupWithFormCard.setEventListeners();

popupCardOpenButton.addEventListener("click", () => {
  popupWithFormCard.open();
});




function handlePopupProfileVisibility() {
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileJob.textContent;
  openPopup(popupProfile);

  // валидация сабмита после первичного заполнения формы при открытии
  validatorProfile.toggleButtonSubmit();

  // очистка полей валидации после закрытия редактора профиля без сохранения
  validatorProfile.hideProfileError();
}

function handlePopupProfileUnvisibility() {
  closePopup(popupProfile);
}

function handleFormSubmitProfile(event) {
  event.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileJob.textContent = jobProfileInput.value;
  closePopup(popupProfile);
}

// function handlePopupImageUnvisibility() {
//   closePopup(popupImage);
// }

// function handlePopupCardVisibility() {
//   openPopup(popupCard);
// }

// function handlePopupCardUnvisibility() {
//   closePopup(popupCard);
// }

// добавление карточки через класс
// function createCard(item) {
//   const card = new Card(item, "#element-template");
//   return card.renderCard();
// }

// валидация форм профиля и карточки
const validatorProfile = new FormValidator(listValidation, formProfile);
const validatorCard = new FormValidator(listValidation, formCard);

validatorProfile.enableValidation();
validatorCard.enableValidation();

// function handleFormSubmitCard(event) {
//   event.preventDefault();

//   const cardData = { name: nameCardInput.value, link: linkCardInput.value };
//   const newCard = createCard(cardData);

//   cardsContainer.prepend(newCard);

//   handlePopupCardUnvisibility();

//   event.target.reset();

//   // деактивация кнопки сабмит после сохранения
//   validatorCard.toggleButtonSubmit();
// }

popupProfileOpenButton.addEventListener("click", handlePopupProfileVisibility);
popupProfileCloseButton.addEventListener(
  "click",
  handlePopupProfileUnvisibility
);

formProfile.addEventListener("submit", handleFormSubmitProfile);

// popupImageCloseButton.addEventListener("click", handlePopupImageUnvisibility);

// popupCardOpenButton.addEventListener("click", handlePopupCardVisibility);
// popupCardCloseButton.addEventListener("click", handlePopupCardUnvisibility);
// formCard.addEventListener("submit", handleFormSubmitCard);
