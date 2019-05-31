const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "REPORT-R-ALL-BY-CATEGORY" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (readerId, category) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { category })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // va;idate category

    const foundReports = await crud.read.report.find({ category })
    logger.log(lG, lS, null, { foundReports })

    return foundReports
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (readerId, category) => {
//   logger.log(lG, lS, null, { readerId });
//   logger.log(lG, lS, null, { category });
//
//   try {
//     const isUserAdmin = await h.verifyUser.isUserAdmin(readerId);
//
//     logger.log(lG, lS, null, { isUserAdmin });
//
//     if (isUserAdmin === true) {
//       const foundReport = await Report.find({ category });
//
//       logger.log(lG, lS, null, { foundReport });
//
//       return foundReport;
//     }
//     return isUserAdmin;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//   }
// }
