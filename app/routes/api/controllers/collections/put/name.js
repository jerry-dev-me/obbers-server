const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-COLLECTIONS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const collectionId = req.params.id
  const newName = req.body.name

  const updateCollectionName = await q.features.collection.update.name(
    writerId,
    collectionId,
    newName
  )

  const resHelper = h.api.resHelper.verifyQueryResults(updateCollectionName)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.id", { collectionId })
  h.logger.log(lG, lS, "req.body.name", { newName })
  h.logger.log(lG, lS, "Query Results", { updateCollectionName })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
