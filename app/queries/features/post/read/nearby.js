const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "POST-R-NEARBY" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, readerLocation, maxDistance) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { readerLocation })
    logger.log(lG, lS, null, { maxDistance })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](readerId, readerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // validate readerLocation and maxDistance
    // if not valid return e.HandleFeatureError(err)...

    // const canUserRead = await verifyUser.canUserRead.checkId(userId);
    // if (canUserRead === false) return new errors.ReadPermissionsIsFalse();
    //
    // // grab all nearby posts and map, check if user can read userIdCreator
    // // nearbyPosts.map(post => canUserReadUser post.userId );
    // const canUserReadUser = await verifyUser.canUserReadUser.checkId(readerId, idToRead);
    // if (canUserReadUser === false) return new errors.CanUserReadUserIsFalse();

    // return await h.verifyUser.canUserRead(readerId);

    // validate reader location and maxDistance values

    return await Post.geoNear(
      {
        type: "Point",
        coordinates: [
          parseFloat(readerLocation.lng),
          parseFloat(readerLocation.lat),
        ],
      },
      { spherical: true, maxDistance: maxDistance }
    )
      .then(async posts => {
        logger.log(lG, lS, null, { posts })

        let postsArray = []

        if (posts !== null && posts.length > 0) {
          const postsLength = posts.length
          logger.log(lG, lS, null, { postsLength })

          // const generateDataToReturn = await (async () => {
          await Promise.all(
            posts.map(async post => {
              logger.log(lG, lS, null, { post })

              const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
                readerId,
                post.obj.userId
              )
              logger.log(lG, lS, null, { canUserReadUser })

              if (canUserReadUser === true) {
                postsArray.push(post.obj)
              }
            })
          )
          // })();
        }

        logger.log(lG, lS, null, { postsArray })

        // sort by nearest

        return postsArray
      })
      .catch(error => {
        logger.log(lG, lS, null, { err })
        return e.HandleFeatureError(err)
      })
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, readerLocation, maxDistance) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { readerLocation });
//   logger.log(lG, lS, null, { maxDistance });
//
//   try {
//     const canUserRead = await h.verifyUser.canUserRead(readerId);
//
//     logger.log(lG, lS, null, { canUserRead });
//
//     if (canUserRead !== true) {
//       logger.log(lG, lS, `User readerId does not have read permissions`);
//       return false;
//     } else {
//       return await Post.geoNear(
//         {
//           type: "Point",
//           coordinates: [
//             parseFloat(readerLocation.lng),
//             parseFloat(readerLocation.lat)
//           ]
//         },
//         {
//           spherical: true,
//           maxDistance: maxDistance
//         }
//       )
//         .then(async posts => {
//           logger.log(lG, lS, null, { postsLength: posts.length });
//           logger.log(lG, lS, null, { posts });
//
//           let postsArray = [];
//
//           if (posts !== null && posts.length > 0) {
//             const generateDataToReturn = await (async () => {
//               await Promise.all(
//                 posts.map(async post => {
//                   const canUserReadUser = await h.verifyUser.canUserReadUser.checkId(
//                     readerId,
//                     post.obj.userId
//                   );
//                   logger.log(lG, lS, null, { canUserReadUser });
//                   if (canUserReadUser === true) {
//                     postsArray.push(post.obj);
//                   }
//                 })
//               );
//             })();
//           }
//
//           logger.log(lG, lS, null, { postsArray });
//
//           return postsArray;
//         })
//         .catch(error => {
//           logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//         });
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//   }
// };
