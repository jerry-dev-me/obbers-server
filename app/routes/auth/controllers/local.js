const passport = require("passport")

const h = require("../../../helpers")

// GET | '/auth/local/signup'
module.exports.signup = (req, res, next) => {
  // res.send('signing up');
  res.render("signup.ejs", { message: req.flash("signupMessage") })
}

// POST | '/auth/local/signup'
module.exports.signupProcess = (req, res, next) => {
  passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/local/signup",
    // failureFlash : true
  })(req, res, next)
}

// GET | '/auth/local/signin'
module.exports.signin = (req, res, next) => {
  // res.send('signing in');
  res.render("signin.ejs", { message: req.flash("signinMessage") })
  // res.send(req.flash('signinMessage'));
}

// POST | '/auth/local/signin'
module.exports.signinProcess = (req, res, next) => {
  passport.authenticate("local-login", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/local/signin",
    // failureFlash : true
  })(req, res, next)
}

// GET | '/auth/local/connect'
module.exports.authorizeLocal = (req, res, next) => {
  // res.send('authorizeLocal');
  // res.render('connect-local.ejs', { message: req.flash('loginMessage') })
  res.render("connect-local.ejs", { message: "test" })
  // (req, res, next);
}

// POST | '/auth/local/connect'
module.exports.authorizeLocalCb = (req, res, next) => {
  // res.send('authorizeLocalCb');
  passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    // failureRedirect : '/connect/local',
    failureRedirect: "/dashboard",
    // failureFlash : true
  })(req, res, next)
}

// GET | '/auth/local/unlink'
module.exports.unlinkLocal = async (req, res, next) => {
  const updatedUser = await h.auth.unlinkEmail(
    res,
    req.user,
    req.user.local.email
  )

  // res.send('unlinkLocal');
  // let user = req.user;
  // user.local.email = undefined;
  // user.local.password = undefined;
  // user.save(function(err) {
  //   res.redirect('/dashboard');
  // });
}
