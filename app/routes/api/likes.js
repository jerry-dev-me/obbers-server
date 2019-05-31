const router = require("express").Router()
const controllers = require("./controllers/likes")

// '/api/likes'

router.route("/posts/:postId").post(controllers.post.postLike)

router.route("/comments/:commentId").post(controllers.post.commentLike)

router.route("/responses/:responseId").post(controllers.post.responseLike)

router
  .route("/:id")
  .get(controllers.get.byId)
  .delete(controllers.delete.byId)

module.exports = router
