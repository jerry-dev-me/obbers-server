const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "LIKE-C-RESPONSE-LIKE" // logSubgroup

const h = require("../../../../helpers")
const c = require("../../../../config").constants
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

    const fields = {
      userId: writerId,
      refModel: "response",
      refId: responseId,
      createdAt: new Date(),
    }

    const validation = await validateOperation.create["like"].restriction[
      "default"
    ](writerId, fields)

    logger.log(lG, lS, null, { validation })

    const { validFields, docsById } = validation
    logger.log(lG, lS, null, { validFields })
    logger.log(lG, lS, null, { docsById })

    const likeDoc = await crud.create.like.new(validFields)
    logger.log(lG, lS, null, { likeDoc })

    const activityDoc = await crud.create.activity.new({
      refModel: "like",
      refId: likeDoc._id,
      userId: writerId,
      createdAt: new Date(),
      activityType: c.RESPONSE_LIKE,
    })
    logger.log(lG, lS, null, { activityDoc })

    await crud.update.user.findByIdAndAddToSet(writerId, {
      activities: activityDoc._id,
    })

    return likeDoc

    // const foundResponse = await Response.findOne(
    //   { _id: responseId },
    //   { userId: 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundResponse });
    //
    // return await h.verifyOperation.createNewSubdoc(
    //   writerId,
    //   foundResponse
    // );
    //
    // const verifiedFields = h.validateFields.like(
    //   writerId,
    //   "response",
    //   responseId
    // );
    //
    // logger.log(lG, lS, null, { verifiedFields });
    //
    // const newLike = new Like(verifiedFields);
    // const newLikeDoc = await newLike.save();
    //
    // logger.log(lG, lS, null, { newLike });
    // logger.log(lG, lS, null, { newLikeDoc });
    //
    // const addLikeIdToResponseLikes = await qResponse.update.addLike(
    //   writerId,
    //   responseId,
    //   newLikeDoc._id
    // );
    //
    // logger.log(lG, lS, null, { addLikeIdToResponseLikes });
    //
    // const newActivityDoc = await qActivity.create.new({
    //   refModel: "response",
    //   refId: responseId,
    //   userId: writerId,
    //   createdAt: new Date(),
    //   activityType: "RESPONSE_LIKE"
    // });
    //
    // logger.log(lG, lS, null, { newActivityDoc });
    //
    // return newLikeDoc;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// // module.exports = async (writerId, responseId) => {
// //   logger.log(lG, lS, null, { writerId });
// //   logger.log(lG, lS, null, { responseId });
// //
// //   const qActivity = require("../../../../queries/activity");
// //   const qResponse = require("../../../../queries/response");
// //
// //   try {
// //     const foundResponse = await Response.findOne(
// //       { _id: responseId },
// //       { userId: 1 }
// //     );
// //
// //     logger.log(lG, lS, null, { foundResponse });
// //
// //     const validationResults = await h.verifyOperation.createNewSubdoc(
// //       writerId,
// //       foundResponse
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       const verifiedFields = h.validateFields.like(
// //         writerId,
// //         "response",
// //         responseId
// //       );
// //
// //       logger.log(lG, lS, null, { verifiedFields });
// //
// //       const newLike = new Like(verifiedFields);
// //       const newLikeDoc = await newLike.save();
// //
// //       logger.log(lG, lS, null, { newLike });
// //       logger.log(lG, lS, null, { newLikeDoc });
// //
// //       const addLikeIdToResponseLikes = await qResponse.update.addLike(
// //         writerId,
// //         responseId,
// //         newLikeDoc._id
// //       );
// //
// //       logger.log(lG, lS, null, { addLikeIdToResponseLikes });
// //
// //       const newActivityDoc = await qActivity.create.new({
// //         refModel: "response",
// //         refId: responseId,
// //         userId: writerId,
// //         createdAt: new Date(),
// //         activityType: "RESPONSE_LIKE"
// //       });
// //
// //       logger.log(lG, lS, null, { newActivityDoc });
// //
// //       return newLikeDoc;
// //     }
// //     return validationResults;
// //   } catch (err) {
// //     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //   }
// // };
