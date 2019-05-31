const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-REPORTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id

  const modelFields = {
    fromUserId: writerId,
    toUserId: toUserId,
    createdAt: new Date(),
    category: (function() {
      if (req && req.body && req.body.category) return req.body.category
    })(),
    description: req.body.description,
  }

  const createReport = await q.features.report.create.new(writerId, modelFields)

  const resHelper = h.api.resHelper.verifyQueryResults(createReport)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "Report Model Fields", { modelFields })
  h.logger.log(lG, lS, "Query Results", { createReport })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
