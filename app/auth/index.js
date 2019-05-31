const passport = require("passport")
const configKeys = require("../config/keys")
const h = require("../helpers")

const LocalStrategy = require("passport-local").Strategy
const TwitterStrategy = require("passport-twitter").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy

const localSignupCb = require("./callbacks/localSignupCb")
const localSigninCb = require("./callbacks/localSigninCb")
const oauth1Cb = require("./callbacks/oauth1Cb")
const oauth2Cb = require("./callbacks/oauth2Cb")

passport.serializeUser((user, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await h.auth.findByUserId(id)
    if (user) {
      return done(null, user)
    }
  } catch (error) {
    console.log("Error at deserializing user")
    return done(error)
  }
})

module.exports = () => {
  passport.use(
    "local-signup",
    new LocalStrategy(configKeys.local, localSignupCb)
  )
  passport.use(
    "local-login",
    new LocalStrategy(configKeys.local, localSigninCb)
  )
  passport.use(new TwitterStrategy(configKeys.twitter, oauth1Cb))
  passport.use(new GoogleStrategy(configKeys.google, oauth2Cb))
  passport.use(new FacebookStrategy(configKeys.facebook, oauth2Cb))
}

// suggested flow...
// signup with email is required...
// signup with username is required....
// if signup with social profile first, save profile data somewhere not in db,
// and then tell user to signup with email, and tell em to create a username...
// all these is being saved locally, once all data is together (email, username,
// social profile, in case they sign with social profile is linked), make sure
// all these data is saved locally in the device, once it is, submit everything
// to create a new user.....
