const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__content'); 
let nameInput = formElement.querySelector('.popup__input_type_name'); 
let jobInput = formElement.querySelector('.popup__input_type_job'); 
let profileName = document.querySelector('.profile__edit-title'); 
let profileJob = document.querySelector('.profile__info-subtitle'); 

function doPopupVisibility () {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function doPopupUnvisibility () {
    popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) { 
    evt.preventDefault(); 
    profileName.textContent = nameInput.value; 
    profileJob.textContent = jobInput.value; 
    doPopupUnvisibility ();
} 

popupOpenButtonElement.addEventListener('click', doPopupVisibility);
popupCloseButtonElement.addEventListener('click', doPopupUnvisibility);
formElement.addEventListener('submit', formSubmitHandler);