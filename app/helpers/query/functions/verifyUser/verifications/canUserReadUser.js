const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-CAN-USER-READ-USER" // logSubgroup

const User = require("../../../../../models/user")

const canUserRead = require("./canUserRead")

const isSameUser = require("./isSameUser")
const isAccountPrivate = require("./isAccountPrivate")
const isReaderFollowing = require("./isReaderFollowing")
const isUserBlocked = require("./isUserBlocked")

module.exports = async (readerId, idToRead) => {
  logger.log(lG, lS, null, { readerId })
  logger.log(lG, lS, null, { idToRead })

  const foundUser = await User.findOne(
    { _id: idToRead },
    { followers: 1, blockedUsers: 1, "account.status": 1, settings: 1 }
  )

  logger.log(lG, lS, null, { canUserRead })
  logger.log(lG, lS, null, { foundUser })

  if ((await canUserRead(readerId)) !== true) {
    logger.log(lG, lS, `User readerId does not have read permissions`)
    return false
  } else if (foundUser === null || foundUser === undefined) {
    logger.log(lG, lS, `User idToRead is null or undefined`)
    return null
  } else {
    const { account, blockedUsers, settings, followers } = foundUser

    logger.log(lG, lS, null, { account })
    logger.log(lG, lS, null, { blockedUsers })
    logger.log(lG, lS, null, { settings })
    logger.log(lG, lS, null, { followers })

    if (account.status === "ACTIVE" || account.status === "SUSPENDED") {
      if ((await isSameUser(readerId, idToRead)) === true) {
        return true
      } else {
        if ((await isAccountPrivate(settings.private)) === true) {
          if ((await isReaderFollowing(readerId, followers)) === true) {
            if ((await isUserBlocked(readerId, blockedUsers)) === true) {
              logger.log(
                lG,
                lS,
                `User can not read because it has been blocked by user idToRead`
              )
              return false
            } else {
              return true
            }
          } else {
            logger.log(
              lG,
              lS,
              `User can not read because idToRead is private and user readerId
               is not a follower of user idToRead`
            )
            return false
          }
        } else {
          if ((await isUserBlocked(readerId, blockedUsers)) === true) {
            logger.log(
              lG,
              lS,
              `User can not read because it has been blocked by user idToRead`
            )
            return false
          } else {
            return true
          }
        }
      }
    } else {
      logger.log(lG, lS, `User can not read because of account status`, {
        accountStatus: account.status,
      })
      return false
    }
  }
}
