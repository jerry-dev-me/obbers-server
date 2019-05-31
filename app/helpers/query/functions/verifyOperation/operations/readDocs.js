const verifyUser = require("../../verifyUser")
const logger = require("../../../../../../lib/logger")

const voHelpers = require("../helpers")

const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-OPERATION-READ-DOCS" // logSubgroup

module.exports = async (readerId, arrayOfDocs) => {
  logger.log(lG, lS, null, { readerId })
  logger.log(lG, lS, null, { arrayOfDocs })

  let newArrayOfDocsToReturn = []

  const getReadDocVerification = async (readerId, doc) => {
    return await voHelpers.verifyDocAndUserReadPermissions(readerId, doc)
  }

  const getCreatorId = async doc => {
    return await voHelpers.getUserIdDocCreator(doc)
  }

  const verifyEachDoc = await (async function() {
    return await Promise.all(
      arrayOfDocs.map(async function(doc) {
        logger.log(lG, lS, null, { docId: doc._id })
        logger.log(lG, lS, null, { doc })

        let readDocVerification = await getReadDocVerification(readerId, doc)
        logger.log(lG, lS, null, { readDocVerification })

        if (readDocVerification === true) {
          let creatorId = await getCreatorId(doc)
          logger.log(lG, lS, null, { creatorId })

          const canUserReadUser = await verifyUser.canUserReadUser(
            readerId,
            creatorId
          )
          logger.log(lG, lS, null, { canUserReadUser })

          if (canUserReadUser === true) {
            newArrayOfDocsToReturn.push(doc)
          }
        }
      })
    )
  })()

  logger.log(lG, lS, "newArrayOfDocsToReturn.length", {
    newArrayOfDocsToReturn: newArrayOfDocsToReturn.length,
  })

  if (newArrayOfDocsToReturn.length > 0) {
    return {
      response: true,
      docs: newArrayOfDocsToReturn,
    }
  } else {
    return {
      response: false,
      docs: null,
    }
  }
}
