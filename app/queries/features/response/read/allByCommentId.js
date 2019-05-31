const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "RESPONSE-R-ALL-BY-COMMENT-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, commentId) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { commentId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // const foundComment = await Comment.findOne(
    //   { _id: commentId },
    //   { userId: 1, responses: 1 }
    // )
    //   .lean()
    //   .populate("responses");

    const foundComment = await crud.read.comment.findByIdLeanAndPopulate(
      commentId,
      { userId: 1, responses: 1 },
      "responses",
      {}
    )
    logger.log(lG, lS, null, { foundComment })

    if (!(foundComment && foundComment.responses.length > 0)) return []
    const foundCommentResponsesLength = foundComment.responses.length
    logger.log(lG, lS, null, { foundCommentResponsesLength })

    const responses = foundComment.responses
    logger.log(lG, lS, null, { responses })

    let responsesArray = []
    // const generateDataToReturn = await (async () => {
    await Promise.all(
      responses.map(async response => {
        logger.log(lG, lS, null, { response })

        let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          response.userId
        )
        logger.log(lG, lS, null, { canUserReadUser })

        if (canUserReadUser === true) {
          const foundUser = await crud.user.read.findById(response.userId, {
            _id: 1,
            "info.avatar": 1,
            "info.username": 1,
          })
          logger.log(lG, lS, null, { foundUser })

          const responseObject = {
            _id: response._id,
            commentId: response.commentId,
            userId: response.userId,
            avatar: foundUser.info.avatar,
            username: foundUser.info.username,
            content: response.content,
            createdAt: response.createdAt,
            modifiedAt: response.modifiedAt,
            likes: response.likes,
            // totalLikes: await h.getTotal.responseLikes(response._id),
          }
          responsesArray.push(responseObject)
        }
      })
    )
    // })();

    logger.log(lG, lS, null, { responsesArray })

    const responsesArraySortedByCreatedAt = u.sortArrayOfObjectsByProp(
      responsesArray,
      "createdAt"
    )
    logger.log(lG, lS, null, { responsesArraySortedByCreatedAt })

    return responsesArraySortedByCreatedAt
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, commentId) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { commentId });
//
//   try {
//     const foundComment = await Comment.findOne(
//       { _id: commentId },
//       { userId: 1, responses: 1 }
//     )
//       .lean()
//       .populate("responses");
//
//     logger.log(lG, lS, null, { foundComment });
//
//     const validationResults = await h.verifyOperation.readDoc(
//       readerId,
//       foundComment
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const responses = foundComment.responses;
//       if (responses.length === 0) {
//         return null;
//       } else {
//         let responsesArray = [];
//         const generateDataToReturn = await (async () => {
//           await Promise.all(
//             responses.map(async response => {
//               const foundUser = await User.findOne(
//                 { _id: response.userId },
//                 { _id: 1, "info.avatar": 1, "info.username": 1 }
//               );
//
//               const responseObject = {
//                 _id: response._id,
//                 commentId: response.commentId,
//                 userId: response.userId,
//                 avatar: foundUser.info.avatar,
//                 username: foundUser.info.username,
//                 content: response.content,
//                 createdAt: response.createdAt,
//                 modifiedAt: response.modifiedAt,
//                 likes: response.likes
//                 // totalLikes: await h.getTotal.responseLikes(response._id),
//               };
//               responsesArray.push(responseObject);
//             })
//           );
//         })();
//         logger.log(lG, lS, null, { responsesArray });
//         return responsesArray;
//       }
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
