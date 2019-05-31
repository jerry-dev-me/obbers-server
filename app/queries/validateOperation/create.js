const logger = require("../../../lib/logger");
const lG = "QUERIES-VALIDATE-OP"; // logGroup
const lS = "CREATE"; // logSubgroup

const u = require("../../../utils");
const h = require("../../helpers");
const e = require("../../errors/queries/validateOperation");
const crud = require("../crud");
const verifyDoc = require("../verifyDoc");
const verifyUser = require("../verifyUser");

const validateFields = require("./validations/validateFields");
const validateUser = require("./validations/validateUser");
const validateRefs = require("./validations/validateRefs");

let validationResults = {};
validationResults["docsById"] = {};
validationResults["validFields"] = {};

const validationComplete = () => validationResults;

module.exports = {
  activity: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.write(writerId);
          const fieldsValidation = await validateFields.new(
            writerId,
            "activity",
            fields
          );
          const refsValidation = await validateRefs.allFromDoc(
            writerId,
            "activity",
            fields
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refsValidation });

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.validFields = fieldsValidation;
          refsValidation.map(
            refDoc => (validationResults.docsById[refDoc._id] = refDoc)
          );

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...

          // by default
          // make sure user account/permissions allows him to read or write
          // then make sure user has access to the doc in question...
          // then analyze doc references and make sure they exist and make sure user can access parent refs
          // or if has array of children refs return all child refs user can access and all child ref that exist... no actually whenever something is deleted all refs shgould be deleted
          // then add custom restrictions, should be admin, should be follower, etc
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  collection: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.write(writerId);
          const fieldsValidation = await validateFields.new(
            writerId,
            "collection",
            fields
          );
          const refIdsValidation = await validateRefs.refIds(
            writerId,
            "post",
            fields.posts
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refIdsValidation });

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.validFields = fieldsValidation;
          validationResults.validFields.posts = refIdsValidation;

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // validate fields.posts if fields.posts.length > 0
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  comment: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.write(writerId);
          const fieldsValidation = await validateFields.new(
            writerId,
            "comment",
            fields
          );
          const refsValidation = await validateRefs.allFromDoc(
            writerId,
            "comment",
            fields
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refsValidation });

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.validFields = fieldsValidation;
          refsValidation.map(
            refDoc => (validationResults.docsById[refDoc._id] = refDoc)
          );

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
          // * comment can be created only of writerId can read post doc
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  like: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.write(writerId);
          const fieldsValidation = await validateFields.new(
            writerId,
            "like",
            fields
          );
          // await referencesValidation(writerId, "like", fields);
          const refsValidation = await validateRefs.allFromDoc(
            writerId,
            "like",
            fields
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refsValidation });

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.validFields = fieldsValidation;
          refsValidation.map(
            refDoc => (validationResults.docsById[refDoc._id] = refDoc)
          );

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
          // * like can be created only of writerId can read
          // postLike: post,
          // commentLike: comment and post,
          // responseLike: response comment and post
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  post: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.write(writerId);
          const fieldsValidation = await validateFields.new(
            writerId,
            "post",
            fields
          );
          const refsValidation = await validateRefs.allFromDoc(
            writerId,
            "post",
            fields
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refsValidation });

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.validFields = fieldsValidation;
          refsValidation.map(
            refDoc => (validationResults.docsById[refDoc._id] = refDoc)
          );

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  report: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.write(writerId);
          const fieldsValidation = await validateFields.new(
            writerId,
            "report",
            fields
          );
          const refValidation = await validateRefs.refId(
            writerId,
            "user",
            fields.sentToUserId
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refValidation });

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.validFields = fieldsValidation;
          validationResults.docsById[refValidation._id] = refValidation;

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
          // * just make sure writerId === sentFromUserId
          // * and make sure sentFromUserId can read sentToUserId
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  request: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.write(writerId);
          const fieldsValidation = await validateFields.new(
            writerId,
            "request",
            fields
          );
          const refValidation = await validateRefs.refId(
            writerId,
            "user",
            fields.sentToUserId
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refValidation });

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.validFields = fieldsValidation;
          validationResults.docsById[refValidation._id] = refValidation;

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
          // * just make sure writerId === sentFromUserId
          // * and make sure sentFromUserId can read sentToUserId
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  response: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.write(writerId);
          const fieldsValidation = await validateFields.new(
            writerId,
            "response",
            fields
          );
          const refsValidation = await validateRefs.allFromDoc(
            writerId,
            "response",
            fields
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refsValidation });

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.validFields = fieldsValidation;
          refsValidation.map(
            refDoc => (validationResults.docsById[refDoc._id] = refDoc)
          );

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
          // * just make sure writerId can read comment.postId
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  tag: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.write(writerId);
          const fieldsValidation = await validateFields.new(
            writerId,
            "tag",
            fields
          );
          const refsValidation = await validateRefs.allFromDoc(
            writerId,
            "tag",
            fields
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refsValidation });

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
          // * make sure that writerId is postId creator
          // * make sure tag.userId can be read by writerId
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  user: {
    restriction: {
      default: async fields => {
        try {
          logger.log(lG, lS, null, { fields });

          const fieldsValidation = await validateFields.new(
            writerId,
            "user",
            fields
          );
          // await referencesValidation(writerId, "user", fields);
          const refsValidation = await validateRefs.allFromDoc(
            writerId,
            "user",
            fields
          );

          logger.log(lG, lS, null, { fieldsValidation });
          logger.log(lG, lS, null, { refsValidation });

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // * just make sure all fields are valid
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  }
};
