const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-PASSWORD" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

const bcrypt = require("bcrypt-nodejs")

module.exports = async (writerId, currentPassword, newPassword) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { currentPassword })
    logger.log(lG, lS, null, { newPassword })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const userDoc = docsById.writerId
    logger.log(lG, lS, null, { userDoc })

    // is same password or is it a new one?
    if (newPassword.toString() === userDoc.local.password.toString()) {
      // password is the same
      // return e.HandleFeatureError(err) saying the password is the same...
    }

    // validate password string... should match password characters criteria
    // validate newPassword

    const hashNewPass = bcrypt.hashSync(
      newPassword,
      bcrypt.genSaltSync(8),
      null
    )
    logger.log(lG, lS, null, { hashNewPass })

    const updatedUser = await crud.update.user.findByIdAndUpdate(writerId, {
      "local.password": hashNewPass,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const newPromise = new Promise((resolve, reject) => {
    //   return User.findByIdAndUpdate(
    //     { _id: writerId },
    //     { "local.password": hashNewPass },
    //     { new: true },
    //     function(error, updatedUser) {
    //       if (error) return reject(error);
    //       else return resolve(updatedUser);
    //     }
    //   );
    // });
    //
    // return newPromise
    //   .then(updatedUser => {
    //     logger.log(lG, lS, null, { updatedUser });
    //     return updatedUser.local.password;
    //   })
    //   .catch(error => {
    //     logger.log(lG, lS, null, { err });
    // return e.HandleFeatureError(err);
    //

    //   });
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, currentPassword, newPassword) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { currentPassword });
//   logger.log(lG, lS, null, { newPassword });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: writerId },
//       { "local.password": 1 }
//     );
//
//     logger.log(lG, lS, null, { foundUser });
//
//     const validationResults = await h.verifyOperation.writeUserDocSelfOnly(
//       writerId,
//       foundUser
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       if (foundUser.local.password !== currentPassword) {
//         logger.log(lG, lS, "foundUser.local.password !== currentPassword");
//         return null;
//       } else {
//         const hashNewPass = bcrypt.hashSync(
//           newPassword,
//           bcrypt.genSaltSync(8),
//           null
//         );
//
//         logger.log(lG, lS, null, { hashNewPass });
//
//         const newPromise = new Promise((resolve, reject) => {
//           return User.findByIdAndUpdate(
//             { _id: writerId },
//             { "local.password": hashNewPass },
//             { new: true },
//             function(error, updatedUser) {
//               if (error) return reject(error);
//               else return resolve(updatedUser);
//             }
//           );
//         });
//
//         return newPromise
//           .then(updatedUser => {
//             logger.log(lG, lS, null, { updatedUser });
//             return updatedUser.local.password;
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
//
//
//   }
// };
