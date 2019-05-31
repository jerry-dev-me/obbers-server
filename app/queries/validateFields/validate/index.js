const mongoose = require("mongoose");
const Activity = mongoose.model("activity");
const Collection = mongoose.model("collection");
const Comment = mongoose.model("comment");
const Like = mongoose.model("like");
const Post = mongoose.model("post");
const Report = mongoose.model("report");
const Request = mongoose.model("request");
const Response = mongoose.model("response");
// const Tag = mongoose.model("tag");
const User = mongoose.model("user");
const e = require("../../../errors/queries/validateFields");

const getNewDoc = (model, fields) => {
  if (model === "activity") return new Activity(fields);
  if (model === "collection") return new Collection(fields);
  if (model === "comment") return new Comment(fields);
  if (model === "like") return new Like(fields);
  if (model === "post") return new Post(fields);
  if (model === "report") return new Report(fields);
  if (model === "request") return new Request(fields);
  if (model === "response") return new Response(fields);
  // if (model === "tag") return new Tag(fields);
  if (model === "user") return new User(fields);
};

module.exports.new = async (model, fields) => {
  try {
    const newPromise = new Promise((resolve, reject) => {
      let newDoc = getNewDoc(model, fields);
      return newDoc.validate(function(err) {
        if (err) {
          const foundErrors = err.errors;
          const errorNames = Object.keys(err.errors);

          let errorsArr = [];
          let errorsObj = {};

          foundErrors.map(foundError => {
            errorsArr.push({
              name: foundError,
              message: err.errors[foundError].message
            });
            errorsObj[foundError] = err.errors[foundError].message;
          });

          throw new e.NewFieldsValidationError({
            // error: err,
            // errors: err.errors,
            errorsArr,
            errorsObj
          });
        }
        resolve(fields);
      });
    });
    return newPromise.then(validFields => validFields);
  } catch (err) {
    console.log(err);
  }
};

module.exports.update = async (model, fields) => {
  try {
    const newPromise = new Promise((resolve, reject) => {
      let newDoc = getNewDoc(model, fields);
      return newDoc.validate(function(err) {
        if (err) {
          const fieldsNames = Object.keys(fields);
          const errorNames = Object.keys(err.errors);

          let invalidFields = [];

          fieldsNames.map(fieldName => {
            errorNames.map(errorName => {
              if (fieldName.toString() === errorName.toString()) {
                invalidFields.push(fieldName);
              }
            });
          });

          let errorsArr = [];
          let errorsObj = {};

          invalidFields.map(invalidField => {
            errorsArr.push({
              name: invalidField,
              message: err.errors[invalidField].message
            });
            errorsObj[invalidField] = err.errors[invalidField].message;
          });

          throw new e.UpdateFieldsValidationError({
            // error: err,
            // errors: err.errors,
            errorsArr,
            errorsObj
          });
        }
        resolve(fields);
      });
    });
    return newPromise.then(fields => fields);
  } catch (err) {
    console.log(err);
  }
};
