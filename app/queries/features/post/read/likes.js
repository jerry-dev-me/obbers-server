const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-R-LIKES" // logSubgroup

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

    const postDoc = docsById.postId
    logger.log(lG, lS, null, { postDoc })

    const likes = postDoc.likes
    logger.log(lG, lS, null, { likes })

    // const canUserReadCreator = await verifyDoc.canUserReadCreator.doc.checkId(userId, docId);
    // if (canUserReadCreator === false) return new errors.CanUserReadUserIsFalse();
    //
    // // grab post and populate likes and per each like do:
    // const canUserReadUser = await verifyUser.canUserReadUser.checkId(readerId, like.userId);
    // if (canUserReadUser === false) return new errors.CanUserReadUserIsFalse();

    let likesArray = []
    // const generateDataToReturn = await (async () => {

    await Promise.all(
      likes.map(async likeId => {
        logger.log(lG, lS, null, { likeId })

        const likeDoc = await crud.read.like.findById(likeId)
        logger.log(lG, lS, null, { likeDoc })

        const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          likeDoc.userId
        )
        logger.log(lG, lS, null, { canUserReadUser })

        if (canUserReadUser === true) {
          const foundUser = await crud.read.user.findById(likeDoc.userId, {
            _id: 1,
            "info.avatar": 1,
            "info.username": 1,
            "info.name": 1,
            followers: 1,
          })
          logger.log(lG, lS, null, { foundUser })

          let likeObject = {
            _id: likeId,
            userId: await foundUser._id,
            avatar: await foundUser.info.avatar,
            username: await foundUser.info.username,
            name: await foundUser.info.name,
            following: await verifyUser.isUserFollowing.checkId(
              readerId,
              foundUser.followers
            ),
            createdAt: likeDoc.createdAt,
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

    return likesArraySortedByCreatedAt
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, postId) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { postId });
//
//
//
//   try {
//     const foundPost = await Post.findOne({ _id: postId });
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
//       let likesArray = [];
//       const generateDataToReturn = await (async () => {
//         const likes = await foundPost.likes;
//         await Promise.all(
//           likes.map(async likeId => {
//             const likeDoc = await qLike.read.byId(readerId, likeId);
//             const foundUser = await User.findOne(
//               { _id: await likeDoc.userId },
//               {
//                 _id: 1,
//                 "info.avatar": 1,
//                 "info.username": 1,
//                 "info.name": 1,
//                 followers: 1
//               }
//             );
//             const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//               readerId,
//               foundUser._id
//             );
//             if (canUserReadUser === true) {
//               let likeObject = {
//                 _id: likeId,
//                 userId: await foundUser._id,
//                 avatar: await foundUser.info.avatar,
//                 username: await foundUser.info.username,
//                 name: await foundUser.info.name,
//                 following: await verifyUser.isUserFollowing.checkId(
//                   readerId,
//                   foundUser.followers
//                 )
//               };
//               likesArray.push(likeObject);
//             }
//           })
//         );
//       })();
//       logger.log(lG, lS, null, { likesArray });
//       return likesArray;
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
