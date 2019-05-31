const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-DOC"; // logGroup
const lS = "GET-DOC-REFS"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyDoc");
const u = require("../../../utils");
const crud = require("../crud");
const verifyDoc = require("../verifyDoc");
const exists = require("./exists");

const getDocRefs = (refModel, doc) => {
  try {
    logger.log(lG, lS, null, { refModel });
    logger.log(lG, lS, null, { doc });

    let docRefs = [];

    if (doc && doc.userId) {
      docRefs.push({ refModel: "user", refId: doc.userId });
    }
    if (doc && doc.postId) {
      docRefs.push({ refModel: "post", refId: doc.postId });
    }
    if (doc && doc.commentId) {
      docRefs.push({ refModel: "comment", refId: doc.commentId });
    }
    if (doc && doc.responseId) {
      docRefs.push({ refModel: "response", refId: doc.responseId });
    }
    if (doc && doc.sentFromUserId) {
      docRefs.push({ refModel: "user", refId: doc.sentFromUserId });
    }
    if (doc && doc.sentToUserId) {
      docRefs.push({ refModel: "user", refId: doc.sentFromUserId });
    }
    if (doc && doc.refId) {
      docRefs.push({ refModel: doc.refModel, refId: doc.refId });
    }

    logger.log(lG, lS, null, { docRefs });

    let docCreatorId;

    if (doc && refModel === "activity") {
      docCreatorId = doc.userId;
    }
    if (doc && refModel === "collection") {
      docCreatorId = doc.userId;
    }
    if (doc && refModel === "comment") {
      docCreatorId = doc.userId;
    }
    if (doc && refModel === "like") {
      docCreatorId = doc.userId;
    }
    if (doc && refModel === "post") {
      docCreatorId = doc.userId;
    }
    if (doc && refModel === "report") {
      docCreatorId = doc.sentFromUserId;
    }
    if (doc && refModel === "request") {
      docCreatorId = doc.sentFromUserId;
    }
    if (doc && refModel === "response") {
      docCreatorId = doc.userId;
    }
    if (doc && refModel === "tag") {
      docCreatorId = doc.userId;
    }
    if (doc && refModel === "user") {
      docCreatorId = doc._id;
    }

    logger.log(lG, lS, null, { docCreatorId });

    const arrWithNoDuplicates = u.arrayRemoveDuplicated.objects(docRefs);
    logger.log(lG, lS, null, { arrWithNoDuplicates });

    let docId;
    if (doc && doc._id) docId = doc._id;
    if (!(doc && doc._id)) docId = "";

    logger.log(lG, lS, null, { docId });

    let arrOfInfoToSubtract;
    if (doc && doc._id) {
      arrOfInfoToSubtract = [
        { refModel, refId: docId },
        { refModel: "user", refId: docCreatorId }
      ];
    } else {
      arrOfInfoToSubtract = [{ refModel: "user", refId: docCreatorId }];
    }

    logger.log(lG, lS, null, { arrOfInfoToSubtract });

    const arrWithInfoSubtracted = u.subtractObjectsFromArrays.byObjProp(
      arrWithNoDuplicates,
      arrOfInfoToSubtract,
      "refId"
    );

    logger.log(lG, lS, null, { arrWithInfoSubtracted });

    return {
      docInfo: {
        id: docId,
        model: refModel,
        creator: docCreatorId
      },
      refs: docRefs
    };
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleVerifyDocError(err);
  }
};

module.exports = {
  checkId: async (model, id) => {
    try {
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { id });

      const doc = await exists.checkId(model, id);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      return getDocRefs(model, doc);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  },
  checkDoc: (model, doc) => {
    try {
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      return getDocRefs(model, doc);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }
};
