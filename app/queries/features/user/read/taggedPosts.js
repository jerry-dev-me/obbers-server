const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-TAGGED-POSTS" // logSubgroup

const u = require("../../../../../utils")
const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, idToRead) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { idToRead })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const userDoc = await crud.read.user.findByIdLeanAndPopulate(
      readerId,
      { _id: 1, taggedPosts: 1 },
      "taggedPosts",
      "_id thumbnail"
    )
    logger.log(lG, lS, null, { userDoc })

    if (!(userDoc && userDoc.taggedPosts.length > 0)) return []
    const taggedPostsLength = userDoc.taggedPosts.length
    logger.log(lG, lS, null, { taggedPostsLength })

    const taggedPosts = userDoc.taggedPosts
    logger.log(lG, lS, null, { taggedPosts })

    let postsArray = []

    // const generateDataToReturn = await (async () => {
    await Promise.all(
      taggedPosts.map(async postId => {
        logger.log(lG, lS, null, { postId })

        const postDoc = await crud.read.post.findByIdLeanAndPopulate(
          postId,
          {},
          "userId",
          "_id info"
        )
        logger.log(lG, lS, null, { postDoc })

        const postObject = {
          _id: postId,
          userId: postDoc.userId,
          avatar: postDoc.info.avatar,
          username: postDoc.info.username,
          content: postDoc.content,
          likes: postDoc.likes,
          totalLikes: postDoc.totalLikes,
          totalComments: postDoc.totalComments,
          createdAt: postDoc.createdAt,
          modifiedAt: postDoc.modifiedAt,
        }

        postsArray.push(postObject)
      })
    )
    // })();

    logger.log(lG, lS, null, { postsArray })

    const postsArraySortedByProp = u.sortArrayOfObjectsByProp(
      postsArray,
      "createdAt"
    )
    logger.log(lG, lS, null, { postsArraySortedByProp })

    return postsArray
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, idToRead) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { idToRead });
//
//   try {
//     let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//       readerId,
//       idToRead
//     );
//     logger.log(lG, lS, null, { canUserReadUser });
//     if (canUserReadUser !== true) {
//       return null;
//     } else {
//       const foundUser = await User.findOne(
//         { _id: idToRead },
//         { taggedPosts: 1 },
//         { new: true }
//       );
//       logger.log(lG, lS, null, { foundUser });
//       if (foundUser === null || foundUser === undefined) {
//         return null;
//       } else {
//         const taggedPosts = foundUser.taggedPosts;
//         if (taggedPosts.length === 0) {
//           return null;
//         } else {
//           let postsArray = [];
//           const generateDataToReturn = await (async () => {
//             await Promise.all(
//               taggedPosts.map(async postId => {
//                 const foundPost = await Post.findOne({ _id: postId });
//
//                 // const postObject = {
//                 //     _id: comment._id,
//                 //     postId: comment.postId,
//                 //     userId: comment.userId,
//                 //     avatar: foundUser.info.avatar,
//                 //     username: foundUser.info.username,
//                 //     content: comment.content,
//                 //     createdAt: comment.createdAt,
//                 //     modifiedAt: comment.modifiedAt,
//                 //     likes: comment.likes,
//                 //     // totalLikes: comment.totalLikes,
//                 //     responses: comment.responses,
//                 //     // totalResponses: comment.totalResponses
//                 // };
//
//                 postsArray.push(foundPost);
//               })
//             );
//           })();
//           logger.log(lG, lS, null, { postsArray });
//           return postsArray;
//         }
//       }
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
