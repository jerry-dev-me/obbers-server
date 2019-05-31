const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-REPORTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const reportId = req.params.id
  const newStatus = req.body.status

  const updateReportStatus = await q.features.report.update.status(
    writerId,
    reportId,
    newStatus
  )

  const resHelper = h.api.resHelper.verifyQueryResults(updateReportStatus)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { reportId })
  h.logger.log(lG, lS, "req.body.status", { newStatus })
  h.logger.log(lG, lS, "Query Results", { updateReportStatus })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
