const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-U-REMOVE-TAG" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, postId, tagId, userId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { postId })
    logger.log(lG, lS, null, { tagId })
    logger.log(lG, lS, null, { userId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    // operation is valid if is post creator, or found in tag field...

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // // grab postId and take userId
    // const postDoc = await verifyDoc.exists.post.checkId(postId);
    // if (postDoc === false)
    // return new errors.DocDoesNotExist("post");
    //
    // // grab tagId and take userId
    // const tagDoc = await verifyDoc.exists.tag.checkId(tagId);
    // if (tagDoc === false)
    // return new errors.DocDoesNotExist("tag");
    //
    // // is writerId found in post.userId or in tag.userId? if so, can user write?
    //
    //
    // // canUserWrite
    // const canUserWrite = await verifyUser.canUserWrite.checkId(userId);
    // if (canUserWrite === false) return new errors.WritePermissionsIsFalse();
    //
    // // proceed

    // const foundPost = await Post.findOne({ _id: postId }, { userId: 1 });
    // const foundTag = await Tag.findOne({ _id: tagId }, { userId: 1 });
    //
    // logger.log(lG, lS, null, { foundPost });
    // logger.log(lG, lS, null, { foundTag });
    //
    // return await h.verifyOperation.writeDocByAllowedOnly(writerId, foundPost, [
    //   foundPost.userId,
    //   foundTag.userId
    // ]);

    await crud.update.user.findByIdAndPull(userId, { taggedPosts: postId })

    const updatedPost = await crud.update.post.findByIdAndPull(postId, {
      tags: { _id: tagId },
    })
    logger.log(lG, lS, null, { updatedPost })

    return updatedPost

    // const newPromise = new Promise((resolve, reject) => {
    //   return Post.findByIdAndUpdate(
    //     { _id: postId },
    //     { $pull: { tags: { _id: tagId } } },
    //     { new: true },
    //     async function(error, updatedPost) {
    //       const updatedUser = await qUser.update.removeTaggedPost(
    //         userId,
    //         postId
    //       );
    //       if (error) reject(error);
    //       else resolve(updatedPost);
    //     }
    //   );
    // });
    // return newPromise
    //   .then(updatedPost => {
    //     logger.log(lG, lS, null, { updatedPost });
    //     return updatedPost;
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

// module.exports = async (writerId, postId, tagId, userId) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { postId });
//   logger.log(lG, lS, null, { tagId });
//   logger.log(lG, lS, null, { userId });
//
//
//
//   try {
//     const foundPost = await Post.findOne({ _id: postId }, { userId: 1 });
//     const foundTag = await Tag.findOne({ _id: tagId }, { userId: 1 });
//
//     logger.log(lG, lS, null, { foundPost });
//     logger.log(lG, lS, null, { foundTag });
//
//     const validationResults = await h.verifyOperation.writeDocByAllowedOnly(
//       writerId,
//       foundPost,
//       [foundPost.userId, foundTag.userId]
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const newPromise = new Promise((resolve, reject) => {
//         return Post.findByIdAndUpdate(
//           { _id: postId },
//           { $pull: { tags: { _id: tagId } } },
//           { new: true },
//           async function(error, updatedPost) {
//             const updatedUser = await qUser.update.removeTaggedPost(
//               userId,
//               postId
//             );
//             if (error) reject(error);
//             else resolve(updatedPost);
//           }
//         );
//       });
//       return newPromise
//         .then(updatedPost => {
//           logger.log(lG, lS, null, { updatedPost });
//           return updatedPost;
//         })
//         .catch(error => {
//           logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//         });
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
