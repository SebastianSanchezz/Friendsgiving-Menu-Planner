const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: ".modal__error-text-visible",
  errorClass: ".modal__error",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
};
enableValidation(options);

function enableValidation(options) {
  const forms = [...document.querySelectorAll(options.formSelector)];
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(form, options);
  });
}

function toggleButtonState(inputEls, submitButton, options) {
  let foundInValid = false;
  inputEls.forEach((input) => {
    if (!input.validity.valid) {
      foundInValid = true;
    }
  });
  if (foundInValid) {
    submitButton.classList.add(options.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(form, options) {
  const inputs = [...form.querySelectorAll(options.inputSelector)];
  const submitButton = form.querySelector(options.submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      checkInputValidity(form, input, options);
      toggleButtonState(inputs, submitButton, options);
      event.preventDefault();
    });
  });
}
function checkInputValidity(form, input, options) {
  if (!input.validity.valid) {
    return showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}
function showInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(options.inputErrorClass);
  errorElement.classList.add(options.errorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.urlContent = input.validationMessage;
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(options.inputErrorClass);
  errorElement.urlContent = "";
  errorElement.textContent = "";

  errorElement.classList.remove(options.errorClass);
}
