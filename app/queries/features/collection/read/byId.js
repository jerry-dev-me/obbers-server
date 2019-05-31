const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COLLECTION-R-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, collectionId) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { collectionId })

    const validation = await validateOperation.read["collection"].restriction[
      "default"
    ](readerId, collectionId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    const foundCollection = await crud.read.collection.findLeanAndPopulate(
      { _id: collectionId },
      {
        userId: 1,
        createdAt: 1,
        modifiedAt: 1,
        name: 1,
        posts: 1,
        thumbnail: 1,
      },
      "posts",
      "userId createdAt location content"
    )
    logger.log(lG, lS, null, { foundCollection })

    if (!(foundCollection && foundCollection.posts.length > 0)) return []
    const foundCollectionPostsLength = foundCollection.posts.length
    logger.log(lG, lS, null, { foundCollectionPostsLength })

    let collectionPosts = []

    foundCollection.posts.map(async post => {
      logger.log(lG, lS, null, { post })

      const canUserReadUser = await verifyUser.canUserReadUser.checkId(
        readerId,
        post.userId
      )
      logger.log(lG, lS, null, { canUserReadUser })

      if (canUserReadUser === true) collectionPosts.push(post)
    })

    logger.log(lG, lS, null, { collectionPosts })

    return collectionPosts
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, collectionId) => {
//   logger.log(lG, lS, null, { readerId });
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
//     // check if found collection belongs to readerId...
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
