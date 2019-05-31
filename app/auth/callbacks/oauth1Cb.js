const h = require("../../helpers")

const lG = "AUTH" // logGroup
const lS = "PASSPORTJS-CB-OAUTH1" // logSubgroup

module.exports = async (req, token, tokenSecret, profile, done) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { token })
  h.logger.log(lG, lS, null, { tokenSecret })
  h.logger.log(lG, lS, null, { profile })

  try {
    if (!req.user) {
      const foundProfile = await h.auth.findProfileId(
        profile.provider,
        profile.id
      )

      h.logger.log(lG, lS, null, { foundProfile })

      if (foundProfile) {
        return done(null, foundProfile)
      } else {
        const newUser = await h.auth.createNewUserWithProfileId(
          profile.provider,
          profile
        )

        h.logger.log(lG, lS, null, { newUser })

        return done(null, newUser)
      }
    } else {
      h.logger.log(
        lG,
        lS,
        `User is currenty signed in, connecting profileID to this account`
      )

      const updatedUser = await h.auth.connectProfile(req.user, profile, token)

      h.logger.log(lG, lS, null, { updatedUser })

      return done(null, updatedUser)
    }
  } catch (error) {
    h.logger.log(lG, lS, null, { error })
    return done(error)
  }
}
