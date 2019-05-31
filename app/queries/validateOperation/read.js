const logger = require("../../../lib/logger");
const lG = "QUERIES-VALIDATE-OP"; // logGroup
const lS = "READ"; // logSubgroup

const u = require("../../../utils");
const h = require("../../helpers");
const e = require("../../errors/queries/validateOperation");
const crud = require("../crud");
const verifyDoc = require("../verifyDoc");
const verifyUser = require("../verifyUser");

const validateUser = require("./validations/validateUser");
const validateFields = require("./validations/validateFields");
const validateRefs = require("./validations/validateRefs");

let validationResults = {};
validationResults["docsById"] = {};

const validationComplete = () => validationResults;

module.exports = {
  activity: {
    restriction: {
      default: async (readerId, activityId) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { activityId });

          const userValidation = await validateUser.read(readerId);
          const refsValidation = await validateRefs.allFromRefId(
            readerId,
            "activity",
            activityId
          );

          logger.log(lG, lS, null, { userValidation });
          logger.log(lG, lS, null, { refsValidation });

          // console.log("\n userValidation: " + userValidation);
          // console.log("\n refsValidation: " + refsValidation);

          // const isUserAdmin = verifyUser.isPermissions.admin.checkId(readerId);
          // if (isUserAdmin === false) throw new e.CouldNotReadDoc();

          // console.log("\n >>>>>>>>>>>>>>>>>>>> refsValidation");
          // console.log(refsValidation);

          validationResults.docsById[userValidation._id] = userValidation;

          refsValidation.map(refDoc => {
            validationResults.docsById[refDoc._id] = refDoc;
          });

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and readerId can read
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
      default: async (readerId, collectionId) => {
        try {
          await validateUser.read(readerId);
          await validateRefs.allFromDoc(readerId, "collection", fields);

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // validate fields.posts if fields.posts.length > 0
          // get fields/doc references and all parent references
          // default, just make sure all references exist and readerId can read
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
      default: async (readerId, commentId) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { fields });

          await validateUser.read(readerId);
          await validateRefs.allFromDoc(readerId, "comment", fields);

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and readerId can read
          // all reference docs...
          // * comment can be created only of readerId can read post doc
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  like: {
    restriction: {
      default: async (readerId, likeId) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { fields });

          await validateUser.read(readerId);
          await validateRefs.allFromDoc(readerId, "like", fields);

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and readerId can read
          // all reference docs...
          // * like can be created only of readerId can read
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
      default: async (readerId, postId) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { postId });

          await validateUser.read(readerId);
          await validateRefs.allFromDoc(readerId, "post", fields);

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and readerId can read
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
      default: async (readerId, reportId) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { fields });

          await validateUser.read(readerId);
          await validateRefs.allFromDoc(readerId, "report", fields);

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and readerId can read
          // all reference docs...
          // * just make sure readerId === sentFromUserId
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
      default: async (readerId, requestId) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { fields });

          await validateUser.read(readerId);
          await validateRefs.allFromDoc(readerId, "request", fields);

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and readerId can read
          // all reference docs...
          // * just make sure readerId === sentFromUserId
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
      default: async (readerId, responseId) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { fields });

          await validateUser.read(readerId);
          await validateRefs.allFromDoc(readerId, "response", fields);

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and readerId can read
          // all reference docs...
          // * just make sure readerId can read comment.postId
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  tag: {
    restriction: {
      default: async (readerId, postId, tagId) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { fields });

          await validateUser.read(readerId);
          await validateRefs.allFromDoc(readerId, "tag", fields);

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
          // get fields/doc references and all parent references
          // default, just make sure all references exist and readerId can read
          // all reference docs...
          // * make sure that readerId is postId creator
          // * make sure tag.userId can be read by readerId
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      }
    }
  },
  user: {
    restriction: {
      default: async (readerId, idToRead) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { idToRead });

          const userValidation = await validateUser.read(readerId);
          logger.log(lG, lS, null, { userValidation });

          const refValidation = await validateRefs.refId(
            readerId,
            "user",
            idToRead
          );
          logger.log(lG, lS, null, { refValidation });

          validationResults.docsById[userValidation._id] = userValidation;
          validationResults.docsById[refValidation._id] = refValidation;

          logger.log(lG, lS, null, { validationResults });

          return validationComplete();
        } catch (err) {
          logger.log(lG, lS, null, { err });
          return e.HandleValidateOperationError(err);
        }
      },
      followingOnly: async (readerId, idToRead) => {
        try {
          logger.log(lG, lS, null, { readerId });
          logger.log(lG, lS, null, { idToRead });

          const userValidation = await validateUser.read(readerId);
          const refValidation = await validateRefs.refId(
            readerId,
            "user",
            idToRead
          );
          const isUserAdmin = await verifyUser.isPermissions.admin.checkId(
            readerId
          );
          const isUserFollowing = await verifyUser.isUserFollowing.checkId(
            readerId,
            idToRead
          );

          if (isUserAdmin === false && isUserFollowing === false)
            // throw new e.CouldNotReadDoc();
            return false;

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
