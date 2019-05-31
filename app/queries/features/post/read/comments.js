const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-R-COMMENTS" // logSubgroup

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

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // const canUserReadCreator = await verifyDoc.canUserReadCreator.doc.checkId(userId, docId);
    // if (canUserReadCreator === false) return new errors.CanUserReadUserIsFalse();
    //
    // // grab post and populate comments and per each commetn do:
    // const canUserReadUser = await verifyUser.canUserReadUser.checkId(readerId, idToRead);
    // if (canUserReadUser === false) return new errors.CanUserReadUserIsFalse();

    // const foundPost = await Post.findOne(
    //   { _id: postId },
    //   { userId: 1, tags: 1 }
    // )
    //   .lean()
    //   .populate("userId");

    const foundPost = await crud.read.post.findByIdLeanAndPopulate(
      postId,
      { userId: 1, tags: 1 },
      "userId",
      {}
    )
    logger.log(lG, lS, null, { foundPost })

    if (!(foundPost && foundPost.comments && foundPost.comments.length > 0))
      return []

    const foundPostCommentsLength = foundPost.comments.length
    logger.log(lG, lS, null, { foundPostCommentsLength })

    let commentsArray = []
    // const generateDataToReturn = await (async () => {
    const comments = foundPost.comments
    logger.log(lG, lS, null, { comments })

    await Promise.all(
      comments.map(async comment => {
        logger.log(lG, lS, null, { comment })

        let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          comment.userId
        )
        logger.log(lG, lS, null, { canUserReadUser })

        if (canUserReadUser === true) {
          const commentObject = {
            _id: comment._id,
            userId: comment.userId,
            content: comment.content,
            createdAt: comment.createdAt,
            modifiedAt: comment.modifiedAt,
            likes: comment.likes,
            responses: comment.responses,
          }
          commentsArray.push(commentObject)
        }
      })
    )
    // })();

    logger.log(lG, lS, null, { commentsArray })

    const commentsArraySortedByCreatedAt = u.sortArrayOfObjectsByProp(
      commentsArray,
      "createdAt"
    )
    logger.log(lG, lS, null, { commentsArraySortedByCreatedAt })

    return commentsArraySortedByCreatedAt
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, postId) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { postId });
//
//   try {
//     const foundPost = await Post.findOne(
//       { _id: postId },
//       { userId: 1, tags: 1 }
//     )
//       .lean()
//       .populate("userId");
//
//     logger.log(lG, lS, null, { foundPost });
//
//     const validationResults = await h.verifyOperation.readDoc(
//       readerId,
//       foundPost
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       if (foundPost.comments && foundPost.comments === 0) {
//         return null;
//       } else {
//         let commentsArray = [];
//         const generateDataToReturn = await (async () => {
//           const comments = foundPost.comments;
//           await Promise.all(
//             comments.map(async comment => {
//               let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//                 readerId,
//                 comment.userId
//               );
//               if (canUserReadUser === true) {
//                 const commentObject = {
//                   _id: comment._id,
//                   userId: comment.userId,
//                   content: comment.content,
//                   createdAt: comment.createdAt,
//                   modifiedAt: comment.modifiedAt,
//                   likes: comment.likes,
//                   responses: comment.responses
//                 };
//                 commentsArray.push(commentObject);
//               }
//             })
//           );
//         })();
//         logger.log(lG, lS, null, { commentsArray });
//         return commentsArray;
//       }
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
