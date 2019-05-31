const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const verifyDoc = require("./verifyDoc")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-VERIFY-DOC-AND-USER-READ-PERMISSIONS" // logSubgroup

module.exports = async (readerId, doc) => {
  logger.log(lG, lS, null, { readerId })
  logger.log(lG, lS, null, { doc })

  logger.log(lG, lS, null, { verifyDoc: verifyDoc(doc) })

  if (verifyDoc(doc) !== true) {
    return false
  } else {
    const canUserRead = await verifyUser.canUserRead(readerId)
    logger.log(lG, lS, null, { canUserRead })

    if (canUserRead !== true) {
      return false
    } else {
      return true
    }
  }
}
