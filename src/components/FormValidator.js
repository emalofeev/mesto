export default class FormValidator {
  // объект настроек с селекторами и классами, второй параметр - элемент формы
  constructor(listValidation, typeForm) {
    this._formSelector = listValidation.formSelector;
    this._inputSelector = listValidation.inputSelector;
    this._submitButtonSelector = listValidation.submitButtonSelector;
    this._inactiveButtonClass = listValidation.inactiveButtonClass;
    this._inputErrorClass = listValidation.inputErrorClass;
    this._errorClass = listValidation.errorClass;

    this._typeForm = typeForm;

    this._inputList = Array.from(
      this._typeForm.querySelectorAll(this._inputSelector)
    );
    this._buttonForm = this._typeForm.querySelector(this._submitButtonSelector);
  }

  // методы валидации
  _showInputTypeError = (inputElement, errorMessage) => {
    const _errorElement = this._typeForm.querySelector(`.${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    _errorElement.classList.add(this._errorClass);
    _errorElement.textContent = errorMessage;
  };

  _hideInputTypeError = (inputElement) => {
    const _errorElement = this._typeForm.querySelector(`.${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    _errorElement.classList.remove(this._errorClass);
    _errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputTypeError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputTypeError(inputElement);
    }
  };

  // метод валидации сабмита
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  toggleButtonSubmit() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonForm.setAttribute("disabled", true);
      this._buttonForm.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonForm.removeAttribute("disabled");
      this._buttonForm.classList.remove(this._inactiveButtonClass);
    }
  }

  // метод скрытия ошибок полей формы
  hideError() {
    this._inputList.forEach((input) => this._hideInputTypeError(input));
  }

  // метод установки слушателей событий
  _setEventListeners() {
    this.toggleButtonSubmit();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonSubmit();
      });
    });
  }

  // публичный метод валидации
  enableValidation() {
    this._typeForm.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
