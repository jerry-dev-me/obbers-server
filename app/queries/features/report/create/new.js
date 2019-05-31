const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "REPORT-C-NEW" // logSubgroup

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

    const validation = await validateOperation.create["report"].restriction[
      "default"
    ](writerId, fields)

    logger.log(lG, lS, null, { validation })

    const { validFields, docsById } = validation
    logger.log(lG, lS, null, { validFields })
    logger.log(lG, lS, null, { docsById })

    const reportDoc = await crud.create.report.new(validFields)
    logger.log(lG, lS, null, { reportDoc })

    return reportDoc
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

// module.exports = async (writerId, fields) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { fields });
//
//   try {
//     const canUserWrite = await h.verifyUser.canUserWrite(writerId);
//
//     logger.log(lG, lS, null, { canUserWrite });
//
//     if (canUserWrite === true) {
//       const verifiedFields = h.validateFields.report(fields);
//       const newReport = new Report(verifiedFields);
//       const newReportDoc = await newReport.save();
//
//       logger.log(lG, lS, null, { verifiedFields });
//       logger.log(lG, lS, null, { newReport });
//       logger.log(lG, lS, null, { newReportDoc });
//
//       return newReportDoc;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//   }
// };
