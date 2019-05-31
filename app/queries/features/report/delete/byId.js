const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "REPORT-D-BY-ID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

module.exports = async (writerId, reportId) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { reportId })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    await crud.delete.report.findByIdAndRemove(reportId)

    return {}
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, reportId) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { reportId });
//
//   try {
//     const isUserAdmin = await h.verifyUser.isUserAdmin(writerId);
//
//     logger.log(lG, lS, null, { isUserAdmin });
//
//     if (isUserAdmin === true) {
//       const reportToDelete = await Report.findById(reportId);
//       await reportToDelete.remove();
//       const foundDeletedReport = await Report.findOne({ _id: reportId });
//
//       logger.log(lG, lS, null, { reportToDelete });
//       logger.log(lG, lS, null, { foundDeletedReport });
//
//       if (foundDeletedReport !== null) return foundDeletedReport;
//       else return null;
//     }
//     return isUserAdmin;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//   }
// };
