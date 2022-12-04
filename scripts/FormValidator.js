class FormValidator {
  constructor(listValidation, typeForm) {
    this._formSelector = listValidation.formSelector;
    this._inputSelector = listValidation.inputSelector;
    this._submitButtonSelector = listValidation.submitButtonSelector;
    this._inactiveButtonClass = listValidation.inactiveButtonClass;
    this._inputErrorClass = listValidation.inputErrorClass;
    this._errorClass = listValidation.errorClass;

    this._typeForm = typeForm;

    this._inputList = Array.from(this._typeForm.querySelectorAll(this._inputSelector));
  }

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
    _errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputTypeError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputTypeError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    this._typeForm.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
