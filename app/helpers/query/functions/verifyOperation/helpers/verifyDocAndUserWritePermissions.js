const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const verifyDoc = require("./verifyDoc")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-VERIFY-DOC-AND-USER-WRITE-PERMISSIONS" // logSubgroup

module.exports = async (writerId, doc) => {
  logger.log(lG, lS, null, { writerId })
  logger.log(lG, lS, null, { doc })

  logger.log(lG, lS, null, { verifyDoc: verifyDoc(doc) })

  if (verifyDoc(doc) !== true) {
    return false
  } else {
    const canUserWrite = await verifyUser.canUserWrite(writerId)
    logger.log(lG, lS, null, { canUserWrite })

    if (canUserWrite !== true) {
      return false
    } else {
      return true
    }
  }
}
