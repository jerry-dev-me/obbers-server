const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-WRITE-USER-DOC-SELF-ONLY" // logSubgroup

const voHelpers = require("../helpers")

module.exports = async (writerId, userDoc) => {
  logger.log(lG, lS, null, { writerId })
  logger.log(lG, lS, null, { userDoc })

  const writeDocVerification = await voHelpers.verifyDocAndUserWritePermissions(
    writerId,
    userDoc
  )
  logger.log(lG, lS, null, { writeDocVerification })

  if (writeDocVerification !== true) {
    return false
  } else {
    const isSameUser = verifyUser.isSameUser(writerId, userDoc._id)
    logger.log(lG, lS, null, { isSameUser })

    if (isSameUser !== true) {
      return false
    } else {
      return true
    }
  }
}
