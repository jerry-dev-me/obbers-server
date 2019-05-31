const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COMMENT-R-LIKES" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, commentId) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { commentId })

    const validation = await validateOperation.read["comment"].restriction[
      "default"
    ](readerId, commentId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const likes = docsById.commentId.likes
    logger.log(lG, lS, null, { likes })

    let arrayOfLikes = []

    await Promise.all(
      likes.map(async likeId => {
        logger.log(lG, lS, null, { likeId })

        const likeDoc = await crud.read.like.findById(likeId)
        logger.log(lG, lS, null, { likeDoc })

        const userDoc = await crud.read.user.findById(likeDoc.userId, {
          "info.avatar": 1,
          "info.username": 1,
          "info.name": 1,
          followers: 1,
        })
        logger.log(lG, lS, null, { userDoc })

        const canUserReadUser = await verifyUser.canUserReadUser.checkId(
          readerId,
          likeDoc.userId
        )
        logger.log(lG, lS, null, { canUserReadUser })

        if (canUserReadUser === true) {
          let object = {
            _id: likeId,
            userId: userDoc._id,
            avatar: userDoc.info.avatar,
            username: userDoc.info.username,
            name: userDoc.info.name,
            following: verifyUser.isUserFollowing.checkId(
              readerId,
              likeDoc.userId
            ),
          }
          arrayOfLikes.push(object)
        }

        // const foundLike = await qLike.read.byId(readerId, likeId);
        // const foundUser = await User.findOne(
        //   { _id: foundLike.userId },
        //   {
        //     _id: 1,
        //     "info.avatar": 1,
        //     "info.username": 1,
        //     "info.name": 1,
        //     followers: 1
        //   }
        // );

        // let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
        //   readerId,
        //   foundUser._id
        // );

        // if (canUserReadUser === true) {
        //   let objectToPush = {
        //     _id: likeId,
        //     userId: foundUser._id,
        //     avatar: foundUser.info.avatar,
        //     username: foundUser.info.username,
        //     name: foundUser.info.name,
        //     following: await verifyUser.isUserFollowing.checkId(
        //       readerId,
        //       foundUser.followers
        //     )
        //   };
        //   arrayToReturn.push(objectToPush);
        // }
      })
    )

    logger.log(lG, lS, null, { arrayOfLikes })

    return arrayOfLikes

    // const foundComment = await Comment.findOne({ _id: commentId });
    //
    // logger.log(lG, lS, null, { foundComment });
    //
    // _operationData[foundComment] = foundComment;
    //
    // return await h.verifyOperation.readDoc(
    //   readerId,
    //   foundComment
    // );
    //
    // let arrayToReturn = [];
    // const generateDataToReturn = await (async () => {
    //   const foundComment = _operationData.foundComment;
    //   const likes = foundComment.likes;
    //   await Promise.all(
    //     likes.map(async likeId => {
    //       const foundLike = await qLike.read.byId(readerId, likeId);
    //       const foundUser = await User.findOne(
    //         { _id: foundLike.userId },
    //         {
    //           _id: 1,
    //           "info.avatar": 1,
    //           "info.username": 1,
    //           "info.name": 1,
    //           followers: 1
    //         }
    //       );
    //
    //       let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
    //         readerId,
    //         foundUser._id
    //       );
    //       if (canUserReadUser === true) {
    //         let objectToPush = {
    //           _id: likeId,
    //           userId: foundUser._id,
    //           avatar: foundUser.info.avatar,
    //           username: foundUser.info.username,
    //           name: foundUser.info.name,
    //           following: await verifyUser.isUserFollowing.checkId(
    //             readerId,
    //             foundUser.followers
    //           )
    //         };
    //         arrayToReturn.push(objectToPush);
    //       }
    //     })
    //   );
    // })();
    // logger.log(lG, lS, null, { arrayToReturn });
    // return arrayToReturn;
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// // module.exports = async (readerId, commentId) => {
// //   logger.log(lG, lS, null, { readerId });
// //   logger.log(lG, lS, null, { commentId });
// //
// //
// //
// //   try {
// //     const foundComment = await Comment.findOne({ _id: commentId });
// //
// //     logger.log(lG, lS, null, { foundComment });
// //
// //     const validationResults = await h.verifyOperation.readDoc(
// //       readerId,
// //       foundComment
// //     );
// //
// //     logger.log(lG, lS, null, { validationResults });
// //
// //     if (validationResults === true) {
// //       let arrayToReturn = [];
// //       const generateDataToReturn = await (async () => {
// //         const likes = foundComment.likes;
// //         await Promise.all(
// //           likes.map(async likeId => {
// //             const foundLike = await qLike.read.byId(readerId, likeId);
// //             const foundUser = await User.findOne(
// //               { _id: foundLike.userId },
// //               {
// //                 _id: 1,
// //                 "info.avatar": 1,
// //                 "info.username": 1,
// //                 "info.name": 1,
// //                 followers: 1
// //               }
// //             );
// //
// //             let canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
// //               readerId,
// //               foundUser._id
// //             );
// //             if (canUserReadUser === true) {
// //               let objectToPush = {
// //                 _id: likeId,
// //                 userId: foundUser._id,
// //                 avatar: foundUser.info.avatar,
// //                 username: foundUser.info.username,
// //                 name: foundUser.info.name,
// //                 following: await verifyUser.isUserFollowing.checkId(
// //                   readerId,
// //                   foundUser.followers
// //                 )
// //               };
// //               arrayToReturn.push(objectToPush);
// //             }
// //           })
// //         );
// //       })();
// //       logger.log(lG, lS, null, { arrayToReturn });
// //       return arrayToReturn;
// //     }
// //   } catch (err) {
// //     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
// //
// //
// //   }
// // };
