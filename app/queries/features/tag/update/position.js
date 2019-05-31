const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "TAG-U-POSITION" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, postId, tagId, newPosition) => {
  // validateOperation.update(writerId, "post", postId)

  // post can be created by any userId
  // tag can be created by post.userId

  // post can be read by any userId
  // post.tag can be read by any userId

  // post can be updated by post.userId
  // tag can be updated by post.userId

  // tag can be deleted by post.userId
  // tag can be deleted by post.tag.userId

  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { postId })
    logger.log(lG, lS, null, { tagId })
    logger.log(lG, lS, null, { newPosition })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const postDoc = docsById.postId
    logger.log(lG, lS, null, { postDoc })

    // validate fields newPosition
    // add this to post tag schema validation doc...
    const validateTagPosition = () => {
      if (
        (newPosition &&
          isNaN(newPosition.x) === false &&
          h.numDigits(newPosition.x) === 3) ||
        (newPosition.x === 0 &&
          isNaN(newPosition.y) === false &&
          h.numDigits(newPosition.y) === 3) ||
        newPosition.y === 0
      ) {
        return true
      } else {
        return false
      }
    }

    const isTagPositionValid = validateTagPosition()
    logger.log(lG, lS, null, { isTagPositionValid })

    if (isTagPositionValid !== true) return "position not valid..."

    if (!(postDoc && postDoc.tags && postDoc.tags.length > 0)) return []
    const postTagsLength = postDoc.tags.length
    logger.log(lG, lS, null, { postTagsLength })

    const tags = postDoc.tags
    logger.log(lG, lS, null, { tags })

    let tagIdExists
    let tagDoc

    tags.map(tag => {
      logger.log(lG, lS, null, { tag })

      const isSameId = u.isSameId(tag._id, tagId)
      logger.log(lG, lS, null, { isSameId })

      if (isSameId === true) {
        tagIdExists = true
        tagDoc = tag
      }
    })

    if (tagIdExists !== true) return postDoc

    const taggedUserId = tagDoc.userId
    logger.log(lG, lS, null, { taggedUserId })

    let udpatedTags = []

    tags.map(tag => {
      logger.log(lG, lS, null, { tag })

      const isSameId = u.isSameId(tag._id, tagId)
      logger.log(lG, lS, null, { isSameId })

      if (isSameId === true) {
        tag.position = newPosition
      }
      updatedTags.push(tag)
    })

    logger.log(lG, lS, null, { updatedTags })

    const updatedPost = await crud.update.post.findByIdAndAddToSet(postId, {
      tags: updatedTags,
    })
    logger.log(lG, lS, null, { updatedPost })

    return updatedPost

    // const newPromise = new Promise((resolve, reject) => {
    //   let updatedTagsArray = [];
    //   foundTags.map(tag => {
    //     if (tag._id.toString() === tagId.toString()) {
    //       tag.position = newPosition;
    //     }
    //     updatedTagsArray.push(tag);
    //   });
    //
    //   logger.log(lG, lS, null, { updatedTagsArray });
    //
    //   return Post.findByIdAndUpdate(
    //     { _id: postId },
    //     { tags: updatedTagsArray },
    //     // { set: { tags: { _id: tagId } } },
    //     { new: true },
    //     async function(error, updatedPost) {
    //       if (error) reject(error);
    //       else resolve(updatedPost);
    //     }
    //   );
    // });
    //
    // return newPromise
    //   .then(updatedPost => {
    //     logger.log(lG, lS, null, { updatedPost });
    //     const updatedPostTags = updatedPost.tags;
    //     let tagObject = {};
    //     updatedPostTags.map(tag => {
    //       if (tag._id.toString() === tagId.toString()) {
    //         tagObject = tag;
    //       }
    //     });
    //     return tagObject;
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

// module.exports = async (writerId, postId, tagId, newPosition) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { postId });
//   logger.log(lG, lS, null, { tagId });
//   logger.log(lG, lS, null, { newPosition });
//
//   try {
//     const foundPost = await Post.findOne({ _id: postId });
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
//       const validationResults = await h.verifyOperation.writeDocByCreatorOnly(
//         writerId,
//         foundPost
//       );
//
//       logger.log(lG, lS, null, { validationResults });
//
//       if (validationResults === true) {
//         logger.log(lG, lS, null, { foundTags });
//
//         const checkNewPosition = () => {
//           if (
//             (newPosition &&
//               isNaN(newPosition.x) === false &&
//               h.numDigits(newPosition.x) === 3) ||
//             (newPosition.x === 0 &&
//               isNaN(newPosition.y) === false &&
//               h.numDigits(newPosition.y) === 3) ||
//             newPosition.y === 0
//           ) {
//             return true;
//           } else {
//             return false;
//           }
//         };
//
//         const verifiedFields = await checkNewPosition(newPosition);
//         logger.log(lG, lS, null, { verifiedFields });
//
//         if (verifiedFields === true) {
//           const newPromise = new Promise((resolve, reject) => {
//             let updatedTagsArray = [];
//             foundTags.map(tag => {
//               if (tag._id.toString() === tagId.toString()) {
//                 tag.position = newPosition;
//               }
//               updatedTagsArray.push(tag);
//             });
//
//             logger.log(lG, lS, null, { updatedTagsArray });
//
//             return Post.findByIdAndUpdate(
//               { _id: postId },
//               { tags: updatedTagsArray },
//               // { set: { tags: { _id: tagId } } },
//               { new: true },
//               async function(error, updatedPost) {
//                 if (error) reject(error);
//                 else resolve(updatedPost);
//               }
//             );
//           });
//
//           return newPromise
//             .then(updatedPost => {
//               logger.log(lG, lS, null, { updatedPost });
//               const updatedPostTags = updatedPost.tags;
//               let tagObject = {};
//               updatedPostTags.map(tag => {
//                 if (tag._id.toString() === tagId.toString()) {
//                   tagObject = tag;
//                 }
//               });
//               return tagObject;
//             })
//             .catch(error => {
//               logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//             });
//         } else {
//           return false;
//         }
//       }
//       return validationResults;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//   }
// };
