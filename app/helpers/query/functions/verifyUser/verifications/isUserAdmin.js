const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-IS-USER-ADMIN" // logSubgroup

const User = require("../../../../../models/user")

module.exports = async userId => {
  const foundUser = await User.findOne({ _id: userId }, { account: 1 })

  logger.log(lG, lS, null, { foundUser })

  if (foundUser === null || foundUser === undefined) {
    logger.log(lG, lS, `User is null or undefined`)
    return null
  } else {
    const { permissions } = foundUser.account

    logger.log(lG, lS, null, {
      foundUserAccountPermissions: foundUser.account.permissions,
    })

    if (permissions !== "ADMIN") {
      logger.log(
        lG,
        lS,
        `User permission is not ADMIN, only ADMIN can do this operation`
      )
      return false
    } else {
      return true
    }
  }
}
