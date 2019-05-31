const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "LIKE-C-COMMENT-LIKE" // logSubgroup

const h = require("../../../../helpers")
const c = require("../../../../config").constants
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, commentId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { commentId })

    const fields = {
      userId: writerId,
      refModel: "comment",
      refId: commentId,
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
      activityType: c.COMMENT_LIKE,
    })
    logger.log(lG, lS, null, { activityDoc })

    await crud.update.user.findByIdAndAddToSet(writerId, {
      activities: activityDoc._id,
    })

    return likeDoc

    // const foundComment = await Comment.findOne(
    //   { _id: commentId },
    //   { userId: 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundComment });
    //
    // return await h.verifyOperation.createNewSubdoc(
    //   writerId,
    //   foundComment
    // );
    //
    // const verifiedFields = h.validateFields.like(
    //   writerId,
    //   "comment",
    //   commentId
    // );
    // const newLike = new Like(verifiedFields);
    // const newLikeDoc = await newLike.save();
    //
    // logger.log(lG, lS, null, { verifiedFields });
    // logger.log(lG, lS, null, { newLike });
    // logger.log(lG, lS, null, { newLikeDoc });
    //
    // const addLikeIdToCommentLikes = await qComment.update.addLike(
    //   writerId,
    //   commentId,
    //   newLikeDoc._id
    // );
    //
    // logger.log(lG, lS, null, { addLikeIdToCommentLikes });
    //
    // const newActivityDoc = await qActivity.create.new({
    //   refModel: "comment",
    //   refId: commentId,
    //   userId: writerId,
    //   createdAt: new Date(),
    //   activityType: "COMMENT_LIKE"
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

// // module.exports = async (writerId, commentId) => {
// //   logger.log(lG, lS, null, { writerId });
// //   logger.log(lG, lS, null, { commentId });
// //
// //
// //
// //
// //   try {
// //     const foundComment = await Comment.findOne(
// //       { _id: commentId },
// //       { userId: 1 }
// //     );
// //
// //     logger.log(lG, lS, null, { foundComment });
// //
// //     const validationResults = await h.verifyOperation.createNewSubdoc(
// //       writerId,
// //       foundComment
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       const verifiedFields = h.validateFields.like(
// //         writerId,
// //         "comment",
// //         commentId
// //       );
// //       const newLike = new Like(verifiedFields);
// //       const newLikeDoc = await newLike.save();
// //
// //       logger.log(lG, lS, null, { verifiedFields });
// //       logger.log(lG, lS, null, { newLike });
// //       logger.log(lG, lS, null, { newLikeDoc });
// //
// //       const addLikeIdToCommentLikes = await qComment.update.addLike(
// //         writerId,
// //         commentId,
// //         newLikeDoc._id
// //       );
// //
// //       logger.log(lG, lS, null, { addLikeIdToCommentLikes });
// //
// //       const newActivityDoc = await qActivity.create.new({
// //         refModel: "comment",
// //         refId: commentId,
// //         userId: writerId,
// //         createdAt: new Date(),
// //         activityType: "COMMENT_LIKE"
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
