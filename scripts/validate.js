const inputEl = document.querySelector('.popup__input_type_name');
const inputEl2 = document.querySelector('.popup__input_type_job');


inputEl.addEventListener('input', () => {
    checkInputValidity(inputEl);
});

inputEl2.addEventListener('input', () => {
    checkInputValidity(inputEl2);
});




const checkInputValidity = (inputElement) => {
    const isValid = inputElement.validity.valid;
    const popupItem = inputElement.closest('.popup__item');
    const errorEl = popupItem.querySelector('.popup__input-error');

    if (isValid) {
        hideInputTypeError(errorEl);
    } else {
        showInputTypeError(errorEl, inputElement.validationMessage);
    }
}

const showInputTypeError = (errorEl, errorMessage) => {
    errorEl.textContent = errorMessage;
    errorEl.classList.add('popup__input-error_active')
}

const hideInputTypeError = (errorEl) => {
    errorEl.textCntent = '';
    errorEl.classList.remove('popup__input-error_active')
}