const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-USER"; // logGroup
const lS = "IS-USER-BLOCKED"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyUser");
const crud = require("../crud");
const exists = require("../verifyDoc/exists");

module.exports = {
  checkId: async (userId, userIdToRead) => {
    try {
      logger.log(lG, lS, null, { userId });
      logger.log(lG, lS, null, { userIdToRead });

      const doc = await exists.checkId("user", userIdToRead);
      logger.log(lG, lS, null, { doc });

      if (doc === false)
        throw new e.UserDoesNotExist(new Error().stack, userIdToRead);

      const blockedUsers = doc.blockedUsers;
      logger.log(lG, lS, null, { blockedUsers });

      if (blockedUsers.length === 0) return false;

      const isFound = h.isIdFoundInArray(userId, blockedUsers);
      logger.log(lG, lS, null, { isFound });

      return isFound;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  },
  checkDoc: (userId, doc) => {
    try {
      logger.log(lG, lS, null, { userId });
      logger.log(lG, lS, null, { doc });

      doc = exists.checkDoc(doc);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.UserDoesNotExist(new Error().stack);

      const blockedUsers = doc.blockedUsers;
      logger.log(lG, lS, null, { blockedUsers });

      if (blockedUsers.length === 0) return false;

      const isFound = h.isIdFoundInArray(userId, blockedUsers);
      logger.log(lG, lS, null, { isFound });

      return isFound;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  },
  checkArray: (userId, blockedUsersArray) => {
    try {
      logger.log(lG, lS, null, { userId });
      logger.log(lG, lS, null, { blockedUsersArray });

      if (blockedUsersArray.length === 0) return false;

      const isFound = h.isIdFoundInArray(userId, blockedUsersArray);
      logger.log(lG, lS, null, { isFound });

      return isFound;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  }
};
