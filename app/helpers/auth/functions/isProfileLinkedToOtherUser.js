const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "IS-PROFILE-LINKED-TO-OTHER-USER" // logSubgroup

const findProfileId = require("./findProfileId")

module.exports = async (userId, profile) => {
  logger.log(lG, lS, null, { userId })
  logger.log(lG, lS, null, { profile })

  try {
    const foundProfile = await findProfileId(profile.provider, profile.id)

    logger.log(lG, lS, null, { foundProfile })

    if (!foundProfile) {
      logger.log(
        lG,
        lS,
        `Profile ID not found in the db and is not tied to any user record`
      )
      return false
    }
    if (foundProfile.id === userId) {
      logger.log(
        lG,
        lS,
        `Profile ID linked to this same user id in the req.user`
      )
      return false
    } else {
      logger.log(
        lG,
        lS,
        `Profile ID linked to other user id different that the one in req.user`
      )
      return true
    }
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
