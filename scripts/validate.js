// валидация при каждом вводе/удалении символа в форме

const checkInputValidity = (inputElement) => {
  const isValid = inputElement.validity.valid;
  const popupItem = inputElement.closest(".popup__item");
  const errorElement = popupItem.querySelector(listValidation.inputErrorClass);

  if (isValid) {
    hideInputTypeError(errorElement);
  } else {
    showInputTypeError(errorElement, inputElement.validationMessage);
  }
};

const showInputTypeError = (errorElement, errorMessage) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(listValidation.errorClass);
};

const hideInputTypeError = (errorElement) => {
  errorElement.textContent = "";
  errorElement.classList.remove(listValidation.errorClass);
};

// функция изменения внешнего вида кнопки сабмит

const toggleButtonSubmit = (inputList, submitButtonSubmit) => {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInput) {
    submitButtonSubmit.setAttribute("disable", true);
    submitButtonSubmit.classList.add(listValidation.inactiveButtonClass);
  } else {
    submitButtonSubmit.removeAttribute("disable");
    submitButtonSubmit.classList.remove(listValidation.inactiveButtonClass);
  }
};

// навешивание слушателей

const setEventListeners = (formElement, listValidation) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(
    formElement.querySelectorAll(listValidation.inputSelector)
  );
  const submitButtonSubmit = formElement.querySelector(
    listValidation.submitButtonSelector
  );

  toggleButtonSubmit(inputList, submitButtonSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleButtonSubmit(inputList, submitButtonSubmit);
    });
  });
};

// включение валидации вызовом enableValidation

const listValidation = {
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__content-submit",
  inactiveButtonClass: "popup__content-submit_inative",
  inputErrorClass: ".popup__input-error",
  errorClass: "popup__input-error_active",
};

const enableValidation = (listValidation) => {
  const formList = document.querySelectorAll(listValidation.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement, listValidation);
  });
};

enableValidation(listValidation);