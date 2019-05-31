const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-U-SETTINGS-LANGUAGE" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

const queryFunc = async (writerId, language) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { language })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)
    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // valdiate new language

    const updatedUser = await crud.update.user.findByIdAndUpdate(writerId, {
      "settings.language": language,
    })
    logger.log(lG, lS, null, { updatedUser })

    return updatedUser

    // const newPromise = new Promise((resolve, reject) => {
    //   return User.findByIdAndUpdate(
    //     { _id: writerId },
    //     { "settings.language": language },
    //     { new: true },
    //     function(error, updatedUser) {
    //       if (error) return reject(error);
    //       else return resolve(updatedUser);
    //     }
    //   );
    // });
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
  en: async writerId => {
    const language = "en"
    return await queryFunc(writerId, language)
  },
  es: async writerId => {
    const language = "es"
    return await queryFunc(writerId, language)
  },
  fr: async writerId => {
    const language = "fr"
    return await queryFunc(writerId, language)
  },
}

// module.exports = async (writerId, language) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { language });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: writerId },
//       { "settings.language": 1 }
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
//           { "settings.language": language },
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
