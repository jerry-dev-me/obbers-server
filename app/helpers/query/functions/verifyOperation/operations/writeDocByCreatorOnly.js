const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const voHelpers = require("../helpers")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-WRITE-DOC-BY-CREATOR-ONLY" // logSubgroup

module.exports = async (writerId, doc) => {
  logger.log(lG, lS, null, { writerId })
  logger.log(lG, lS, null, { doc })

  const writeDocVerification = await voHelpers.verifyDocAndUserWritePermissions(
    writerId,
    doc
  )
  logger.log(lG, lS, null, { writeDocVerification })

  if (writeDocVerification !== true) {
    return false
  } else {
    const isSameUser = verifyUser.isSameUser(
      writerId,
      voHelpers.getUserIdDocCreator(doc)
    )
    logger.log(lG, lS, null, { isSameUser })

    if (isSameUser !== true) {
      return false
    } else {
      return true
    }
  }
}
