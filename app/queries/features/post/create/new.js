const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-C-NEW" // logSubgroup

const h = require("../../../../helpers")
const c = require("../../../../config").constants
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, fields) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { fields })

    const validation = await validateOperation.create["post"].restriction[
      "default"
    ](writerId, fields)

    logger.log(lG, lS, null, { validation })

    const { validFields, docsById } = validation
    logger.log(lG, lS, null, { validFields })
    logger.log(lG, lS, null, { docsById })

    const postDoc = await crud.create.post.new(validFields)
    logger.log(lG, lS, null, { postDoc })

    await crud.update.user.findByIdAndAddToSet(writerId, {
      posts: postDoc._id,
    })

    if (postDoc && postDoc.tags && postDoc.tags.length > 0) {
      const tags = postDoc.tags
      logger.log(lG, lS, null, { tags })

      await Promise.all(
        tags.map(async tag => {
          logger.log(lG, lS, null, { tag })

          await crud.update.user.findByIdAndAddToSet(tag.userId, {
            taggedPosts: tag._id,
          })

          const activityDoc = await crud.create.activity.new({
            refModel: "post",
            refId: postDoc._id,
            userId: tag.userId,
            createdAt: new Date(),
            activityType: c.NEW_TAG,
          })
          logger.log(lG, lS, null, { activityDoc })

          await crud.update.user.findByIdAndAddToSet(tag.userId, {
            activities: activityDoc._id,
          })
        })
      )
    }

    const activityDoc = await crud.create.activity.new({
      refModel: "post",
      refId: postDoc._id,
      userId: writerId,
      createdAt: new Date(),
      activityType: c.NEW_POST,
    })
    logger.log(lG, lS, null, { activityDoc })

    await crud.update.user.findByIdAndAddToSet(writerId, {
      activities: activityDoc._id,
    })

    return postDoc

    // return await h.verifyOperation.createNewDoc(writerId);
    //
    // const verifiedFields = h.validateFields.post(fields);
    // const newPost = new Post(verifiedFields);
    // const newPostDoc = await newPost.save();
    // const userUpdateAddPost = await qUser.update.addPost(
    //   writerId,
    //   newPostDoc._id
    // );
    //
    // logger.log(lG, lS, null, { verifiedFields });
    // logger.log(lG, lS, null, { newPost });
    // logger.log(lG, lS, null, { newPostDoc });
    // logger.log(lG, lS, null, { userUpdateAddPost });
    //
    // const addPostIdToEveryUserTags = await (async () => {
    //   logger.log(lG, lS, null, { postTags: newPostDoc.tags });
    //
    //   if (newPostDoc && newPostDoc.tags.length > 0) {
    //     const tags = fields.tags;
    //     await Promise.all(
    //       tags.map(async tag => {
    //         const userUpdateAddTaggedPost = await qUser.update.addTaggedPost(
    //           tag.userId,
    //           newPostDoc._id
    //         );
    //       })
    //     );
    //   }
    // })();
    //
    // logger.log(lG, lS, null, { addPostIdToEveryUserTags });
    //
    // const newActivityDoc = await qActivity.create.new({
    //   refModel: "post",
    //   refId: newPostDoc._id,
    //   userId: writerId,
    //   createdAt: new Date(),
    //   activityType: "NEW_POST"
    // });
    //
    // logger.log(lG, lS, null, { newActivityDoc });
    //
    // return newPostDoc;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, fields) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { fields });
//
//   const qActivity = require("../../../../queries/activity");
//   const qUser = require("../../../../queries/user");
//
//   try {
//     const validationResults = await h.verifyOperation.createNewDoc(writerId);
//
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const verifiedFields = h.validateFields.post(fields);
//       const newPost = new Post(verifiedFields);
//       const newPostDoc = await newPost.save();
//       const addPostIdToUserPosts = await qUser.update.addPost(
//         writerId,
//         newPostDoc._id
//       );
//
//       logger.log(lG, lS, null, { verifiedFields });
//       logger.log(lG, lS, null, { newPost });
//       logger.log(lG, lS, null, { newPostDoc });
//       logger.log(lG, lS, null, { addPostIdToUserPosts });
//
//       const addPostIdToEveryUserTags = await (async () => {
//         logger.log(
//           lG,
//           lS,
//           `Adding the postId to every user.tags [] array only if that userId
//         has been added inisde the post.tags [] array`
//         );
//
//         logger.log(lG, lS, null, { postTags: newPostDoc.tags });
//
//         if (newPostDoc && newPostDoc.tags.length > 0) {
//           const tags = fields.tags;
//           await Promise.all(
//             tags.map(async tag => {
//               const addPostIdToUserTags = await qUser.update.addTaggedPost(
//                 tag.userId,
//                 newPostDoc._id
//               );
//             })
//           );
//         } else {
//           return "post.tags [] array is empty and does not contain any userId";
//         }
//       })();
//
//       logger.log(lG, lS, null, { addPostIdToEveryUserTags });
//
//       const newActivityDoc = await qActivity.create.new({
//         refModel: "post",
//         refId: newPostDoc._id,
//         userId: writerId,
//         createdAt: new Date(),
//         activityType: "NEW_POST"
//       });
//
//       logger.log(lG, lS, null, { newActivityDoc });
//
//       return newPostDoc;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//   }
// };
