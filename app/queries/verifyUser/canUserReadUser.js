const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-USER"; // logGroup
const lS = "CAN-USER-READ-USER"; // logSubgroup

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

module.exports.checkId = async (readerId, idToRead) => {
  try {
    logger.log(lG, lS, null, { readerId });
    logger.log(lG, lS, null, { idToRead });

    const canUserReadCheck = await canUserRead.checkId(readerId);
    logger.log(lG, lS, null, { canUserReadCheck });

    if (canUserReadCheck === false)
      throw new e.UserCannotRead(new Error().stack, readerId);

    const idToReadDoc = await exists.checkId("user", idToRead);
    logger.log(lG, lS, null, { idToReadDoc });

    if (idToReadDoc === false)
      throw new e.UserDoesNotExist(new Error().stack, idToReadDoc);

    const isSameUserCheck = isSameUser(readerId, idToReadDoc._id);
    logger.log(lG, lS, null, { isSameUserCheck });

    if (isSameUserCheck === true) return true;

    const isFoundUserActive = isAccount.statusActive.checkDoc(idToReadDoc);
    logger.log(lG, lS, null, { isFoundUserActive });

    const isFoundUserSuspended = isAccount.statusSuspended.checkDoc(
      idToReadDoc
    );
    logger.log(lG, lS, null, { isFoundUserSuspended });

    if (!(isFoundUserActive === true || isFoundUserSuspended === true))
      throw new e.UserMustBeActiveOrSuspended(new Error().stack, idToRead);

    const isUserBlockedCheck = isUserBlocked.checkDoc(readerId, idToReadDoc);
    logger.log(lG, lS, null, { isUserBlockedCheck });

    if (isUserBlockedCheck === true)
      throw new e.UserHasBlockedUser(new Error().stack, idToRead);

    const isUserPrivate = isSettings.private.checkDoc(idToReadDoc);
    logger.log(lG, lS, null, { isUserPrivate });

    const isUserFollowingCheck = isUserFollowing.checkDoc(
      readerId,
      idToReadDoc
    );
    logger.log(lG, lS, null, { isUserFollowing });

    return true;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleVerifyUserError(err);
  }
};

module.exports.checkDocs = (readerDoc, idToReadDoc) => {
  try {
    logger.log(lG, lS, null, { readerDoc });
    logger.log(lG, lS, null, { idToReadDoc });

    const canUserReadCheck = canUserRead.checkDoc(readerDoc);
    logger.log(lG, lS, null, { canUserReadCheck });

    if (canUserReadCheck === false)
      throw new e.UserCannotRead(new Error().stack, readerDoc._id);

    const isSameUserCheck = isSameUser(readerId, idToReadDoc._id);
    logger.log(lG, lS, null, { isSameUserCheck });

    if (isSameUserCheck === true) return true;

    const isFoundUserActive = isAccount.statusActive.checkDoc(idToReadDoc);
    logger.log(lG, lS, null, { isFoundUserActive });

    const isFoundUserSuspended = isAccount.statusSuspended.checkDoc(
      idToReadDoc
    );
    logger.log(lG, lS, null, { isFoundUserSuspended });

    if (!(isFoundUserActive === true || isFoundUserSuspended === true))
      throw new e.UserMustBeActiveOrSuspended(new Error().stack, idToReadDoc);

    const isUserBlockedCheck = isUserBlocked.checkDoc(readerId, idToReadDoc);
    logger.log(lG, lS, null, { isUserBlockedCheck });

    if (isUserBlockedCheck === true)
      throw new e.UserHasBlockedUser(new Error().stack, idToReadDoc);

    const isUserPrivate = isSettings.private.checkDoc(idToReadDoc);
    logger.log(lG, lS, null, { isUserPrivate });

    const isUserFollowingCheck = isUserFollowing.checkDoc(
      readerId,
      idToReadDoc
    );
    logger.log(lG, lS, null, { isUserFollowing });

    return true;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleVerifyUserError(err);
  }
};
