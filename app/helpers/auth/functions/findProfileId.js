const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "FIND-PROFILE-ID" // logSubgroup

const User = require("../../../models/user")

module.exports = async (provider, profileID) => {
  logger.log(lG, lS, null, { provider })
  logger.log(lG, lS, null, { profileID })

  try {
    if (provider === "facebook") {
      const foundUser = await User.findOne({ "facebook.id": profileID })
      logger.log(lG, lS, null, { foundUser })
      return foundUser
    }
    if (provider === "twitter") {
      const foundUser = await User.findOne({ "twitter.id": profileID })
      logger.log(lG, lS, null, { foundUser })
      return foundUser
    }
    if (provider === "google") {
      const foundUser = await User.findOne({ "google.id": profileID })
      logger.log(lG, lS, null, { foundUser })
      return foundUser
    }
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
