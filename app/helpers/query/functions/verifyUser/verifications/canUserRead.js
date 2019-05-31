const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-CAN-USER-READ" // logSubgroup

const User = require("../../../../../models/user")

module.exports = async readerId => {
  logger.log(lG, lS, null, { readerId })

  const foundUser = await User.findOne(
    { _id: readerId },
    { "account.status": 1, "account.permissions": 1 }
  )

  logger.log(lG, lS, null, { foundUser })

  if (foundUser === null || foundUser === undefined) {
    logger.log(lG, lS, `User is null or undefined`)
    return null
  } else {
    const { account } = foundUser

    logger.log(lG, lS, null, {
      foundUserAccountStatus: foundUser.account.status,
    })

    logger.log(lG, lS, null, {
      foundUserAccountPermissions: foundUser.account.permisions,
    })

    if (
      !(
        account.status === "ACTIVE" ||
        (account.status === "SUSPENDED" &&
          account.permissions === "READ_WRITE") ||
        account.permissions === "READ_ONLY"
      )
    ) {
      logger.log(
        lG,
        lS,
        `User can not read because of account status or permission`
      )
      return false
    } else {
      return true
    }
  }
}
