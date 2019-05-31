const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "UNLINK-PROFILE" // logSubgroup

const stringifyCircularJSON = require("../../utils/stringifyCircularJSON")

const getNumOfConnections = require("./getNumOfConnections")

module.exports = async (res, user, provider) => {
  logger.log(lG, lS, null, { res: stringifyCircularJSON(res) })
  logger.log(lG, lS, null, { user })
  logger.log(lG, lS, null, { provider })

  try {
    const numOfConnections = await getNumOfConnections(user.id)

    logger.log(lG, lS, null, { numOfConnections })

    if (numOfConnections > 1) {
      if (provider === "facebook") {
        user.facebook = undefined
        // user.facebook.id = undefined;
        // user.facebook.token = undefined;
        // user.facebook.fullName = undefined;
        // user.facebook.email = undefined;
        // user.facebook.profilePic = undefined;
      }
      if (provider === "twitter") {
        user.twitter = undefined
        // user.twitter.id = undefined;
        // user.twitter.token = undefined;
        // user.twitter.fullName = undefined;
        // user.twitter.username = undefined;
        // user.twitter.profilePic = undefined;
      }
      if (provider === "google") {
        user.google = undefined
        // user.google.id = undefined;
        // user.google.token = undefined;
        // user.google.fullName = undefined;
        // user.google.email = undefined;
        // user.google.profilePic = undefined;
      }

      const savedUser = await user.save()

      logger.log(lG, lS, null, { savedUser })

      if (savedUser) {
        res.redirect("/dashboard")
      }
    } else {
      logger.log(
        lG,
        lS,
        `Cannot unlink profileId, there must be at least 1 linked connection`
      )
      res.redirect("/dashboard")
    }
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
