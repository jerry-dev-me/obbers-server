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
  UserDoesNotExist: `User doc is null or undefined.`,
  UserCannotRead: `User does not have read permissions.`,
  UserMustBeActiveOrSuspended: `User account is not active nor suspended.`,
  UserHasBlockedUser: `User reader has been blocked by user id to read.`
};

function UserDoesNotExist(at, userId) {
  this.customErr = "VerifyDocError";
  this.name = "UserDoesNotExist";
  this.message = `${messages.UserDoesNotExist} UserId: ${userId}`;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserCannotRead(at, userId) {
  this.customErr = "VerifyDocError";
  this.name = "UserCannotRead";
  this.message = `${messages.UserCannotRead} UserId: ${userId}`;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserMustBeActiveOrSuspended(at, userId) {
  this.customErr = "VerifyDocError";
  this.name = "UserMustBeActiveOrSuspended";
  this.message = `${messages.UserMustBeActiveOrSuspended} UserId: ${userId}`;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserHasBlockedUser(at, userId) {
  this.customErr = "VerifyDocError";
  this.name = "UserHasBlockedUser";
  this.message = `${messages.UserHasBlockedUser} Blocked by userId: ${userId}`;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

UserDoesNotExist.prototype = new Error();
UserCannotRead.prototype = new Error();
UserMustBeActiveOrSuspended.prototype = new Error();
UserHasBlockedUser.prototype = new Error();

module.exports = {
  UserDoesNotExist,
  UserCannotRead,
  UserMustBeActiveOrSuspended,
  UserHasBlockedUser,
  HandleVerifyUserError: handlers.HandleVerifyUserError
};
