const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "FIND-EMAIL" // logSubgroup

const User = require("../../../models/user")

module.exports = async email => {
  logger.log(lG, lS, null, { email })

  try {
    const foundUser = await User.findOne({ "local.email": email })
    logger.log(lG, lS, null, { foundUser })
    return foundUser
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
