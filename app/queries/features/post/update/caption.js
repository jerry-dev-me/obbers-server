const logger = require("../../../../../lib/logger");
const lG = "QUERIES-FEATURES"; // logGroup
const lS = "POST-U-CAPTION"; // logSubgroup

const h = require("../../../../helpers");
const crud = require("../../../crud");
const verifyDoc = require("../../../verifyDoc");
const verifyUser = require("../../../verifyUser");
const validateOperation = require("../../../validateOperation");
const validateFields = require("../../../validateFields");
const e = require("../../../../errors/queries/features");

module.exports = async (writerId, postId, updatedCaption) => {
  try {
    logger.log(lG, lS, null, { writerId });
    logger.log(lG, lS, null, { postId });
    logger.log(lG, lS, null, { updatedCaption });

    const fields = { caption: updatedCaption };

    // const validation = await validateOperation.read.user.restriction.default(
    //   writerId,
    //   writerId
    // );
    const validation = await validateOperation.update.post.restriction.fields(
      writerId,
      postId,
      fields
    );
    logger.log(lG, lS, null, { validation });

    const { docsById } = validation;
    logger.log(lG, lS, null, { docsById });

    const updatedPost = await crud.update.post.findByIdAndUpdate(postId, {
      caption: updatedCaption
    });
    logger.log(lG, lS, null, { updatedPost });

    return updatedPost;

    // const newPromise = new Promise((resolve, reject) => {
    //   return Post.findByIdAndUpdate(
    //     { _id: postId },
    //     { caption: updatedCaption },
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
    logger.log(lG, lS, null, { err });
    return e.HandleFeatureError(err);
  }
};

// module.exports = async (writerId, postId, updatedCaption) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { postId });
//   logger.log(lG, lS, null, { updatedCaption });
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
//           { caption: updatedCaption },
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
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
