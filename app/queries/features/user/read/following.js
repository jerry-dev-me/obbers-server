const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-FOLLOWING" // logSubgroup

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

    const userDoc = await crud.read.user.findByIdLeanAndPopulate(
      idToRead,
      { following: 1 },
      "following",
      "_id info.avatar info.username info.name following"
    )
    logger.log(lG, lS, null, { userDoc })

    if (!(userDoc && userDoc.following.length > 0)) return []
    const followingLength = userDoc.following.length
    logger.log(lG, lS, null, { followingLength })

    const following = userDoc.following
    logger.log(lG, lS, null, { following })

    let followingArray = []

    // const generateDataToReturn = await (async () => {
    await Promise.all(
      following.map(async user => {
        logger.log(lG, lS, null, { user })

        const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          user._id
        )
        logger.log(lG, lS, null, { canUserReadUser })

        if (canUserReadUser === true) {
          const userObject = {
            _id: user._id,
            avatar: user.info.avatar,
            username: user.info.username,
            name: user.info.name,
            following: await verifyUser.isUserFollowing.checkId(
              readerId,
              user._id
            ),
          }
          followingArray.push(userObject)
        }
      })
    )
    // })();

    logger.log(lG, lS, null, { followingArray })

    return followingArray
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
//     let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//       readerId,
//       idToRead
//     );
//     logger.log(lG, lS, null, { canUserReadUser });
//
//     if (canUserReadUser !== true) {
//       return null;
//     } else {
//       const foundUsers = await User.findOne(
//         { _id: idToRead },
//         { _id: 1, following: 1 }
//       )
//         .lean()
//         .populate(
//           "following",
//           "_id info.avatar info.username info.name followers"
//         );
//       logger.log(lG, lS, null, { foundUsers });
//
//       if (foundUsers === null || foundUsers === undefined) {
//         return null;
//       } else {
//         const followingOfIdToRead = foundUsers.following;
//         if (followingOfIdToRead.length === 0) {
//           return null;
//         } else {
//           let arrayToReturn = [];
//           const generateDataToReturn = await (async () => {
//             await Promise.all(
//               followingOfIdToRead.map(async user => {
//                 const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//                   readerId,
//                   user._id
//                 );
//                 if (canUserReadUser === true) {
//                   const objectToPush = {
//                     _id: user._id,
//                     avatar: user.info.avatar,
//                     username: user.info.username,
//                     name: user.info.name,
//                     following: await verifyUser.isUserFollowing.checkId(
//                       readerId,
//                       user.followers
//                     )
//                   };
//                   arrayToReturn.push(objectToPush);
//                 }
//               })
//             );
//           })();
//           logger.log(lG, lS, null, { arrayToReturn });
//           return arrayToReturn;
//         }
//       }
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
