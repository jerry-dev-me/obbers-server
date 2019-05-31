const mongoose = require("mongoose");
const Like = mongoose.model("like");
const e = require("../../errors/queries/validateFields");

module.exports.new = async fields => {
  await validate.new("like", fields);

  // const newPromise = new Promise((resolve, reject) => {
  //   const newDoc = new Like(fields)
  //   return newDoc.validate(function(error) {
  //     if (error) reject(new e.ValidationFailed(error))

  let validFields = {};

  if (fields && fields.userId) {
    validFields["userId"] = fields.userId;
  }

  if (fields && fields.refModel) {
    validFields["refModel"] = fields.refModel;
  }

  if (fields && fields.refId) {
    validFields["refId"] = fields.refId;
  }

  if (fields && fields.createdAt) {
    validFields["createdAt"] = fields.createdAt;
  } else {
    validFields["createdAt"] = new Date();
  }

  //     resolve(validFields)
  //   })
  // })
  // return newPromise.then(validFields => validFields)

  return validFields;
};

module.exports.update = async fields => {
  await validate.update("like", fields);
  return fields;
};
