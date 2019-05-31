const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-ACCOUNT-PERMISSIONS" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

const queryFunc = async (writerId, updatedPermissions) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { updatedPermissions })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // validate permissions

    const updatedUser = await crud.update.user.findByIdAndUpdate(writerId, {
      "account.permissions": updatedPermissions,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const foundUser = await User.findOne(
    //   { _id: writerId },
    //   { "account.permissions": 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundUser });
    //
    // if (foundUser === null || foundUser === "undefined") {
    //   return null;
    // } else {
    //
    //   const newPromise = new Promise((resolve, reject) => {
    //     return User.findByIdAndUpdate(
    //       { _id: writerId },
    //       { "account.permissions": updatedPermissions },
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
    //
    // }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

module.exports = {
  admin: async writerId => {
    const updatedPermissions = "ADMIN"
    return await queryFunc(writerId, updatedPermissions)
  },
  readWrite: async writerId => {
    const updatedPermissions = "READ_WRITE"
    return await queryFunc(writerId, updatedPermissions)
  },
  readOnly: async writerId => {
    const updatedPermissions = "READ_ONLY"
    return await queryFunc(writerId, updatedPermissions)
  },
}

// verify if docs exists... if not, return null...
// verify operation... of false, return false
// execue query.... return query results

// module.exports = async (writerId, updatedPermissions) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { updatedPermissions });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: writerId },
//       { "account.permissions": 1 }
//     );
//
//     logger.log(lG, lS, null, { foundUser });
//
//     if (foundUser === null || foundUser === "undefined") {
//       return null;
//     } else {
//
//       const newPromise = new Promise((resolve, reject) => {
//         return User.findByIdAndUpdate(
//           { _id: writerId },
//           { "account.permissions": updatedPermissions },
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
//
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
