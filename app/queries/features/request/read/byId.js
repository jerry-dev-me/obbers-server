const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "REQUEST-R-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, requestId) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { requestId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // const requestDoc = await verifyDoc.exists.request.checkId(readerId);
    // if (requestDoc === false)
    // return new errors.DocDoesNotExist("request");
    //
    // const canUserReadUser = await verifyUser.canUserReadUser.checkId(
    //   readerId,
    //   requestDoc.sentFromUserId
    // );
    // if (canUserReadUser === false) return new errors.CanUserReadUserIsFalse();

    //
    // const foundRequest = await Request.findOne(
    //   { _id: requestId },
    //   { _id: 1, sentFromUserId: 1, sentToUserId: 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundRequest });
    //
    // if (foundRequest === null) return null;
    //
    // return await h.verifyOperation.readDocByAllowedOnly(
    //   readerId,
    //   foundRequest,
    //   [foundRequest.sentFromUserId, foundRequest.sentToUserId]
    // );

    const request = await crud.read.request.findById(requestId)
    logger.log(lG, lS, null, { request })

    return request

    // const newPromise = new Promise((resolve, reject) => {
    //   return Request.findOne(
    //     { _id: requestId },
    // {
    //   _id: 1,
    //   sentFromUserId: 1,
    //   sentToUserId: 1,
    //   createdAt: 1,
    //   status: 1
    // },
    //     { new: true },
    //     async function(error, foundRequest) {
    //       if (error) reject(error);
    //       else resolve(foundRequest);
    //     }
    //   );
    // });
    // return newPromise
    //   .then(foundRequest => {
    //     logger.log(lG, lS, null, { foundRequest });
    //     return foundRequest;
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

// module.exports = async (readerId, requestId) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { requestId });
//
//   try {
//     const foundRequest = await Request.findOne(
//       { _id: requestId },
//       { _id: 1, sentFromUserId: 1, sentToUserId: 1 }
//     );
//
//     logger.log(lG, lS, null, { foundRequest });
//
//     if (foundRequest === null) {
//       return null;
//     }
//
//     const validationResults = await h.verifyOperation.readDocByAllowedOnly(
//       readerId,
//       foundRequest,
//       [foundRequest.sentFromUserId, foundRequest.sentToUserId]
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       if (
//         readerId.toString() === foundRequest.sentFromUserId.toString() ||
//         readerId.toString() === foundRequest.sentToUserId.toString()
//       ) {
//         const newPromise = new Promise((resolve, reject) => {
//           return Request.findOne(
//             { _id: requestId },
//             {
//               _id: 1,
//               sentFromUserId: 1,
//               sentToUserId: 1,
//               createdAt: 1,
//               status: 1
//             },
//             { new: true },
//             async function(error, foundRequest) {
//               if (error) reject(error);
//               else resolve(foundRequest);
//             }
//           );
//         });
//         return newPromise
//           .then(foundRequest => {
//             logger.log(lG, lS, null, { foundRequest });
//             return foundRequest;
//           })
//           .catch(error => {
//             logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//           });
//       } else {
//         logger.log(
//           lG,
//           lS,
//           "readerId !== sentFromUserId && readerId !== sentToUserId"
//         );
//         return null;
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
