const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const togglePopupVisibility = function () {
    popupElement.classList.toggle('popup_opened');
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
let submitButton = document.querySelector('.popup__content-submit');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupElement.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
submitButton.addEventListener('click', formSubmitHandler);