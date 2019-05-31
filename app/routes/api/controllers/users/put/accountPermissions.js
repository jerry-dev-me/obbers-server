const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-USERS" // logSubgroup

// "/api/users/account/permissions/admin"
// "/api/users/account/permissions/read_write"
// "/api/users/account/permissions/read_only"

// controllers.accountPermissions.admin
// controllers.accountPermissions.readWrite
// controllers.accountPermissions.readOnly

// module.exports = {
//   admin: async () => {},
//   readWrite: async () => {},
//   readOnly: async () => {}
// }

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const updatedPermissions = req.body.permissions

  const updateUserAccountPermissions = await q.features.user.update.accountPermissions(
    writerId,
    updatedPermissions
  )

  const resHelper = h.api.resHelper.verifyQueryResults(
    updateUserAccountPermissions
  )

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.body.permissions", { updatedPermissions })
  h.logger.log(lG, lS, "Query Results", { updateUserAccountPermissions })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
