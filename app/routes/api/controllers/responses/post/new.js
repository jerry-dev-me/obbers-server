const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-RESPONSES" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const commentId = req.params.commentId
  const content = req.body.content

  const modelFields = {
    commentId: commentId,
    userId: writerId,
    content: content,
    createdAt: new Date(),
    modifiedAt: new Date(),
  }

  const createResponse = await q.features.response.create.new(
    writerId,
    commentId,
    modelFields
  )

  const resHelper = h.api.resHelper.verifyQueryResults(createResponse)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.commentId", { commentId })
  h.logger.log(lG, lS, "req.body.content", { content })
  h.logger.log(lG, lS, "Response Model Fields", { modelFields })
  h.logger.log(lG, lS, "Query Results", { createResponse })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
