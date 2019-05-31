const router = require("express").Router()
const controllers = require("./controllers/tags")

// '/api/tags'

router.route("/").post(controllers.post.new)

router
  .route("/:id")
  .get(controllers.get.byId)
  .put(controllers.put.position)
  .delete(controllers.delete.byId)

module.exports = router
