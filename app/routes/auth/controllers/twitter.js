const passport = require("passport")

const h = require("../../../helpers")

module.exports.twitterAuth = (req, res, next) => {
  // res.send('twitterAuth');
  passport.authenticate("twitter")(req, res, next)
}

module.exports.twitterCb = (req, res, next) => {
  passport.authenticate("twitter", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })(req, res, next)
}

module.exports.authorizeTwitter = (req, res, next) => {
  // res.send('authorizeTwitter');
  passport.authorize("twitter", { scope: "email" })(req, res, next)
}

module.exports.authorizeTwitterCb = (req, res, next) => {
  // // res.send('authorizeTwitterCb');
  // passport.authorize('twitter', function (err, user, info) {
  //   if (err) { return next(err); }
  //   if (!user) { return res.redirect('/'); }
  //   req.logIn(user, { session: true }, function (err) {
  //     if (err) { return next(err); }
  //     if(req.session.nextRoute) {
  //       console.log('going to next route: ' + req.session.nextRoute);
  //       return res.redirect(req.session.nextRoute);
  //     }
  //   });
  // })(req, res, next);
  passport.authorize("twitter", {
    successRedirect: "/dashboard",
    failureRedirect: "/dashboard",
  })(req, res, next)
}

module.exports.unlinkTwitter = async (req, res, next) => {
  // res.send('unlinkTwitter');
  // let user = req.user;
  // user.twitter.token = undefined;
  // user.save(function(err) {
  //   res.redirect('/dashboard');
  // });
  const updatedUser = await h.auth.unlinkProfile(res, req.user, "twitter")
}
