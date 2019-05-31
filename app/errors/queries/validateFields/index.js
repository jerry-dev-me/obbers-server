const handlers = require("./handlers");

const defaultValues = {
  customErr: "",
  name: "",
  message: "",
  httpStatusCode: "",
  internalErrorCode: "",
  developerMessage: "",
  moreInfo: {
    error: "",
    errors: [],
    errorNames: [],
    errorMessages: [],
    customErrorMessages: []
  }
};

const messages = {
  NewFieldsValidationErrors: `Validation Errors Were Found When Creating New Doc.`,
  UpdateFieldsValidationError: `Validation Errors Were Found When Updating Existing Doc.`
};

// function ValidationFailed(error, message, customErrorMessages) {
//   const errors = Object.keys(error.errors);
//
//   let errorNames = [];
//   errors.map(e => errorNames.push(error.errors[e].name));
//
//   let errorMessages = [];
//   errors.map(e => errorMessages.push(error.errors[e].message));
//
//   if (customErrorMessages === null || customErrorMessages === undefined)
//     customErrorMessages = [];
//
//   this.customErr = "FieldsValidationError";
//   this.name = "ValidationFailed";
//   this.message = message || messages.ValidationFailed;
//   this.httpStatusCode = "";
//   this.internalErrorCode = "";
//   this.developerMessage = "";
//   this.moreInfo = {
//     error,
//     errors,
//     errorNames,
//     errorMessages,
//     customErrorMessages
//   };
// }

function NewFieldsValidationError(foundErrors) {
  this.customErr = "FieldsValidationError";
  this.name = "NewFieldsValidationError";
  this.message = messages.NewFieldsValidationError;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = {
    errorsArr: foundErrors.errorsArr,
    errorsObj: foundErrors.errorsObj
  };
}

function UpdateFieldsValidationError(foundErrors) {
  this.customErr = "FieldsValidationError";
  this.name = "UpdateFieldsValidationError";
  this.message = messages.UpdateFieldsValidationError;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = {
    errorsArr: foundErrors.errorsArr,
    errorsObj: foundErrors.errorsObj
  };
}

// ValidationFailed.prototype = new Error();
NewFieldsValidationError.prototype = new Error();
UpdateFieldsValidationError.prototype = new Error();

module.exports = {
  // ValidationFailed,
  NewFieldsValidationError,
  UpdateFieldsValidationError
};
