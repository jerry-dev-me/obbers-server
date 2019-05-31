const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "LIKE-C-POST-LIKE" // logSubgroup

const h = require("../../../../helpers")
const c = require("../../../../config").constants
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async function(writerId, postId) {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { postId })

    const fields = {
      userId: writerId,
      refModel: "post",
      refId: postId,
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
      activityType: c.POST_LIKE,
    })
    logger.log(lG, lS, null, { activityDoc })

    await crud.update.user.findByIdAndAddToSet(writerId, {
      activities: activityDoc._id,
    })

    return likeDoc

    // const foundPost = await Post.findOne({ _id: postId }, { userId: 1 });
    //
    // logger.log(lG, lS, null, { foundPost });
    //
    // return await h.verifyOperation.createNewSubdoc(
    //   writerId,
    //   foundPost
    // );
    //
    // const verifiedFields = h.validateFields.like(writerId, "post", postId);
    // const newLike = new Like(verifiedFields);
    // const newLikeDoc = await newLike.save();
    //
    // logger.log(lG, lS, null, { verifiedFields });
    // logger.log(lG, lS, null, { newLike });
    // logger.log(lG, lS, null, { newLikeDoc });
    //
    // const postUpdateAddLike = await qPost.update.addLike(
    //   writerId,
    //   postId,
    //   newLikeDoc._id
    // );
    //
    // logger.log(lG, lS, null, { postUpdateAddLike });
    //
    // const userUpdateAddLikedPost = await qUser.update.addLikedPost(
    //   writerId,
    //   postId
    // );
    //
    // logger.log(lG, lS, null, { userUpdateAddLikedPost });
    //
    // const newActivityDoc = await qActivity.create.new({
    //   refModel: "post",
    //   refId: postId,
    //   userId: writerId,
    //   createdAt: new Date(),
    //   activityType: "POST_LIKE"
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

// // module.exports = async function(writerId, postId) {
// //   logger.log(lG, lS, null, { writerId });
// //   logger.log(lG, lS, null, { postId });
// //
// //
// //
// //
// //
// //   try {
// //     const foundPost = await Post.findOne({ _id: postId }, { userId: 1 });
// //
// //     logger.log(lG, lS, null, { foundPost });
// //
// //     const validationResults = await h.verifyOperation.createNewSubdoc(
// //       writerId,
// //       foundPost
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       const verifiedFields = h.validateFields.like(writerId, "post", postId);
// //       const newLike = new Like(verifiedFields);
// //       const newLikeDoc = await newLike.save();
// //
// //       logger.log(lG, lS, null, { verifiedFields });
// //       logger.log(lG, lS, null, { newLike });
// //       logger.log(lG, lS, null, { newLikeDoc });
// //
// //       const addLikeIdToPostLikes = await qPost.update.addLike(
// //         writerId,
// //         postId,
// //         newLikeDoc._id
// //       );
// //
// //       logger.log(lG, lS, null, { addLikeIdToPostLikes });
// //
// //       const addPostIdToUserLikedPosts = await qUser.update.addLikedPost(
// //         writerId,
// //         postId
// //       );
// //
// //       logger.log(lG, lS, null, { addPostIdToUserLikedPosts });
// //
// //       const newActivityDoc = await qActivity.create.new({
// //         refModel: "post",
// //         refId: postId,
// //         userId: writerId,
// //         createdAt: new Date(),
// //         activityType: "POST_LIKE"
// //       });
// //
// //       logger.log(lG, lS, null, { newActivityDoc });
// //
// //       return newLikeDoc;
// //     }
// //
// //     return validationResults;
// //   } catch (err) {
// //     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //   }
// // };
