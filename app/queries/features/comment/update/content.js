const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COMMENT-U-CONTENT" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, commentId, updatedContent) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { commentId })
    logger.log(lG, lS, null, { updatedContent })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // const validateUpdate = validateFields({ content: updatedContent });

    const updatedComment = await crud.update.comment.findByIdAndUpdate(
      commentId,
      { content: updatedContent }
    )
    logger.log(lG, lS, null, { updatedComment })

    return updatedComment

    // const foundComment = await Comment.findOne(
    //   { _id: commentId },
    //   { userId: 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundComment });
    //
    // return await h.verifyOperation.writeDocByCreatorOnly(
    //   writerId,
    //   foundComment
    // );
    //
    // const newPromise = new Promise((resolve, reject) => {
    //   return Comment.findByIdAndUpdate(
    //     { _id: commentId },
    //     { content: updatedContent },
    //     { new: true },
    //     async function(error, updatedComment) {
    //       if (error) reject(error);
    //       else resolve(updatedComment);
    //     }
    //   );
    // });
    // return newPromise
    //   .then(updatedComment => {
    //     logger.log(lG, lS, null, { updatedComment });
    //     return updatedComment;
    //   })
    //   .catch(error => {
    //     logger.log(lG, lS, null, { err });
    // return e.HandleFeatureError(err);
    //
    //
    //   });
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// // module.exports = async (writerId, commentId, updatedContent) => {
// //   logger.log(lG, lS, null, { writerId });
// //   logger.log(lG, lS, null, { commentId });
// //   logger.log(lG, lS, null, { updatedContent });
// //
// //   try {
// //     const foundComment = await Comment.findOne(
// //       { _id: commentId },
// //       { userId: 1 }
// //     );
// //
// //     logger.log(lG, lS, null, { foundComment });
// //
// //     const validationResults = await h.verifyOperation.writeDocByCreatorOnly(
// //       writerId,
// //       foundComment
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       const newPromise = new Promise((resolve, reject) => {
// //         return Comment.findByIdAndUpdate(
// //           { _id: commentId },
// //           { content: updatedContent },
// //           { new: true },
// //           async function(error, updatedComment) {
// //             if (error) reject(error);
// //             else resolve(updatedComment);
// //           }
// //         );
// //       });
// //       return newPromise
// //         .then(updatedComment => {
// //           logger.log(lG, lS, null, { updatedComment });
// //           return updatedComment;
// //         })
// //         .catch(error => {
// //           logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //         });
// //     }
// //     return validationResults;
// //   } catch (err) {
// //     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //   }
// // };
