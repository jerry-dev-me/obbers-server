const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-COLLECTIONS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const readerId = req.user.id

  const allCollectionsFromSelf = await q.features.collection.read.allFromSelf(
    readerId
  )

  const resHelper = h.api.resHelper.verifyQueryResults(allCollectionsFromSelf)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { readerId })
  h.logger.log(lG, lS, "Query Results", { allCollectionsFromSelf })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}

// module.exports.readCollectionById = async (req, res, next) => {
//   h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) });
//   h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) });
//
//   const userId = req.user.id;
//   const idToRead = req.user.id;
//   const collectionId = req.params.id;
//
//   const readCollectionById = await q.features.collection.read.byId(
//     userId,
//     idToRead,
//     collectionId
//   );
//
//   const resHelper = h.api.resHelper.verifyQueryResults(readCollectionById);
//
//   const statusCode = resHelper.statusCode;
//   const resources = resHelper.resources;
//
//   res.status(statusCode).json(resources);
// };
//
// module.exports.readAllCollectionsByUserId = async (req, res, next) => {
//   h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) });
//   h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) });
//
//   const userId = req.user.id;
//   const idToRead = req.params.userId;
//
//   const allCollectionsByUserId = await q.features.collection.read.allByUserId(
//     userId,
//     idToRead
//   );
//
//   const resHelper = h.api.resHelper.verifyQueryResults(allCollectionsByUserId);
//
//   const statusCode = resHelper.statusCode;
//   const resources = resHelper.resources;
//
//   res.status(statusCode).json(resources);
// };
