const logger = require("../../../lib/logger");
const lG = "QUERIES-VALIDATE-OP"; // logGroup
const lS = "UPDATE"; // logSubgroup

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
      default: async (writerId, activityId) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { activityId });

          const userValidation = await validateUser.read(writerId);
          const refsValidation = await validateRefs.allFromRefId(
            writerId,
            "activity",
            activityId
          );
          // const isUserAdmin = verifyUser.isPermissions.admin.checkId(writerId);
          // if (isUserAdmin === false) throw new e.CouldNotReadDoc();

          // console.log("\n >>>>>>>>>>>>>>>>>>>> refsValidation");
          // console.log(refsValidation);

          validationResults.docsById[userValidation._id] = userValidation;

          refsValidation.map(
            refDoc => (validationResults.docsById[refDoc._id] = refDoc)
          );

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
          // reader must be following user id creator of activity
          // validate refs and make sure reader can read refDOc and userIdCreator
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  collection: {
    restriction: {
      default: async (writerId, newValues) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          await validateUser.read(writerId);
          await validateRefs.allFromDoc(writerId, "collection", fields);

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
    },
    addRemovePost: async (writerId, collectionId, postId) => {
      try {
        logger.log(lG, lS, null, { writerId });
        logger.log(lG, lS, null, { collectionId });
        logger.log(lG, lS, null, { postId });
        logger.log(lG, lS, null, { validationResults });
        return validationComplete();
      } catch (err) {
        logger.log(lG, lS, null, { err });
        return e.HandleValidateOperationError(err);
      }
    }
  },
  comment: {
    restriction: {
      default: async (writerId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          await validateUser.read(writerId);
          await validateRefs.allFromDoc(writerId, "comment", fields);

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

          await validateUser.read(writerId);
          await validateRefs.allFromDoc(writerId, "like", fields);

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

          await validateUser.read(writerId);
          await validateRefs.allFromDoc(writerId, "post", fields);

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and writerId can read
          // all reference docs...
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      },
      fields: async (writerId, postId, fields) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { fields });

          const userValidation = await validateUser.read(writerId);
          logger.log(lG, lS, null, { userValidation });

          const userDoc = userValidation.userDoc;

          const refValidation = await validateRefs.refId(
            writerId,
            "post",
            postId
          );
          logger.log(lG, lS, null, { refValidation });

          const postDoc = refValidation.refDoc;

          const isUserIdCreator = verifyDoc.isUserIdCreator.checkDoc(
            writerId,
            "post",
            postDoc
          );
          logger.log(lG, lS, null, { isUserIdCreator });

          const fieldsValidation = await validateFields.update(
            writerId,
            "post",
            fields
          );
          logger.log(lG, lS, null, { fieldsValidation });

          validationResults.validFields = fieldsValidation;
          validationResults.docsById[writerId] = userDoc;
          validationResults.docsById[postId] = postDoc;

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

          await validateUser.read(writerId);
          await validateRefs.allFromDoc(writerId, "report", fields);

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

          await validateUser.read(writerId);
          await validateRefs.allFromDoc(writerId, "request", fields);

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

          await validateUser.read(writerId);
          await validateRefs.allFromDoc(writerId, "response", fields);

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

          await validateUser.read(writerId);
          await validateRefs.allFromDoc(writerId, "tag", fields);

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
      default: async (writerId, idToRead) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { idToRead });

          const userValidation = await validateUser.read(writerId);
          const refValidation = await validateRefs.refId(
            writerId,
            "user",
            idToRead
          );
          const isUserAdmin = verifyUser.isPermissions.admin.checkDoc(
            validationResults.docsById[writerId]
          );

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.docsById[refValidation._id] = refValidation;

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      },
      followingOnly: async (writerId, idToRead) => {
        try {
          logger.log(lG, lS, null, { writerId });
          logger.log(lG, lS, null, { idToRead });

          const userValidation = await validateUser.read(writerId);
          const refValidation = await validateRefs.refId(
            writerId,
            "user",
            idToRead
          );
          const isUserAdmin = await verifyUser.isPermissions.admin.checkId(
            writerId
          );
          const isUserFollowing = await verifyUser.isUserFollowing.checkId(
            writerId,
            idToRead
          );

          if (isUserAdmin === false && isUserFollowing === false)
            throw new e.CouldNotReadDoc();

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.docsById[refValidation._id] = refValidation;

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  }
};
