const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "CONNECT-PROFILE" // logSubgroup

const isProfileLinkedToOtherUser = require("./isProfileLinkedToOtherUser")

module.exports = async (user, profile, token) => {
  logger.log(lG, lS, null, { user })
  logger.log(lG, lS, null, { profile })
  logger.log(lG, lS, null, { token })

  logger.log(lG, lS, `Connecting this profile to an existing account`)

  try {
    if ((await isProfileLinkedToOtherUser(user.id, profile)) === true) {
      logger.log(
        lG,
        lS,
        `Can not link this profile because it is linked to an existing account`
      )
      return false
    } else {
      if (profile.provider === "facebook") {
        if (
          user.facebook &&
          user.facebook.id &&
          user.facebook.id === profile.id
        ) {
          logger.log(lG, lS, `Profile ID is already linked to this account`)
        }
        user.facebook.id = profile.id
        user.facebook.token = token
        user.facebook.fullName =
          profile.name.givenName + " " + profile.name.familyName
        user.facebook.email = profile.emails[0].value
        user.facebook.profilePic = profile.photos[0].value
      }
      if (profile.provider === "twitter") {
        if (user.twitter && user.twitter.id && user.twitter.id === profile.id) {
          logger.log(lG, lS, `Profile ID is already linked to this account`)
        }
        user.twitter.id = profile.id
        user.twitter.token = token
        user.twitter.fullName = profile.displayName
        user.twitter.username = profile.username
        user.twitter.profilePic = profile.photos[0].value
      }
      if (profile.provider === "google") {
        if (user.google && user.google.id && user.google.id === profile.id) {
          logger.log(lG, lS, `Profile ID is already linked to this account`)
        }
        user.google.id = profile.id
        user.google.token = token
        user.google.fullName =
          profile.name.givenName + " " + profile.name.familyName
        user.google.email = profile.emails[0].value
        user.google.profilePic = profile.photos[0].value
      }

      const savedUser = await user.save()

      logger.log(lG, lS, null, { savedUser })

      return savedUser
    }
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
