const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COMMENT-R-ALL-BY-POST-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, postId) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { postId })

    const validation = await validateOperation.read["post"].restriction[
      "default"
    ](readerId, postId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const postDoc = docsById.postId
    logger.log(lG, lS, null, { postDoc })

    const comments = docsById.postId.comments
    logger.log(lG, lS, null, { comments })

    if (!(comments && comments.length > 0)) return []
    const commentsLength = comments.length
    logger.log(lG, lS, null, { commentsLength })

    let arrayOfComments = []

    comments.map(async comment => {
      logger.log(lG, lS, null, { comment })

      const userDoc = await crud.read.user.findById(comment.userId, {
        "info.avatar": 1,
        "info.username": 1,
      })
      logger.log(lG, lS, null, { userDoc })

      const canUserReadUser = await verifyUser.canUserReadUser.checkId(
        readerId,
        userDoc._id
      )
      logger.log(lG, lS, null, { canUserReadUser })

      if (canUserReadUser === true) {
        const object = {
          _id: comment._id,
          postId: comment.postId,
          userId: comment.userId,
          avatar: userDoc.info.avatar,
          username: userDoc.info.username,
          content: comment.content,
          createdAt: comment.createdAt,
          modifiedAt: comment.modifiedAt,
          likes: comment.likes,
          // totalLikes: await h.verify.commentTotalLikes(comment._id),
          responses: comment.responses,
          // totalResponses: await h.verify.commentTotalResponses(comment._id)
        }
        arrayOfComments.push(object)
      }
    })

    logger.log(lG, lS, null, { arrayOfComments })

    return arrayOfComments

    // const foundPost = await Post.findOne(
    //   { _id: postId },
    //   { userId: 1, commentsEnabled: 1, comments: 1 }
    // ).lean().populate("comments");
    //
    // logger.log(lG, lS, null, { foundPost });
    //
    // _operationData[foundPost] = foundPost;
    //
    // return await h.verifyOperation.readDoc(
    //   readerId,
    //   foundPost
    // );
    //
    // const foundPost = _operationData.foundPost;
    //
    // logger.log(lG, lS, null, { commentsEnabled: foundPost.commentsEnabled });
    //
    // if (foundPost.commentsEnabled !== true) return null;
    //
    // const commentDocsFound = await h.verifyOperation.voHelpers.verifyDoc(
    //   foundPost.comments
    // );
    //
    // logger.log(lG, lS, null, { commentDocsFound });
    //
    // if (commentDocsFound === true) {
    //   const comments = foundPost.comments;
    //
    //   logger.log(lG, lS, null, { comments });
    //
    //   let arrayToReturn = [];
    //
    //   const generateDataToReturn = await (async () => {
    //     await Promise.all(
    //       comments.map(async comment => {
    //         logger.log(lG, lS, null, { comment });
    //
    //         const foundUser = await User.findOne(
    //           { _id: comment.userId },
    //           { _id: 1, "info.avatar": 1, "info.username": 1 }
    //         );
    //
    //         logger.log(lG, lS, null, { foundUser });
    //
    //         const objectToPush = {
    //           _id: comment._id,
    //           postId: comment.postId,
    //           userId: comment.userId,
    //           avatar: foundUser.info.avatar,
    //           username: foundUser.info.username,
    //           content: comment.content,
    //           createdAt: comment.createdAt,
    //           modifiedAt: comment.modifiedAt,
    //           likes: comment.likes,
    //           // totalLikes: await h.verify.commentTotalLikes(comment._id),
    //           responses: comment.responses
    //           // totalResponses: await h.verify.commentTotalResponses(comment._id)
    //         };
    //
    //         logger.log(lG, lS, null, { objectToPush });
    //
    //         arrayToReturn.push(objectToPush);
    //       })
    //     );
    //   })();
    //   logger.log(lG, lS, null, { arrayToReturn });
    //   return arrayToReturn;
    // } else {
    //   return null;
    // }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// // module.exports = async (readerId, postId) => {
// //   logger.log(lG, lS, null, { readerId });
// //   logger.log(lG, lS, null, { postId });
// //
// //   try {
// //     const foundPost = await Post.findOne(
// //       { _id: postId },
// //       { userId: 1, commentsEnabled: 1, comments: 1 }
// //     )
// //       .lean()
// //       .populate("comments");
// //
// //     logger.log(lG, lS, null, { foundPost });
// //
// //     const validationResults = await h.verifyOperation.readDoc(
// //       readerId,
// //       foundPost
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       logger.log(lG, lS, `foundPost.commentsEnabled`, {
// //         commentsEnabled: foundPost.commentsEnabled
// //       });
// //
// //       if (foundPost.commentsEnabled !== true) {
// //         return null;
// //       }
// //
// //       const commentDocsFound = await h.verifyOperation.voHelpers.verifyDoc(
// //         foundPost.comments
// //       );
// //
// //       logger.log(lG, lS, null, { commentDocsFound });
// //
// //       if (commentDocsFound === true) {
// //         const comments = foundPost.comments;
// //
// //         logger.log(lG, lS, null, { comments });
// //
// //         let arrayToReturn = [];
// //
// //         const generateDataToReturn = await (async () => {
// //           await Promise.all(
// //             comments.map(async comment => {
// //               logger.log(lG, lS, null, { comment });
// //
// //               const foundUser = await User.findOne(
// //                 { _id: comment.userId },
// //                 { _id: 1, "info.avatar": 1, "info.username": 1 }
// //               );
// //
// //               logger.log(lG, lS, null, { foundUser });
// //
// //               const objectToPush = {
// //                 _id: comment._id,
// //                 postId: comment.postId,
// //                 userId: comment.userId,
// //                 avatar: foundUser.info.avatar,
// //                 username: foundUser.info.username,
// //                 content: comment.content,
// //                 createdAt: comment.createdAt,
// //                 modifiedAt: comment.modifiedAt,
// //                 likes: comment.likes,
// //                 // totalLikes: await h.verify.commentTotalLikes(comment._id),
// //                 responses: comment.responses
// //                 // totalResponses: await h.verify.commentTotalResponses(comment._id)
// //               };
// //
// //               logger.log(lG, lS, null, { objectToPush });
// //
// //               arrayToReturn.push(objectToPush);
// //             })
// //           );
// //         })();
// //         logger.log(lG, lS, null, { arrayToReturn });
// //         return arrayToReturn;
// //       } else {
// //         return null;
// //       }
// //     }
// //     return validationResults;
// //   } catch (err) {
// //     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //   }
// // };
