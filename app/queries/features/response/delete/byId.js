const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "RESPONSE-D-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, responseId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { responseId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const responseDoc = docsById.responseId
    logger.log(lG, lS, null, { responseDoc })

    await crud.delete.response.findByIdAndRemove(responseDoc._id)

    const updatedComment = await crud.update.findByIdAndPull(
      responseDoc.commentId,
      { responses: responseDoc._id }
    )
    logger.log(lG, lS, null, { updatedComment })

    return updatedComment
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, responseId) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { responseId });
//
//   try {
//     const foundResponse = await Response.findOne(
//       { _id: responseId },
//       { userId: 1, commentId: 1 }
//     );
//
//     logger.log(lG, lS, null, { foundResponse });
//
//     const foundComment = await Comment.findOne(
//       { _id: foundResponse.commentId },
//       { userId: 1, postId: 1 }
//     )
//       .lean()
//       .populate("postId", "userId");
//
//     logger.log(lG, lS, null, { foundComment });
//
//     const validationResults = await h.verifyOperation.writeSubdoc(
//       writerId,
//       foundComment.postId,
//       foundResponse
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const deletedResponse = await Response.findByIdAndRemove(responseId);
//       await deletedResponse.remove();
//       const foundDeletedResponse = await Response.findOne({ _id: responseId });
//
//       logger.log(lG, lS, null, { deletedResponse });
//       logger.log(lG, lS, null, { foundDeletedResponse });
//
//       if (foundDeletedResponse !== null) return foundDeletedResponse;
//       else return null;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
