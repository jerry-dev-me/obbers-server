const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COMMENT-C-NEW" // logSubgroup

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

    const validation = await validateOperation.create["comment"].restriction[
      "default"
    ](writerId, fields)

    logger.log(lG, lS, null, { validation })

    const { validFields, docsById } = validation
    logger.log(lG, lS, null, { validFields })
    logger.log(lG, lS, null, { docsById })

    const commentDoc = await crud.create.comment.new(validFields)
    logger.log(lG, lS, null, { commentDoc })

    const activityDoc = await crud.create.activity.new({
      refModel: "comment",
      refId: commentDoc._id,
      userId: writerId,
      createdAt: new Date(),
      activityType: "NEW_COMMENT",
    })
    logger.log(lG, lS, null, { activityDoc })

    await crud.update.user.findByIdAndAddToSet(writerId, {
      activities: activityDoc._id,
    })

    return commentDoc

    // const foundPost = await Post.findOne({ _id: postId }, { userId: 1 });
    // logger.log(lG, lS, null, { foundPost });
    //
    // return await h.verifyOperation.createNewSubdoc(
    //   writerId,
    //   foundPost
    // );
    //
    // const verifiedFields = h.validateFields.comment(fields);
    // const newComment = new Comment(verifiedFields);
    // const newCommentDoc = await newComment.save();
    //
    // const postUpdateAddComent = await qPost.update.addComment(
    //   writerId,
    //   postId,
    //   newCommentDoc._id
    // );
    //
    // const newActivityDoc = await qActivity.create.new({
    //   refModel: "Comment",
    //   refId: newCommentDoc._id,
    //   userId: writerId,
    //   createdAt: new Date(),
    //   activityType: "NEW_COMMENT"
    // });
    //
    // logger.log(lG, lS, null, { verifiedFields });
    // logger.log(lG, lS, null, { newComment });
    // logger.log(lG, lS, null, { newCommentDoc });
    // logger.log(lG, lS, null, { postUpdateAddComent });
    // logger.log(lG, lS, null, { newActivityDoc });
    //
    // return newCommentDoc;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// // module.exports = async (writerId, postId, fields) => {
// //   logger.log(lG, lS, null, { writerId });
// //   logger.log(lG, lS, null, { postId });
// //   logger.log(lG, lS, null, { fields });
// //
// //   const qActivity = require("../../../../queries/activity");
// //   const qPost = require("../../../../queries/post");
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
// //       const verifiedFields = h.validateFields.comment(fields);
// //       const newComment = new Comment(verifiedFields);
// //       const newCommentDoc = await newComment.save();
// //
// //       logger.log(lG, lS, null, { verifiedFields });
// //       logger.log(lG, lS, null, { newComment });
// //       logger.log(lG, lS, null, { newCommentDoc });
// //
// //       const addCommentIdToPostComments = await qPost.update.addComment(
// //         writerId,
// //         postId,
// //         newCommentDoc._id
// //       );
// //
// //       logger.log(lG, lS, null, { addCommentIdToPostComments });
// //
// //       const newActivityDoc = await qActivity.create.new({
// //         refModel: "Comment",
// //         refId: newCommentDoc._id,
// //         userId: writerId,
// //         createdAt: new Date(),
// //         activityType: "NEW_COMMENT"
// //       });
// //
// //       logger.log(lG, lS, null, { newActivityDoc });
// //
// //       return newCommentDoc;
// //     }
// //     return validationResults;
// //   } catch (err) {
// //     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //   }
// // };
