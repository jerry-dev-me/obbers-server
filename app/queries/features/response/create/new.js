const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "RESPONSE-C-NEW" // logSubgroup

const h = require("../../../../helpers")
const c = require("../../../../config").constants
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, fields) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { fields })

    const validation = await validateOperation.create["response"].restriction[
      "default"
    ](writerId, fields)

    logger.log(lG, lS, null, { validation })

    const { validFields, docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const commentId = validFields.commentId
    logger.log(lG, lS, null, { commentId })

    const responseDoc = await crud.create.response.new(validFields)
    logger.log(lG, lS, null, { responseDoc })

    const activityDoc = await crud.create.activity.new({
      refModel: "response",
      refId: responseDoc._id,
      userId: writerId,
      createdAt: new Date(),
      activityType: c.NEW_RESPONSE,
    })
    logger.log(lG, lS, null, { activityDoc })

    await crud.update.user.findByIdAndAddToSet(writerId, {
      activities: activityDoc._id,
    })

    await crud.update.comment.findByIdAndAddToSet(commentId, {
      responses: responseDoc._id,
    })

    return responseDoc
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, commentId, fields) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { commentId });
//   logger.log(lG, lS, null, { fields });
//
//
//
//
//   try {
//     const foundComment = await Comment.findOne(
//       { _id: commentId },
//       { userId: 1 }
//     );
//
//     logger.log(lG, lS, null, { foundComment });
//
//     // const validationResults = await h.verifyOperation.createDoc(writerId);
//     const validationResults = await h.verifyOperation.createNewSubdoc(
//       writerId,
//       foundComment
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const verifiedFields = h.validateFields.response(writerId, fields);
//       const newResponse = new Response(verifiedFields);
//       const newResponseDoc = await newResponse.save();
//
//       logger.log(lG, lS, null, { verifiedFields });
//       logger.log(lG, lS, null, { newResponse });
//       logger.log(lG, lS, null, { newResponseDoc });
//
//       const addResponseIdToCommentResponses = await qComment.update.addResponse(
//         writerId,
//         commentId,
//         newResponseDoc._id
//       );
//
//       logger.log(lG, lS, null, { addResponseIdToCommentResponses });
//
//       const newActivityDoc = await qActivity.create.new({
//         refModel: "Response",
//         refId: newResponseDoc._id,
//         userId: writerId,
//         createdAt: new Date(),
//         activityType: "NEW_RESPONSE"
//       });
//
//       logger.log(lG, lS, null, { newActivityDoc });
//
//       return newResponseDoc;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
