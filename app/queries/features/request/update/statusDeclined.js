const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "REQUEST-U-DECLINED" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, requestId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { requestId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // declined only if writerId is sentToUserId or sentFromUserId

    await crud.delete.request.findByIdAndRemove(requestId)

    return {}

    // const foundRequest = await qRequest.read.byId(writerId, requestId);
    //
    // logger.log(lG, lS, null, { foundRequest });
    //
    // return await h.verifyOperation.writeDocByAllowedOnly(
    //   writerId,
    //   foundRequest,
    //   [foundRequest.sentToUserId]
    // );
    //
    // const deletedRequest = await Request.findByIdAndRemove(requestId);
    // await deletedRequest.remove();
    // const foundDeletedRequest = await Request.findOne({ _id: requestId });
    //
    // logger.log(lG, lS, null, { deletedRequest });
    // logger.log(lG, lS, null, { foundDeletedRequest });
    //
    // if (foundDeletedRequest !== null) return foundDeletedRequest;
    // else return null;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, requestId) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { requestId });
//
//
//
//   try {
//     const foundRequest = await qRequest.read.byId(writerId, requestId);
//
//     logger.log(lG, lS, null, { foundRequest });
//
//     const validationResults = await h.verifyOperation.writeDocByAllowedOnly(
//       writerId,
//       foundRequest,
//       [foundRequest.sentToUserId]
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       // const deletedRequest = await qRequest.delete.byId(writerId, requestId);
//       const deletedRequest = await Request.findByIdAndRemove(requestId);
//       await deletedRequest.remove();
//       const foundDeletedRequest = await Request.findOne({ _id: requestId });
//
//       logger.log(lG, lS, null, { deletedRequest });
//       logger.log(lG, lS, null, { foundDeletedRequest });
//
//       if (foundDeletedRequest !== null) return foundDeletedRequest;
//       else return null;
//     }
//
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
