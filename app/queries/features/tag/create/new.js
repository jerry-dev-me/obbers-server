const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "TAG-C-NEW" // logSubgroup

const u = require("../../../../../utils")
const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

// mulitple, update psot with mulitple subdocs
// add an array of fields...

module.exports = async (writerId, fields) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { fields })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    await crud.update.post.findByIdAndAddToSet(postId, {
      tags: validFields,
    })

    let isUserTagged
    if (postDoc && postDoc.tags.length > 0) {
      const postTagsLength = postDoc.tags.length
      logger.log(lG, lS, null, { postTagsLength })

      let postTags = postDoc.tags
      logger.log(lG, lS, null, { postTags })

      postTags.map(tag => {
        logger.log(lG, lS, null, { tag })

        const isSameId = u.isSameId(tag.userId, userId)
        logger.log(lG, lS, null, { isSameId })

        if (isSameId === true) isUserTagged = true
      })
    }

    if (isUserTagged === true) return "Already tagged" // return e.HandleFeatureError(err)
    // new custom error, which says operation could not be complete beacuse,
    // some reason "useris already tagged"

    await crud.update.post.findByIdAndAddToSet(postId, {
      tags: validFields,
    })

    return await crud.update.user.findByIdAndAddToSet(userId, {
      taggedPosts: postId,
    })

    // const newPromise = new Promise((resolve, reject) => {
    //   return Post.findByIdAndUpdate(
    //     { _id: postId },
    //     { $addToSet: { tags: verifiedFields } },
    //     { new: true },
    //     async function(error, updatedPost) {
    //       const updatedUser = await qUser.update.addTaggedPost(
    //         verifiedFields.userId,
    //         postId
    //       );
    //       if (error) reject(error);
    //       else resolve(updatedPost);
    //     }
    //   );
    // });
    // return newPromise
    //   .then(updatedPost => {
    //     let tagObject;
    //     let postTags = updatedPost.tags;
    //     postTags.map(tag => {
    //       if (tag.userId.toString() === verifiedFields.userId.toString()) {
    //         tagObject = tag;
    //       }
    //     });
    //     logger.log(lG, lS, null, { tagObject });
    //     return tagObject;
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

// module.exports = async (writerId, postId, fields) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { postId });
//   logger.log(lG, lS, null, { fields });
//
//
//
//   try {
//     const foundPost = await Post.findOne({ _id: postId });
//
//     logger.log(lG, lS, null, { foundPost });
//
//     const validationResults = await h.verifyOperation.writeDocByCreatorOnly(
//       writerId,
//       foundPost
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const verifiedFields = await h.validateFields.tag(fields);
//       logger.log(lG, lS, null, { verifiedFields });
//
//       const checkIfUserIsAlreadyTagged = async () => {
//         let isUserTagged;
//         logger.log(lG, lS, null, { foundPostTags: foundPost.tags });
//         if (foundPost && foundPost.tags.length > 0) {
//           let foundPostTags = foundPost.tags;
//           foundPostTags.map(tag => {
//             if (tag.userId.toString() === verifiedFields.userId.toString()) {
//               isUserTagged = true;
//             } else {
//               isUserTagged = false;
//             }
//           });
//         } else {
//           isUserTagged = false;
//         }
//         return isUserTagged;
//       };
//
//       logger.log(lG, lS, null, {
//         isUserTagged: await checkIfUserIsAlreadyTagged()
//       });
//
//       if ((await checkIfUserIsAlreadyTagged()) === true) {
//         return false;
//       } else {
//         const newPromise = new Promise((resolve, reject) => {
//           return Post.findByIdAndUpdate(
//             { _id: postId },
//             { $addToSet: { tags: verifiedFields } },
//             { new: true },
//             async function(error, updatedPost) {
//               const updatedUser = await qUser.update.addTaggedPost(
//                 verifiedFields.userId,
//                 postId
//               );
//               if (error) reject(error);
//               else resolve(updatedPost);
//             }
//           );
//         });
//         return newPromise
//           .then(updatedPost => {
//             let tagObject;
//             let postTags = updatedPost.tags;
//             postTags.map(tag => {
//               if (tag.userId.toString() === verifiedFields.userId.toString()) {
//                 tagObject = tag;
//               }
//             });
//             logger.log(lG, lS, null, { tagObject });
//             return tagObject;
//           })
//           .catch(error => {
//             logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//           });
//       }
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//   }
// };
