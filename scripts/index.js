const popupProfileElement = document.querySelector(".popup_type_profile");
const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupProfileCloseButtonElement = document.querySelector(".popup__close");
const formProfile = document.querySelector(".popup__content_type_profile");
const nameInput = formProfile.querySelector(".popup__input_type_name");
const jobInput = formProfile.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__edit-title");
const profileJob = document.querySelector(".profile__info-subtitle");

function openPopup(popupType) {
  popupType.classList.add("popup_opened");
}

function closePopup(popupType) {
  popupType.classList.remove("popup_opened");
}

function doPopupProfileVisibility() {
  openPopup(popupProfileElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function doPopupProfileUnvisibility() {
  closePopup(popupProfileElement);
}

function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileElement);
}

popupProfileOpenButtonElement.addEventListener(
  "click",
  doPopupProfileVisibility
);
popupProfileCloseButtonElement.addEventListener(
  "click",
  doPopupProfileUnvisibility
);
formProfile.addEventListener("submit", formSubmitProfile);

// открытие и закрытие попапа карточек
const popupCardElement = document.querySelector(".popup_type_card");
const popupCardOpenButtonElement = document.querySelector(".profile__button");
const popupCardCloseButtonElement =
  popupCardElement.querySelector(".popup__close");

function doPopupCardVisibility() {
  openPopup(popupCardElement);
}

function doPopupCardUnvisibility() {
  closePopup(popupCardElement);
}

popupCardOpenButtonElement.addEventListener("click", doPopupCardVisibility);
popupCardCloseButtonElement.addEventListener("click", doPopupCardUnvisibility);

// создание карточек
const cardsContainer = document.querySelector(".elements");

function createCard(item) {
  const cardTemplate = document.querySelector("#element-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__item-name").textContent = item.name;
  cardElement.querySelector(".element__image").src = item.link;
  cardElement.querySelector(".element__image").alt = item.name;

  cardElement.querySelectorAll(".element__item-like").forEach((element) => {
    element.addEventListener("click", function () {
      element.classList.toggle("element__item-like_active");
    });
  });

  cardElement.querySelectorAll(".element__delete").forEach((element) => {
    element.addEventListener("click", function (event) {
      const target = event.target;
      const сurrentElement = target.closest(".element");
      сurrentElement.remove();
    });
  });

  cardElement.querySelectorAll(".element__image").forEach((element) => {
    element.addEventListener("click", function (event) {
      const target = event.target;
      const сurrentImage = target.closest(".element__image");

      const popupWindow = document.querySelector(".popup_type_image");
      openPopup(popupWindow);

      const windowSrc = popupWindow.querySelector(".popup__image");
      const windowTitle = popupWindow.querySelector(".popup__image-title");

      windowSrc.src = сurrentImage.src;
      windowSrc.alt = сurrentImage.alt;
      windowTitle.textContent = сurrentImage.alt;

      const popupImageCloseButtonElement =
        popupWindow.querySelector(".popup__close");
      popupImageCloseButtonElement.addEventListener(
        "click",
        doPopupImageUnvisibility
      );

      function doPopupImageUnvisibility() {
        closePopup(popupWindow);
      }
    });
  });

  return cardElement;
}

initialCards.forEach((item) => {
  const newCard = createCard(item);
  cardsContainer.prepend(newCard);
});

// добавление карточек пользователя
const formCard = document.querySelector(".popup__content_type_card");
const nameCardInput = document.querySelector(".popup__input_type_nameCard");
const linkCardInput = document.querySelector(".popup__input_type_linkCard");

function formSubmitCard(evt) {
  evt.preventDefault();

  const card = {};
  card.name = nameCardInput.value;
  card.link = linkCardInput.value;

  const newCard = createCard(card);
  cardsContainer.prepend(newCard);

  doPopupCardUnvisibility();
  evt.target.reset();
}

formCard.addEventListener("submit", formSubmitCard);
