const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-DOC"; // logGroup
const lS = "CAN-USER-READ-ALL-REF-CREATORS"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyDoc");
const crud = require("../crud");
const exists = require("./exists");
const getAllRefs = require("./getAllRefs");
const verifyUser = require("../verifyUser");

const canUserReadAllRefIdCreators = async (userId, model, doc) => {
  try {
    logger.log(lG, lS, null, { userId });
    logger.log(lG, lS, null, { model });
    logger.log(lG, lS, null, { doc });

    const allRefs = await allRefs.getAllRefs.checkDoc(model, doc);
    logger.log(lG, lS, null, { allRefs });

    let canUserReadRefIdCreator;

    allRefs.map(async ref => {
      const canUserReadUser = await verifyUser.canUserReadUser.checkId(
        userId,
        ref.userId
      );

      logger.log(lG, lS, null, { canUserReadUser });
      if (canUserReadUser) canUserReadRefIdCreator = false;
    });

    logger.log(lG, lS, null, { canUserReadRefIdCreator });
    if (canUserReadRefIdCreator === false) return false;

    return true;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleVerifyDocError(err);
  }
};

module.exports = {
  checkId: async (userId, model, id) => {
    try {
      logger.log(lG, lS, null, { userId });
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { id });

      const doc = await exists.checkId(model, id);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      return canUserReadAllRefIdCreators(userId, model, doc);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  },
  checkDoc: (userId, model, doc) => {
    try {
      logger.log(lG, lS, null, { userId });
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { id });

      doc = exists.checkDoc(doc);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      return canUserReadAllRefIdCreators(userId, model, doc);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }
};
