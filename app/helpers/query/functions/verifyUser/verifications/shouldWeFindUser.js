const _ = require("lodash")

const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-SHOULD-WE-FIND-USER" // logSubgroup

module.exports = idToRead => {
  logger.log(lG, lS, null, { idToRead })

  if (idToRead.constructor === Array) {
    return false
  } else if (
    typeof idToRead === "string" ||
    idToRead instanceof String ||
    idToRead.constructor === String
  ) {
    return true
  } else if (idToRead instanceof Object) {
    if (_.size(idToRead) <= 2) return true
  }
}
