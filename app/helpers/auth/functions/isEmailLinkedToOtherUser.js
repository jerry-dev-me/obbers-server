const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "IS-EMAIL-LINKED-TO-OTHER-USER" // logSubgroup

const findEmail = require("./findEmail")

module.exports = async (userId, email) => {
  logger.log(lG, lS, null, { userId })
  logger.log(lG, lS, null, { email })

  try {
    const foundUser = await findEmail(email)

    logger.log(lG, lS, null, { foundUser })

    if (!foundUser) {
      logger.log(lG, lS, `Email not found in database`)
      return false
    }
    if (foundUser.id === userId) {
      logger.log(lG, lS, `Email linked to this same userId in the req.user`)
      return false
    } else {
      logger.log(
        lG,
        lS,
        `Email linked to other userId different that the one in req.user`
      )
      return true
    }
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
