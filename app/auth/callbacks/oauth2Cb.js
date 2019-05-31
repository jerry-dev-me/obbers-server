const h = require("../../helpers")

const lG = "AUTH" // logGroup
const lS = "PASSPORTJS-CB-OAUTH2" // logSubgroup

module.exports = async (req, accessToken, refreshToken, profile, done) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { accessToken })
  h.logger.log(lG, lS, null, { refreshToken })
  h.logger.log(lG, lS, null, { profile })

  if (req && req.user) {
    h.logger.log(lG, lS, `req.user`, { reqUser: req.user })
  }

  if (!req.user) {
    h.logger.log(lG, lS, `req.user was not found`)

    const foundProfile = await h.auth.findProfileId(
      profile.provider,
      profile.id
    )

    h.logger.log(lG, lS, null, { foundProfile })

    if (foundProfile) {
      h.logger.log(lG, lS, `ProfileID exists in db, signing in`)
      return done(null, foundProfile)
    } else {
      h.logger.log(lG, lS, `ProfileID does not exists in db, signing up`)

      const newUser = await h.auth.createNewUserWithProfileId(
        profile.provider,
        profile
      )

      h.logger.log(lG, lS, null, { newUser })

      return done(null, newUser)
    }
  } else {
    h.logger.log(lG, lS, `req.user`, { reqUser: req.user })

    h.logger.log(
      lG,
      lS,
      `User is currently signed in, connecting profileID to this account`
    )

    const updatedUser = await h.auth.connectProfile(
      req.user,
      profile,
      accessToken
    )

    h.logger.log(lG, lS, null, { updatedUser })

    return done(null, updatedUser)
  }
}
