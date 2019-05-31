const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-COMMENTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const commentId = req.params.id
  const updatedContent = req.body.content

  const updateCommentContent = await q.features.comment.update.content(
    writerId,
    commentId,
    updatedContent
  )

  const resHelper = h.api.resHelper.verifyQueryResults(updateCommentContent)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { commentId })
  h.logger.log(lG, lS, "req.body.content", { updatedContent })
  h.logger.log(lG, lS, "Query Results", { updateCommentContent })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
