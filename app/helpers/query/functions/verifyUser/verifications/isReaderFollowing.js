const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-IS-READER-FOLLOWING" // logSubgroup

const User = require("../../../../../models/user")

const shouldWeFindUser = require("./shouldWeFindUser")

module.exports = async (readerId, idToRead) => {
  logger.log(lG, lS, null, { readerId })
  logger.log(lG, lS, null, { idToRead })

  let followers

  if (shouldWeFindUser(idToRead) === true) {
    const foundUser = await User.findOne({ _id: idToRead }, { followers: 1 })
    logger.log(lG, lS, null, { foundUser })

    followers = foundUser.followers
  } else {
    followers = idToRead
  }

  logger.log(lG, lS, null, { followers })

  if (followers === null || followers === undefined) {
    return false
  } else {
    if (followers.length === 0) {
      return false
    } else {
      let users = []

      followers.map(follower => {
        users.push(follower.toString())
      })

      logger.log(lG, lS, null, { users })

      return users.includes(readerId.toString())
    }
  }
}
