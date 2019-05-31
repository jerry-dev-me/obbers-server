const passport = require("passport")

const h = require("../../../helpers")

module.exports.facebookAuth = (req, res, next) => {
  // res.send('facebookAuth');
  passport.authenticate("facebook")(req, res, next)
}

module.exports.facebookCb = (req, res, next) => {
  // res.send('facebookCb');
  passport.authenticate("facebook", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })(req, res, next)
}

module.exports.authorizeFacebook = (req, res, next) => {
  // res.send('authorizeFacebook');
  passport.authorize("facebook", {
    scope: ["public_profile", "email"],
  })(req, res, next)
}

module.exports.authorizeFacebookCb = (req, res, next) => {
  // res.send('authorizeFacebookCb');
  passport.authorize("facebook", {
    successRedirect: "/dashboard",
    failureRedirect: "/dashboard",
  })(req, res, next)
}

module.exports.unlinkFacebook = async (req, res, next) => {
  // res.send('unlinkFacebook');
  // let user = req.user;
  // user.facebook.token = undefined;
  // user.save(function(err) {
  //   res.redirect('/dashboard');
  // });
  const updatedUser = await h.auth.unlinkProfile(res, req.user, "facebook")
}
