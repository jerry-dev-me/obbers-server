const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-COLLECTIONS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const collectionId = req.params.id
  const postId = req.params.postId

  const updateCollectionAddPost = await q.features.collection.update.addPost(
    writerId,
    collectionId,
    postId
  )

  const resHelper = h.api.resHelper.verifyQueryResults(updateCollectionAddPost)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { collectionId })
  h.logger.log(lG, lS, "req.params.postId", { postId })
  h.logger.log(lG, lS, "Query Results", { updateCollectionAddPost })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
