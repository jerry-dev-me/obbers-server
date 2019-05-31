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

  const deleteTagById = await q.features.tag.delete.byId(
    writerId,
    postId,
    tagId
  )

  const resHelper = h.api.resHelper.verifyQueryResults(deleteTagById)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { postId })
  h.logger.log(lG, lS, "req.body.tagId", { tagId })
  h.logger.log(lG, lS, "Query Results", { deleteTagById })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
