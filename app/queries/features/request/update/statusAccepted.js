const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "REQUEST-U-ACCEPTED" // logSubgroup

const h = require("../../../../helpers")
const c = require("../../../../config").constants
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

    const requestDoc = docsById.requestId
    logger.log(lG, lS, null, { requestDoc })

    // accepted only if writerId is sentToUserId

    const { sentFromUserId, sentToUserId } = requestDoc

    const updateFollower = await crud.update.user.findByIdAndAddToSet(
      sentFromUserId,
      { following: sentToUserId }
    )
    logger.log(lG, lS, null, { updateFollower })

    const updateFollowing = await crud.update.user.findByIdAndAddToSet(
      sentToUserId,
      { followers: sentFromUserId }
    )
    logger.log(lG, lS, null, { updateFollowing })

    const activityDoc = await crud.create.activity.new({
      refModel: "user",
      refId: userDoc._id,
      userId: writerId,
      createdAt: new Date(),
      activityType: c.NEW_FOLLOWING,
    })
    logger.log(lG, lS, null, { activityDoc })

    await crud.update.user.findByIdAndAddToSet(sentFromUserId, {
      activities: activityDoc._id,
    })

    await crud.delete.request.findByIdAndRemove(requestId)

    return {}

    // const foundRequest = await Request.findOne(
    //   { _id: requestId },
    //   { _id: 1, sentFromUserId: 1, sentToUserId: 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundRequest });
    //
    // _operationData[foundRequest] = foundRequest;

    // return await h.verifyOperation.writeDocByAllowedOnly(
    //   writerId,
    //   foundRequest,
    //   [foundRequest.sentToUserId]
    // );

    // const sentFromUserId = foundRequest.sentFromUserId;
    // const sentToUserId = foundRequest.sentToUserId;
    //
    // const addUserIdSenderToUserIdReceiverFollowers = await qUser.update.addFollower(
    //   sentToUserId,
    //   sentFromUserId
    // );
    //
    // logger.log(lG, lS, null, { addUserIdSenderToUserIdReceiverFollowers });
    //
    // const addUserIdReceiverToUserIdSendeFollowing = await qUser.update.addFollowing(
    //   sentFromUserId,
    //   sentToUserId
    // );
    //
    // logger.log(lG, lS, null, { addUserIdReceiverToUserIdSendeFollowing });

    // const deletedRequest = await qRequest.delete.byId(writerId, requestId);
    // const foundDeletedRequest = await Request.findOne({ _id: requestId });
    //
    // logger.log(lG, lS, null, { deletedRequest });
    // logger.log(lG, lS, null, { foundDeletedRequest });

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
//
//
//   try {
//     // const foundRequest = await qRequest.read.byId(writerId, requestId);
//     const foundRequest = await Request.findOne(
//       { _id: requestId },
//       { _id: 1, sentFromUserId: 1, sentToUserId: 1 }
//     );
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
//       const sentFromUserId = foundRequest.sentFromUserId;
//       const sentToUserId = foundRequest.sentToUserId;
//
//       const addUserIdSenderToUserIdReceiverFollowers = await qUser.update.addFollower(
//         sentToUserId,
//         sentFromUserId
//       );
//
//       logger.log(lG, lS, null, { addUserIdSenderToUserIdReceiverFollowers });
//
//       const addUserIdReceiverToUserIdSendeFollowing = await qUser.update.addFollowing(
//         sentFromUserId,
//         sentToUserId
//       );
//
//       logger.log(lG, lS, null, { addUserIdReceiverToUserIdSendeFollowing });
//
//       const newActivityDoc = await qActivity.create.new({
//         refModel: "request",
//         refId: requestId,
//         userId: sentFromUserId,
//         createdAt: new Date(),
//         activityType: "NEW_FOLLOWING"
//       });
//
//       logger.log(lG, lS, null, { newActivityDoc });
//
//       const deletedRequest = await qRequest.delete.byId(writerId, requestId);
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
