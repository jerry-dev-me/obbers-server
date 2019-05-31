const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const voHelpers = require("../helpers")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-WRITE-DOC-BY-ALLOWED-ONLY" // logSubgroup

module.exports = async (writerId, doc, allowedIds) => {
  logger.log(lG, lS, null, { writerId })
  logger.log(lG, lS, null, { doc })
  logger.log(lG, lS, null, { allowedIds })

  let allowedIdsStringsArray = []
  await allowedIds.map(async allowedId => {
    let stringifiedId = allowedId.toString()
    allowedIdsStringsArray.push(stringifiedId)
  })

  let isWriterIdAnAllowedId = allowedIdsStringsArray.includes(
    writerId.toString()
  )

  // await allowedIds.map(async allowedId => {
  //   if (allowedId.toString() !== writerId.toString()) {
  //     logger.log(lG, lS,
  //     "writerId not found in allowedIds array");
  //     isWriterIdAnAllowedId = false;
  //   } else {
  //     logger.log(lG, lS,
  //     "writerId found in allowedIds array");
  //     return isWriterIdAnAllowedId = true;
  //   };
  // });

  logger.log(lG, lS, null, { isWriterIdAnAllowedId })

  if (isWriterIdAnAllowedId !== true) {
    return false
  } else {
    const writeDocVerification = await voHelpers.verifyDocAndUserWritePermissions(
      writerId,
      doc
    )
    logger.log(lG, lS, null, { writeDocVerification })

    if (writeDocVerification !== true) {
      return false
    } else {
      return true
    }
  }
}
