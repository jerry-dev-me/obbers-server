const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "RESPONSE-R-LIKES" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, responseId) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { responseId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const responseDoc = validation.docsById.responseId
    logger.log(lG, lS, null, { responseDoc })

    if (!(responseDoc && responseDoc.likes.length > 0)) return []
    const responseLikesLength = responseDoc.likes.length
    logger.log(lG, lS, null, { responseLikesLength })

    const likes = await responseDoc.likes
    logger.log(lG, lS, null, { likes })

    let likesArray = []

    // const generateDataToReturn = await (async () => {
    await Promise.all(
      likes.map(async likeId => {
        logger.log(lG, lS, null, { likeId })

        const foundLike = await crud.read.like.findById(likeId)
        logger.log(lG, lS, null, { foundLike })

        let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          foundLike.userId
        )
        logger.log(lG, lS, null, { canUserReadUser })

        if (canUserReadUser === true) {
          const foundUser = await crud.user.read.findById(foundLike.userId, {
            _id: 1,
            "info.avatar": 1,
            "info.username": 1,
            "info.name": 1,
            followers: 1,
          })
          logger.log(lG, lS, null, { foundUser })

          const likeObject = {
            _id: likeId,
            userId: foundUser._id,
            avatar: foundUser.info.avatar,
            username: foundUser.info.username,
            name: foundUser.info.name,
            following: await verifyUser.isUserFollowing.checkId(
              readerId,
              foundUser.followers
            ),
            createdAt: foundLike.createdAt,
          }
          likesArray.push(likeObject)
        }
      })
    )
    // })();

    logger.log(lG, lS, null, { likesArray })

    const likesArraySortedByCreatedAt = u.sortArrayOfObjectsByProp(
      likesArray,
      "createdAt"
    )
    logger.log(lG, lS, null, { likesArraySortedByCreatedAt })

    return likesArray
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, responseId) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { responseId });
//
//
//
//   try {
//     const foundResponse = await Response.findOne({ _id: responseId });
//
//     logger.log(lG, lS, null, { foundResponse });
//
//     const validationResults = await h.verifyOperation.readDoc(
//       readerId,
//       foundResponse
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const likes = await foundResponse.likes;
//       if (likes.length === 0) {
//         return null;
//       } else {
//         let likesArray = [];
//         const generateDataToReturn = await (async () => {
//           await Promise.all(
//             likes.map(async likeId => {
//               const foundLike = await qLike.read.byId(readerId, likeId);
//               const foundUser = await User.findOne(
//                 { _id: foundLike.userId },
//                 {
//                   _id: 1,
//                   "info.avatar": 1,
//                   "info.username": 1,
//                   "info.name": 1,
//                   followers: 1
//                 }
//               );
//
//               let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//                 readerId,
//                 foundUser._id
//               );
//
//               if (canUserReadUser === true) {
//                 const likeObject = {
//                   _id: likeId,
//                   userId: foundUser._id,
//                   avatar: foundUser.info.avatar,
//                   username: foundUser.info.username,
//                   name: foundUser.info.name,
//                   following: await verifyUser.isUserFollowing.checkId(
//                     readerId,
//                     foundUser.followers
//                   )
//                 };
//                 likesArray.push(likeObject);
//               }
//             })
//           );
//         })();
//         // sort likesArray by createdAt
//         logger.log(lG, lS, null, { likesArray });
//         return likesArray;
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
