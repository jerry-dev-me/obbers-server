const router = require("express").Router()
const controllers = require("./controllers/activities")

// '/api/activities'

router.route("/").get(controllers.get.allFromUsersFollowing)

module.exports = router
