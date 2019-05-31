const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-IS-SAME-USER" // logSubgroup

module.exports = (readerId, idToRead) => {
  logger.log(lG, lS, null, { readerId })
  logger.log(lG, lS, null, { idToRead })

  if (readerId.toString() === idToRead.toString()) {
    logger.log(lG, lS, `isSameUser === true`)
    return true
  } else {
    logger.log(lG, lS, `isSameUser === false`)
    return false
  }
}
