const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-REQUESTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const userId = req.user.id

  const readAllRequestsFromSelf = await q.features.request.read.allFromSelf(
    userId
  )

  const resHelper = h.api.resHelper.verifyQueryResults(readAllRequestsFromSelf)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { userId })
  h.logger.log(lG, lS, "Query Results", { readAllRequestsFromSelf })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
