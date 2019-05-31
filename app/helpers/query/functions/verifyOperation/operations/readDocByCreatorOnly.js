const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const voHelpers = require("../helpers")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-READ-DOC-BY-CREATOR-ONLY" // logSubgroup

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
    const isSameUser = verifyUser.isSameUser(
      readerId,
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
