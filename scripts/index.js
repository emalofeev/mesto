const cardsContainer = document.querySelector(".elements");

const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");
const formProfile = document.querySelector(".popup__content_type_profile");
const nameProfileInput = formProfile.querySelector(".popup__input_type_name");
const jobProfileInput = formProfile.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__edit-title");
const profileJob = document.querySelector(".profile__info-subtitle");

const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupImage.querySelector(".popup__close");

const popupCard = document.querySelector(".popup_type_card");
const popupCardOpenButton = document.querySelector(".profile__button");
const popupCardCloseButton = popupCard.querySelector(".popup__close");

const formCard = document.querySelector(".popup__content_type_card");
const nameCardInput = formCard.querySelector(".popup__input_type_nameCard");
const linkCardInput = formCard.querySelector(".popup__input_type_linkCard");

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

function closePopupOverlay(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

function closePopupEsc(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function doPopupProfileVisibility() {
  openPopup(popupProfile);
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileJob.textContent;
}

function doPopupProfileUnvisibility() {
  closePopup(popupProfile);
}

function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileJob.textContent = jobProfileInput.value;
  closePopup(popupProfile);
}

function doPopupImageUnvisibility() {
  closePopup(popupImage);
}

function doPopupCardVisibility() {
  openPopup(popupCard);
}

function doPopupCardUnvisibility() {
  closePopup(popupCard);
}

function createCard(item) {
  const cardTemplate = document.querySelector("#element-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardElementLike = cardElement.querySelector(".element__item-like");
  const cardElementDelete = cardElement.querySelector(".element__delete");
  const cardElementImage = cardElement.querySelector(".element__image");

  cardElement.querySelector(".element__item-name").textContent = item.name;
  cardElement.querySelector(".element__image").src = item.link;
  cardElement.querySelector(".element__image").alt = item.name;

  cardElementLike.addEventListener("click", function () {
    cardElementLike.classList.toggle("element__item-like_active");
  });

  cardElementDelete.addEventListener("click", function (event) {
    const target = event.target;
    const сurrentElement = target.closest(".element");
    сurrentElement.remove();
  });

  cardElementImage.addEventListener("click", function (event) {
    const target = event.target;
    const сurrentImage = target.closest(".element__image");
    const imageSrc = popupImage.querySelector(".popup__image");
    const imageTitle = popupImage.querySelector(".popup__image-title");

    openPopup(popupImage);

    imageSrc.src = сurrentImage.src;
    imageSrc.alt = сurrentImage.alt;
    imageTitle.textContent = сurrentImage.alt;
  });

  return cardElement;
}

function formSubmitCard(evt) {
  evt.preventDefault();

  const cardData = { name: nameCardInput.value, link: linkCardInput.value };
  const newCard = createCard(cardData);

  cardsContainer.prepend(newCard);

  doPopupCardUnvisibility();
  evt.target.reset();
}

popupProfileOpenButton.addEventListener("click", doPopupProfileVisibility);
popupProfileCloseButton.addEventListener("click", doPopupProfileUnvisibility);
formProfile.addEventListener("submit", formSubmitProfile);

popupImageCloseButton.addEventListener("click", doPopupImageUnvisibility);

popupCardOpenButton.addEventListener("click", doPopupCardVisibility);
popupCardCloseButton.addEventListener("click", doPopupCardUnvisibility);
formCard.addEventListener("submit", formSubmitCard);



