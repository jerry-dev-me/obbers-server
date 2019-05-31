const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-COLLECTIONS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const readerId = req.user.id
  const collectionId = req.params.id

  const readCollectionByIdFromSelf = await q.features.collection.read.byIdFromSelf(
    readerId,
    collectionId
  )

  const resHelper = h.api.resHelper.verifyQueryResults(
    readCollectionByIdFromSelf
  )

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { readerId })
  h.logger.log(lG, lS, "req.params.id", { collectionId })
  h.logger.log(lG, lS, "Query Results", { readCollectionByIdFromSelf })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
