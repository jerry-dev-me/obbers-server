const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-USERS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const currentEmail = req.body.currentEmail
  const newEmail = req.body.newEmail

  const updateUserSelfEmail = await q.features.user.update.email(
    writerId,
    currentEmail,
    newEmail
  )

  const resHelper = h.api.resHelper.verifyQueryResults(updateUserSelfEmail)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.body.currentEmail", { currentEmail })
  h.logger.log(lG, lS, "req.body.newEmail", { newEmail })
  h.logger.log(lG, lS, "Query Results", { updateUserSelfEmail })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
