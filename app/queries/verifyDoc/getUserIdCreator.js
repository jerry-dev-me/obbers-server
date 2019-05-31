const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-DOC"; // logGroup
const lS = "GET-USER-ID-CREATOR"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyDoc");
const crud = require("../crud");
const verifyDoc = require("../verifyDoc");
const exists = require("./exists");

const User = require("../../models/user");

const getUserIdCreator = (model, doc) => {
  try {
    logger.log(lG, lS, null, { model });
    logger.log(lG, lS, null, { doc });
    let userIdCreator;
    if (doc && model === "activity") userIdCreator = doc.userId;
    if (doc && model === "collection") userIdCreator = doc.userId;
    if (doc && model === "comment") userIdCreator = doc.userId;
    if (doc && model === "like") userIdCreator = doc.userId;
    if (doc && model === "post") userIdCreator = doc.userId;
    if (doc && model === "report") userIdCreator = doc.sentFromUserId;
    if (doc && model === "request") userIdCreator = doc.sentFromUserId;
    if (doc && model === "response") userIdCreator = doc.userId;
    if (doc && model === "tag") userIdCreator = doc.userId; // get post
    if (doc && model === "user") userIdCreator = doc._id;
    logger.log(lG, lS, null, { userIdCreator });
    return userIdCreator;
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

      return getUserIdCreator(model, doc);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  },
  checkDoc: (model, doc) => {
    try {
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { doc });

      doc = exists.checkDoc(doc);
      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      return getUserIdCreator(model, doc);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }
};
