const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const voHelpers = require("../helpers")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-WRITE-SUBDOC" // logSubgroup

module.exports = async (writerId, doc, subdoc) => {
  logger.log(lG, lS, null, { writerId })
  logger.log(lG, lS, null, { doc })
  logger.log(lG, lS, null, { subdoc })

  const verifyDoc = voHelpers.verifyDoc(doc)
  const verifySubdoc = voHelpers.verifyDoc(subdoc)
  logger.log(lG, lS, null, { verifyDoc })
  logger.log(lG, lS, null, { verifySubdoc })

  if (!(verifyDoc === true && verifySubdoc === true)) {
    logger.log(
      lG,
      lS,
      "Either the doument or the subdocument failed verification"
    )
    return false
  } else {
    const isWriterCreatorOfParentDoc = await verifyUser.isSameUser(
      writerId,
      voHelpers.getUserIdDocCreator(doc)
    )
    logger.log(lG, lS, null, { isWriterCreatorOfParentDoc })

    const isWriterCreatorOfSubDoc = await verifyUser.isSameUser(
      writerId,
      voHelpers.getUserIdDocCreator(subdoc)
    )
    logger.log(lG, lS, null, { isWriterCreatorOfSubDoc })

    if (
      !(isWriterCreatorOfSubDoc === true || isWriterCreatorOfParentDoc === true)
    ) {
      logger.log(
        lG,
        lS,
        "writerId is not the creator of the parent document or the subdocument"
      )
      return false
    } else {
      let canUserWrite = await verifyUser.canUserWrite(writerId)
      logger.log(lG, lS, null, { canUserWrite })

      if (canUserWrite !== true) {
        return false
      } else {
        return true
      }
    }
  }
}
