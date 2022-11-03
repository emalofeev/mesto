const popupProfileElement = document.querySelector(".popup_type_profile");
const popupProfileCloseButtonElement = document.querySelector(".popup__close");
const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
let formElement = document.querySelector(".popup__content_type_profile");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_job");
let profileName = document.querySelector(".profile__edit-title");
let profileJob = document.querySelector(".profile__info-subtitle");

function doPopupVisibility() {
  popupProfileElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function doPopupUnvisibility() {
  popupProfileElement.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  doPopupUnvisibility();
}

popupProfileOpenButtonElement.addEventListener("click", doPopupVisibility);
popupProfileCloseButtonElement.addEventListener("click", doPopupUnvisibility);
formElement.addEventListener("submit", formSubmitHandler);

// добавление исходных карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsContainer = document.querySelector(".elements");
const createCardHtml = (item) => {
  return `
    <article class="element">
        <button class="element__delete" type="button"></button>
        <img class="element__image" alt="${item.name}" src="${item.link}">
        <div class="element__item">
            <h2 class="element__item-name">${item.name}</h2>
            <button class="element__item-like" type="button"></button>
        </div>
    </article>
  `;
};
initialCards.forEach((item) => {
  const elString = createCardHtml(item);
  cardsContainer.insertAdjacentHTML("afterbegin", elString);
});

// открытие и закрытие попапа карточек
const popupCardElement = document.querySelector(".popup_type_card");
const popupCardOpenButtonElement = document.querySelector(".profile__button");
const popupCardCloseButtonElement =
  popupCardElement.querySelector(".popup__close");

function doPopupCardVisibility() {
  popupCardElement.classList.add("popup_opened");
}

function doPopupCardUnvisibility() {
  popupCardElement.classList.remove("popup_opened");
}

popupCardOpenButtonElement.addEventListener("click", doPopupCardVisibility);
popupCardCloseButtonElement.addEventListener("click", doPopupCardUnvisibility);

// лайки к исходным каторчкам
document.querySelectorAll(".element__item-like").forEach((element) => {
  element.addEventListener("click", function () {
    element.classList.toggle("element__item-like_active");
  });
});

// удаление исходных карточек
document.querySelectorAll(".element__delete").forEach((element) => {
  element.addEventListener("click", function (event) {
    const target = event.target;
    const сurrentElement = target.closest(".element");
    сurrentElement.remove();
  });
});

// открытие исходных карточек в попап-окне
document.querySelectorAll(".element__image").forEach((element) => {
  element.addEventListener("click", function (event) {
    const target = event.target;
    const сurrentImage = target.closest(".element__image");

    const popupWindow = document.querySelector(".popup_type_image");
    popupWindow.classList.add("popup_opened");

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
      popupWindow.classList.remove("popup_opened");
    }
  });
});

// добавление карточек, слушателей и функций к ним
let formCardElement = document.querySelector(".popup__content_type_card");
let nameCardInput = document.querySelector(".popup__input_type_nameCard");
let linkCardInput = document.querySelector(".popup__input_type_linkCard");

function addCard(evt) {
  evt.preventDefault();
  let cardTemplate = document.querySelector("#element-template").content;
  let cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__item-name").textContent =
    nameCardInput.value;
  cardElement.querySelector(".element__image").src = linkCardInput.value;
  cardElement.querySelector(".element__image").alt = nameCardInput.value;

  cardElement
    .querySelector(".element__item-like")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("element__item-like_active");
    });

  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", function (event) {
      const target = event.target;
      const сurrentElement = target.closest(".element");
      сurrentElement.remove();
    });

  cardElement
    .querySelector(".element__image")
    .addEventListener("click", function (event) {
      const target = event.target;
      const сurrentImage = target.closest(".element__image");

      const popupWindow = document.querySelector(".popup_type_image");
      popupWindow.classList.add("popup_opened");

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
        popupWindow.classList.remove("popup_opened");
      }
    });

  initialCards.unshift({
    name: nameCardInput.value,
    link: linkCardInput.value,
  });
  cardsContainer.prepend(cardElement);
  doPopupCardUnvisibility();
  evt.target.reset();
}

formCardElement.addEventListener("submit", addCard);
