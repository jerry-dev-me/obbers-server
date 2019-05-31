const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-DOC"; // logGroup
const lS = "IS-USER-ID-CREATOR"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyDoc");
const crud = require("../crud");
const verifyUser = require("../verifyUser");
const getUserIdCreator = require("./getUserIdCreator");
const exists = require("./exists");

module.exports = {
  checkId: async (userId, model, docId) => {
    try {
      logger.log(lG, lS, null, { userId });
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { docId });

      const userIdCreator = await getUserIdCreator.checkId(model, docId);
      logger.log(lG, lS, null, { userIdCreator });

      const isSameUser = verifyUser.isSameUser(userId, userIdCreator);
      logger.log(lG, lS, null, { isSameUser });
      if (isSameUser === false) return false;

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  },
  checkDoc: (userId, model, doc) => {
    try {
      logger.log(lG, lS, null, { userId });
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { doc });

      doc = exists.checkDoc(doc);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      const isSameUser = verifyUser.isSameUser(userId, userIdCreator);
      logger.log(lG, lS, null, { isSameUser });
      if (isSameUser === false) return false;

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }
};
