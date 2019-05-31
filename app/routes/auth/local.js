const router = require("express").Router()
const controllers = require("./controllers/local")
const h = require("../../helpers")

// '/auth/local'

// '/auth/local/signup'
router
  .route("/signup")
  .get(h.auth.isAuthenticated, controllers.signup)
  .post(h.auth.isAuthenticated, controllers.signupProcess)

// '/auth/local/signin'
router
  .route("/signin")
  .get(h.auth.isAuthenticated, controllers.signin)
  .post(h.auth.isAuthenticated, controllers.signinProcess)

// '/auth/local/connect'
router
  .route("/connect")
  .get(controllers.authorizeLocal)
  .post(controllers.authorizeLocalCb)

// '/auth/local/unlink'
router.route("/unlink").get(controllers.unlinkLocal)

module.exports = router
