const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COLLECTION-U-THUMBNAIL" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, collectionId, postId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { collectionId })
    logger.log(lG, lS, null, { postId })

    const validation = await validateOperation.update["collection"].restriction[
      "addRemovePost"
    ](writerId, collectionId, postId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const updatedCollection = await crud.update.collection.findByIdAndUpdate(
      collectionId,
      { thumbnail: postId }
    )
    logger.log(lG, lS, null, { updatedCollection })

    return updatedCollection
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}
