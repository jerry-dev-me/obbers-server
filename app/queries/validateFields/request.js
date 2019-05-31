const mongoose = require("mongoose");
const Request = mongoose.model("request");
const e = require("../../errors/queries/validateFields");

module.exports.new = async fields => {
  await validate.new("request", fields);

  // const newPromise = new Promise((resolve, reject) => {
  //   const newDoc = new Request(fields)
  //   return newDoc.validate(function(error) {
  //     if (error) reject(new e.ValidationFailed(error))

  let validFields = {};

  if (fields && fields.sentFromUserId) {
    validFields["sentFromUserId"] = fields.sentFromUserId;
  }

  if (fields && fields.sentToUserId) {
    validFields["sentToUserId"] = fields.sentToUserId;
  }

  if (fields && fields.status) {
    validFields["status"] = fields.status;
  }

  if (fields && fields.createdAt) {
    validFields["createdAt"] = fields.createdAt;
  } else {
    validFields["createdAt"] = new Date();
  }

  // const validFields = {
  //   sentFromUserId: (function() {
  //     if (fields && fields.sentFromUserId)
  //       return fields.sentFromUserId;
  //   })(),
  //   sentToUserId: (function() {
  //     if (fields && fields.sentToUserId)
  //       return fields.sentToUserId;
  //   })(),
  //   status: (function() {
  //     return "PENDING";
  //   })(),
  //   createdAt: (function() {
  //     return new Date();
  //   })()
  // };

  //     resolve(validFields)
  //   })
  // })
  // return newPromise.then(validFields => validFields)

  return validFields;
};

module.exports.update = async fields => {
  await validate.update("request", fields);
  return fields;
};
