const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-POSTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const postId = req.params.id
  const value = req.body.commentsEnabled

  const updatePostCommentsEnabled = await q.features.post.update.commentsEnabled(
    writerId,
    postId,
    value
  )

  const resHelper = h.api.resHelper.verifyQueryResults(
    updatePostCommentsEnabled
  )

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { postId })
  h.logger.log(lG, lS, "req.body.commentsEnabled", { value })
  h.logger.log(lG, lS, "Query Results", { updatePostCommentsEnabled })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
