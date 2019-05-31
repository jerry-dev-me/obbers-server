const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-USERS" // logSubgroup

// "/api/users/settings/notifications/true"
// "/api/users/settings/notifications/false"

// controllers.settingsNotifications.true
// controllers.settingsNotifications.false

// module.exports = {
//   true: async () => {},
//   false: async () => {}
// }

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id

  const updateUserSettingsNotifications = await q.features.user.update.settingsNotifications(
    writerId
  )

  const resHelper = h.api.resHelper.verifyQueryResults(
    updateUserSettingsNotifications
  )

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "Query Results", { updateUserSettingsNotifications })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
