import {
  popupImage,
  popupProfile,
  popupProfileOpenButton,
  formProfile,
  nameProfileInput,
  jobProfileInput,
  profileName,
  profileJob,
  popupCard,
  popupCardOpenButton,
  formCard,
} from "../utils/constants.js";
import { initialCards, listValidation } from "../utils/data.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// добавление исходных данных пользователя
const userInfo = new UserInfo({
  profileName: profileName,
  profileJob: profileJob,
});

// попап для открытия формы редактирования профиля
const popupWithFormUser = new PopupWithForm(popupProfile, () => {
  const dataUser = popupWithFormUser.getValues();
  userInfo.setUserInfo(dataUser);
  popupWithFormUser.close();
});

popupWithFormUser.setEventListeners();

// добавление новых данных пользователя
popupProfileOpenButton.addEventListener("click", () => {
  const dataUserInput = userInfo.getUserInfo();
  nameProfileInput.value = dataUserInput.name;
  jobProfileInput.value = dataUserInput.job;
  validatorProfile.hideError();
  popupWithFormUser.open();
});

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

// добавление новых карточек
const popupWithFormCard = new PopupWithForm(popupCard, () => {
  const dataCard = popupWithFormCard.getValues();
  const card = new Card(dataCard, "#element-template", handleCardClick);
  const newCard = card.renderCard();
  cardsList.addItem(newCard);
  popupWithFormCard.close();
});

popupWithFormCard.setEventListeners();

popupCardOpenButton.addEventListener("click", () => {
  validatorCard.enableValidation();
  validatorCard.hideError();
  popupWithFormCard.open();
});

// попап для открытия изображения карточки
const popupWithImage = new PopupWithImage(popupImage);

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// валидация форм профиля и карточки
const validatorProfile = new FormValidator(listValidation, formProfile);
const validatorCard = new FormValidator(listValidation, formCard);
