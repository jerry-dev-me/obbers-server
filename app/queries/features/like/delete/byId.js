const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "LIKE-D-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, likeId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { likeId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    await crud.delete.like.findByIdAndRemove(likeId)

    return {}

    // if (foundLike && foundLike.refModel === "Post") {
    //   foundParentDoc = await Post.findOne(
    //     { _id: foundLike.refId },
    //     { userId: 1 }
    //   );
    // }
    // if (foundLike && foundLike.refModel === "Comment") {
    //   foundParentDoc = await Comment.findOne(
    //     { _id: foundLike.refId },
    //     { userId: 1 }
    //   );
    // }
    // if (foundLike && foundLike.refModel === "Response") {
    //   foundParentDoc = await Response.findOne(
    //     { _id: foundLike.refId },
    //     { userId: 1 }
    //   );
    // }
    // logger.log(lG, lS, null, { foundParentDoc });
    //
    // return await h.verifyOperation.writeSubdoc(
    //   writerId,
    //   foundParentDoc,
    //   foundLike
    // );
    //
    // const likeToDelete = await Like.findById(likeId);
    // await likeToDelete.remove();
    // const foundDeletedLike = await Like.findOne({ _id: likeId });
    //
    // logger.log(lG, lS, null, { likeToDelete });
    // logger.log(lG, lS, null, { foundDeletedLike });
    //
    // if (foundDeletedLike !== null) return foundDeletedLike;
    // else return null;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// // module.exports = async (writerId, likeId) => {
// //   logger.log(lG, lS, null, { writerId });
// //   logger.log(lG, lS, null, { likeId });
// //
// //   try {
// //     // const validationResults = await h.verifyOperation.deleteDoc(writerId);
// //
// //     const foundLike = await Like.findOne({ _id: likeId });
// //
// //     logger.log(lG, lS, null, { foundLike });
// //
// //     // parent doc
// //     let foundParentDoc;
// //
// //     if (foundLike && foundLike.refModel === "Post") {
// //       foundParentDoc = await Post.findOne(
// //         { _id: foundLike.refId },
// //         { userId: 1 }
// //       );
// //     }
// //     if (foundLike && foundLike.refModel === "Comment") {
// //       foundParentDoc = await Comment.findOne(
// //         { _id: foundLike.refId },
// //         { userId: 1 }
// //       );
// //     }
// //     if (foundLike && foundLike.refModel === "Response") {
// //       foundParentDoc = await Response.findOne(
// //         { _id: foundLike.refId },
// //         { userId: 1 }
// //       );
// //     }
// //     logger.log(lG, lS, null, { foundParentDoc });
// //
// //     const validationResults = await h.verifyOperation.writeSubdoc(
// //       writerId,
// //       foundParentDoc,
// //       foundLike
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       const likeToDelete = await Like.findById(likeId);
// //       await likeToDelete.remove();
// //       const foundDeletedLike = await Like.findOne({ _id: likeId });
// //
// //       logger.log(lG, lS, null, { likeToDelete });
// //       logger.log(lG, lS, null, { foundDeletedLike });
// //
// //       if (foundDeletedLike !== null) return foundDeletedLike;
// //       else return null;
// //     }
// //     return validationResults;
// //   } catch (err) {
// //     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //   }
// // };
