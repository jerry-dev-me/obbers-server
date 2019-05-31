const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-USERS" // logSubgroup

// "/api/users/account/status/active"
// "/api/users/account/status/inactive"
// "/api/users/account/status/suspended"
// "/api/users/account/status/banned"
// "/api/users/account/status/deleted"

// controllers.accountStatus.active
// controllers.accountStatus.inactive
// controllers.accountStatus.suspended
// controllers.accountStatus.banned
// controllers.accountStatus.deleted

// module.exports = {
//   active: async () => {},
//   inactive: async () => {},
//   suspended: async () => {},
//   banned: async () => {},
//   deleted: async () => {}
// }

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const updatedStatus = req.body.status

  const updateUserAccountStatus = await q.features.user.update.accountStatus(
    writerId,
    updatedStatus
  )

  const resHelper = h.api.resHelper.verifyQueryResults(updateUserAccountStatus)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.body.status", { updatedStatus })
  h.logger.log(lG, lS, "Query Results", { updateUserAccountStatus })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
