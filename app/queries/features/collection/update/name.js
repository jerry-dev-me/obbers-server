const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COLLECTION-U-NAME" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, collectionId, newName) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { collectionId })
    logger.log(lG, lS, null, { newName })

    const newValues = { name: newName }

    const validation = await validateOperation.update["collection"].restriction[
      "default"
    ](writerId, collectionId, newValues)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const updatedCollection = await crud.update.collection.findByIdAndUpdate(
      collectionId,
      { name: newName }
    )
    logger.log(lG, lS, null, { updatedCollection })

    return updatedCollection

    // const foundCollection = await Collection.findOne(
    //   { _id: collectionId },
    //   { userId: 1 }
    // );
    //
    // logger.log(lG, lS, null, { foundCollection });
    //
    // return await h.verifyOperation.writeDocByCreatorOnly(
    //   writerId,
    //   foundCollection
    // );
    //
    // const newPromise = new Promise((resolve, reject) => {
    //   return Collection.findByIdAndUpdate(
    //     { _id: collectionId },
    //     { name: newName },
    //     { new: true },
    //     function(error, updatedCollection) {
    //       if (error) return reject(error);
    //       else return resolve(updatedCollection);
    //     }
    //   );
    // });
    // return newPromise
    //   .then(updatedCollection => {
    //     logger.log(lG, lS, null, { updatedCollection });
    //     return updatedCollection;
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

// // module.exports = async (writerId, collectionId, newName) => {
// //   logger.log(lG, lS, null, { writerId });
// //   logger.log(lG, lS, null, { collectionId });
// //   logger.log(lG, lS, null, { newName });
// //
// //   try {
// //     const foundCollection = await Collection.findOne(
// //       { _id: collectionId },
// //       { userId: 1 }
// //     );
// //
// //     logger.log(lG, lS, null, { foundCollection });
// //
// //     const validationResults = await h.verifyOperation.writeDocByCreatorOnly(
// //       writerId,
// //       foundCollection
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       const newPromise = new Promise((resolve, reject) => {
// //         return Collection.findByIdAndUpdate(
// //           { _id: collectionId },
// //           { name: newName },
// //           { new: true },
// //           function(error, updatedCollection) {
// //             if (error) return reject(error);
// //             else return resolve(updatedCollection);
// //           }
// //         );
// //       });
// //       return newPromise
// //         .then(updatedCollection => {
// //           logger.log(lG, lS, null, { updatedCollection });
// //           return updatedCollection;
// //         })
// //         .catch(error => {
// //           logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //         });
// //     }
// //     return validationResults;
// //   } catch (err) {
// //     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //   }
// // };
