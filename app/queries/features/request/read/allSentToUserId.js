const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "REQUEST-R-ALL-SENT-TO" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async sentToUserId => {
  try {
    logger.log(lG, lS, null, { sentToUserId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // const canUserRead = await verifyUser.canUserRead.checkId(userId);
    // if (canUserRead === false) return new errors.ReadPermissionsIsFalse();
    //
    // // get all request documebnts by "sentToUserId"
    //
    // // for each request object, check if User can read request.sentFromUserId

    const requests = await crud.read.request.find(
      { sentToUserId },
      { _id: 1, sentFromUserId: 1, createdAt: 1, status: 1 }
    )
    logger.log(lG, lS, null, { requests })

    if (requests === null || requests === undefined) return []

    const requestsSortedByCreatedAt = u.sortArrayOfObjectsByProp(
      requests,
      "createdAt"
    )
    logger.log(lG, lS, null, { requestsSortedByCreatedAt })

    return requestsSortedByCreatedAt

    // const newPromise = new Promise((resolve, reject) => {
    //   return Request.find(
    //     { sentToUserId: sentToUserId },
    //     { _id: 1, sentFromUserId: 1, createdAt: 1, status: 1 },
    //     { new: true },
    //     async function(error, foundRequests) {
    //       if (error) reject(error);
    //       else resolve(foundRequests);
    //     }
    //   );
    // });
    // return newPromise
    //   .then(foundRequests => {
    //     logger.log(lG, lS, null, { foundRequests });
    //     return foundRequests;
    //   })
    //   .catch(error => {
    //     logger.log(lG, lS, null, { err });
    // return e.HandleFeatureError(err);
    //
    //
    //   });
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async sentToUserId => {
//   logger.log(lG, lS, null, { sentToUserId });
//
//   try {
//     const newPromise = new Promise((resolve, reject) => {
//       return Request.find(
//         { sentToUserId: sentToUserId },
//         { _id: 1, sentFromUserId: 1, createdAt: 1, status: 1 },
//         { new: true },
//         async function(error, foundRequests) {
//           if (error) reject(error);
//           else resolve(foundRequests);
//         }
//       );
//     });
//     return newPromise
//       .then(foundRequests => {
//         logger.log(lG, lS, null, { foundRequests });
//         return foundRequests;
//       })
//       .catch(error => {
//         logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//       });
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
