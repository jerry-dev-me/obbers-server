const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-ACCOUNT-STATUS" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

const queryFunc = async (writerId, updatedStatus) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { updatedStatus })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // validate new status

    const updatedUser = await crud.update.user.findByIdAndUpdate(writerId, {
      "account.status": updatedStatus,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const foundUser = await User.findOne(
    //   { _id: writerId },
    //   { "account.status": 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundUser });
    //
    // if (foundUser === null || foundUser === "undefined") {
    //   return null;
    // } else {
    //   const newPromise = new Promise((resolve, reject) => {
    //     return User.findByIdAndUpdate(
    //       { _id: writerId },
    //       { "account.status": updatedStatus },
    //       { new: true },
    //       function(error, updatedUser) {
    //         if (error) return reject(error);
    //         else return resolve(updatedUser);
    //       }
    //     );
    //   });
    //
    //   return newPromise
    //     .then(updatedUser => {
    //       logger.log(lG, lS, null, { updatedUser });
    //       return updatedUser;
    //     })
    //     .catch(error => {
    //       logger.log(lG, lS, null, { err });
    // return e.HandleFeatureError(err);
    //
    //
    //     });
    // }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

module.exports = {
  active: async writerId => {
    const updatedStatus = "ACTIVE"
    return await queryFunc(writerId, updatedStatus)
  },
  inactive: async writerId => {
    const updatedStatus = "INACTIVE"
    return await queryFunc(writerId, updatedStatus)
  },
  suspended: async writerId => {
    const updatedStatus = "SUSPENDED"
    return await queryFunc(writerId, updatedStatus)
  },
  banned: async writerId => {
    const updatedStatus = "BANNED"
    return await queryFunc(writerId, updatedStatus)
  },
  deleted: async writerId => {
    const updatedStatus = "DELETED"
    return await queryFunc(writerId, updatedStatus)
  },
}

// module.exports = async (writerId, updatedStatus) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { updatedStatus });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: writerId },
//       { "account.status": 1 }
//     );
//
//     logger.log(lG, lS, null, { foundUser });
//
//     if (foundUser === null || foundUser === "undefined") {
//       return null;
//     } else {
//       const newPromise = new Promise((resolve, reject) => {
//         return User.findByIdAndUpdate(
//           { _id: writerId },
//           { "account.status": updatedStatus },
//           { new: true },
//           function(error, updatedUser) {
//             if (error) return reject(error);
//             else return resolve(updatedUser);
//           }
//         );
//       });
//
//       return newPromise
//         .then(updatedUser => {
//           logger.log(lG, lS, null, { updatedUser });
//           return updatedUser;
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
