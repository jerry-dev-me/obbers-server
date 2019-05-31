const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-BY-USERNAME" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, username) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { username })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const foundUser = await crud.read.user.findOne(
      { "info.username": username },
      {
        _id: 1,
        "info.avatar": 1,
        "info.username": 1,
        "info.name": 1,
        followers: 1,
      }
    )
    logger.log(lG, lS, null, { foundUser })

    if (foundUsers === null || foundUser === undefined) return {}

    const isSameUser = u.isSameId(readerId, foundUser._id)
    logger.log(lG, lS, null, { isSameUser })

    const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
      readerId,
      foundUser._id
    )
    logger.log(lG, lS, null, { canUserReadUser })

    let userObject = {}

    if (isSameUser === false && canUserReadUser === true) {
      let userObject = {
        _id: foundUser._id,
        avatar: foundUser.info.avatar,
        username: foundUser.info.username,
        name: foundUser.info.name,
        following: await verifyUser.isUserFollowing.checkId(
          readerId,
          foundUser.followers
        ),
      }
    }

    logger.log(lG, lS, null, { userObject })

    return userObject
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, username) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { username });
//
//   try {
//     const foundUser = await User.findOne(
//       { "info.username": username },
//       {
//         _id: 1,
//         "info.avatar": 1,
//         "info.username": 1,
//         "info.name": 1,
//         followers: 1
//       }
//     );
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
//       if (readerId.toString() === foundUser._id.toString()) {
//         logger.log(lG, lS, "readerId === foundUser");
//         return {
//           _id: foundUser._id,
//           avatar: foundUser.info.avatar,
//           username: foundUser.info.username,
//           name: foundUser.info.name
//         };
//       } else {
//         logger.log(lG, lS, "readerId !== foundUser");
//         let userObject = {
//           _id: foundUser._id,
//           avatar: foundUser.info.avatar,
//           username: foundUser.info.username,
//           name: foundUser.info.name,
//           following: await verifyUser.isUserFollowing.checkId(
//             readerId,
//             foundUser.followers
//           )
//         };
//         logger.log(lG, lS, null, { userObject });
//         return userObject;
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
