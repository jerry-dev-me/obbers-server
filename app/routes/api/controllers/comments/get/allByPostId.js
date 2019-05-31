const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-COMMENTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const readerId = req.user.id
  const postId = req.params.postId

  const allCommentsByPostId = await q.features.comment.read.allByPostId(
    readerId,
    postId
  )

  const resHelper = h.api.resHelper.verifyQueryResults(allCommentsByPostId)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { readerId })
  h.logger.log(lG, lS, "req.params.postId", { postId })
  h.logger.log(lG, lS, "Query Results", { allCommentsByPostId })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
