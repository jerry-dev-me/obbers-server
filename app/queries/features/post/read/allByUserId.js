const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-R-ALL-BY-USER-ID" // logSubgroup

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

    // const canUserReadUser = await verifyUser.canUserReadUser.checkId(readerId, idToRead);
    // if (canUserReadUser === false) return new errors.CanUserReadUserIsFalse();
    //
    // // check tags and for each post, map tags, and for each tag.userId check:
    // // const canUserReadUser = await verifyUser.canUserReadUser.checkId(readerId, tag.userId);
    // // if (canUserReadUser === false) return new errors.CanUserReadUserIsFalse();

    // const foundUser = await User.find(
    //   { _id: idToRead },
    //   { posts: 1, "info.avatar": 1, "info.username": 1 }
    // ).populate("posts");

    const foundUser = await crud.read.user.findByIdAndPopulate(
      idToRead,
      { posts: 1, "info.avatar": 1, "info.username": 1 },
      "posts",
      {}
    )
    logger.log(lG, lS, null, { foundUser })

    if (!(foundUser && foundUser.posts.length > 0)) return []
    const foundUserPostsLength = foundUser.posts.length
    logger.log(lG, lS, null, { foundUserPostsLength })

    let postsArray = []
    // const generateDataToReturn = await (async () => {
    const posts = foundUser.posts
    logger.log(lG, lS, null, { posts })

    await Promise.all(
      posts.map(async post => {
        logger.log(lG, lS, null, { post })

        const postObject = {
          _id: post._id,
          userId: post.userId,
          avatar: foundUser.info.avatar,
          username: foundUser.info.username,
          createdAt: post.createdAt,
          caption: post.caption,
          commentsEnabled: post.commentsEnabled,
          comments: post.comments,
          totalComments: await h.getTotal.postComments(post._id),
          tags: post.tags,
          likes: post.likes,
          totalLikes: await h.getTotal.postLikes(post._id),
          content: post.content,
          location: post.location,
          geometry: post.geometry,
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

// module.exports = async (readerId, idToRead) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { idToRead });
//
//   try {
//     const foundUser = await User.find(
//       { _id: idToRead },
//       { posts: 1, "info.avatar": 1, "info.username": 1 }
//     ).populate("posts");
//
//     logger.log(lG, lS, null, { foundUser });
//
//     const validationResults = await h.verifyOperation.readDoc(
//       readerId,
//       foundUser
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       let postsArray = [];
//       const generateDataToReturn = await (async () => {
//         const posts = foundUser.posts;
//         await Promise.all(
//           posts.map(async post => {
//             const postObject = {
//               _id: post._id,
//               userId: post.userId,
//               avatar: foundUser.info.avatar,
//               username: foundUser.info.username,
//               createdAt: post.createdAt,
//               caption: post.caption,
//               commentsEnabled: post.commentsEnabled,
//               comments: post.comments,
//               totalComments: await h.getTotal.postComments(post._id),
//               tags: post.tags,
//               likes: post.likes,
//               totalLikes: await h.getTotal.postLikes(post._id),
//               content: post.content,
//               location: post.location,
//               geometry: post.geometry
//             };
//             postsArray.push(postObject);
//           })
//         );
//       })();
//       // sort postsArray by createdAt
//       logger.log(lG, lS, null, { postsArray });
//       return postsArray;
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
