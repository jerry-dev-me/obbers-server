const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-LIKED-POSTS" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async readerId => {
  try {
    logger.log(lG, lS, null, { readerId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const userDoc = await crud.read.user.findByIdAndPopulate(
      readerId,
      { postLikes: 1 },
      "postLikes",
      "_id userId"
    )
    logger.log(lG, lS, null, { userDoc })

    if (!(userDoc && userDoc.likedPosts.length > 0)) return []
    const likedPostsLength = userDoc.likedPosts.length
    logger.log(lG, lS, null, { likedPostsLength })

    const postLikes = userDoc.postLikes
    logger.log(lG, lS, null, { postLikes })

    let postsArray = []
    // const generateDataToReturn = await (async () => {
    await Promise.all(
      postLikes.map(async postId => {
        logger.log(lG, lS, null, { postId })

        const postDoc = await crud.read.post.findById(postId)
        logger.log(lG, lS, null, { postDoc })

        if (!(postDoc === null || postDoc === undefined)) {
          const canUserReadUser = await verifyUser.canUserReadUser.checkId(
            readerId,
            postDoc.userId
          )
          logger.log(lG, lS, null, { canUserReadUser })

          if (canUserReadUser === true) postsArray.push(postDoc)
        }
      })
    )
    // })();

    logger.log(lG, lS, null, { postsArray })

    return postsArray
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async userId => {
//   logger.log(lG, lS, null, { userId });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: userId },
//       { postLikes: 1 },
//       { new: true }
//     );
//
//     logger.log(lG, lS, null, { foundUser });
//
//     if (foundUser === null || foundUser === undefined) {
//       return null;
//     } else {
//       const postLikes = foundUser.postLikes;
//       if (postLikes.length === 0) {
//         return null;
//       } else {
//         let postsArray = [];
//         const generateDataToReturn = await (async () => {
//           await Promise.all(
//             postLikes.map(async postId => {
//               const foundPost = await Post.findOne({ _id: postId });
//               postsArray.push(foundPost);
//             })
//           );
//         })();
//         logger.log(lG, lS, null, { postsArray });
//         return postsArray;
//       }
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
