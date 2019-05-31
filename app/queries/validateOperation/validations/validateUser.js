const logger = require("../../../../lib/logger");
const lG = "QUERIES-VALIDATE-OP"; // logGroup
const lS = "VALIDATE-USER"; // logSubgroup

const e = require("../../../errors/queries/validateOperation");
const verifyDoc = require("../../verifyDoc");
const verifyUser = require("../../verifyUser");

module.exports.read = async userId => {
  try {
    logger.log(lG, lS, null, { userId });

    const userDoc = await verifyDoc.exists.checkId("user", userId);
    logger.log(lG, lS, null, { userDoc });

    if (userDoc === false)
      throw new e.DocDoesNotExist("user", new Error().stack);

    const canUserRead = verifyUser.canUserRead.checkDoc(userDoc);
    logger.log(lG, lS, null, { canUserRead });

    if (canUserRead === false) throw new e.UserCannotRead(new Error().stack);

    return { userDoc };
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleValidateOperationError(err);
  }
};

module.exports.write = async userId => {
  try {
    logger.log(lG, lS, null, { userId });

    const userDoc = await verifyDoc.exists.checkId("user", userId);
    logger.log(lG, lS, null, { userDoc });

    if (userDoc === false)
      throw new e.DocDoesNotExist("user", new Error().stack);

    const canUserWrite = verifyUser.canUserWrite.checkDoc(userDoc);
    logger.log(lG, lS, null, { canUserWrite });

    if (canUserWrite === false) throw new e.UserCannotWrite(new Error().stack);

    return { userDoc };
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleValidateOperationError(err);
  }
};
