const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-REMOVE-FOLLOWING" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, userIdToUnfollow) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { userIdToUnfollow })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)
    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const updatedUser = await crud.update.user.findByIdAndPull(writerId, {
      following: userIdToUnfollow,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const newPromise = new Promise((resolve, reject) => {
    //   return User.findByIdAndUpdate(
    //     { _id: writerId },
    //     { $pull: { following: userIdToUnfollow } },
    //     { new: true },
    //     async function(error, updatedUser) {
    //       if (error) return reject(error);
    //       else return resolve(updatedUser);
    //     }
    //   );
    // });
    //
    // return newPromise
    //   .then(updatedUser => {
    //     logger.log(lG, lS, null, { updatedUser });
    //     return updatedUser;
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

// module.exports = async (writerId, userIdToUnfollow) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { userIdToUnfollow });
//
//   try {
//     const newPromise = new Promise((resolve, reject) => {
//       return User.findByIdAndUpdate(
//         { _id: writerId },
//         { $pull: { following: userIdToUnfollow } },
//         { new: true },
//         async function(error, updatedUser) {
//           if (error) return reject(error);
//           else return resolve(updatedUser);
//         }
//       );
//     });
//
//     return newPromise
//       .then(updatedUser => {
//         logger.log(lG, lS, null, { updatedUser });
//         return updatedUser;
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
