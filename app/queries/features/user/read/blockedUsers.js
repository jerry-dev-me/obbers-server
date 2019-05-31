const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-BLOCKED-USERS" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async readerId => {
  try {
    logger.log(lG, lS, null, { readerId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const userDoc = docsById.readerId
    logger.log(lG, lS, null, { userDoc })

    if (!(userDoc && userDoc.blockedUsers, length > 0)) return []
    const blockedUsersLength = userDoc.blockedUsers.length
    logger.log(lG, lS, null, { blockedUsersLength })

    const blockedUsers = userDoc.blockedUsers
    logger.log(lG, lS, null, { blockedUsers })

    // const foundUsers = await User.findOne({ _id: readerId }, { blockedUsers: 1 })
    //   .lean()
    //   .populate("blockedUsers", "_id info.avatar info.username info.name");
    //
    // logger.log(lG, lS, null, { foundUsers });

    // if (foundUsers === null || foundUsers === undefined) {
    //   return null;
    // } else {
    // const blockedUsers = foundUsers.blockedUsers;
    // if (blockedUsers.length === 0) {
    //   return null;
    // } else {
    let blockedUsersArray = []
    // const generateDataToReturn = await (async () => {
    await Promise.all(
      blockedUsers.map(async userId => {
        logger.log(lG, lS, null, { userId })

        let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          userId
        )
        logger.log(lG, lS, null, { canUserReadUser })

        if (canUserReadUser === true) {
          const foundUser = await crud.read.user.findById(userId)
          const userObject = {
            _id: foundUser._id,
            avatar: foundUser.info.avatar,
            username: foundUser.info.username,
            name: foundUser.info.name,
          }
          blockedUsersArray.push(userObject)
        }
      })
    )
    // })();

    logger.log(lG, lS, null, { blockedUsersArray })

    return blockedUsersArray
    // }
    // }

    // const validationResults = await validation();
    // logger.log(lG, lS, null, { validationResults });
    // if (validationResults !== true) return validationResults;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async userId => {
//   logger.log(lG, lS, null, { userId });
//
//   try {
//     const foundUsers = await User.findOne({ _id: userId }, { blockedUsers: 1 })
//       .lean()
//       .populate("blockedUsers", "_id info.avatar info.username info.name");
//
//     logger.log(lG, lS, null, { foundUsers });
//
//     if (foundUsers === null || foundUsers === undefined) {
//       return null;
//     } else {
//       const blockedUsers = foundUsers.blockedUsers;
//       if (blockedUsers.length === 0) {
//         return null;
//       } else {
//         let blockedUsersArray = [];
//         const generateDataToReturn = await (async () => {
//           await Promise.all(
//             blockedUsers.map(user => {
//               const userObject = {
//                 _id: user._id,
//                 avatar: user.info.avatar,
//                 username: user.info.username,
//                 name: user.info.name
//               };
//               blockedUsersArray.push(userObject);
//             })
//           );
//         })();
//         logger.log(lG, lS, null, { blockedUsersArray });
//         return blockedUsersArray;
//       }
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
