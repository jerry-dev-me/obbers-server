const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "CREATE-NEW-USER-WITH-PROFILE-ID" // logSubgroup

const User = require("../../../models/user")

module.exports = async (provider, profile) => {
  logger.log(lG, lS, null, { provider })
  logger.log(lG, lS, null, { profile })

  let newUser

  if (provider === "facebook") {
    newUser = new User({
      "facebook.id": profile.id,
      "facebook.fullName": profile.displayName,
      "facebook.profilePic": profile.photos[0].value || "",
    })
  }
  if (provider === "twitter") {
    newUser = new User({
      "twitter.id": profile.id,
      "twitter.fullName": profile.displayName,
      "twitter.profilePic": profile.photos[0].value || "",
    })
  }
  if (provider === "google") {
    newUser = new User({
      "google.id": profile.id,
      "google.fullName": profile.displayName,
      "google.profilePic": profile.photos[0].value || "",
    })
  }

  logger.log(lG, lS, null, { newUser })

  try {
    const savedUser = await newUser.save()

    logger.log(lG, lS, null, { savedUser })

    return savedUser
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
