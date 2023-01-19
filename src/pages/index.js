import {
  popupImage,
  popupProfile,
  popupProfileOpenButton,
  formProfile,
  nameProfileInput,
  aboutProfileInput,
  profileName,
  profileAbout,
  profileAvatar,
  popupAvatar,
  popupCard,
  popupCardOpenButton,
  popupAvatarButton,
  formCard,
  popupDelete,
  userId,
  formAvatar,
} from "../utils/constants.js";
import { listValidation } from "../utils/data.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import "./index.css";
import { data } from "autoprefixer";

const userInfo = new UserInfo({
  nameSelector: ".profile__edit-name",
  aboutSelector: ".profile__info-about",
  avatarSelector: ".profile__avatar",
});

function setUserFromPopup() {
  const dataUserInput = userInfo.getUserInfo();
  nameProfileInput.value = dataUserInput.name;
  aboutProfileInput.value = dataUserInput.about;
  validatorProfile.toggleButtonSubmit();
  validatorProfile.hideErrors();
  popupWithFormUser.open();
}

const popupWithFormUser = new PopupWithForm(
  ".popup_type_profile",
  (dataUser) => {
    popupWithFormUser.renderLoading(false, "Сохранить", "Сохранение...");
    api
      .editProfile(dataUser)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithFormUser.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormUser.renderLoading(true, "Сохранить", "Сохранение...");
      });
  }
);

popupWithFormUser.setEventListeners();
popupProfileOpenButton.addEventListener("click", setUserFromPopup);

const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  ".elements"
);

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#element-template",
    handleCardClick,
    (id) => {
      popupWithFormDelete.open();
      popupWithFormDelete.setFormDelete(() => {
        api
          .deleteCard(id)
          .then(() => {
            card.handleCardDelete();
            popupWithFormDelete.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    (id) => {
      if (card.isLike()) {
        api
          .deleteLike(id)
          .then((dataLikes) => {
            card.setLikes(dataLikes.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(id)
          .then((dataLikes) => {
            card.setLikes(dataLikes.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    userId
  );
  return card.renderCard();
}

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then((data) => {
    userId.id = data[0]._id;
    userInfo.setUserInfo(data[0]);
    cardsSection.renderItems(data[1]);
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithFormCard = new PopupWithForm(".popup_type_card", (dataCard) => {
  popupWithFormCard.renderLoading(false, "Создать", "Сохранение...");
  api
    .addCard(dataCard)
    .then((res) => {
      cardsSection.addItem(createCard(res));
      popupWithFormCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormCard.renderLoading(true, "Создать", "Сохранение...");
    });
});

popupWithFormCard.setEventListeners();
popupCardOpenButton.addEventListener("click", () => {
  validatorCard.toggleButtonSubmit();
  validatorCard.hideErrors();
  popupWithFormCard.open();
});

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const popupWithFormDelete = new PopupWithConfirmation(".popup_type_delete");
popupWithFormDelete.setEventListeners();

const popupWithFormAvatar = new PopupWithForm(".popup_type_avatar", (data) => {
  popupWithFormAvatar.renderLoading(false, "Сохранить", "Сохранение...");
  api
    .changeAvatar(data)
    .then((link) => {
      userInfo.setUserInfo(link);
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAvatar.renderLoading(true, "Сохранить", "Сохранение...");
    });
});

popupWithFormAvatar.setEventListeners();
popupAvatarButton.addEventListener("click", () => {
  validatorAvatar.toggleButtonSubmit();
  validatorAvatar.hideErrors();
  popupWithFormAvatar.open();
});

const validatorProfile = new FormValidator(listValidation, formProfile);
const validatorCard = new FormValidator(listValidation, formCard);
const validatorAvatar = new FormValidator(listValidation, formAvatar);

validatorProfile.enableValidation();
validatorCard.enableValidation();
validatorAvatar.enableValidation();
