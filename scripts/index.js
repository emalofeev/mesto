import Card from "./Card.js";
import { initialCards } from "./data.js";
import { disableButtonSubmit } from "./validate.js";

const cardsContainer = document.querySelector(".elements");

const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");
const formProfile = document.querySelector(".popup__content_type_profile");
const nameProfileInput = formProfile.querySelector(".popup__input_type_name");
const jobProfileInput = formProfile.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__edit-title");
const profileJob = document.querySelector(".profile__info-subtitle");

export const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupImage.querySelector(".popup__close");
export const imageSrc = popupImage.querySelector(".popup__image");
export const imageTitle = popupImage.querySelector(".popup__image-title");

const popupCard = document.querySelector(".popup_type_card");
const popupCardOpenButton = document.querySelector(".profile__button");
const popupCardCloseButton = popupCard.querySelector(".popup__close");

const formCard = document.querySelector(".popup__content_type_card");
const nameCardInput = formCard.querySelector(".popup__input_type_nameCard");
const linkCardInput = formCard.querySelector(".popup__input_type_linkCard");
export const buttonSubmitCard = formCard.querySelector(
  ".popup__content-submit"
);

initialCards.forEach((item) => {
  const newCard = createCard(item);
  cardsContainer.prepend(newCard);
});

function openPopup(popupType) {
  popupType.classList.add("popup_opened");
  document.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popupType) {
  popupType.classList.remove("popup_opened");
  document.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupOverlay(event) {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && event.target === openedPopup) {
    closePopup(openedPopup);
  }
}

function closePopupEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function handlePopupProfileVisibility() {
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileJob.textContent;
  openPopup(popupProfile);
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

function handlePopupImageUnvisibility() {
  closePopup(popupImage);
}

function handlePopupCardVisibility() {
  openPopup(popupCard);
}

function handlePopupCardUnvisibility() {
  closePopup(popupCard);
}

// добавление карточки через класс

function createCard(item) {
  const card = new Card(item, "#element-template");
  return card.renderCard();
}

// function createCard(item) {
//   const cardTemplate = document.querySelector("#element-template").content;
//   const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
//   const cardElementLike = cardElement.querySelector(".element__item-like");
//   const cardElementDelete = cardElement.querySelector(".element__delete");
//   const cardElementImage = cardElement.querySelector(".element__image");
//   const cardElementName = cardElement.querySelector(".element__item-name");

//   cardElementName.textContent = item.name;
//   cardElementImage.src = item.link;
//   cardElementImage.alt = item.name;

//   cardElementLike.addEventListener("click", function () {
//     cardElementLike.classList.toggle("element__item-like_active");
//   });

//   cardElementDelete.addEventListener("click", function () {
//     cardElement.remove();
//   });

//   cardElementImage.addEventListener("click", function () {
//     imageSrc.src = cardElementImage.src;
//     imageSrc.alt = cardElementImage.alt;
//     imageTitle.textContent = cardElementImage.alt;

//     openPopup(popupImage);
//   });

//   return cardElement;
// }

function handleFormSubmitCard(event) {
  event.preventDefault();

  const cardData = { name: nameCardInput.value, link: linkCardInput.value };
  const newCard = createCard(cardData);

  cardsContainer.prepend(newCard);

  handlePopupCardUnvisibility();

  event.target.reset();

  disableButtonSubmit();
}

popupProfileOpenButton.addEventListener("click", handlePopupProfileVisibility);
popupProfileCloseButton.addEventListener(
  "click",
  handlePopupProfileUnvisibility
);

formProfile.addEventListener("submit", handleFormSubmitProfile);

popupImageCloseButton.addEventListener("click", handlePopupImageUnvisibility);

popupCardOpenButton.addEventListener("click", handlePopupCardVisibility);
popupCardCloseButton.addEventListener("click", handlePopupCardUnvisibility);
formCard.addEventListener("submit", handleFormSubmitCard);

export { openPopup };
