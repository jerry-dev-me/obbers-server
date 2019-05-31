const mongoose = require("mongoose");
const Response = mongoose.model("response");
const e = require("../../errors/queries/validateFields");

module.exports.new = async fields => {
  await validate.new("response", fields);

  // const newPromise = new Promise((resolve, reject) => {
  //   const newDoc = new Response(fields)
  //   return newDoc.validate(function(error) {
  //     if (error) reject(new e.ValidationFailed(error))

  let validFields = {};

  if (fields && fields.userId) {
    validFields["userId"] = fields.userId;
  }

  if (fields && fields.commentId) {
    validFields["commentId"] = fields.commentId;
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

  // const validFields = {
  //   userId: (function() {
  //     if (fields && fields.userId) return fields.userId;
  //     else return writerId;
  //   })(),
  //   commentId: (function() {
  //     if (fields && fields.commentId) return fields.commentId;
  //   })(),
  //   content: (function() {
  //     if (fields && fields.content) return fields.content;
  //   })(),
  //   likes: (function() {
  //     if (fields && fields.likes && fields.likes.length > 0)
  //       return fields.likes;
  //   })(),
  //   totalLikes: [],
  //   createdAt: (function() {
  //     if (fields && fields.createdAt) return fields.createdAt;
  //     else return new Date();
  //   })(),
  //   modifiedAt: (function() {
  //     if (fields && fields.modifiedAt) return fields.modifiedAt;
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
  await validate.update("response", fields);
  return fields;
};
