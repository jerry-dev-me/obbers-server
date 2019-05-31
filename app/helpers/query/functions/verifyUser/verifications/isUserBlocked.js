const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-IS-USER-BLOCKED" // logSubgroup

const User = require("../../../../../models/user")

const shouldWeFindUser = require("./shouldWeFindUser")

module.exports = async (readerId, idToRead) => {
  logger.log(lG, lS, null, { readerId })
  logger.log(lG, lS, null, { idToRead })

  let blockedUsers

  if (shouldWeFindUser(idToRead) === true) {
    const foundUser = await User.findOne({ _id: idToRead }, { blockedUsers: 1 })

    logger.log(lG, lS, null, { foundUser })

    blockedUsers = foundUser.blockedUsers
  } else {
    blockedUsers = idToRead
  }

  logger.log(lG, lS, null, { blockedUsers })

  if (blockedUsers === null || blockedUsers === undefined) {
    return false
  } else {
    if (blockedUsers.length === 0) {
      return false
    } else {
      let users = []

      blockedUsers.map(blockedUser => {
        users.push(blockedUser.toString())
      })

      logger.log(lG, lS, null, { users })

      return users.includes(readerId.toString())
    }
  }
}
