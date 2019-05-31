const mongoose = require("mongoose");
const Comment = mongoose.model("comment");
const e = require("../../errors/queries/validateFields");

module.exports.new = async fields => {
  await validate.new("comment", fields);

  // const newPromise = new Promise((resolve, reject) => {
  //   const newDoc = new Comment(fields)
  //   return newDoc.validate(function(error) {
  //     if (error) reject(new e.ValidationFailed(error))

  let validFields = {};

  if (fields && fields.userId) {
    validFields["userId"] = fields.userId;
  }

  if (fields && fields.postId) {
    validFields["postId"] = fields.postId;
  }

  if (fields && fields.content) {
    validFields["content"] = fields.content;
  }

  if (fields && fields.likes) {
    validFields["likes"] = fields.likes;
  }

  if (fields && fields.totalLikes) {
    validFields["totalLikes"] = fields.totalLikes;
  }

  if (fields && fields.responses) {
    validFields["responses"] = fields.responses;
  }

  if (fields && fields.totalResponses) {
    validFields["totalResponses"] = fields.totalResponses;
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
  await validate.update("comment", fields);
  return fields;
};
