const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-FOLLOWERS" // logSubgroup

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
      { followers: 1 },
      "followers",
      "_id info.avatar info.username info.name followers"
    )
    logger.log(lG, lS, null, { userDoc })

    if (!(userDoc && userDoc.followers.length > 0)) return []
    const followersLength = userDoc.followers.length
    logger.log(lG, lS, null, { followersLength })

    const followers = userDoc.followers
    logger.log(lG, lS, null, { followers })

    // map following and check if userCanReadUser...
    // or remove follower/following ref id when someone blocks another
    // also per each user, check if readerId is already following

    // const foundUsers = await User.findOne(
    //   { _id: idToRead },
    //   { _id: 1, followers: 1 }
    // )
    //   .lean()
    //   .populate(
    //     "followers",
    //     "_id info.avatar info.username info.name followers"
    //   );

    let followersArray = []

    // const generateDataToReturn = await (async () => {
    await Promise.all(
      followers.map(async user => {
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
          followersArray.push(userObject)
        }
      })
    )
    // })();

    logger.log(lG, lS, null, { followersArray })

    return followersArray
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
//
//     logger.log(lG, lS, null, { canUserReadUser });
//
//     if (canUserReadUser !== true) {
//       return null;
//     } else {
//       const foundUsers = await User.findOne(
//         { _id: idToRead },
//         { _id: 1, followers: 1 }
//       )
//         .lean()
//         .populate(
//           "followers",
//           "_id info.avatar info.username info.name followers"
//         );
//
//       logger.log(lG, lS, null, { foundUsers });
//
//       if (foundUsers === null || foundUsers === undefined) {
//         return null;
//       } else {
//         const followers = foundUsers.followers;
//
//         if (followers.length === null) {
//           return null;
//         } else {
//           let followersArray = [];
//
//           const generateDataToReturn = await (async () => {
//             await Promise.all(
//               followers.map(async user => {
//                 const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//                   readerId,
//                   user._id
//                 );
//
//                 if (canUserReadUser === true) {
//                   const userObject = {
//                     _id: user._id,
//                     avatar: user.info.avatar,
//                     username: user.info.username,
//                     name: user.info.name,
//                     following: await verifyUser.isUserFollowing.checkId(
//                       readerId,
//                       user.followers
//                     )
//                   };
//
//                   followersArray.push(userObject);
//                 }
//               })
//             );
//           })();
//           logger.log(lG, lS, null, { followersArray });
//           return followersArray;
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
