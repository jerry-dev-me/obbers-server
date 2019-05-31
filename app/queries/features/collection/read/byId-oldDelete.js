// const logger = require("../../../../../lib/logger");
// const h = require("../../../../helpers");
//
// const Collection = require("../../../../models/collection");
//
// const lG = "QUERIES"; // logGroup
// const lS = "READ-COLLECTION"; // logSubgroup
//
// module.exports = async (readerId, idToRead, collectionId) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { idToRead });
//   logger.log(lG, lS, null, { collectionId });
//
//   try {
//     const foundCollection = await Collection.findOne(
//       { _id: collectionId },
//       {
//         userId: 1,
//         createdAt: 1,
//         modifiedAt: 1,
//         name: 1,
//         posts: 1,
//         thumbnail: 1
//       }
//     )
//       .lean()
//       .populate("posts", "userId createdAt location content");
//
//     logger.log(lG, lS, null, { foundCollection });
//
//     const validationResults = await h.verifyOperation.readDocByCreatorOnly(
//       readerId,
//       foundCollection
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       return foundCollection;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
//
//
//   }
// };
