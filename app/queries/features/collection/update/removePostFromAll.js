const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COLLECTION-U-REMOVE-POST-ALL" // logSubgroup

const u = require("../../../../../utils")
const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, postIdToRemove) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { postIdToRemove })

    const validation = await validateOperation.update["collection"].restriction[
      "addRemovePost"
    ](writerId, collectionId, postId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const collections = docsById.writerId.collections
    logger.log(lG, lS, null, { collections })

    await Promise.all(
      collections.map(async collection => {
        logger.log(lG, lS, null, { collection })

        if (collection && collection.posts && collection.posts.length > 0) {
          const collectionPostsLength = collection.posts.length

          await Promise.all(
            collection.posts.map(async postId => {
              logger.log(lG, lS, null, { postId })

              const isSameId = u.isSameId(postId, postIdToRemove)
              logger.log(lG, lS, null, { isSameId })

              if (isSameId === "true") {
                const update = await crud.update.collection.findByIdAndPull(
                  collection._id,
                  { posts: postIdToRemove }
                )
                logger.log(lG, lS, null, { update })
              }
            })
          )
        }
      })
    )

    const updatedCollections = await crud.read.user.findById(writerId, {
      collections: 1,
    })
    logger.log(lG, lS, null, { updatedCollections })

    return updatedCollections
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

//
// // module.exports = async (writerId, postIdToRemove) => {
// //   logger.log(lG, lS, null, { writerId });
// //   logger.log(lG, lS, null, { postIdToRemove });
// //
// //
// //
// //   try {
// //     const foundCollections = await qCollection.read.allByUserId(
// //       writerId,
// //       writerId
// //     );
// //
// //     logger.log(lG, lS, null, { foundCollections });
// //
// //     const validationResults = await h.verifyOperation.writeDocByCreatorOnly(
// //       writerId,
// //       foundCollections[0]
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       let promises = [];
// //       await Promise.all(
// //         foundCollections.map(async collection => {
// //           const collectionId = collection._id;
// //           const collectionPosts = collection.posts;
// //           if (collectionPosts.length === 0) {
// //             return null;
// //           } else {
// //             await Promise.all(
// //               collectionPosts.map(async postId => {
// //                 if (postId.toString() === postIdToRemove.toString()) {
// //                   const updateCollection = () => {
// //                     return new Promise((resolve, reject) => {
// //                       return Collection.findByIdAndUpdate(
// //                         { _id: collectionId },
// //                         { $pull: { posts: postIdToRemove } },
// //                         { new: true },
// //                         function(error, updatedCollection) {
// //                           if (error) return reject(error);
// //                           else return resolve(updatedCollection);
// //                         }
// //                       );
// //                     });
// //                   };
// //                   promises.push(updateCollection);
// //                 }
// //               })
// //             );
// //           }
// //         })
// //       );
// //
// //       return await Promise.all(
// //         promises.map(updateCollectionPromiseFunc => {
// //           return updateCollectionPromiseFunc()
// //             .then(updatedCollection => updatedCollection)
// //             .catch(error => error);
// //         })
// //       )
// //         .then(promisesResults => {
// //           logger.log(lG, lS, null, { promisesResults });
// //           return promisesResults;
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
