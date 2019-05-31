const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-VERIFY-DOC" // logSubgroup

module.exports = doc => {
  logger.log(lG, lS, null, { doc })

  if (doc === null || doc === undefined) {
    logger.log(lG, lS, "The document is either null or undefined")
    return false
  } else if (doc.constructor === Array && doc.length === 0) {
    logger.log(
      lG,
      lS,
      "The document was found but it is an empty array with length of 0"
    )
    return null
  } else {
    return true
  }
}
