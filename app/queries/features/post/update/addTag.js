const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-U-ADD-TAG" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, postId, tagFields) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { postId })
    logger.log(lG, lS, null, { tagFields })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // const canUserWrite = await verifyUser.canUserWrite.checkId(writerId);
    // if (canUserWrite === false) return new errors.WritePermissionsIsFalse();
    //
    // // isUserId creator of postId
    // const isUserIdCreator = await verifyDoc.isUserIdCreator.doc.checkId(
    //   writerId,
    //   docId
    // );
    // if (variableResults === false) return false;
    //
    // // validateFields...
    // const validatedFields = validateFields.tag(fields);
    // if (validatedFields instanceof Error) return validatedFields;
    //
    // // then after fields validation, check if writerID can read tagFields.userId
    // // const canUserReadUser = await verifyUser.canUserReadUser.checkId(readerId, idToRead);
    //
    // // if everything ok, proceed

    await crud.update.user.findByIdAndAddToSet(tagFields.userId, {
      taggedPosts: postId,
    })

    const updatedPost = await crud.update.post.findByIdAndAddToSet(postId, {
      tags: tagFields,
    })
    logger.log(lG, lS, null, { updatedPost })

    return updatedPost

    // const newPromise = new Promise((resolve, reject) => {
    //   return Post.findByIdAndUpdate(
    //     { _id: postId },
    //     { $addToSet: { tags: tagFields } },
    //     { new: true },
    //     async function(error, updatedPost) {
    //       const updatedUser = await qUser.update.addTaggedPost(
    //         tagFields.userId,
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

// module.exports = async (writerId, postId, tagFields) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { postId });
//   logger.log(lG, lS, null, { tagFields });
//
//
//
//   try {
//     const foundPost = await Post.findOne({ _id: postId }, { userId: 1 });
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
//       const newPromise = new Promise((resolve, reject) => {
//         return Post.findByIdAndUpdate(
//           { _id: postId },
//           { $addToSet: { tags: tagFields } },
//           { new: true },
//           async function(error, updatedPost) {
//             const updatedUser = await qUser.update.addTaggedPost(
//               tagFields.userId,
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
