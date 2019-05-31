const router = require("express").Router()
const controllers = require("./controllers/comments")

// '/api/comments'

router.route("/").post(controllers.post.new)

router.route("/posts/:postId").get(controllers.get.allByPostId)

router.route("/:id/likes").get(controllers.get.likes)

router.route("/:id/content").put(controllers.put.content)

router.route("/:id").delete(controllers.delete.byId)

module.exports = router
