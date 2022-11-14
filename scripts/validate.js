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

const toggleButtonSubmit = (inputList, handleButtonSubmit) => {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInput) {
    handleButtonSubmit.setAttribute("disable", true);
    handleButtonSubmit.classList.add(listValidation.inactiveButtonClass);
  } else {
    handleButtonSubmit.removeAttribute("disable");
    handleButtonSubmit.classList.remove(listValidation.inactiveButtonClass);
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
  const handleButtonSubmit = formElement.querySelector(
    listValidation.submitButtonSelector
  );

  toggleButtonSubmit(inputList, handleButtonSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleButtonSubmit(inputList, handleButtonSubmit);
    });
  });
};

// включение валидации вызовом enableValidation

const enableValidation = (listValidation) => {
  const formList = document.querySelectorAll(listValidation.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement, listValidation);
  });
};

enableValidation(listValidation);

// сделать кнопку создания карточки неактивной после добавления карточки

const disableButtonSubmit = () => {
  buttonSubmitCard.setAttribute("disable", true);
  buttonSubmitCard.classList.add(listValidation.inactiveButtonClass);
};
