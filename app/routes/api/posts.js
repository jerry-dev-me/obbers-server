const router = require("express").Router()
const controllers = require("./controllers/posts")

// '/api/posts'

router.route("/").post(controllers.post.new)

router
  .route("/:id")
  .get(controllers.get.byId)
  .delete(controllers.delete.byId)

router.route("/users/:userId").get(controllers.get.allByUserId)

router.route("/:id/tags").get(controllers.get.tags)

router.route("/:id/likes").get(controllers.get.likes)

router.route("/:id/comments").get(controllers.get.comments)

router.route("/:id/caption").put(controllers.put.caption)

router.route("/:id/comments-enabled").put(controllers.put.commentsEnabled)

module.exports = router
