const router = require("express").Router()
const controllers = require("./controllers/google")

// '/auth/google'

// '/auth/google'
router.route("/").get(controllers.googleAuth)

// '/auth/google/callback'
router.route("/callback").get(controllers.googleCb)

// '/auth/google/connect'
router.route("/connect").get(controllers.authorizeGoogle)

// '/auth/google/connect/callback'
router.route("/connect/callback").get(controllers.authorizeGoogleCb)

// '/auth/google/unlink'
router.route("/unlink").get(controllers.unlinkGoogle)

module.exports = router
