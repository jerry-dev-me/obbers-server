const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-ADD-BLOCKED" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, idToBlock) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { idToBlock })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const writerDoc = docsById.writerId
    logger.log(lG, lS, null, { writerDoc })

    const userIdToBlockDoc = docsById.idToBlock
    logger.log(lG, lS, null, { userIdToBlockDoc })

    await crud.user.update.findByIdAndPull(writerId, { followers: idToBlock })
    await crud.user.update.findByIdAndPull(writerId, { following: idToBlock })
    await crud.user.update.findByIdAndPull(idToBlock, { followers: writerId })
    await crud.user.update.findByIdAndPull(idToBlock, { following: writerId })

    const updateUser = await crud.update.user.findByIdAndAddToSet(writerId, {
      blockedUsers: idToBlock,
    })
    logger.log(lG, lS, null, { updateUser })

    return updateUser

    // const newPromise = new Promise((resolve, reject) => {
    //   return User.findByIdAndUpdate(
    //     { _id: writerId },
    //     { $addToSet: { blockedUsers: idToBlock } }, //$push orders elemts, $addToSet doesnt orders
    //     { new: true },
    //     function(error, updatedUser) {
    //       // remove tags from post.tags
    //       // and from user.tags
    //       // find all fields where tagId has been saved and pull off tagId from there
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

// module.exports = async (writerId, idToBlock) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { idToBlock });
//
//   try {
//     // let canUserWrite = await h.verifyUser.canUserWrite(writerId);
//     // if (canUserWrite !== true) {
//     //   return h.queryOutput(null, cMsg.CANNOT_WRITE, null);
//     // } else {
//     const newPromise = new Promise((resolve, reject) => {
//       return User.findByIdAndUpdate(
//         { _id: writerId },
//         { $addToSet: { blockedUsers: idToBlock } }, //$push orders elemts, $addToSet doesnt orders
//         { new: true },
//         function(error, updatedUser) {
//           // remove tags from post.tags
//           // and from user.tags
//           // find all fields where tagId has been saved and pull off tagId from there
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
//
//     // const updateUser = await User.findByIdAndUpdate(
//     //     {_id: writerId},
//     //     { $addToSet: { blockedUsers: idToBlock } }, //$push orders elemts, $addToSet doesnt orders
//     //     { new: true },
//     //     function(error, updatedUser) {
//     //         return updatedUser;
//     //     }
//     // );
//     // }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
