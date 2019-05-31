const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, idToRead) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { idToRead })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const userDoc = docsById.idToRead
    logger.log(lG, lS, null, { userDoc })

    return userDoc

    // const foundUser = await User.findOne({ _id: idToRead });
    // logger.log(lG, lS, null, { foundUser });
    //
    // return await h.verifyOperation.readDoc(
    //   readerId,
    //   foundUser
    // );
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, idToRead) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { idToRead });
//
//   try {
//     const foundUser = await User.findOne({ _id: idToRead });
//
//     logger.log(lG, lS, null, { foundUser });
//
//     const validationResults = await h.verifyOperation.readDoc(
//       readerId,
//       foundUser
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       // return foundProfile;
//       return foundUser;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
