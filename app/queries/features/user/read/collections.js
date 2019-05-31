const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "USER-R-COLLECTIONS" // logSubgroup

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

    // get collections, and map
    // for each collection check if user is creator of collection

    const userDoc = await crud.read.user.findByIdAndPopulate(
      readerId,
      { collections: 1 },
      "collections",
      "_id modifiedAt name thumbnail posts"
    )
    logger.log(lG, lS, null, { userDoc })

    if (!(userDoc.collections && userDoc.collections.length > 0)) return []
    const userCollectionsLength = userDoc.collections.length
    logger.log(lG, lS, null, { userCollectionsLength })

    const collections = userDoc.collections
    logger.log(lG, lS, null, { collections })

    // const foundUser = await User.findOne({ _id: readerId }, { collections: 1 })
    //   .lean()
    //   .populate("collections", "_id modifiedAt name thumbnail posts");

    let collectionsArray = []
    // const generateDataToReturn = await (async () => {
    await Promise.all(
      collections.map(collection => {
        logger.log(lG, lS, null, { collection })

        const collectionObject = {
          _id: collection._id,
          userId: idToRead,
          modifiedAt: collection.modifiedAt,
          name: collection.name,
          thumbnail: collection.thumbnail,
          posts: collection.posts,
        }
        collectionsArray.push(collectionObject)
      })
    )
    // })();

    logger.log(lG, lS, null, { collectionsArray })

    const collectionsArraySortedByProp = u.sortArrayOfObjectsByProp(
      collectionsArray,
      "modifiedAt"
    )
    logger.log(lG, lS, null, { collectionsArraySortedByProp })

    return collectionsArraySortedByProp
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async userId => {
//   logger.log(lG, lS, null, { userId });
//
//   try {
//     const foundUser = await User.findOne({ _id: userId }, { collections: 1 })
//       .lean()
//       .populate("collections", "_id modifiedAt name thumbnail posts");
//
//     logger.log(lG, lS, null, { foundUser });
//
//     const validationResults = await h.verifyOperation.readUserDocSelfOnly(
//       userId,
//       foundUser
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const collections = foundUser.collections;
//       if (collections.length === 0) {
//         return null;
//       } else {
//         let collectionsArray = [];
//         const generateDataToReturn = await (async () => {
//           await Promise.all(
//             collections.map(collection => {
//               const collectionObject = {
//                 _id: collection._id,
//                 userId: idToRead,
//                 modifiedAt: collection.modifiedAt,
//                 name: collection.name,
//                 thumbnail: collection.thumbnail,
//                 posts: collection.posts
//               };
//               collectionsArray.push(collectionObject);
//             })
//           );
//         })();
//         logger.log(lG, lS, null, { collectionsArray });
//         return collectionsArray;
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
