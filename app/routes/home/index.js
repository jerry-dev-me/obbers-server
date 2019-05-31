const router = require("express").Router()
const controllers = require("./controllers")
const h = require("../../helpers")

// '/'

router.route("/").get(controllers.home)

router.route("/dashboard").get(h.auth.isAuthenticated, controllers.dashboard)

module.exports = {
  router,
}
