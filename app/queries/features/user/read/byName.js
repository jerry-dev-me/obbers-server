const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-BY-NAME" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, name) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { name })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // validate name

    const foundUsers = await crud.read.user.find(
      { "info.name": name },
      {
        _id: 1,
        "info.avatar": 1,
        "info.username": 1,
        "info.name": 1,
        followers: 1,
      }
    )
    logger.log(lG, lS, null, { foundUsers })

    if (!(foundUsers && foundUsers.length > 0)) return []
    const foundUsersLength = foundUsers.length
    logger.log(lG, lS, null, { foundUsersLength })

    let usersArray = []

    // const generateDataToReturn = await (async () => {
    await Promise.all(
      foundUsers.map(async user => {
        logger.log(lG, lS, null, { user })

        const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          user._id
        )
        logger.log(lG, lS, null, { canUserReadUser })

        const isSameUserId = u.isSameId(user._id, readerId)
        logger.log(lG, lS, null, { isSameUserId })

        if (canUserReadUser === true && isSameUser !== true) {
          let userObject = {
            _id: user._id,
            avatar: user.info.avatar,
            username: user.info.username,
            name: user.info.name,
            following: await verifyUser.isUserFollowing.checkId(
              readerId,
              user.followers
            ),
          }
          usersArray.push(userObject)
        }

        // if (canUserReadUser === true) {
        //   let userObject;
        //   if (u.isSameId(user._id, readerId) !== true) {
        //     userObject = {
        //       _id: user._id,
        //       avatar: user.info.avatar,
        //       username: user.info.username,
        //       name: user.info.name,
        //       following: await verifyUser.isUserFollowing.checkId(
        //         readerId,
        //         user.followers
        //       )
        //     };
        //     usersArray.push(userObject);
        //   }
        // }
      })
    )
    // })();

    logger.log(lG, lS, null, { usersArray })

    return usersArray
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, name) => {
//   // return all users found by the name searched...
//   // return profilePreview fields...
//   // check if readerId can Read
//   // then check canUserReadUser...
//   // and if all that is true, display the profilePreview fields...
//   // on the selected user, load profile by userId...
//
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { name });
//
//   try {
//     // previewFields = {
//     //   _id: 1,
//     //   "info.avatar": 1,
//     //   "info.username": 1,
//     //   "info.name": 1,
//     //   "info.lastName": 1
//     // };
//
//     const foundUsers = await User.find(
//       { "info.name": name },
//       {
//         _id: 1,
//         "info.avatar": 1,
//         "info.username": 1,
//         "info.name": 1,
//         followers: 1
//       }
//     );
//
//     logger.log(lG, lS, null, { foundUsers });
//
//     if (foundUsers === null || foundUsers === undefined) {
//       return null;
//     } else {
//       if (foundUsers.length === 0) {
//         return null;
//       } else {
//         let usersArray = [];
//         const generateDataToReturn = await (async () => {
//           await Promise.all(
//             foundUsers.map(async user => {
//               const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//                 readerId,
//                 user._id
//               );
//               if (canUserReadUser === true) {
//                 let userObject;
//                 if (readerId.toString() === user._id.toString()) {
//                   userObject = {
//                     _id: user._id,
//                     avatar: user.info.avatar,
//                     username: user.info.username,
//                     name: user.info.name
//                   };
//                   // usersArray.push(userObject);
//                 } else {
//                   userObject = {
//                     _id: user._id,
//                     avatar: user.info.avatar,
//                     username: user.info.username,
//                     name: user.info.name,
//                     following: await verifyUser.isUserFollowing.checkId(
//                       readerId,
//                       user.followers
//                     )
//                   };
//                   // usersArray.push(userObject);
//                 }
//                 logger.log(lG, lS, null, { userObject });
//                 usersArray.push(userObject);
//               }
//             })
//           );
//         })();
//         logger.log(lG, lS, null, { usersArray });
//         return usersArray;
//       }
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
