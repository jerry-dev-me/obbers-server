const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-GET-USER-ID-DOC-CREATOR" // logSubgroup

module.exports = doc => {
  logger.log(lG, lS, null, { doc })

  if (doc && doc.userId) {
    logger.log(lG, lS, "doc && doc.userId found", { docUserId: doc.userId })

    if (doc.userId && doc.userId._id) {
      logger.log(lG, lS, "doc.userId && doc.userId._id found", {
        docUserId: doc.userId._id,
      })
      return doc.userId._id.toString()
    } else {
      return doc.userId.toString()
    }
  } else if (doc && doc._id) {
    logger.log(lG, lS, "doc && doc._id found", { docId: doc._id })
    return doc._id.toString()
  } else {
    logger.log(lG, lS, "doc.userId || doc.userId._id || doc._id not found")
    return false
  }
}
