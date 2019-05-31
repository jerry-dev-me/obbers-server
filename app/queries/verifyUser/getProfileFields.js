const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-USER"; // logGroup
const lS = "GET-PROFILE-F"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyUser");
const crud = require("../crud");

const exists = require("../verifyDoc/exists");
const canUserRead = require("./canUserRead");
const isSameUser = require("./isSameUser");
const isAccount = require("./isAccount");
const isSettings = require("./isSettings");
const isUserFollowing = require("./isUserFollowing");
const isUserBlocked = require("./isUserBlocked");

const profiles = require("./profiles");

module.exports = async (readerId, idToRead) => {
  try {
    logger.log(lG, lS, null, { readerId });
    logger.log(lG, lS, null, { idToRead });

    const canUserReadCheck = await canUserRead.checkId(readerId);
    logger.log(lG, lS, null, { canUserReadCheck });

    if (canUserReadCheck === false)
      throw new e.UserCannotRead(new Error().stack, readerId);

    const doc = await exists.checkId("user", idToRead);
    logger.log(lG, lS, null, { doc });

    if (doc === false)
      throw new e.UserDoesNotExist(new Error().stack, idToRead);

    const isSameUserCheck = isSameUser(readerId, doc._id);
    logger.log(lG, lS, null, { isSameUserCheck });

    if (isSameUserCheck === true) return profiles.personal;

    const isFoundUserActive = isAccount.statusActive.checkDoc(doc);
    logger.log(lG, lS, null, { isFoundUserActive });

    const isFoundUserSuspended = isAccount.statusSuspended.checkDoc(doc);
    logger.log(lG, lS, null, { isFoundUserSuspended });

    if (!(isFoundUserActive === true || isFoundUserSuspended === true))
      throw new e.UserMustBeActiveOrSuspended(new Error().stack, idToRead);

    const isUserBlockedCheck = isUserBlocked.checkDoc(readerId, doc);
    logger.log(lG, lS, null, { isUserBlockedCheck });

    if (isUserBlockedCheck === true)
      throw new e.UserHasBlockedUser(new Error().stack, idToRead);

    const isUserPrivate = isSettings.private.checkDoc(doc);
    logger.log(lG, lS, null, { isUserPrivate });

    const isUserFollowingCheck = isUserFollowing.checkDoc(readerId, doc);
    logger.log(lG, lS, null, { isUserFollowingCheck });

    if (isUserPrivate === true && isUserFollowingCheck === false)
      return profiles.basic;

    return profiles.full;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleVerifyUserError(err);
  }
};
