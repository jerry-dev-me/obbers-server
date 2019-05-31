const handlers = require("./handlers");

const messages = {
  SomethingHappened:
    `Operation could not be completed at this time, ` +
    `please try again later or contact developer.`
};

function SomethingHappened(at, message) {
  this.customErr = "ValidateQueryOperationError";
  this.name = "SomethingHappened";
  this.message = message || messages.SomethingHappened;
  this.at = at || "Please provide 'new Error().stack' as 'at' arg";
  this.httpStatusCode = "";
  this.internalErrorCode = "";
  this.developerMessage = "";
  this.moreInfo = "";
}

SomethingHappened.prototype = new Error();

module.exports = {
  SomethingHappened,
  HandleDefaultError: handlers.HandleDefaultError
};
