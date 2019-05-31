const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-EMAIL" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, currentEmail, newEmail) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { currentEmail })
    logger.log(lG, lS, null, { newEmail })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // is same email or is it a new one?
    if (newEmail.toString() === userDoc.local.email.toString()) {
      // email is the same
      // return e.HandleFeatureError(err) saying the email is the same...
    }

    // validate email string... should match email characters criteria
    // validate new email...

    const updatedUser = await crud.update.user.findByIdAndUpdate(writerId, {
      "local.email": newEmail,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const foundUser = _operationData.foundUser;
    // if (foundUser.local.email !== currentEmail) {
    //   logger.log(lG, lS, "foundUser.local.email !== currentEmail");
    //   return null;
    // } else {
    //   const newPromise = new Promise((resolve, reject) => {
    //     return User.findByIdAndUpdate(
    //       { _id: writerId },
    //       { "local.email": newEmail },
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
    //       return updatedUser.local.password;
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

// module.exports = async (writerId, currentEmail, newEmail) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { currentEmail });
//   logger.log(lG, lS, null, { newEmail });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: writerId },
//       { "local.email": 1 }
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
//       if (foundUser.local.email !== currentEmail) {
//         logger.log(lG, lS, "foundUser.local.email !== currentEmail");
//         return null;
//       } else {
//         const newPromise = new Promise((resolve, reject) => {
//           return User.findByIdAndUpdate(
//             { _id: writerId },
//             { "local.email": newEmail },
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
