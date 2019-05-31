const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-RESPONSES" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const responseId = req.params.id
  const content = req.body.content

  const updateResponseContent = await q.features.response.update.content(
    writerId,
    responseId,
    content
  )

  const resHelper = h.api.resHelper.verifyQueryResults(updateResponseContent)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { responseId })
  h.logger.log(lG, lS, "req.body.content", { content })
  h.logger.log(lG, lS, "Query Results", { updateResponseContent })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
