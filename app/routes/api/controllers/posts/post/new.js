const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-POSTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id

  const modelFields = {
    userId: writerId,
    location: (function() {
      if (req && req.body && req.body.location) return req.body.location
      else return null
    })(),
    content: req.body.content,
    createdAt: new Date(),
    modifiedAt: new Date(),
    caption: caption,
    tags: (function() {
      if (req && req.body && req.body.tags) return req.body.tags
      else return null
    })(),
    commentsEnabled: (function() {
      if (req && req.body && req.body.commentsEnabled)
        return req.body.commentsEnabled
    })(),
  }

  const createPost = await q.features.post.create.new(writerId, modelFields)

  const resHelper = h.api.resHelper.verifyQueryResults(createPost)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "Post Model Fields", { modelFields })
  h.logger.log(lG, lS, "Query Results", { createPost })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
