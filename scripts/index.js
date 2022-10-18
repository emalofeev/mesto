const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const togglePopupVisibility = function () {
    popupElement.classList.toggle('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', togglePopupVisibility);


// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__content-name');
// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__content-job');
 // Воспользуйтесь инструментом .querySelector()

let profileName = document.querySelector('.profile__edit-title');
let profileJob = document.querySelector('.profile__info-subtitle');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', togglePopupVisibility);