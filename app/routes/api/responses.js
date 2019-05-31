const router = require("express").Router()
const controllers = require("./controllers/responses")

// '/api/responses'

router.route("/")

router
  .route("/comments/:commentId")
  .post(controllers.post.new)
  .get(controllers.get.allByCommentId)

router.route("/:id/likes").get(controllers.get.likes)

router.route("/:id/content").put(controllers.put.content)

router.route("/:id").delete(controllers.delete.byId)

module.exports = router
