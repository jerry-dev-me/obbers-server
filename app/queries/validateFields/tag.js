const Tag = require("../../models/tag");
const e = require("../../errors/queries/validateFields");

module.exports.new = async fields => {
  // await validate.new("tag", fields);

  // const newPromise = new Promise((resolve, reject) => {
  //   const newDoc = new Tag(fields)
  //   return newDoc.validate(function(error) {
  //     if (error) reject(new e.ValidationFailed(error))

  let validFields = {};

  if (fields && fields.userId) {
    validFields["userId"] = fields.userId;
  }

  if (fields && fields.username) {
    validFields["username"] = fields.username;
  }

  if (
    fields &&
    fields.position &&
    fields.position.x !== null &&
    fields.position.y !== null
  ) {
    validFields["position"] = fields.position;
  } else {
    validFields["position"] = { x: 0, y: 0 };
  }

  if (fields && fields.createdAt) {
    validFields["createdAt"] = fields.createdAt;
  } else {
    validFields["createdAt"] = new Date();
  }

  // const validFields = {
  //   userId: (function() {
  //     if (fields && fields.userId) return fields.userId;
  //   })(),
  //   username: (function() {
  //     if (fields && fields.username) return fields.username;
  //   })(),
  //   position: (function() {
  //     if (fields
  //       && fields.position
  //       && fields.position.x !== null
  //       && fields.position.y !== null) {
  //       return fields.position;
  //     } else {
  //       return { x: 0, y: 0 };
  //     }
  //   })(),
  //   createdAt: (function() {
  //     if (fields && fields.createdAt) return fields.createdAt;
  //     else return new Date();
  //   })(),
  // };

  //     resolve(validFields)
  //   })
  // })
  // return newPromise.then(validFields => validFields)

  return validFields;
};

module.exports.update = async fields => {
  // await validate.update("tag", fields);
  // return fields;
};
