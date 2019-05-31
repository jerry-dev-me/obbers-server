const passport = require("passport")
const configKeys = require("../../../config/keys")

const h = require("../../../helpers")

module.exports.googleAuth = (req, res, next) => {
  passport.authenticate("google", { scope: configKeys.google.profileFields })(
    req,
    res,
    next
  )
}

module.exports.googleCb = (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })(req, res, next)
}

module.exports.authorizeGoogle = (req, res, next) => {
  // res.send('authorizeGoogle');
  passport.authorize("google", { scope: ["profile", "email"] })(req, res, next)
}

module.exports.authorizeGoogleCb = (req, res, next) => {
  // res.send('authorizeGoogleCb');
  passport.authorize("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/dashboard",
  })(req, res, next)
}

module.exports.unlinkGoogle = async (req, res, next) => {
  // res.send('unlinkGoogle');
  // let user = req.user;
  // user.google.token = undefined;
  // user.save(function(err) {
  //   res.redirect('/dashboard');
  // });
  const updatedUser = await h.auth.unlinkProfile(res, req.user, "google")
}
