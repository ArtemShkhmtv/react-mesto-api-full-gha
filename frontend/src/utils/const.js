const enableValidationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save-botton",
  inactiveButtonClass: "popup__save-botton_disabled",
  inputErrorClass: "popup__text_error",
  errorClass: "popup__error-message_type_active",
};

const dataApi = {
  baseUrl: "http://localhost:3000",
  headers: {
    authorization: "45c93e87-687a-47b8-9789-47f64a5cc7e6",
    "Content-Type": "application/json",
  },
};

const dataAuthApi = {
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
};

export { enableValidationConfig };
export { dataApi };
export { dataAuthApi };
