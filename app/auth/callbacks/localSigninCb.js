const h = require("../../helpers")

const lG = "AUTH" // logGroup
const lS = "PASSPORTJS-CB-LOCAL-SIGNIN" // logSubgroup

module.exports = async (req, email, password, done) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { email })
  h.logger.log(lG, lS, null, { password })

  try {
    if (!req.user) {
      const existingUser = await h.auth.findEmail(email)
      h.logger.log(lG, lS, null, { existingUser })

      if (!existingUser) {
        h.logger.log(lG, lS, `Email not found`)
        return done(null, false, req.flash("signinMessage", "Email not found"))
      }
      if (!existingUser.validPassword(password)) {
        h.logger.log(lG, lS, `Password is incorrect`)
        return done(
          null,
          false,
          req.flash("signinMessage", "Password is incorrect")
        )
      } else {
        return done(null, existingUser)
      }
    } else {
      h.logger.log(lG, lS, `User is currently signed in`)
    }
  } catch (error) {
    h.logger.log(lG, lS, null, { error })
    return done(error)
  }
}
