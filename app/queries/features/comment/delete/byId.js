const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COMMENT-D-BY-ID" // logSubgroup

const h = require("../../../../helpers")
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

    const validation = await validateOperation.delete["comment"].restriction[
      "default"
    ](writerId, commentId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    await crud.delete.comment.findByIdAndRemove(commentId)

    return {}

    // // subdoc
    // const foundComment = await Comment.findOne(
    //   { _id: commentId },
    //   { userId: 1, postId: 1 }
    // );
    //
    // // parent doc
    // const foundPost = await Post.findOne(
    //   { _id: foundComment.postId },
    //   { userId: 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundComment });
    // logger.log(lG, lS, null, { foundPost });
    //
    // return await h.verifyOperation.writeSubdoc(
    //   writerId,
    //   foundPost,
    //   foundComment
    // );
    //
    //
    //
    // const deletedComment = await Comment.findByIdAndRemove(commentId);
    // await deletedComment.remove();
    // const foundDeletedComment = await Comment.findOne({ _id: commentId });
    //
    // logger.log(lG, lS, null, { deletedComment });
    // logger.log(lG, lS, null, { foundDeletedComment });
    //
    // if (foundDeletedComment !== null) return foundDeletedComment;
    // else return null;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// // module.exports = async (writerId, commentId) => {
// //   logger.log(lG, lS, null, { writerId });
// //   logger.log(lG, lS, null, { commentId });
// //
// //   try {
// //     // Subdoc
// //     const foundComment = await Comment.findOne(
// //       { _id: commentId },
// //       { userId: 1, postId: 1 }
// //     );
// //
// //     logger.log(lG, lS, null, { foundComment });
// //
// //     // Parent Doc
// //     const foundPost = await Post.findOne(
// //       { _id: foundComment.postId },
// //       { userId: 1 }
// //     );
// //
// //     logger.log(lG, lS, null, { foundPost });
// //
// //     const validationResults = await h.verifyOperation.writeSubdoc(
// //       writerId,
// //       foundPost,
// //       foundComment
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       const deletedComment = await Comment.findByIdAndRemove(commentId);
// //       await deletedComment.remove();
// //       const foundDeletedComment = await Comment.findOne({ _id: commentId });
// //
// //       logger.log(lG, lS, null, { deletedComment });
// //       logger.log(lG, lS, null, { foundDeletedComment });
// //
// //       if (foundDeletedComment !== null) return foundDeletedComment;
// //       else return null;
// //     }
// //     return validationResults;
// //   } catch (err) {
// //     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //   }
// // };
