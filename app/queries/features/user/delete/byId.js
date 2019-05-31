const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-D-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, userIdToDelete) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { userIdToDelete })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const deleteUser = await crud.delete.user.findByIdAndRemove(userIdToDelete)
    logger.log(lG, lS, null, { deleteUser })

    return {}

    // const foundUser = await User.findOne({ _id: userIdToDelete });
    // logger.log(lG, lS, null, { foundUser });
    //
    // const deletedUser = await User.findByIdAndRemove(userIdToDelete);
    // await deletedUser.remove();
    // const foundDeletedUser = await User.findOne({ _id: userIdToDelete });
    //
    // logger.log(lG, lS, null, { deletedUser });
    // logger.log(lG, lS, null, { foundDeletedUser });
    //
    // if (foundDeletedUser !== null) return foundDeletedUser;
    // else return null;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, userIdToDelete) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { userIdToDelete });
//
//   try {
//     const foundUser = await User.findOne({ _id: userIdToDelete });
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
//       const deletedUser = await User.findByIdAndRemove(userIdToDelete);
//       await deletedUser.remove();
//       const foundDeletedUser = await User.findOne({ _id: userIdToDelete });
//
//       logger.log(lG, lS, null, { deletedUser });
//       logger.log(lG, lS, null, { foundDeletedUser });
//
//       if (foundDeletedUser !== null) return foundDeletedUser;
//       else return null;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
