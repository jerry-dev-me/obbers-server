const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-USERS" // logSubgroup

// "/api/users/settings/language/en"
// "/api/users/settings/language/es"
// "/api/users/settings/language/fr"

// controllers.settingsLanguage.en
// controllers.settingsLanguage.es
// controllers.settingsLanguage.fr

// module.exports = {
//   en: async () => {},
//   es: async () => {},
//   fr: async () => {}
// }

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const language = req.body.language

  const updateUserSettingsLanguage = await q.features.user.update.settingsLanguage(
    writerId,
    language
  )

  const resHelper = h.api.resHelper.verifyQueryResults(
    updateUserSettingsLanguage
  )

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.body.language", { language })
  h.logger.log(lG, lS, "Query Results", { updateUserSettingsLanguage })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
