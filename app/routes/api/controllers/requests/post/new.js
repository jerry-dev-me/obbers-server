const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-REQUESTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const userIdSender = req.user.id
  const userIdReceiver = req.body.userIdReceiver

  const createRequest = await q.features.request.create.new(
    userIdSender,
    userIdReceiver
  )

  const resHelper = h.api.resHelper.verifyQueryResults(createRequest)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { userIdSender })
  h.logger.log(lG, lS, "req.body.userIdReceiver", { userIdReceiver })
  h.logger.log(lG, lS, "Query Results", { createRequest })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
