const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-POSTS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const readerId = req.user.id
  const idToRead = req.params.userId

  const readAllPostsByUserId = await q.features.post.read.allByUserId(
    readerId,
    idToRead
  )

  const resHelper = h.api.resHelper.verifyQueryResults(readAllPostsByUserId)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { readerId })
  h.logger.log(lG, lS, "req.params.userId", { idToRead })
  h.logger.log(lG, lS, "Query Results", { readAllPostsByUserId })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
