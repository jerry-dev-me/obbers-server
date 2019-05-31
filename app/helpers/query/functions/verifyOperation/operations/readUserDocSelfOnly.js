const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const voHelpers = require("../helpers")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-READ-USER-DOC-SELF-ONLY" // logSubgroup

module.exports = async (readerId, userDoc) => {
  logger.log(lG, lS, null, { readerId })
  logger.log(lG, lS, null, { userDoc })

  const readDocVerification = await voHelpers.verifyDocAndUserReadPermissions(
    readerId,
    userDoc
  )
  logger.log(lG, lS, null, { readDocVerification })

  if (readDocVerification !== true) {
    return false
  } else {
    const isSameUser = verifyUser.isSameUser(readerId, userDoc._id)
    logger.log(lG, lS, null, { isSameUser })

    if (isSameUser !== true) {
      return false
    } else {
      return true
    }
  }
}
