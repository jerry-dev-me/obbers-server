const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-GET-PROFILE-FIELDS" // logSubgroup

const User = require("../../../../../models/user")

const basicProfile = require("../profiles/basicProfile")
const fullProfile = require("../profiles/fullProfile")
const personalProfile = require("../profiles/personalProfile")

const isSameUser = require("./isSameUser")
const isAccountActive = require("./isAccountActive")
const isAccountPrivate = require("./isAccountPrivate")
const isReaderFollowing = require("./isReaderFollowing")
const isUserBlocked = require("./isUserBlocked")

module.exports = async (readerId, idToRead) => {
  const foundUser = await User.findOne(
    { _id: idToRead },
    { followers: 1, blockedUsers: 1, "account.status": 1, settings: 1 }
  )

  logger.log(lG, lS, null, { foundUser })

  const { followers, blockedUsers, account, settings } = foundUser

  logger.log(lG, lS, null, { followers })
  logger.log(lG, lS, null, { blockedUsers })
  logger.log(lG, lS, null, { account })
  logger.log(lG, lS, null, { settings })

  if (foundUser === null || foundUser === undefined) {
    return null
  } else {
    if (isSameUser(readerId, idToRead) === true) {
      return personalProfile
    } else {
      if ((await isAccountActive(account.status)) !== true) {
        return null
      } else {
        if ((await isAccountPrivate(settings.private)) !== true) {
          if ((await isUserBlocked(readerId, blockedUsers)) === true) {
            return null
          } else {
            return fullProfile
          }
        } else {
          if ((await isReaderFollowing(readerId, followers)) !== true) {
            if ((await isUserBlocked(readerId, idToRead)) === true) {
              return null
            } else {
              return basicProfile
            }
          } else {
            if ((await isUserBlocked(readerId, idToRead)) === true) {
              return null
            } else {
              return fullProfile
            }
          }
        }
      }
    }
  }
}
