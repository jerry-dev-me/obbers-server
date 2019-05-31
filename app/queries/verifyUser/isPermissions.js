const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-USER"; // logGroup
const lS = "IS-PERMISSIONS"; // logSubgroup

const c = require("../../config/constants");
const h = require("../../helpers");
const e = require("../../errors/queries/verifyUser");
const crud = require("../crud");
const exists = require("../verifyDoc/exists");

module.exports.readWrite = {
  checkId: async userId => {
    try {
      logger.log(lG, lS, null, { userId });

      const doc = await exists.checkId("user", userId);
      logger.log(lG, lS, null, { doc });

      if (doc === false)
        throw new e.UserDoesNotExist(new Error().stack, userId);

      if (doc.account.permissions !== c.READ_WRITE) return false;

      return true;
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

      if (doc.account.permissions !== c.READ_WRITE) return false;
      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  }
};

module.exports.readOnly = {
  checkId: async userId => {
    try {
      logger.log(lG, lS, null, { userId });

      const doc = await exists.checkId("user", userId);
      logger.log(lG, lS, null, { doc });

      if (doc === false)
        throw new e.UserDoesNotExist(new Error().stack, userId);

      if (doc.account.permissions !== c.READ_ONLY) return false;

      return true;
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

      if (doc.account.permissions !== c.READ_ONLY) return false;

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  }
};

module.exports.admin = {
  checkId: async userId => {
    try {
      logger.log(lG, lS, null, { userId });

      const doc = await exists.checkId("user", userId);
      logger.log(lG, lS, null, { doc });

      if (doc === false)
        throw new e.UserDoesNotExist(new Error().stack, userId);

      if (doc.account.permissions !== c.ADMIN) return false;

      return true;
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

      if (doc.account.permissions !== c.ADMIN) return false;

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  }
};
