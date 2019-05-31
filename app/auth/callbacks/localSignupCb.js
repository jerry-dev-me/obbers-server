const h = require("../../helpers")

const lG = "AUTH" // logGroup
const lS = "PASSPORTJS-CB-LOCAL-SIGNUP" // logSubgroup

module.exports = async (req, email, password, done) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { email })
  h.logger.log(lG, lS, null, { password })

  try {
    if (!req.user) {
      const existingUser = await h.auth.findEmail(email)
      h.logger.log(lG, lS, null, { existingUser })

      if (existingUser) {
        return done(
          null,
          false,
          req.flash(
            "signupMessage",
            "Account using this email already exists, sign in"
          )
        )
      } else {
        const newUser = await h.auth.createNewUserWithEmail(email, password)

        h.logger.log(lG, lS, null, { newUser })

        return done(null, newUser)
      }
    } else {
      const updatedUser = await h.auth.connectEmail(req.user, email, password)

      h.logger.log(lG, lS, null, { updatedUser })

      return done(null, updatedUser)
    }
  } catch (error) {
    h.logger.log(lG, lS, null, { error })
    return done(error)
  }
}
