const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "REQUEST-C-NEW" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (sentFromUserId, sentToUserId) => {
  try {
    logger.log(lG, lS, null, { sentFromUserId })
    logger.log(lG, lS, null, { sentToUserId })

    const fields = {
      sentFromUserId,
      sentToUserId,
      createdAt: new Date(),
    }

    const validation = await validateOperation.create["request"].restriction[
      "default"
    ](sentFromUserId, fields)

    logger.log(lG, lS, null, { validation })

    const { validFields, docsById } = validation
    logger.log(lG, lS, null, { validFields })
    logger.log(lG, lS, null, { docsById })

    const requestDoc = await crud.create.request.new(validFields)
    logger.log(lG, lS, null, { requestDoc })

    await crud.update.user.findByIdAndAddToSet(sentToUserId, {
      requests: requestDoc._id,
    })

    return requestDoc
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}
