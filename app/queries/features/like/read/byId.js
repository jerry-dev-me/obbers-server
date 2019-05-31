const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "LIKE-R-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, likeId) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { likeId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const likeDoc = docsById.likeId
    logger.log(lG, lS, null, { likeDoc })

    return likeDoc
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, likeId) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { likeId });
//
//   try {
//     const foundLike = await Like.findOne({ _id: likeId });
//
//     logger.log(lG, lS, null, { foundLike });
//
//     const validationResults = await h.verifyOperation.readDoc(
//       readerId,
//       foundLike
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       return foundLike;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
