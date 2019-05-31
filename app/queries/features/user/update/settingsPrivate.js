const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-SETTINGS-PRIVATE" // logSubgroup

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

    // validate alue

    let newValue
    if (value === "toggle") {
      let currentValue = userDoc.settings.private
      logger.log(lG, lS, null, { currentValue })
      newValue = currentValue ? false : true
    } else {
      newValue = value
    }
    logger.log(lG, lS, null, { newValue })

    const updatedUser = await crud.update.user.findByIdAndUpdate(writerId, {
      "settings.private": value,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const newPromise = new Promise((resolve, reject) => {
    //   return User.findByIdAndUpdate(
    //     { _id: writerId },
    //     { "settings.private": value },
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
  toggle: async writerId => {
    const value = "toggle"
    return await queryFunc(writerId, value)
  },
}

// module.exports = async writerId => {
//   logger.log(lG, lS, null, { writerId });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: writerId },
//       { "settings.private": 1 }
//     );
//
//     logger.log(lG, lS, null, { foundUser });
//
//     if (foundUser === null || foundUser === "undefined") {
//       return null;
//     } else {
//       let settingsPrivate = foundUser.settings.private;
//       let value = settingsPrivate ? false : true;
//
//       const newPromise = new Promise((resolve, reject) => {
//         return User.findByIdAndUpdate(
//           { _id: writerId },
//           { "settings.private": value },
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
