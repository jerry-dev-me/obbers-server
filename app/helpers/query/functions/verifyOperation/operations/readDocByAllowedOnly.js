const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const voHelpers = require("../helpers")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-READ-DOC-BY-ALLOWED-ONLY" // logSubgroup

module.exports = async (readerId, doc, allowedIds) => {
  logger.log(lG, lS, null, { readerId })
  logger.log(lG, lS, null, { doc })
  logger.log(lG, lS, null, { allowedIds })

  let isReaderIdAnAllowedId

  await allowedIds.map(async allowedId => {
    if (allowedId.toString() !== readerId.toString()) {
      logger.log(lG, lS, "readerId not found in allowedIds array")
      isReaderIdAnAllowedId = false
    } else {
      logger.log(lG, lS, "readerId found in allowedIds array")
      isReaderIdAnAllowedId = true
    }
  })

  logger.log(lG, lS, null, { isReaderIdAnAllowedId })

  if (isReaderIdAnAllowedId !== true) {
    return false
  } else {
    const readDocVerification = await voHelpers.verifyDocAndUserReadPermissions(
      readerId,
      doc
    )
    logger.log(lG, lS, null, { readDocVerification })

    if (readDocVerification !== true) {
      return false
    } else {
      return true
    }
  }
}
