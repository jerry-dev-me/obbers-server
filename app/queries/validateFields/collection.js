const mongoose = require("mongoose");
const Collection = mongoose.model("collection");
const e = require("../../errors/queries/validateFields");

module.exports.new = async fields => {
  await validate.new("collection", fields);

  // const newPromise = new Promise((resolve, reject) => {
  //   const newDoc = new Collection(fields)
  //   return newDoc.validate(function(error) {
  //     if (error) reject(new e.ValidationFailed(error))

  let validFields = {};

  if (fields && fields.userId) {
    validFields["userId"] = fields.userId;
  }

  if (fields && fields.name) {
    validFields["name"] = fields.name;
  } else {
    validFields["name"] = "New Collection";
  }

  if (fields && fields.posts && fields.posts.length > 0) {
    validFields["posts"] = fields.posts;
  }

  if (fields && fields.posts && fields.posts.length > 0) {
    validFields["thumbnail"] = fields.posts[0];
  }

  if (fields && fields.createdAt) {
    validFields["createdAt"] = fields.createdAt;
  } else {
    validFields["createdAt"] = new Date();
  }

  if (fields && fields.modifiedAt) {
    validFields["modifiedAt"] = fields.modifiedAt;
  } else {
    validFields["modifiedAt"] = new Date();
  }

  //     resolve(validFields)
  //   })
  // })
  // return newPromise.then(validFields => validFields)

  return validFields;
};

module.exports.update = async fields => {
  await validate.update("collection", fields);
  return fields;
};
