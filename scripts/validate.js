// валидация при каждом нажатии клавиши

const checkInputValidity = (inputElement) => {
  const isValid = inputElement.validity.valid;
  const popupItem = inputElement.closest(".popup__item");
  const errorEl = popupItem.querySelector(".popup__input-error");

  if (isValid) {
    hideInputTypeError(errorEl);
  } else {
    showInputTypeError(errorEl, inputElement.validationMessage);
  }
};

const showInputTypeError = (errorEl, errorMessage) => {
  errorEl.textContent = errorMessage;
  errorEl.classList.add("popup__input-error_active");
};

const hideInputTypeError = (errorEl) => {
  errorEl.textContent = "";
  errorEl.classList.remove("popup__input-error_active");
};

// изменение внешнего вида кнопки сабмит

const toggleButtonProfile = (inputList, submitButtonProfile) => {
  const hasInvalidInputProfile = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInputProfile) {
    submitButtonProfile.setAttribute("disable", true);
    submitButtonProfile.classList.add(selectors.inactiveButtonClass);
  } else {
    submitButtonProfile.removeAttribute("disable");
    submitButtonProfile.classList.remove(selectors.inactiveButtonClass);
  }
};



const setEventListeners = (formElement, selectors) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const submitButtonProfile = formElement.querySelector(
    selectors.submitButtonSelector
  );

  toggleButtonProfile(inputList, submitButtonProfile);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleButtonProfile(inputList, submitButtonProfile);
    });
  });
};


// ввод селекторов с валидацией

const enableValidation = (selectors) => {

const formList = document.querySelectorAll(selectors.formSelector);

formList.forEach(formElement => {
    setEventListeners(formElement, selectors);
})
}

const selectors = {
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__content-submit',
    inactiveButtonClass: 'popup__content-submit_inative',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
}

enableValidation(selectors);