const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-R-BY-ID" // logSubgroup

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

    // const canUserReadCreator = await verifyDoc.canUserReadCreator.doc.checkId(userId, docId);
    // if (canUserReadCreator === false) return new errors.CanUserReadUserIsFalse();
    //
    // // grab post and populate tags...
    //
    // // check tags and for each post, map tags, and for each tag.userId check:
    // const canUserReadUser = await verifyUser.canUserReadUser.checkId(readerId, idToRead);
    // // if (canUserReadUser === false) return new errors.CanUserReadUserIsFalse();

    // const foundPost = await Post.findOne({ _id: postId })
    //   .lean()
    //   .populate("userId", "info.avatar info.username");

    const foundPost = await crud.read.post.findByIdLeanAndPopulate(
      postId,
      {},
      "userId",
      "info.avatar info.username"
    )
    logger.log(lG, lS, null, { foundPost })

    let availableTags = []

    await Promise.all(
      foundPost.tags.map(async tag => {
        logger.log(lG, lS, null, { tag })

        const canUserReadTaggedUserId = await h.verifyUser.canUserReadUser.checkId(
          readerId,
          tag.userId
        )
        logger.log(lG, lS, null, { canUserReadTaggedUserId })

        if (canUserReadTaggedUserId === true) availableTags.push(tag)
      })
    )

    let postComments
    if (foundPost.commentsEnabled) postComments = foundPost.comments
    else postComments = []

    logger.log(lG, lS, null, { postComments })

    const postObject = {
      _id: foundPost._id,
      userId: foundPost.userId._id,
      avatar: foundPost.userId.info.avatar,
      username: foundPost.userId.info.username,
      createdAt: foundPost.createdAt,
      caption: foundPost.caption,
      commentsEnabled: foundPost.commentsEnabled,
      comments: postComments,
      totalComments: await h.getTotal.postComments(postId),
      tags: _operationData.availableTags,
      likes: foundPost.likes,
      totalLikes: await h.getTotal.postLikes(postId),
      content: foundPost.content,
      location: foundPost.location,
      geometry: foundPost.geometry,
    }

    logger.log(lG, lS, null, { postObject })

    return postObject
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
//     const foundPost = await Post.findOne({ _id: postId })
//       .lean()
//       .populate("userId", "info.avatar info.username");
//
//     logger.log(lG, lS, null, { foundPost });
//
//     const validationResults = await h.verifyOperation.readDoc(
//       readerId,
//       foundPost.userId
//     );
//
//     logger.log(lG, lS, null, { validationResults });
//
//     const getTags = () => {
//       let tagsArray = [];
//       foundPost.tags.map(async tag => {
//         const canUserReadTaggedUserId = await h.verifyUser.canUserReadUser.checkId(
//           readerId,
//           tag.userId
//         );
//         if (canUserReadTaggedUserId === true) tagsArray.push(tag);
//       });
//       return tagsArray;
//     };
//
//     if (validationResults === true) {
//       let postComments;
//       if (foundPost.commentsEnabled) postComments = foundPost.comments;
//       else postComments = null;
//       const postObject = {
//         _id: foundPost._id,
//         userId: foundPost.userId._id,
//         avatar: foundPost.userId.info.avatar,
//         username: foundPost.userId.info.username,
//         createdAt: foundPost.createdAt,
//         caption: foundPost.caption,
//         commentsEnabled: foundPost.commentsEnabled,
//         comments: postComments,
//         totalComments: await h.getTotal.postComments(postId),
//         tags: await getTags(),
//         likes: foundPost.likes,
//         totalLikes: await h.getTotal.postLikes(postId),
//         content: foundPost.content,
//         location: foundPost.location,
//         geometry: foundPost.geometry
//       };
//       logger.log(lG, lS, null, { postObject });
//       return postObject;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
