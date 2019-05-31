const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-ARCHIVED-POSTS" // logSubgroup

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

    const userDoc = docsById.readerId
    logger.log(lG, lS, null, { userDoc })

    if (!(userDoc && userDoc.archivedPosts.length > 0)) return []
    const archivedPostsLength = userDoc.archivedPosts.length
    logger.log(lG, lS, null, { archivedPostsLength })

    const archivedPosts = userDoc.archivedPosts
    logger.log(lG, lS, null, { archivedPosts })

    let postsArray = []
    // const generateDataToReturn = await (async () => {
    await Promise.all(
      archivedPosts.map(post => {
        logger.log(lG, lS, null, { post })

        const postObject = {
          _id: post._id,
          userId: post.userId,
          createdAt: post.createdAt,
          modifiedAt: post.modifiedAt,
          name: post.name,
          thumbnail: post.thumbnail,
        }
        postsArray.push(postObject)
      })
    )
    // })();

    logger.log(lG, lS, null, { postsArray })

    const postsArraySortedByCreatedAt = u.sortArrayOfObjectsByProp(
      postsArray,
      "createdAt"
    )
    logger.log(lG, lS, null, { postsArraySortedByCreatedAt })

    return postsArraySortedByCreatedAt
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
//       { archivedPosts: 1 }
//     ).populate("archivedPosts");
//
//     logger.log(lG, lS, null, { foundUser });
//
//     const validationResults = await h.verifyOperation.readUserDocSelfOnly(
//       userId,
//       foundUser
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const archivedPosts = foundUser.archivedPosts;
//       if (archivedPosts.length === 0) {
//         return null;
//       } else {
//         let postsArray = [];
//         const generateDataToReturn = await (async () => {
//           await Promise.all(
//             archivedPosts.map(post => {
//               const postObject = {
//                 _id: post._id,
//                 userId: post.userId,
//                 modifiedAt: post.modifiedAt,
//                 name: post.name,
//                 thumbnail: post.thumbnail
//               };
//               postsArray.push(postObject);
//             })
//           );
//         })();
//         logger.log(lG, lS, null, { postsArray });
//         return postsArray;
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
