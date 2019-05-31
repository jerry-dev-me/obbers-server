const router = require("express").Router()
const controllers = require("./controllers/requests")

// '/api/requests'

router
  .route("/")
  .post(controllers.post.new)
  .get(controllers.get.allSentToUserId)

router.route("/:id").get(controllers.get.byId)

router.route("/:id/status-accepted").put(controllers.put.status.accepted)

router.route("/:id/status-declined").put(controllers.put.status.declined)

module.exports = router
