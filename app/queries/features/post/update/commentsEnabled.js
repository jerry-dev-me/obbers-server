const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-U-COMMENTS-ENABLED" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

const queryFunc = async (writerId, postId, value) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { postId })
    logger.log(lG, lS, null, { value })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // const foundPost = await Post.findOne({ _id: postId }, { userId: 1 });
    //
    // logger.log(lG, lS, null, { foundPost });
    //
    // return await h.verifyOperation.writeDocByCreatorOnly(writerId, foundPost);

    // validate value

    const updatedPost = await crud.update.post.findByIdAndUpdate(postId, {
      commentsEnabled: value,
    })
    logger.log(lG, lS, null, { updatedPost })

    return updatedPost

    // const newPromise = new Promise((resolve, reject) => {
    //   return Post.findByIdAndUpdate(
    //     { _id: postId },
    //     { commentsEnabled: value },
    //     { new: true },
    //     async function(error, updatedPost) {
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

module.exports = {
  true: async (writerId, postId) => {
    const value = true
    return await queryFunc(writerId, postId, value)
  },
  false: async (writerId, postId) => {
    const value = false
    return await queryFunc(writerId, postId, value)
  },
}

// module.exports = async (writerId, postId, value) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { postId });
//   logger.log(lG, lS, null, { value });
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
//           { commentsEnabled: value },
//           { new: true },
//           async function(error, updatedPost) {
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
