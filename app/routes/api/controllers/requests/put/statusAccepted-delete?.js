const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-REQUESTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const requestId = req.params.id

  const updateRequestStatusAccepted = await q.features.request.update.statusAccepted(
    writerId,
    requestId
  )

  const resHelper = h.api.resHelper.verifyQueryResults(
    updateRequestStatusAccepted
  )

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { requestId })
  h.logger.log(lG, lS, "Query Results", { updateRequestStatusAccepted })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
