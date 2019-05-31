const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const voHelpers = require("../helpers")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-WRITE-DOC" // logSubgroup

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
    const creatorId = voHelpers.getUserIdDocCreator(doc)
    logger.log(lG, lS, null, { creatorId })

    const canUserReadUser = await verifyUser.canUserReadUser(
      writerId,
      creatorId
    )
    logger.log(lG, lS, null, { canUserReadUser })

    if (canUserReadUser !== true) {
      return false
    } else {
      return true
    }
  }
}
