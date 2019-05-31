const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-REMOVE-ARCHIVED" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, postId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { postId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)
    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    await crud.update.user.findByIdAndPull(writerId, { archivedPosts: postId })

    const updatedUser = await crud.update.user.findByIdAndAddToSet(writerId, {
      posts: postId,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const updateUserArchivedPosts = new Promise((resolve, reject) => {
    //   return User.findByIdAndUpdate(
    //     { _id: writerId },
    //     { $pull: { archivedPosts: postId } },
    //     { new: true },
    //     async function(error, updatedUser) {
    //       // archivedPosts = updatedUser.archivedPosts;
    //       if (error) return reject(error);
    //       else return resolve(updatedUser);
    //     }
    //   );
    // });
    // const updateUserPosts = new Promise((resolve, reject) => {
    //   return User.findByIdAndUpdate(
    //     { _id: writerId },
    //     { $addToSet: { posts: postId } },
    //     { new: true },
    //     function(error, updatedUser) {
    //       if (error) return reject(error);
    //       else return resolve(updatedUser);
    //     }
    //   );
    // });
    // return await Promise.all([updateUserArchivedPosts, updateUserPosts])
    //   .then(updatedUser => {
    //     logger.log(lG, lS, null, { updatedUser });
    //     return updatedUser;
    //   })
    //   .then(updatedUser => {
    //     let updatedUserArchivedPosts = updatedUser.archivedPosts;
    //     logger.log(lG, lS, null, { updatedUserArchivedPosts });
    //     return updatedUserArchivedPosts;
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

// module.exports = async (writerId, postId) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { postId });
//
//   try {
//     const updateUserArchivedPosts = new Promise((resolve, reject) => {
//       return User.findByIdAndUpdate(
//         { _id: writerId },
//         { $pull: { archivedPosts: postId } },
//         { new: true },
//         async function(error, updatedUser) {
//           // archivedPosts = updatedUser.archivedPosts;
//           if (error) return reject(error);
//           else return resolve(updatedUser);
//         }
//       );
//     });
//
//     const updateUserPosts = new Promise((resolve, reject) => {
//       return User.findByIdAndUpdate(
//         { _id: writerId },
//         { $addToSet: { posts: postId } },
//         { new: true },
//         function(error, updatedUser) {
//           if (error) return reject(error);
//           else return resolve(updatedUser);
//         }
//       );
//     });
//
//     return await Promise.all([updateUserArchivedPosts, updateUserPosts])
//       .then(updatedUser => {
//         logger.log(lG, lS, null, { updatedUser });
//         return updatedUser;
//       })
//       .then(updatedUser => {
//         let updatedUserArchivedPosts = updatedUser.archivedPosts;
//         logger.log(lG, lS, null, { updatedUserArchivedPosts });
//         return updatedUserArchivedPosts;
//       })
//       .catch(error => {
//         logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//       });
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
