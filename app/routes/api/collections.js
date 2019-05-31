const router = require("express").Router()
const controllers = require("./controllers/collections")

// '/api/collections'

router.route("/").post(controllers.post.new)

router.route("/self").get(controllers.get.allByUserId)

router.route("/:id/add/posts/:postId").put(controllers.put.addPost)

router.route("/:id/remove/posts/:postId").put(controllers.put.removePostFromOne)

router.route("/remove/posts/:postId").put(controllers.put.removePostFromAll)

router
  .route("/:id")
  .get(controllers.get.byId)
  .put(controllers.put.name)
  .delete(controllers.delete.byId)

module.exports = router
