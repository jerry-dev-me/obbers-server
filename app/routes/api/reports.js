const router = require("express").Router()
const controllers = require("./controllers/reports")

// '/api/reports'

router
  .route("/")
  .post(controllers.post.new)
  .get(controllers.get.all)

router
  .route("/from/:userId") // /api/reports/sent-from/users/:userId
  .get(controllers.get.allSentFromUserId)

router
  .route("/to/:userId") // /api/reports/sent-to/users/:userId
  .get(controllers.get.allSentToUserId)

// router
//   .route("?category={category}")
//   .get(controllers.get.allByCategory);

router.route("/:id/status").put(controllers.put.status)

router
  .route(":id")
  .get(controllers.get.byId)
  .delete(controllers.delete.byId)

module.exports = router
