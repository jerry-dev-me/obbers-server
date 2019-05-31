const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-PROFILE" // logSubgroup

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

    const profileFields = await verifyUser.getProfileFields(readerId, idToRead)
    logger.log(lG, lS, null, { profileFields })

    return profileFields

    //
    // let profileFields = await h.verifyUser.profileFields(readerId, idToRead);
    // logger.log(lG, lS, null, { profileFields });
    //
    // if (profileFields === null || profileFields === undefined) {
    //   return null;
    // } else {
    //   const foundProfile = await User.findOne({ _id: idToRead }, profileFields);
    //   logger.log(lG, lS, null, { foundProfile });
    //   return foundProfile;
    // }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, idToRead) => {
//   // let profileFields = await h.verifyUser.profileFields(readerId, idToRead);
//   // if (profileFields === null || profileFields === undefined)
//   //   return h.queryOutput(null, cMsg.profileNotFound, null);
//   // else return await User.findOne({ _id: idToRead }, profileFields);
//
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { idToRead });
//
//   try {
//     let profileFields = await h.verifyUser.profileFields(readerId, idToRead);
//     logger.log(lG, lS, null, { profileFields });
//
//     if (profileFields === null || profileFields === undefined) {
//       return null;
//     } else {
//       const foundProfile = await User.findOne({ _id: idToRead }, profileFields);
//       logger.log(lG, lS, null, { foundProfile });
//       return foundProfile;
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
//
//   // try {
//   //   let profileFields = await h.verifyUser.profileFields(readerId, idToRead);
//   //   if (profileFields === null || profileFields === undefined) {
//   //     return h.queryOutput(null, cMsg.USER_PROFILE_NOT_FOUND, null);
//   //   } else {
//   //     const foundProfile = await User.findOne({ _id: idToRead }, profileFields);
//   //     return h.queryOutput(null, cMsg.USER_PROFILE_FOUND, foundProfile);
//   //   }
//   // } catch (err) {
//   //   return h.queryOutput(error, cMsg.OPERATION_ERROR, null);
//   // }
//
//   // if profile fileds are not null and received a profile back,
//   // otherwise if profileFields === basicProfile
//   // populate followers of idToRead and see readerId following users
//   // we want to return a list with just the username of the users
//   // readerId is following and are also followers of idToRead
//   // do this exact same thing for posts/comment/response,
//   // get who liked the post and compare those to readerId following users
//   // to see what users we follow have liked the post/comment/response
// };
