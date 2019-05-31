const router = require("express").Router()
const controllers = require("./controllers/facebook")

// '/auth/facebook'

// '/auth/facebook'
router.route("/").get(controllers.facebookAuth)

// '/auth/facebook/callback'
router.route("/callback").get(controllers.facebookCb)

// '/auth/facebook/connect'
router.route("/connect").get(controllers.authorizeFacebook)

// '/auth/facebook/connect/callback'
router.route("/connect/callback").get(controllers.authorizeFacebookCb)

// '/auth/facebook/unlink'
router.route("/unlink").get(controllers.unlinkFacebook)

module.exports = router
