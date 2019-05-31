// const logger = require("../../../../../lib/logger");
//
// const h = require("../../../../helpers");
//
// const User = require("../../../../models/user");
//
// module.exports = async (readerId, idToRead) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { idToRead });
//
//   try {
//     const foundUser = await User.findOne(
//       { _id: idToRead },
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
//         const collections = foundUser.collections;
//         await Promise.all(
//           collections.map(collection => {
//             const objectToPush = {
//               _id: collection._id,
//               userId: collection.userId,
//               modifiedAt: collection.modifiedAt,
//               name: collection.name,
//               thumbnail: collection.thumbnail,
//               posts: collection.posts
//             };
//             arrayToReturn.push(objectToPush);
//           })
//         );
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
