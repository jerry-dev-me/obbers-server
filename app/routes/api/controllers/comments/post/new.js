const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-COMMENTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const postId = req.body.postId
  const content = req.body.content

  const modelFields = {
    userId: writerId,
    postId: postId,
    content: content,
    createdAt: new Date(),
    modifiedAt: new Date(),
  }

  const createComment = await q.features.comment.create.new(
    writerId,
    postId,
    modelFields
  )

  const resHelper = h.api.resHelper.verifyQueryResults(createComment)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.body.postId", { postId })
  h.logger.log(lG, lS, "req.body.content", { content })
  h.logger.log(lG, lS, "Comment Model Fields", { modelFields })
  h.logger.log(lG, lS, "Query Results", { createComment })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
