const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-REQUESTS" // logSubgroup

const u = require("../../../../../utils")
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

    const userDoc = await crud.read.user.findByIdLeanAndPopulate(
      readerId,
      { _id: 1, requests: 1 },
      "requests",
      "_id sentFromUserId sentToUserId createdAt status"
    )
    logger.log(lG, lS, null, { userDoc })

    if (!(userDoc && userDoc.requests.length > 0)) return []
    const requestsLength = userDoc.requests.length
    logger.log(lG, lS, null, { requestsLength })

    const requests = userDoc.requests
    logger.log(lG, lS, null, { requests })

    let requestsArray = []

    // const generateDataToReturn = await (async () => {
    await Promise.all(
      requests.map(async request => {
        logger.log(lG, lS, null, { request })

        const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          request.sentFromUserId
        )
        logger.log(lG, lS, null, { canUserReadUser })

        if (canUserReadUser === true) {
          // const foundUser = await User.findOne(
          const foundUser = await crud.read.user.findById(
            request.sentFromUserId,
            {
              _id: 1,
              "info.avatar": 1,
              "info.username": 1,
              "info.name": 1,
              followers: 1,
            },
            { new: true }
          )
          logger.log(lG, lS, null, { foundUser })

          const requestObject = {
            _id: request._id,
            userId: foundUser._id,
            avatar: foundUser.info.avatar,
            username: foundUser.info.username,
            name: foundUser.info.name,
            createdAt: request.createdAt,
            status: request.status,
            following: await verifyUser.isUserFollowing.checkId(
              readerId,
              foundUser.followers
            ),
          }
          requestsArray.push(requestObject)
        }
      })
    )
    // })();

    logger.log(lG, lS, null, { requestsArray })

    const requestsArraySortedByProp = u.sortArrayOfObjectsByProp(
      requestsArray,
      "createdAt"
    )
    logger.log(lG, lS, null, { requestsArraySortedByProp })

    return requestsArraySortedByProp

    // // const foundRequests = await User.findOne(
    // //   { _id: readerId },
    // //   { _id: 1, requests: 1 }
    // // )
    // //   .lean()
    // //   .populate("requests", "_id sentFromUserId sentToUserId createdAt status");
    //
    // // logger.log(lG, lS, null, { foundRequests });
    //
    // // if (foundRequests === null || foundRequests === undefined) {
    // //   return null;
    // // } else {
    //   const requests = foundRequests.requests;
    //   if (requests.length === 0) {
    //     return null;
    //   } else {
    //     let requestsArray = [];
    //     const generateDataToReturn = await (async () => {
    //       await Promise.all(
    //         requests.map(async request => {
    //           logger.log(lG, lS, null, { request });
    //
    //           const foundUser = await User.findOne(
    //             { _id: request.sentFromUserId },
    //             {
    //               _id: 1,
    //               "info.avatar": 1,
    //               "info.username": 1,
    //               "info.name": 1,
    //               followers: 1
    //             },
    //             { new: true }
    //           );
    //
    //           logger.log(lG, lS, null, { foundUser });
    //
    //           const requestObject = {
    //             _id: request._id,
    //             userId: foundUser._id,
    //             avatar: foundUser.info.avatar,
    //             username: foundUser.info.username,
    //             name: foundUser.info.name,
    //             createdAt: request.createdAt,
    //             status: request.status,
    //             following: await verifyUser.isUserFollowing.checkId(
    //               readerId,
    //               foundUser.followers
    //             )
    //           };
    //           requestsArray.push(requestObject);
    //         })
    //       );
    //     })();
    //     logger.log(lG, lS, null, { requestsArray });
    //     return requestsArray;
    //   }
    // // }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async userId => {
//   logger.log(lG, lS, null, { userId });
//
//   try {
//     const foundRequests = await User.findOne(
//       { _id: userId },
//       { _id: 1, requests: 1 }
//     )
//       .lean()
//       .populate("requests", "_id sentFromUserId sentToUserId createdAt status");
//
//     logger.log(lG, lS, null, { foundRequests });
//
//     if (foundRequests === null || foundRequests === undefined) {
//       return null;
//     } else {
//       const requests = foundRequests.requests;
//       if (requests.length === 0) {
//         return null;
//       } else {
//         let requestsArray = [];
//         const generateDataToReturn = await (async () => {
//           await Promise.all(
//             requests.map(async request => {
//               logger.log(lG, lS, null, { request });
//
//               const foundUser = await User.findOne(
//                 { _id: request.sentFromUserId },
//                 {
//                   _id: 1,
//                   "info.avatar": 1,
//                   "info.username": 1,
//                   "info.name": 1,
//                   followers: 1
//                 },
//                 { new: true }
//               );
//
//               logger.log(lG, lS, null, { foundUser });
//
//               const requestObject = {
//                 _id: request._id,
//                 userId: foundUser._id,
//                 avatar: foundUser.info.avatar,
//                 username: foundUser.info.username,
//                 name: foundUser.info.name,
//                 createdAt: request.createdAt,
//                 status: request.status,
//                 following: await verifyUser.isUserFollowing.checkId(
//                   readerId,
//                   foundUser.followers
//                 )
//               };
//               requestsArray.push(requestObject);
//             })
//           );
//         })();
//         logger.log(lG, lS, null, { requestsArray });
//         return requestsArray;
//       }
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
