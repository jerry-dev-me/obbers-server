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
  UserIsNotDocCreator: `Operation could not be completed because user is not the doc creator.`,
  FieldsInludeOtherUserId:
    `Operation could not be completed because fields include other user id ` +
    `as creator of the new doc.`,
  ReadPermissionsIsFalse:
    `Operation could not be completed because user does not have read ` +
    `permissions.`,
  UserCannotRead: `Operation could not be completed because user cannot read.`,
  CouldNotReadDoc:
    `Operation could not be completed because user does not have access to ` +
    `doc or doc was not found.`,
  WritePermissionsIsFalse:
    `Operation could not be completed because user does not have write ` +
    `permissions.`,
  UserCannotWrite: `Operation could not be completed because user cannot write.`,
  CouldNotWriteDoc:
    `Operation could not be completed because user does not have access to ` +
    `doc or doc was not found.`,
  CanUserReadUserIsFalse: `Operation could not be completed because user cannot read user.`,
  UserIsNotAdmin: `Operation could not be completed because user is not admin.`,
  SocialConnectionNotFollowing: `Operation could not be completed because user is not following.`
};

function SomethingHappened(at, message) {
  this.customErr = "FeatureError";
  this.name = "SomethingHappened";
  this.message = message || messages.SomethingHappened;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function DocDoesNotExist(model, at, message) {
  this.customErr = "FeatureError";
  this.name = "DocDoesNotExist";
  this.message = message || `${messages.DocDoesNotExist} ${model}.`;
  this.at = at || defaultValues.at;
  this.httpStatusCode = 404;
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserIsNotDocCreator(at, message) {
  this.customErr = "FeatureError";
  this.name = "UserIsNotDocCreator";
  this.message = message || messages.UserIsNotDocCreator;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function FieldsInludeOtherUserId(at, message) {
  this.customErr = "FeatureError";
  this.name = "FieldsInludeOtherUserId";
  this.message = message || messages.FieldsInludeOtherUserId;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function ReadPermissionsIsFalse(at, message) {
  this.customErr = "FeatureError";
  this.name = "ReadPermissionsIsFalse";
  this.message = message || messages.ReadPermissionsIsFalse;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserCannotRead(at, message) {
  this.customErr = "FeatureError";
  this.name = "UserCannotRead";
  this.message = message || messages.UserCannotRead;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function CouldNotReadDoc(at, message) {
  this.customErr = "FeatureError";
  this.name = "CouldNotReadDoc";
  // this.message = message || messages.CouldNotReadDoc;
  this.message = message || messages.CouldNotReadDoc;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function WritePermissionsIsFalse(at, message) {
  this.customErr = "FeatureError";
  this.name = "WritePermissionsIsFalse";
  this.message = message || messages.WritePermissionsIsFalse;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserCannotWrite(at, message) {
  this.customErr = "FeatureError";
  this.name = "UserCannotWrite";
  this.message = message || messages.UserCannotWrite;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function CouldNotWriteDoc(at, message) {
  this.customErr = "FeatureError";
  this.name = "CouldNotWriteDoc";
  this.message = message || messages.CouldNotWriteDoc;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function CanUserReadUserIsFalse(at, message) {
  this.customErr = "FeatureError";
  this.name = "CanUserReadUserIsFalse";
  this.message = message || messages.CanUserReadUserIsFalse;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function UserIsNotAdmin(at, message) {
  this.customErr = "FeatureError";
  this.name = "UserIsNotAdmin";
  this.message = message || messages.UserIsNotAdmin;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

function SocialConnectionNotFollowing(at, message) {
  this.customErr = "FeatureError";
  this.name = "SocialConnectionNotFollowing";
  this.message = message || messages.SocialConnectionNotFollowing;
  this.at = at || defaultValues.at;
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

SomethingHappened.prototype = new Error();
DocDoesNotExist.prototype = new Error();
UserIsNotDocCreator.prototype = new Error();
FieldsInludeOtherUserId.prototype = new Error();
ReadPermissionsIsFalse.prototype = new Error();
WritePermissionsIsFalse.prototype = new Error();
UserCannotRead.prototype = new Error();
CouldNotReadDoc.prototype = new Error();
UserCannotWrite.prototype = new Error();
CouldNotWriteDoc.prototype = new Error();
CanUserReadUserIsFalse.prototype = new Error();
UserIsNotAdmin.prototype = new Error();
SocialConnectionNotFollowing.prototype = new Error();

module.exports = {
  SomethingHappened,
  DocDoesNotExist,
  UserIsNotDocCreator,
  FieldsInludeOtherUserId,
  ReadPermissionsIsFalse,
  WritePermissionsIsFalse,
  UserCannotRead,
  CouldNotReadDoc,
  UserCannotWrite,
  CouldNotWriteDoc,
  CanUserReadUserIsFalse,
  UserIsNotAdmin,
  SocialConnectionNotFollowing,
  HandleFeatureError: handlers.HandleFeatureError
};
