const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "REPORT-U-STATUS" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")

const queryFunc = async (writerId, reportId, newStatus) => {
  try {
    logger.log(lG, lS, null, { writerId })
    logger.log(lG, lS, null, { reportId })
    logger.log(lG, lS, null, { newStatus })

    const validation = await validateOperation.read["user"].restriction[
      "default"
    ](writerId, writerId)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // validate new status

    // const isPermissionsAdmin = await verifyUser.isPermissions.admin.checkId(writerId);
    // if (isPermissionsAdmin === false) return new errors.UserIsNotAdmin();

    const updatedReport = await crud.update.report.findByIdAndUpdate(reportId, {
      status: newStatus,
    })
    logger.log(lG, lS, null, { updatedReport })

    return updatedReport

    // const newPromise = new Promise((resolve, reject) => {
    //   return Report.findByIdAndUpdate(
    //     { _id: reportId },
    //     { status: newStatus },
    //     { new: true },
    //     async function(error, updatedReport) {
    //       if (error) reject(error);
    //       else resolve(updatedReport);
    //     }
    //   );
    // });
    // return newPromise
    //   .then(updatedReport => {
    //     logger.log(lG, lS, null, { updatedReport });
    //     return updatedReport;
    //   })
    //   .catch(error => {
    //     logger.log(lG, lS, null, { err });
    // return e.HandleFeatureError(err);
    //
    //
    //   });
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}

module.exports = {
  unread: async (writerId, reportId) => {
    const status = "UNREAD"
    return await queryFunc(writerId, reportId, status)
  },
  inProcess: async (writerId, reportId) => {
    const status = "IN_PROCESS"
    return await queryFunc(writerId, reportId, status)
  },
  closed: async (writerId, reportId) => {
    const status = "CLOSED"
    return await queryFunc(writerId, reportId, status)
  },
}

// module.exports = async (writerId, reportId, newStatus) => {
//   logger.log(lG, lS, null, { writerId });
//   logger.log(lG, lS, null, { reportId });
//   logger.log(lG, lS, null, { newStatus });
//
//   try {
//     const isUserAdmin = await h.verifyUser.isUserAdmin(writerId);
//
//     logger.log(lG, lS, null, { isUserAdmin });
//
//     if (isUserAdmin === true) {
//       const newPromise = new Promise((resolve, reject) => {
//         return Report.findByIdAndUpdate(
//           { _id: reportId },
//           { status: newStatus },
//           { new: true },
//           async function(error, updatedReport) {
//             if (error) reject(error);
//             else resolve(updatedReport);
//           }
//         );
//       });
//       return newPromise
//         .then(updatedReport => {
//           logger.log(lG, lS, null, { updatedReport });
//           return updatedReport;
//         })
//         .catch(error => {
//           logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//
//
//         });
//     }
//     return isUserAdmin;
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// return e.HandleFeatureError(err);
//   }
// }
