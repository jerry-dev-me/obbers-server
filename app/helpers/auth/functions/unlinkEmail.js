const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "UNLINK-EMAIL" // logSubgroup

const stringifyCircularJSON = require("../../utils/stringifyCircularJSON")

const getNumOfConnections = require("./getNumOfConnections")

module.exports = async (res, user, email) => {
  logger.log(lG, lS, null, { res: stringifyCircularJSON(res) })
  logger.log(lG, lS, null, { user })
  logger.log(lG, lS, null, { email })

  try {
    const numOfConnections = await getNumOfConnections(user.id)

    logger.log(lG, lS, null, { numOfConnections })

    if (numOfConnections > 1) {
      user.local = undefined
      // user.local.email = undefined;
      // user.local.password = undefined;
      const savedUser = await user.save()

      logger.log(lG, lS, null, { savedUser })

      if (savedUser) {
        res.redirect("/dashboard")
      }
    } else {
      logger.log(
        lG,
        lS,
        `Cannot unlink email, there must be at least 1 linked connection`
      )

      res.redirect("/dashboard")
    }
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
