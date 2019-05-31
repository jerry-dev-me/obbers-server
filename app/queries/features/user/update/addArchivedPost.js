const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-ADD-ARCHIVED-POST" // logSubgroup

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

    await crud.update.user.findByIdAndPull(writerId, { posts: postId })

    const updatedUser = await crud.update.user.findByIdAndAddToSet(writerId, {
      archivedPosts: postId,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const addArchivedPostsAndRemoveThemFromAllPosts = await (async function() {
    //   const updateUserArchivedPosts = new Promise((resolve, reject) => {
    //     // const updateUserArchivedPosts = () => new Promise((resolve, reject) => {
    //     return User.findByIdAndUpdate(
    //       { _id: writerId },
    //       { $addToSet: { archivedPosts: postId } },
    //       { new: true },
    //       async function(error, updatedUser) {
    //         // archivedPosts = updatedUser.archivedPosts;
    //         if (error) return reject(error);
    //         else return resolve(updatedUser);
    //       }
    //     );
    //   });
    //
    //   const updateUserPosts = new Promise((resolve, reject) => {
    //     // const updateUserPosts = () => new Promise((resolve, reject) => {
    //     return User.findByIdAndUpdate(
    //       { _id: writerId },
    //       { $pull: { posts: postId } },
    //       { new: true },
    //       function(error, updatedUser) {
    //         if (error) return reject(error);
    //         else return resolve(updatedUser);
    //       }
    //     );
    //   });
    //
    //   return await Promise.all([
    //     // await updateUserArchivedPosts(),
    //     // await updateUserPosts()
    //     updateUserArchivedPosts,
    //     updateUserPosts
    //   ])
    //     .then(results => {
    //       // const promise1Results = results[0];
    //       // const promise2Results = results[1];
    //     })
    //     .catch(error => {
    //       logger.log(lG, lS, null, { err });
    // return e.HandleFeatureError(err);
    //
    //
    //     });
    // })();
    //
    // const updatedUser = await User.findOne({ _id: writerId });
    // return updatedUser;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, postId) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { postId });
//
//   // can use the approach below where we create 2 promises...
//   // promise1 adds the postId to the user archivedPosts array
//   // promise2 pull the postId from the user posts array
//   // lastly it searches the user again in the database and returns it
//
//   // another approach could be to nest the promises...
//   // execute promise1 and then execute promise2 from the promise1 callback
//   // then return whatever is returned from the promise2 callback
//   // in this approach we can replace promises for simple functions...
//
//   try {
//     const addArchivedPostsAndRemoveThemFromAllPosts = await (async function() {
//       const updateUserArchivedPosts = new Promise((resolve, reject) => {
//         // const updateUserArchivedPosts = () => new Promise((resolve, reject) => {
//         return User.findByIdAndUpdate(
//           { _id: writerId },
//           { $addToSet: { archivedPosts: postId } },
//           { new: true },
//           async function(error, updatedUser) {
//             // archivedPosts = updatedUser.archivedPosts;
//             if (error) return reject(error);
//             else return resolve(updatedUser);
//           }
//         );
//       });
//
//       const updateUserPosts = new Promise((resolve, reject) => {
//         // const updateUserPosts = () => new Promise((resolve, reject) => {
//         return User.findByIdAndUpdate(
//           { _id: writerId },
//           { $pull: { posts: postId } },
//           { new: true },
//           function(error, updatedUser) {
//             if (error) return reject(error);
//             else return resolve(updatedUser);
//           }
//         );
//       });
//
//       return await Promise.all([
//         // await updateUserArchivedPosts(),
//         // await updateUserPosts()
//         updateUserArchivedPosts,
//         updateUserPosts
//       ])
//         .then(results => {
//           // const promise1Results = results[0];
//           // const promise2Results = results[1];
//         })
//         .catch(error => {
//           logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//         });
//     })();
//
//     const updatedUser = await User.findOne({ _id: writerId });
//     return updatedUser;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
