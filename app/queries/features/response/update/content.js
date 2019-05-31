const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "RESPONSE-U-CONTENT" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, responseId, updatedContent) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { responseId })
    logger.log(lG, lS, null, { updatedContent })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const response = docsById.responseId
    logger.log(lG, lS, null, { response })

    // validate new content fields....

    // // validated updatedContent

    const updatedResponse = await crud.update.response.findByIdAndUpdate(
      responseId,
      { content: updatedContent }
    )
    logger.log(lG, lS, null, { updatedResponse })

    return updatedResponse

    // const foundResponse = await Response.findOne(
    //   { _id: responseId },
    //   { userId: 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundResponse });
    //
    // const validationResults = await h.verifyOperation.writeDocByCreatorOnly(
    //   writerId,
    //   foundResponse
    // );

    // const newPromise = new Promise((resolve, reject) => {
    //   return Response.findByIdAndUpdate(
    //     { _id: responseId },
    //     { content: updatedContent },
    //     { new: true },
    //     async function(error, updatedResponse) {
    //       if (error) return reject(error);
    //       else return resolve(updatedResponse);
    //     }
    //   );
    // });
    // return newPromise
    //   .then(updatedResponse => {
    //     logger.log(lG, lS, null, { updatedResponse });
    //     return updatedResponse;
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

// module.exports = async (writerId, responseId, updatedContent) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { responseId });
//   logger.log(lG, lS, null, { updatedContent });
//
//   try {
//     const foundResponse = await Response.findOne(
//       { _id: responseId },
//       { userId: 1 }
//     );
//
//     logger.log(lG, lS, null, { foundResponse });
//
//     const validationResults = await h.verifyOperation.writeDocByCreatorOnly(
//       writerId,
//       foundResponse
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const newPromise = new Promise((resolve, reject) => {
//         return Response.findByIdAndUpdate(
//           { _id: responseId },
//           { content: updatedContent },
//           { new: true },
//           async function(error, updatedResponse) {
//             if (error) return reject(error);
//             else return resolve(updatedResponse);
//           }
//         );
//       });
//       return newPromise
//         .then(updatedResponse => {
//           logger.log(lG, lS, null, { updatedResponse });
//           return updatedResponse;
//         })
//         .catch(error => {
//           logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//         });
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
