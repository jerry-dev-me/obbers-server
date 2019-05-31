const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-SETTINGS-NOTIFICATIONS" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

const queryFunc = async (writerId, value) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { value })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)
    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const userDoc = docsById.writerId
    logger.log(lG, lS, null, { userDoc })

    // validate value

    let notificationsEnabled = userDoc.settings.notifications
    logger.log(lG, lS, null, { notificationsEnabled })

    let value = notificationsEnabled ? false : true
    logger.log(lG, lS, null, { value })

    const updatedUser = await crud.update.user.findByIdAndUpdate(writerId, {
      "settings.notifications": value,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const newPromise = new Promise((resolve, reject) => {
    //   return User.findByIdAndUpdate(
    //     { _id: writerId },
    //     { "settings.notifications": value },
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
    //     return updatedUser;
    //   })
    //   .catch(error => {
    //     logger.log(lG, lS, null, { err });
    // return e.HandleFeatureError(err);
    //
    //
    //   });
    // }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

module.exports = {
  true: async writerId => {
    const value = true
    return await queryFunc(writerId, value)
  },
  false: async writerId => {
    const value = false
    return await queryFunc(writerId, value)
  },
}

// module.exports = async writerId => {
//   logger.log(lG, lS, null, { writerId });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: writerId },
//       { "settings.notifications": 1 }
//     );
//
//     logger.log(lG, lS, null, { foundUser });
//
//     if (foundUser === null || foundUser === "undefined") {
//       return null;
//     } else {
//       let notificationsEnabled = foundUser.settings.notifications;
//       let value = notificationsEnabled ? false : true;
//
//       const newPromise = new Promise((resolve, reject) => {
//         return User.findByIdAndUpdate(
//           { _id: writerId },
//           { "settings.notifications": value },
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
