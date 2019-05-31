const mongoose = require("mongoose");
const Post = mongoose.model("post");
const e = require("../../errors/queries/validateFields");
const validate = require("./validate");

module.exports.new = async fields => {
  await validate.new("post", fields);

  let validFields = {};

  if (fields && fields.userId) {
    validFields["userId"] = fields.userId;
  }

  if (fields && fields.location && fields.location.lng && fields.location.lat) {
    validFields["location"] = {};
    validFields.location["lng"] = parseFloat(fields.location.lng);
    validFields.location["lat"] = parseFloat(fields.location.lat);
  }

  if (fields && fields.location && fields.location.lng && fields.location.lat) {
    validFields["geometry"] = {};
    validFields.geometry["type"] = "Point";
    validFields.geometry["coordinates"] = [
      parseFloat(fields.location.lng),
      parseFloat(fields.location.lat)
    ];
  }

  if (fields && fields.content) {
    validFields["content"] = fields.content;
  }

  if (fields && fields.caption) {
    validFields["caption"] = fields.caption;
  }

  if (fields && fields.likes) {
    validFields["likes"] = fields.likes;
  }

  if (fields && fields.totalLikes) {
    validFields["totalLikes"] = fields.totalLikes;
  }

  if (fields && fields.tags) {
    validFields["tags"] = fields.tags;
  }

  if (fields && fields.commentsEnabled) {
    validFields["commentsEnabled"] = fields.commentsEnabled;
  }

  if (fields && fields.comments) {
    validFields["comments"] = fields.comments;
  }

  if (fields && fields.totalComments) {
    validFields["totalComments"] = fields.totalComments;
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

  return validFields;
};

module.exports.update = async fields => {
  await validate.update("post", fields);
  return fields;
};
