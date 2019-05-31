const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-TAGS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const postId = req.params.id
  const tagId = req.body.tagId
  const newPosition = req.body.position

  const updateTagPosition = await q.features.tag.update.position(
    writerId,
    postId,
    tagId,
    newPosition
  )

  const resHelper = h.api.resHelper.verifyQueryResults(updateTagPosition)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { postId })
  h.logger.log(lG, lS, "req.body.tagId", { tagId })
  h.logger.log(lG, lS, "req.body.position", { newPosition })
  h.logger.log(lG, lS, "Query Results", { updateTagPosition })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
