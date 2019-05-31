const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-R-TAGS" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, postId) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { postId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // // grab post
    // const exists = await verifyDoc.exists.doc.checkId(docId);
    // if (variableResults === false) return false;
    //
    // // can user read post creator
    // const canUserReadCreator = await verifyDoc.canUserReadCreator.doc.checkDoc(userId, docObject);
    // if (canUserReadCreator === false) return new errors.CanUserReadUserIsFalse();
    //
    // // map tags and do can user read user
    // const canUserReadUser = await verifyUser.canUserReadUser.checkId(readerId, idToRead);
    // if (canUserReadUser === false) return new errors.CanUserReadUserIsFalse();

    // const foundPost = await Post.findOne(
    //   { _id: postId },
    //   { userId: 1, tags: 1 }
    // )
    //   .lean()
    //   .populate("userId");

    const foundPost = await crud.read.post.findOneLeanAndPopulate(
      { _id: postId },
      { userId: 1, tags: 1 },
      "userId",
      {}
    )
    logger.log(lG, lS, null, { foundPost })

    if (!(foundPost && foundPost.tags && foundPost.tags.length > 0)) return []
    const foundPostTagsLength = foundPost.tags.length
    logger.log(lG, lS, null, { foundPostTagsLength })

    let tagsArray = []
    // const generateDataToReturn = await (async () => {
    const tags = foundPost.tags
    logger.log(lG, lS, null, { tags })

    await Promise.all(
      tags.map(async tag => {
        logger.log(lG, lS, null, { tag })

        let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          tag.userId
        )
        logger.log(lG, lS, null, { canUserReadUser })

        if (canUserReadUser === true) {
          const tagObject = {
            _id: tag._id,
            userId: tag.userId,
            username: tag.username,
            coords: tag.coord,
            createdAt: tag.createdAt,
            postId: foundPost._id,
          }
          tagsArray.push(tagObject)
        }
      })
    )
    // })();

    logger.log(lG, lS, null, { tagsArray })

    return tagsArray
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, postId) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { postId });
//
//   try {
//     const foundPost = await Post.findOne(
//       { _id: postId },
//       { userId: 1, tags: 1 }
//     )
//       .lean()
//       .populate("userId");
//
//     logger.log(lG, lS, null, { foundPost });
//
//     const validationResults = await h.verifyOperation.readDoc(
//       readerId,
//       foundPost
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       if (foundPost.tags && foundPost.tags === 0) {
//         return null;
//       } else {
//         let tagsArray = [];
//         const generateDataToReturn = await (async () => {
//           const tags = foundPost.tags;
//           await Promise.all(
//             tags.map(async tag => {
//               let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//                 readerId,
//                 tag.userId
//               );
//               if (canUserReadUser === true) {
//                 const tagObject = {
//                   _id: tag._id,
//                   userId: tag.userId,
//                   username: tag.username,
//                   coords: tag.coord,
//                   createdAt: tag.createdAt,
//                   postId: foundPost._id
//                 };
//                 tagsArray.push(tagObject);
//               }
//             })
//           );
//         })();
//         logger.log(lG, lS, null, { tagsArray });
//         return tagsArray;
//       }
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
