const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COLLECTION-R-ALL-BY-ID" // logSubgroup

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

    const validation = await validateOperation.validateUser.read(readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const foundCollections = await crud.read.user.findLeanAndPopulate(
      { _id: readerId },
      {},
      "collections",
      "_id userId modifiedAt name thumbnail posts"
    )
    logger.log(lG, lS, null, { foundCollections })

    // const userCollections = await User.findOne(
    //   { _id: readerId },
    //   { collections: 1 },
    //   { new: true }
    // )
    //   .lean()
    //   .populate("collections", "_id userId modifiedAt name thumbnail posts");
    // return userCollections;

    return foundCollections
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async readerId => {
//   logger.log(lG, lS, null, { readerId });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: readerId },
//       { collections: 1 },
//       { new: true }
//     )
//       .lean()
//       .populate("collections", "_id userId modifiedAt name thumbnail posts");
//
//     logger.log(lG, lS, null, { foundUser });
//
//     const validationResults = await h.verifyOperation.readUserDocSelfOnly(
//       readerId,
//       foundUser
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       let arrayToReturn = [];
//       const generateDataToReturn = await (async () => {
//         if (foundUser && foundUser.collections.length > 0) {
//           const collections = foundUser.collections;
//           await Promise.all(
//             collections.map(collection => {
//               const objectToPush = {
//                 _id: collection._id,
//                 userId: collection.userId,
//                 modifiedAt: collection.modifiedAt,
//                 name: collection.name,
//                 thumbnail: collection.thumbnail,
//                 posts: collection.posts
//               };
//               arrayToReturn.push(objectToPush);
//             })
//           );
//         }
//       })();
//       logger.log(lG, lS, null, { arrayToReturn });
//       return arrayToReturn;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
//
//
//   }
// };
