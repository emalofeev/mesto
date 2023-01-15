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
  popupDelete,
  userId,
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

api.getProfileInfo().then((dataUser) => {
  userInfo.setUserInfo(dataUser);
  userId.id = dataUser._id;
});

/** получение карточек с сервера*/

api.getInitialCards().then((cardList) => {
  cardList.forEach((dataCard) => {
    const card = createCard(dataCard);
    cardsSection.addItem(card);
  });
});

/** добавление исходных данных пользователя */
const userInfo = new UserInfo({
  profileName: profileName,
  profileJob: profileJob,
});

/** попап для редактирования данных пользователя на сервере */
const popupWithFormUser = new PopupWithForm(popupProfile, (values) => {
  api.editProfile(values).then((dataUser) => {
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
  const card = new Card(
    cardData,
    "#element-template",
    handleCardClick,
    (id) => {
      popupWithFormDelete.open(),
        popupWithFormDelete.doSubmitHandler(() => {
          api.deleteCard(id).then(() => {
            card.handleCardDelete();
            popupWithFormDelete.close();
          });
        });
    },
    (id) => {
      if (card.isLike()) {
        api.deleteLike(id).then((dataLikes) => {
          card.setLikes(dataLikes.likes);
        });
      } else {
        api.addLike(id).then((dataLikes) => {
          card.setLikes(dataLikes.likes);
        });
      }
    },
    userId
  );
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

/** добавление новых карточек на сервер*/
const popupWithFormCard = new PopupWithForm(popupCard, (values) => {
  api.addCard(values).then((dataCard) => {
    cardsSection.addItem(createCard(dataCard));
    popupWithFormUser.close();
  });
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

/** попап подтверждения удаления карточки */
const popupWithFormDelete = new PopupWithForm(popupDelete, () => {
  console.log("delete");
  api.deleteCard();
});

popupWithFormDelete.setEventListeners();

/** валидация форм профиля и карточки */
const validatorProfile = new FormValidator(listValidation, formProfile);
const validatorCard = new FormValidator(listValidation, formCard);

validatorProfile.enableValidation();
validatorCard.enableValidation();
