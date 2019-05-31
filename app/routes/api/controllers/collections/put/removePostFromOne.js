const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-COLLECTIONS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const collectionId = req.params.id
  const postIdToRemove = req.params.postId

  const removePostFromCollection = await q.features.collection.update.removePostFromCollection(
    writerId,
    collectionId,
    postIdToRemove
  )

  const resHelper = h.api.resHelper.verifyQueryResults(removePostFromCollection)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { collectionId })
  h.logger.log(lG, lS, "req.params.postId", { postIdToRemove })
  h.logger.log(lG, lS, "Query Results", { removePostFromCollection })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
