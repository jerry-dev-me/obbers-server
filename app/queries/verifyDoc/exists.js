const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-DOC"; // logGroup
const lS = "EXISTS"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyDoc");
const crud = require("../crud");

module.exports = {
  checkId: async (model, id) => {
    try {
      const doc = await crud.read[model].findById(id);
      logger.log(lG, lS, null, { doc });
      if (doc === null || doc === undefined) return false;
      return doc;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  },
  checkDoc: doc => {
    try {
      logger.log(lG, lS, null, { doc });
      if (doc === null || doc === undefined) return false;
      return doc;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }
};
