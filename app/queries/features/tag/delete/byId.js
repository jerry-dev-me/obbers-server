const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "TAG-D-BY-ID" // logSubgroup

const u = require("../../../../../utils")
const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, postId, tagId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { postId })
    logger.log(lG, lS, null, { tagId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const postDoc = docsById.postId
    logger.log(lG, lS, null, { postDoc })

    if (!(postDoc && postDoc.tags && postDoc.tags.length > 0)) return []
    const postTagsLength = postDoc.tags.length
    logger.log(lG, lS, null, { postTagsLength })

    const tags = postDoc.tags
    logger.log(lG, lS, null, { tags })

    let tagIdExists
    let tagDoc

    tags.map(tag => {
      logger.log(lG, lS, null, { tag })

      const isSameId = u.isSameId(tag._id, tagId)
      logger.log(lG, lS, null, { isSameId })

      if (isSameId === true) {
        tagIdExists = true
        tagDoc = tag
      }
    })

    if (tagIdExists !== true) return postDoc

    const taggedUserId = tagDoc.userId
    logger.log(lG, lS, null, { taggedUserId })

    const updatedUser = await crud.update.user.findByIdAndPull(taggedUserId, {
      taggedPosts: { postId },
    })
    logger.log(lG, lS, null, { updatedUser })

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
    //         taggedUserId,
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
    //     const updatedPostTags = updatedPost.tags;
    //     let tagDoc = null;
    //     updatedPostTags.map(tag => {
    //       if (tag._id.toString() === tagId.toString()) {
    //         tagDoc = tag;
    //       }
    //     });
    //     logger.log(lG, lS, null, { tagDoc });
    //     return tagDoc;
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

// module.exports = async (writerId, postId, tagId) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { postId });
//   logger.log(lG, lS, null, { tagId });
//
//
//
//   try {
//     // find post and make sure it is not null...
//     // then, find tagId and make sure it is not null...
//     // if post found and tagId found...
//     // make sure writerId is equal to postId createor or tag userId (tagged userId)
//
//     const foundPost = await Post.findOne({ _id: postId });
//
//     logger.log(lG, lS, null, { foundPost });
//
//     let foundTags;
//     let tagDoc;
//     let tagIdExists;
//
//     if (foundPost && foundPost.tags.length > 0) {
//       foundTags = foundPost.tags;
//       foundTags.map(tag => {
//         if (tag._id.toString() === tagId.toString()) {
//           tagDoc = tag;
//           tagIdExists = true;
//         }
//       });
//     } else {
//       return false;
//     }
//
//     if (tagIdExists === true) {
//       let taggedUserId = tagDoc.userId;
//
//       const validationResults = await h.verifyOperation.writeDocByAllowedOnly(
//         writerId,
//         foundPost,
//         [foundPost.userId, taggedUserId]
//       );
//
//       logger.log(lG, lS, null, { validationResults });
//
//       if (validationResults === true) {
//         const newPromise = new Promise((resolve, reject) => {
//           return Post.findByIdAndUpdate(
//             { _id: postId },
//             { $pull: { tags: { _id: tagId } } },
//             { new: true },
//             async function(error, updatedPost) {
//               const updatedUser = await qUser.update.removeTaggedPost(
//                 taggedUserId,
//                 postId
//               );
//               if (error) reject(error);
//               else resolve(updatedPost);
//             }
//           );
//         });
//         return newPromise
//           .then(updatedPost => {
//             logger.log(lG, lS, null, { updatedPost });
//             const updatedPostTags = updatedPost.tags;
//             let tagDoc = null;
//             updatedPostTags.map(tag => {
//               if (tag._id.toString() === tagId.toString()) {
//                 tagDoc = tag;
//               }
//             });
//             logger.log(lG, lS, null, { tagDoc });
//             return tagDoc;
//           })
//           .catch(error => {
//             logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//           });
//
//         // shouild we find post tags and tagId isnide postTags?
//         // just to make sure it was deleted???
//       }
//       return validationResults;
//     } else {
//       return null;
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//   }
// };
