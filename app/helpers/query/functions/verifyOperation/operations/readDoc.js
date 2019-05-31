const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const voHelpers = require("../helpers")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-READ-DOC" // logSubgroup

module.exports = async (readerId, doc) => {
  logger.log(lG, lS, null, { readerId })
  logger.log(lG, lS, null, { doc })

  const readDocVerification = await voHelpers.verifyDocAndUserReadPermissions(
    readerId,
    doc
  )
  logger.log(lG, lS, null, { readDocVerification })

  if (readDocVerification !== true) {
    return false
  } else {
    const creatorId = voHelpers.getUserIdDocCreator(doc)
    logger.log(lG, lS, null, { creatorId })

    const canUserReadUser = await verifyUser.canUserReadUser(
      readerId,
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
