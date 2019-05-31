const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-TAGS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const postId = req.params.id

  const modelFields = {
    userId: writerId,
    username: req.body.username,
    position: req.body.position,
    createdAt: new Date(),
  }

  const createTag = await q.features.tag.create.new(
    writerId,
    postId,
    modelFields
  )

  const resHelper = h.api.resHelper.verifyQueryResults(createTag)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { postId })
  h.logger.log(lG, lS, "Tag Model Fields", { modelFields })
  h.logger.log(lG, lS, "Query Results", { createTag })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
