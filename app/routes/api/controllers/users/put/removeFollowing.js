const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-USERS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const userIdToUnfollow = req.params.userId

  const updateUserRemoveFollowing = await q.features.user.update.removeFollowing(
    writerId,
    userIdToUnfollow
  )

  const resHelper = h.api.resHelper.verifyQueryResults(
    updateUserRemoveFollowing
  )

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.params.userId", { userIdToUnfollow })
  h.logger.log(lG, lS, "Query Results", { updateUserRemoveFollowing })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
