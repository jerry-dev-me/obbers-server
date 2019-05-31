const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-CREATE-NEW-DOC" // logSubgroup

module.exports = async writerId => {
  logger.log(lG, lS, null, { writerId })

  const canUserWrite = await verifyUser.canUserWrite(writerId)
  logger.log(lG, lS, null, { canUserWrite })

  if (canUserWrite !== true) {
    return false
  } else {
    return true
  }
}
