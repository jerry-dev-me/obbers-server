const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-CAN-USER-WRITE" // logSubgroup

const User = require("../../../../../models/user")

module.exports = async writerId => {
  const foundUser = await User.findOne({ _id: writerId }, { account: 1 })

  logger.log(lG, lS, null, { foundUser })

  if (foundUser === null || foundUser === undefined) {
    logger.log(lG, lS, `User is null or undefined`)
    return null
  } else {
    const { status, permissions } = foundUser.account

    logger.log(lG, lS, null, { foundUserAccountStatus: foundUser.account })

    if (!(status === "ACTIVE" && permissions === "READ_WRITE")) {
      logger.log(
        lG,
        lS,
        `User does not have write permission or account is not ACTIVE`
      )
      return false
    } else {
      return true
    }
  }
}
