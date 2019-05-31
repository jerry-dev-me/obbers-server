const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "COLLECTION-C-NEW" // logSubgroup

const h = require("../../../../helpers")
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

    const validation = await validateOperation.create["collection"].restriction[
      "default"
    ](writerId, fields)

    logger.log(lG, lS, null, { validation })
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)

    const { validFields, docsById } = validation
    logger.log(lG, lS, null, { validFields })
    logger.log(lG, lS, null, { docsById })

    if (validFields && validFields.posts && validFields.posts.length > 0) {
      validFields["thumbnail"] = validFields.posts[0]
    }
    logger.log(lG, lS, null, { validFields })

    const collectionDoc = await crud.create.collection.new(validFields)
    logger.log(lG, lS, null, { collectionDoc })

    const updateUser = await crud.update.user.findByIdAndAddToSet(writerId, {
      collections: collectionDoc._id,
    })
    logger.log(lG, lS, null, { updateUser })

    return collectionDoc
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, fields) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { fields });
//
//
//
//   try {
//     const validationResults = await h.verifyOperation.createNewDoc(writerId);
//     logger.log(lG, lS, null, { validationResults });
//
//     if (validationResults === true) {
//       const verifiedFields = h.validateFields.collection(writerId, fields);
//       const newCollection = new Collection(verifiedFields);
//       const newCollectionDoc = await newCollection.save();
//       const addCollectionIdToUserCollections = await qUser.update.addCollection(
//         writerId,
//         newCollectionDoc._id
//       );
//
//       logger.log(lG, lS, null, { verifiedFields });
//       logger.log(lG, lS, null, { newCollection });
//       logger.log(lG, lS, null, { newCollectionDoc });
//       logger.log(lG, lS, null, { addCollectionIdToUserCollections });
//
//       return newCollectionDoc;
//     }
//     return validationResults;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
//
//
//   }
// };
