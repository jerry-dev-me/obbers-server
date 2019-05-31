const handlers = require("./handlers");

const defaultValues = {
  customErr: "",
  name: "",
  message: "",
  at: "Please provide 'new Error().stack' as 'at' arg",
  httpStatusCode: "",
  internalErrorCode: "",
  developerMessage: "",
  moreInfo: ""
};

const messages = {
  SomethingHappened: `Operation could not be completed at this time, please try again later.`,
  DocDoesNotExist: `Operation could not be completed because doc is null or undefined.`,
  UserCannotRead: `Operation could not be completed because user cannot read.`,
  UserCannotWrite: `Operation could not be completed because user cannot write.`,
  UserIsNotAdmin: `Operation could not be completed because user is not admin.`,
  UserCannotAccessDoc:
    `Operation could not be completed because user does not have access to ` +
    `doc or doc was not found.`
};

function SomethingHappened(at, message) {
  this.customErr = "ValidateOperationError";
  this.name = "SomethingHappened";
  this.message = message || messages.SomethingHappened;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function DocDoesNotExist(model, at, message) {
  this.customErr = "ValidateOperationError";
  this.name = "DocDoesNotExist";
  this.message = message || `${messages.DocDoesNotExist} ${model}.`;
  this.at = at || defaultValues.at;
  this.httpStatusCode = 404;
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserCannotRead(at, message) {
  this.customErr = "ValidateOperationError";
  this.name = "UserCannotRead";
  this.message = message || messages.UserCannotRead;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserCannotWrite(at, message) {
  this.customErr = "ValidateOperationError";
  this.name = "UserCannotWrite";
  this.message = message || messages.UserCannotWrite;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserIsNotAdmin(at, message) {
  this.customErr = "ValidateOperationError";
  this.name = "UserIsNotAdmin";
  this.message = message || messages.UserIsNotAdmin;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserCannotAccessDoc(at, message) {
  this.customErr = "ValidateOperationError";
  this.name = "UserCannotAccessDoc";
  // this.message = message || messages.UserCannotAccessDoc;
  this.message = message || messages.UserCannotAccessDoc;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

SomethingHappened.prototype = new Error();
DocDoesNotExist.prototype = new Error();
UserCannotRead.prototype = new Error();
UserCannotWrite.prototype = new Error();
UserIsNotAdmin.prototype = new Error();
UserCannotAccessDoc.prototype = new Error();

module.exports = {
  SomethingHappened,
  DocDoesNotExist,
  UserCannotRead,
  UserCannotWrite,
  UserIsNotAdmin,
  UserCannotAccessDoc,
  HandleValidateOperationError: handlers.HandleValidateOperationError
};
