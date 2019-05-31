const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "GET-NUM-OF-CONNECTIONS" // logSubgroup

const User = require("../../../models/user")

module.exports = async userId => {
  logger.log(lG, lS, null, { userId })

  try {
    let numOfConnections = 0

    const foundUser = await User.findOne(
      { _id: userId },
      { "local.email": 1, "facebook.id": 1, "twitter.id": 1, "google.id": 1 }
    )

    logger.log(lG, lS, null, { foundUser })

    if (foundUser.local.email) {
      logger.log(lG, lS, `Email Linked`)
      numOfConnections++
    }
    if (foundUser.facebook.id) {
      logger.log(lG, lS, `Facebook Linked`)
      numOfConnections++
    }
    if (foundUser.twitter.id) {
      logger.log(lG, lS, `Twitter Linked`)
      numOfConnections++
    }
    if (foundUser.google.id) {
      logger.log(lG, lS, `Google Linked`)
      numOfConnections++
    }

    logger.log(lG, lS, null, { numOfConnections })

    return numOfConnections
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
