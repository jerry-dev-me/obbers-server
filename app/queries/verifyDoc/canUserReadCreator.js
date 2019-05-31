const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-DOC"; // logGroup
const lS = "CAN-USER-READ-CREATOR"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyDoc");
const crud = require("../crud");
const verifyUser = require("../verifyUser");
const exists = require("./exists");
const getUserIdCreator = require("./getUserIdCreator");

const User = require("../../models/user");

module.exports = {
  checkId: async (userId, model, docId) => {
    try {
      const doc = await exists.checkId(model, docId);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.UserDoesNotExist(new Error().stack);

      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      const canUserReadUser = await verifyUser.canUserReadUser.checkId(
        userId,
        userIdCreator
      );

      logger.log(lG, lS, null, { canUserReadUser });
      if (canUserReadUser === false) return false;

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  },
  checkDoc: async (userId, model, doc) => {
    try {
      doc = exists.checkDoc(doc);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.UserDoesNotExist(new Error().stack);

      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      const canUserReadUser = await verifyUser.canUserReadUser.checkId(
        userId,
        userIdCreator
      );

      logger.log(lG, lS, null, { canUserReadUser });
      if (canUserReadUser === false) return false;

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }
};
