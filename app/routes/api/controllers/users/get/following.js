const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-USERS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const readerId = req.user.id
  const idToRead = req.params.id

  const readUsersFollowing = await q.features.user.read.following(
    readerId,
    idToRead
  )

  const resHelper = h.api.resHelper.verifyQueryResults(readUsersFollowing)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { readerId })
  h.logger.log(lG, lS, "req.params.id", { idToRead })
  h.logger.log(lG, lS, "Query Results", { readUsersFollowing })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
