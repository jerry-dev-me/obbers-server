const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-C-NEW" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async fields => {
  try {
    logger.log(lG, lS, null, { fields })

    const validation = await validateOperation.create["user"].restriction[
      "default"
    ](fields)

    logger.log(lG, lS, null, { validation })

    const { validFields, docsById } = validation
    logger.log(lG, lS, null, { validFields })
    logger.log(lG, lS, null, { docsById })

    const userDoc = await crud.create.user.new(validFields)
    logger.log(lG, lS, null, { userDoc })

    return userDoc
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}
