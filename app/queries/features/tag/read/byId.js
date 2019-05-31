const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "TAG-R-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, postId, tagId) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { postId })
    logger.log(lG, lS, null, { tagId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const postDoc = docsById.postId
    logger.log(lG, lS, null, { postDoc })

    const tagDoc = docsById.tagId
    logger.log(lG, lS, null, { tagDoc })

    return tagDoc
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, postId, tagId) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { postId });
//   logger.log(lG, lS, null, { tagId });
//
//   try {
//     const foundPost = await Post.findOne({ _id: postId });
//
//     logger.log(lG, lS, null, { foundPost });
//
//     let foundTags;
//     let tagObject;
//     let isTagIdExistent;
//
//     if (foundPost && foundPost.tags.length > 0) {
//       foundTags = foundPost.tags;
//       foundTags.map(tag => {
//         if (tag._id.toString() === tagId.toString()) {
//           tagObject = tag;
//           isTagIdExistent = true;
//         }
//       });
//     } else {
//       return false;
//     }
//
//     logger.log(lG, lS, null, { isTagIdExistent });
//
//     if (isTagIdExistent === true) {
//       let taggedUserId = tagObject.userId;
//
//       const canUserReadPostUserId = await h.verifyUser.canUserReadUser.checkId(
//         readerId,
//         foundPost.userId
//       );
//
//       const canUserReadTaggedUserId = await h.verifyUser.canUserReadUser.checkId(
//         readerId,
//         taggedUserId
//       );
//
//       logger.log(lG, lS, null, { canUserReadPostUserId });
//       logger.log(lG, lS, null, { canUserReadTaggedUserId });
//
//       if (canUserReadPostUserId === true && canUserReadTaggedUserId === true) {
//         return tagObject;
//       }
//       return false;
//     } else {
//       // tagId does not exists
//       return false;
//     }
//
//     // Check if postId exists and it is not null
//     // check if tag id exists inside that post tags
//     // Then check if user readerId can read that post userId
//
//     // if postId exists and user can read that postId userId then:
//     // find tagId in post.tags
//     // check if readerId can read that tag userId
//     // If it is there return it, else return null...
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//   }
// };
