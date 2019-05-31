const router = require("express").Router()
const h = require("../../helpers")

// '/auth'

// '/auth'
router.get("/", (req, res, next) => {
  res.render("index.ejs")
})

// '/auth/signout'
router.get("/signout", h.auth.isAuthenticated, (req, res, next) => {
  req.logout()
  res.redirect("/")
})

// '/auth/local'
router.use("/local", require("./local"))

// '/auth/google'
router.use("/google", require("./google"))

// '/auth/twitter'
router.use("/twitter", require("./twitter"))

// '/auth/facebook'
router.use("/facebook", require("./facebook"))

module.exports = {
  router,
}
