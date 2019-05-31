const router = require("express").Router()

const h = require("../../helpers")

// '/api'

router.use(h.auth.isAuthenticated)

router.get("/", (req, res, next) => {
  res.json({ message: "Welcome to API" })
})

router.use("/activities", require("./activities"))
router.use("/collections", require("./collections"))
router.use("/comments", require("./comments"))
router.use("/likes", require("./likes"))
router.use("/posts", require("./posts"))
router.use("/reports", require("./reports"))
router.use("/requests", require("./requests"))
router.use("/responses", require("./responses"))
router.use("/tags", require("./tags"))
router.use("/users", require("./users"))

module.exports = {
  router,
}
