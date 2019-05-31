const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "CONNECT-EMAIL" // logSubgroup

const isEmailLinkedToOtherUser = require("./isEmailLinkedToOtherUser")

module.exports = async (user, email, password) => {
  logger.log(lG, lS, null, { user })
  logger.log(lG, lS, null, { email })
  logger.log(lG, lS, null, { password })

  logger.log(lG, lS, `Connecting this email to an existing account`)

  try {
    if ((await isEmailLinkedToOtherUser(user.id, email)) === true) {
      logger.log(
        lG,
        lS,
        `Can not link this email because it is linked to an existing account`
      )
      return false
    } else {
      if (user.local && user.local.email && user.local.email === email) {
        logger.log(lG, lS, `Email is already linked to this account`)
      }
      user.local.email = email
      user.local.password = user.generateHash(password)
      const savedUser = await user.save()

      logger.log(lG, lS, null, { savedUser })
      logger.log(lG, lS, null, { savedUserLocal: savedUser.local })

      return savedUser
    }
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
