const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-REPORTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const readerId = req.user.id
  const fromUserId = req.params.userId

  const readAllReportsFromUser = await q.features.report.read.allFromUser(
    readerId,
    fromUserId
  )

  const resHelper = h.api.resHelper.verifyQueryResults(readAllReportsFromUser)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { readerId })
  h.logger.log(lG, lS, "req.params.userId", { fromUserId })
  h.logger.log(lG, lS, "Query Results", { readAllReportsFromUser })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
