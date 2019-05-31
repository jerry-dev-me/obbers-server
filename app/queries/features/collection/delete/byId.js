const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COLLECTION-D-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, collectionId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { collectionId })

    const validation = await validateOperation.delete["collection"].restriction[
      "default"
    ](writerId, collectionId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const deleteCollection = await crud.delete.collection.findByIdAndRemove(
      collectionId
    )
    logger.log(lG, lS, null, { deleteCollection })

    if (deleteCollection !== null) {
      return false // throw query feature error
      // "operation could not be completed at this time, try again later"
    }

    return deleteCollection
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, collectionId) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { collectionId });
//
//   try {
//     const foundCollection = await Collection.findOne(
//       { _id: collectionId },
//       { userId: 1 },
//       { new: true }
//     );
//
//     logger.log(lG, lS, null, { foundCollection });
//
//     const validationResults = await h.verifyOperation.writeDocByCreatorOnly(
//       writerId,
//       foundCollection
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const collectionToDelete = await Collection.findById(collectionId);
//       await collectionToDelete.remove();
//       const foundDeletedCollection = await Collection.findOne({
//         _id: collectionId
//       });
//
//       logger.log(lG, lS, null, { collectionToDelete });
//       logger.log(lG, lS, null, { foundDeletedCollection });
//
//       if (foundDeletedCollection !== null) return foundDeletedCollection;
//       else return null;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
//
//
//   }
// };
