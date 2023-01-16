import {
  popupImage,
  popupProfile,
  popupProfileOpenButton,
  formProfile,
  nameProfileInput,
  jobProfileInput,
  profileName,
  profileJob,
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
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import "./index.css";
import { data } from "autoprefixer";

const userInfo = new UserInfo({
  profileName: profileName,
  profileJob: profileJob,
  profileAvatar: profileAvatar,
});

api
  .getProfileInfo()
  .then((dataUser) => {
    userInfo.setUserInfo(dataUser);
    userId.id = dataUser._id;
  })
  .catch((err) => {
    console.log(err);
  });

function setUserFromPopup() {
  const dataUserInput = userInfo.getUserInfo();
  nameProfileInput.value = dataUserInput.name;
  jobProfileInput.value = dataUserInput.about;
  validatorProfile.hideErrors();
  popupWithFormUser.renderLoading(true, "Сохранить", "Сохранение...");
  popupWithFormUser.open();
}

const popupWithFormUser = new PopupWithForm(popupProfile, (values) => {
  api
    .editProfile(values)
    .then((dataUser) => {
      userInfo.setUserInfo(dataUser);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormUser.renderLoading(false, "Сохранить", "Сохранение...");
      popupWithFormUser.close();
    });
});

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
      popupWithFormDelete.open(),
        popupWithFormDelete.doSubmitHandler(() => {
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

cardsSection.renderItems();

api
  .getInitialCards()
  .then((cardList) => {
    cardList.forEach((dataCard) => {
      const card = createCard(dataCard);
      cardsSection.addItem(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithFormCard = new PopupWithForm(popupCard, (values) => {
  api
    .addCard(values)
    .then((dataCard) => {
      cardsSection.addItem(createCard(dataCard));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormCard.renderLoading(false, "Создать", "Сохранение...");
      popupWithFormCard.close();
    });
});

popupWithFormCard.setEventListeners();
popupCardOpenButton.addEventListener("click", () => {
  validatorCard.toggleButtonSubmit();
  validatorCard.hideErrors();
  popupWithFormCard.renderLoading(true, "Создать", "Сохранение...");
  popupWithFormCard.open();
});

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const popupWithFormDelete = new PopupWithForm(popupDelete, () => {
  api.deleteCard();
});
popupWithFormDelete.setEventListeners();

const popupWithFormAvatar = new PopupWithForm(popupAvatar, (data) => {
  api
    .changeAvatar(data)
    .then((link) => {
      userInfo.setUserInfo(link);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAvatar.renderLoading(false, "Сохранить", "Сохранение...");
      popupWithFormAvatar.close();
    });
});

popupWithFormAvatar.setEventListeners();
popupAvatarButton.addEventListener("click", () => {
  validatorAvatar.toggleButtonSubmit();
  validatorAvatar.hideErrors();
  popupWithFormAvatar.renderLoading(true, "Сохранить", "Сохранение...");
  popupWithFormAvatar.open();
});

const validatorProfile = new FormValidator(listValidation, formProfile);
const validatorCard = new FormValidator(listValidation, formCard);
const validatorAvatar = new FormValidator(listValidation, formAvatar);

validatorProfile.enableValidation();
validatorCard.enableValidation();
validatorAvatar.enableValidation();
