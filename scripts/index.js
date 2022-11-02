const popupProfileElement = document.querySelector('.popup_type_profile');
const popupProfileCloseButtonElement = document.querySelector('.popup__close');
const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__content_type_profile'); 
let nameInput = formElement.querySelector('.popup__input_type_name'); 
let jobInput = formElement.querySelector('.popup__input_type_job'); 
let profileName = document.querySelector('.profile__edit-title'); 
let profileJob = document.querySelector('.profile__info-subtitle'); 

function doPopupVisibility () {
    popupProfileElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function doPopupUnvisibility () {
    popupProfileElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) { 
    evt.preventDefault(); 
    profileName.textContent = nameInput.value; 
    profileJob.textContent = jobInput.value; 
    doPopupUnvisibility ();
} 

popupProfileOpenButtonElement.addEventListener('click', doPopupVisibility);
popupProfileCloseButtonElement.addEventListener('click', doPopupUnvisibility);
formElement.addEventListener('submit', formSubmitHandler);




const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const cardsContainer = document.querySelector('.elements');
  const createCardHtml = (item) => {
  return `
    <article class="element">
        <img class="element__image" alt="${item.name}" src="${item.link}">
        <div class="element__item">
            <h2 class="element__item-name">${item.name}</h2>
            <button class="element__item-like" type="button"></button>
        </div>
    </article>
  `
}

    initialCards.forEach((item) => {
    const elString = createCardHtml(item);
    cardsContainer.insertAdjacentHTML('afterbegin', elString);
});





const popupCardElement = document.querySelector('.popup_type_card');
const popupCardOpenButtonElement = document.querySelector('.profile__button');
const popupCardCloseButtonElement = document.querySelector('.popup__close_type_card');

function doPopupCardVisibility () {
    popupCardElement.classList.add('popup_opened');
}

function doPopupCardUnvisibility () {
    popupCardElement.classList.remove('popup_opened');
}

popupCardOpenButtonElement.addEventListener('click', doPopupCardVisibility);
popupCardCloseButtonElement.addEventListener('click', doPopupCardUnvisibility);




const popupContentSubmit = document.querySelector('.popup__content-submit_card');
const nameCardInput = document.querySelector('.popup__input_type_nameCard');
const linkCardInput = document.querySelector('.popup__input_type_linkCard');

function addCard() {
    let cardTemplate = document.querySelector('#element-template').content;
    let cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__item-name').textContent = nameCardInput.value;
    cardElement.querySelector('.element__image').src = linkCardInput.value;
    cardElement.querySelector('.element__image').alt = nameCardInput.value;
 
    cardsContainer.prepend(cardElement);
  }

  popupContentSubmit.addEventListener('click', addCard);

  