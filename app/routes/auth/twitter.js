const router = require("express").Router()
const controllers = require("./controllers/twitter")

// '/auth/twitter'

// '/auth/twitter'
router.route("/").get(controllers.twitterAuth)

// '/auth/twitter/callback'
router.route("/callback").get(controllers.twitterCb)

// '/auth/twitter/connect'
router.route("/connect").get(controllers.authorizeTwitter)

// '/auth/twitter/connect/callback'
router.route("/connect/callback").get(controllers.authorizeTwitterCb)

// '/auth/twitter/unlink'
router.route("/unlink").get(controllers.unlinkTwitter)

module.exports = router
