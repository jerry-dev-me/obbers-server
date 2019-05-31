const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-USER"; // logGroup
const lS = "IS-USER-FOLLOWING"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyUser");
const crud = require("../crud");
const exists = require("../verifyDoc/exists");
const isSameUser = require("./isSameUser");

module.exports = {
  checkId: async (userId, userIdToRead) => {
    try {
      logger.log(lG, lS, null, { userId });
      logger.log(lG, lS, null, { userIdToRead });

      const sameUser = isSameUser(userId, userIdToRead);
      logger.log(lG, lS, null, { sameUser });

      if (sameUser === true) return true;

      const doc = await exists.checkId("user", userIdToRead);
      logger.log(lG, lS, null, { doc });

      if (doc === false)
        throw new e.UserDoesNotExist(new Error().stack, userIdToRead);

      const followers = doc.followers;
      logger.log(lG, lS, null, { followers });

      if (followers.length === 0) return false;

      const isFound = h.isIdFoundInArray(userId, followers);
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

      const sameUser = isSameUser(userId, doc._id);
      logger.log(lG, lS, null, { sameUser });

      if (sameUser === true) return true;

      const followers = doc.followers;
      logger.log(lG, lS, null, { followers });

      if (followers.length === 0) return false;

      const isFound = h.isIdFoundInArray(userId, followers);
      logger.log(lG, lS, null, { isFound });

      return isFound;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  },
  checkArray: (userId, followersArray) => {
    try {
      logger.log(lG, lS, null, { userId });
      logger.log(lG, lS, null, { followersArray });

      if (followersArray.length === 0) return false;

      const isFound = h.isIdFoundInArray(userId, followersArray);
      logger.log(lG, lS, null, { isFound });

      return isFound;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyUserError(err);
    }
  }
};
