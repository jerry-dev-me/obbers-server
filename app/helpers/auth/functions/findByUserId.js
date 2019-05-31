const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "FIND-BY-USER-ID" // logSubgroup

const User = require("../../../models/user")

module.exports = async id => {
  logger.log(lG, lS, null, { id })

  try {
    const foundUser = await User.findById(id)
    logger.log(lG, lS, null, { foundUser })
    return foundUser
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
