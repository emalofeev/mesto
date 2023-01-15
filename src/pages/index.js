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
import { api } from "../components/Api.js";
import "./index.css";
import { data } from "autoprefixer";

/** получение данных профиля с сервера*/

api.getProfileInfo().then((data) => {
  userInfo.setUserInfo(data);
});

/** получение карточек с сервера*/

api.getInitialCards().then((cardList) => {
  cardList.forEach((data) => {
    const card = createCard(data);
    cardsSection.addItem(card);
  });
});

/** добавление исходных данных пользователя */
const userInfo = new UserInfo({
  profileName: profileName,
  profileJob: profileJob,
});

/** попап для открытия формы редактирования профиля и обновления данных пользователя на сервере */
const popupWithFormUser = new PopupWithForm(popupProfile, (values) => {
  api.editProfile(values)
  .then((dataUser) => {
    userInfo.setUserInfo(dataUser);
    popupWithFormUser.close();
  });
});

popupWithFormUser.setEventListeners();

/** добавление новых данных пользователя */
popupProfileOpenButton.addEventListener("click", setUserInfo);

function setUserInfo() {
  const dataUserInput = userInfo.getUserInfo();
  nameProfileInput.value = dataUserInput.name;
  jobProfileInput.value = dataUserInput.about;
  validatorProfile.hideErrors();
  popupWithFormUser.open();
}

/** добавление исходных карточек */
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(cardData) {
  const card = new Card(cardData, "#element-template", handleCardClick);
  return card.renderCard();
}

const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  ".elements"
);

cardsSection.renderItems();

/** добавление новых карточек */
const popupWithFormCard = new PopupWithForm(popupCard, (values) => {
  const dataCard = values;
  cardsSection.addItem(createCard(dataCard));
  popupWithFormCard.close();
});

popupWithFormCard.setEventListeners();

popupCardOpenButton.addEventListener("click", () => {
  validatorCard.toggleButtonSubmit();
  validatorCard.hideErrors();
  popupWithFormCard.open();
});

/** попап для открытия изображения карточки */
const popupWithImage = new PopupWithImage(popupImage);

popupWithImage.setEventListeners();

/** валидация форм профиля и карточки */
const validatorProfile = new FormValidator(listValidation, formProfile);
const validatorCard = new FormValidator(listValidation, formCard);

validatorProfile.enableValidation();
validatorCard.enableValidation();
