const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-USERS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const currentPassword = req.body.currentPassword
  const newPassword = req.body.newPassword

  const updateUserSelfPassword = await q.features.user.update.password(
    writerId,
    currentPassword,
    newPassword
  )

  const resHelper = h.api.resHelper.verifyQueryResults(updateUserSelfPassword)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.body.currentPassword", { currentPassword })
  h.logger.log(lG, lS, "req.body.newPassword", { newPassword })
  h.logger.log(lG, lS, "Query Results", { updateUserSelfPassword })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
