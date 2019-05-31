const mongoose = require("mongoose");
const Activity = mongoose.model("activity");
const e = require("../../errors/queries/validateFields");

module.exports.new = async fields => {
  await validate.new("activity", fields);

  // const newPromise = new Promise((resolve, reject) => {
  //   const newDoc = new Activity(fields);
  //   return newDoc.validate(function(error) {
  //     if (error) reject(new e.ValidationFailed(error));

  let validFields = {};

  if (fields && fields.userId) {
    validFields["userId"] = fields.userId;
  }

  if (fields && fields.activityType) {
    validFields["activityType"] = fields.activityType;
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

  //     resolve(validFields);
  //   });
  // });
  // return newPromise.then(validFields => validFields);

  return validFields;
};

module.exports.update = async fields => {
  await validate.update("activity", fields);
  return fields;
};

// // callback example
// const usingCallback = async (fields, callback) => {
//   const newDoc = new Activity(fields);
//   fieldsValidation.validate(function(err) {
//     if (err) {
//       if (err.errors && err.errors.userId) {
//         callback(err.errors.userId);
//       }
//       if (err.errors && err.errors.activityType) {
//         callback(err.errors.activityType);
//       }
//       if (err.errors && err.errors.refModel) {
//         callback(err.errors.refModel);
//       }
//       if (err.errors && err.errors.refId) {
//         callback(err.errors.refId);
//       }
//       // callback(err);
//     } else {
//       console.log("Validation Passed!");
//       const validFields = {
//         refModel: (function() {
//           if (fields && fields.refModel) return fields.refModel;
//         })(),
//         refId: (function() {
//           if (fields && fields.refId) return fields.refId;
//         })(),
//         userId: (function() {
//           if (fields && fields.userId) return fields.userId;
//         })(),
//         createdAt: (function() {
//           if (fields && fields.createdAt) return fields.createdAt;
//           else return new Date();
//         })(),
//         activityType: (function() {
//           if (fields && fields.activityType) return fields.activityType;
//         })()
//       };
//       callback(validFields);
//     };
//   })
// };
