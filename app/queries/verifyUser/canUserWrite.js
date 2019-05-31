const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-USER"; // logGroup
const lS = "CAN-USER-WRITE"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyUser");
const crud = require("../crud");
const isAccount = require("./isAccount");
const isPermissions = require("./isPermissions");
const exists = require("../verifyDoc/exists");

module.exports = {
  checkId: async userId => {
    try {
      logger.log(lG, lS, null, { userId });

      const doc = await exists.checkId("user", userId);
      logger.log(lG, lS, null, { doc });

      if (doc === false)
        throw new e.UserDoesNotExist(new Error().stack, userId);

      const isActive = await isAccount.statusActive.checkDoc(doc);
      logger.log(lG, lS, null, { isActive });

      if (isActive === false) return false;

      const isPermissionsReadWrite = await isPermissions.readWrite.checkDoc(
        doc
      );
      logger.log(lG, lS, null, { isPermissionsReadWrite });

      const isPermissionsAdmin = await isPermissions.admin.checkDoc(doc);
      logger.log(lG, lS, null, { isPermissionsAdmin });

      if (!(isPermissionsReadWrite === true || isPermissionsAdmin === true))
        return false;

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

      const isActive = isAccount.statusActive.checkDoc(doc);
      logger.log(lG, lS, null, { isActive });

      if (isActive === false) return false;

      const isPermissionsReadWrite = isPermissions.readWrite.checkDoc(doc);
      logger.log(lG, lS, null, { isPermissionsReadWrite });

      const isPermissionsAdmin = isPermissions.admin.checkDoc(doc);
      logger.log(lG, lS, null, { isPermissionsAdmin });

      if (!(isPermissionsReadWrite === true || isPermissionsAdmin === true))
        return false;

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  }
};
