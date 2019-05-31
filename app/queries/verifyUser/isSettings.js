const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-USER"; // logGroup
const lS = "IS-SETTINGS"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyUser");
const crud = require("../crud");
const exists = require("../verifyDoc/exists");

module.exports.private = {
  checkId: async userId => {
    try {
      logger.log(lG, lS, null, { userId });

      const doc = await exists.checkId("user", userId);
      logger.log(lG, lS, null, { doc });

      if (doc === false)
        throw new e.UserDoesNotExist(new Error().stack, userId);

      if (doc.settings.private === true) return true;

      return false;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  },
  checkDoc: doc => {
    try {
      logger.log(lG, lS, null, { doc });

      doc = exists.checkDoc(doc);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.UserDoesNotExist(new Error().stack);

      if (doc.settings.private === true) return true;

      return false;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  }
};
