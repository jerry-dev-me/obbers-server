const mongoose = require("mongoose");
const Report = mongoose.model("report");
const e = require("../../errors/queries/validateFields");

module.exports.new = async fields => {
  await validate.new("report", fields);

  // const newPromise = new Promise((resolve, reject) => {
  //   const newDoc = new Report(fields)
  //   return newDoc.validate(function(error) {
  //     if (error) reject(new e.ValidationFailed(error))

  let validFields = {};

  if (fields && fields.sentFromUserId) {
    validFields["sentFromUserId"] = fields.sentFromUserId;
  }

  if (fields && fields.sentToUserId) {
    validFields["sentToUserId"] = fields.sentToUserId;
  }

  if (fields && fields.category) {
    validFields["category"] = fields.category;
  }

  if (fields && fields.description) {
    validFields["description"] = fields.description;
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
  //     if (fields && fields.sentFromUserId) return fields.sentFromUserId;
  //   })(),
  //   sentToUserId: (function() {
  //     if (fields && fields.sentToUserId) return fields.sentToUserId;
  //   })(),
  //   category: (function() {
  //     if (fields && fields.category) return fields.category;
  //     else return "OTHER";
  //   })(),
  //   description: (function() {
  //     if (fields && fields.description) return fields.description;
  //   })(),
  //   status: (function() {
  //     if (fields && fields.status) return fields.status;
  //     else return "UNREAD";
  //   })(),
  //   createdAt: (function() {
  //     if (fields && fields.createdAt) return fields.createdAt;
  //     else return new Date();
  //   })()
  // };

  //     resolve(validFields)
  //   })
  // })
  // return newPromise.then(validFields => validFields)

  return validFields;
};

module.exports.update = async fields => {
  await validate.update("report", fields);
  return fields;
};
