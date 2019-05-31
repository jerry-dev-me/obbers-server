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
  UserDoesNotExist: `Could not verify doc because user doc is null or undefined.`,
  DocDoesNotExist: `Could not verify doc because doc is null or undefined, `
};

function UserDoesNotExist(at, message) {
  this.customErr = "VerifyDocError";
  this.name = "UserDoesNotExist";
  this.message = message || messages.UserDoesNotExist;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function DocDoesNotExist(model, at, message) {
  this.customErr = "VerifyDocError";
  this.name = "DocDoesNotExist";
  this.message = message || `${messages.DocDoesNotExist}${model}.`;
  this.at = at || defaultValues.at;
  this.httpStatusCode = 404;
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

const AccessDenied = {
  MustBeDocCreator: function(at, message) {
    this.customErr = "VerifyDocError";
    this.name = "MustBeDocCreator";
    this.message = message || `Doc Access Denied.`;
    this.at = at || defaultValues.at;
    this.httpStatusCode = "";
    this.internalErrorCode = "";
    this.developerMessage = "";
    this.moreInfo = "";
  },
  MustBeFollowingUser: function(at, message) {
    this.customErr = "VerifyDocError";
    this.name = "MustBeFollowingUser";
    this.message = message || `Doc Access Denied.`;
    this.at = at || defaultValues.at;
    this.httpStatusCode = "";
    this.internalErrorCode = "";
    this.developerMessage = "";
    this.moreInfo = "";
  },
  MustBeAbleToReadUser: function(at, message) {
    this.customErr = "VerifyDocError";
    this.name = "MustBeAbleToReadUser";
    this.message = message || `Doc Access Denied.`;
    this.at = at || defaultValues.at;
    this.httpStatusCode = "";
    this.internalErrorCode = "";
    this.developerMessage = "";
    this.moreInfo = "";
  },
  MustBeFollowingPrivateUser: function(at, message) {
    this.customErr = "VerifyDocError";
    this.name = "MustBeFollowingPrivateUser";
    this.message = message || `Doc Access Denied.`;
    this.at = at || defaultValues.at;
    this.httpStatusCode = "";
    this.internalErrorCode = "";
    this.developerMessage = "";
    this.moreInfo = "";
  },
  MustBeAdmin: function(at, message) {
    this.customErr = "VerifyDocError";
    this.name = "MustBeAdmin";
    this.message = message || `Doc Access Denied.`;
    this.at = at || defaultValues.at;
    this.httpStatusCode = "";
    this.internalErrorCode = "";
    this.developerMessage = "";
    this.moreInfo = "";
  },
  MustBeDocSenderOrRecipient: function(at, message) {
    this.customErr = "VerifyDocError";
    this.name = "MustBeDocSenderOrRecipient";
    this.message = message || `Doc Access Denied.`;
    this.at = at || defaultValues.at;
    this.httpStatusCode = "";
    this.internalErrorCode = "";
    this.developerMessage = "";
    this.moreInfo = "";
  }
};

UserDoesNotExist.prototype = new Error();
DocDoesNotExist.prototype = new Error();
AccessDenied.MustBeDocCreator.prototype = new Error();
AccessDenied.MustBeFollowingUser.prototype = new Error();
AccessDenied.MustBeAbleToReadUser.prototype = new Error();
AccessDenied.MustBeFollowingPrivateUser.prototype = new Error();
AccessDenied.MustBeAdmin.prototype = new Error();
AccessDenied.MustBeDocSenderOrRecipient.prototype = new Error();

module.exports = {
  UserDoesNotExist,
  DocDoesNotExist,
  AccessDenied,
  HandleVerifyDocError: handlers.HandleVerifyDocError
};
