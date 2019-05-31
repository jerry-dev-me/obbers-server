/*
  HERE YOU CAN FIND A GREAT EXAMPLE FOR USING THE "THIS" KEYWORD
  TO MAKE REFERENCE TO FUNCTIONS THAT BELONG TO THIS SAME FILE
  OR TO THE CONTEXT WITHIN THIS FILE
  specially on the readDocs function...
  we need this context to use a function from within this same file...
  the thing is that we are using this from a function that resides withing a
  function declared in this same fle... so we are calling this from a function
  inside another function.., and the context gets lost... so my solution was to
  create a function taht returns this, this function is .... finish explanation...
*/

const verifyUser = require("../verifyUser")
const logger = require("../../../logger")

// read

module.exports.readDoc = async (readerId, doc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { readerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })

  const readDocVerification = await this.verifyDocAndUserReadPermissions(
    readerId,
    doc
  )
  logger.log("HELPERS-QUERIES", "VO", null, { readDocVerification })

  if (readDocVerification !== true) {
    return false
  } else {
    const creatorId = this.getUserIdDocCreator(doc)
    logger.log("HELPERS-QUERIES", "VO", null, { creatorId })

    const canUserReadUser = await verifyUser.canUserReadUser(
      readerId,
      creatorId
    )
    logger.log("HELPERS-QUERIES", "VO", null, { canUserReadUser })

    if (canUserReadUser !== true) {
      return false
    } else {
      return true
    }
  }
}

module.exports.readDocs = async (readerId, arrayOfDocs) => {
  logger.log("HELPERS-QUERIES", "VO", null, { readerId })
  logger.log("HELPERS-QUERIES", "VO", null, { arrayOfDocs })

  let newArrayOfDocsToReturn = []

  const getReadDocVerification = async (readerId, doc) => {
    return await this.verifyDocAndUserReadPermissions(readerId, doc)
  }

  const getCreatorId = async doc => {
    return await this.getUserIdDocCreator(doc)
  }

  const verifyEachDoc = await (async function() {
    return await Promise.all(
      arrayOfDocs.map(async function(doc) {
        logger.log("HELPERS-QUERIES", "VO", null, { docId: doc._id })
        logger.log("HELPERS-QUERIES", "VO", null, { doc })

        let readDocVerification = await getReadDocVerification(readerId, doc)
        logger.log("HELPERS-QUERIES", "VO", null, { readDocVerification })

        if (readDocVerification === true) {
          let creatorId = await getCreatorId(doc)
          logger.log("HELPERS-QUERIES", "VO", null, { creatorId })

          const canUserReadUser = await verifyUser.canUserReadUser(
            readerId,
            creatorId
          )
          logger.log("HELPERS-QUERIES", "VO", null, { canUserReadUser })

          if (canUserReadUser === true) {
            newArrayOfDocsToReturn.push(doc)
          }
        }
      })
    )
  })()

  logger.log("HELPERS-QUERIES", "VO", "newArrayOfDocsToReturn.length", {
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

module.exports.readDocByCreatorOnly = async (readerId, doc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { readerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })

  const readDocVerification = await this.verifyDocAndUserReadPermissions(
    readerId,
    doc
  )
  logger.log("HELPERS-QUERIES", "VO", null, { readDocVerification })

  if (readDocVerification !== true) {
    return false
  } else {
    const isSameUser = verifyUser.isSameUser(
      readerId,
      this.getUserIdDocCreator(doc)
    )
    logger.log("HELPERS-QUERIES", "VO", null, { isSameUser })

    if (isSameUser !== true) {
      return false
    } else {
      return true
    }
  }
}

// module.exports.readDocByAllowedOnly = async (readerId, doc, allowedIds) => {
//
// };

// module.exports.readDocByAllowedOnly = async (readerId, doc, allowedIds) => {
//   logger.log("HELPERS-QUERIES", "VO", "readerId is:", { readerId });
//   logger.log("HELPERS-QUERIES", "VO", null, { allowedIds });
//   return await allowedIds.map(async allowedId => {
//     if (allowedId.toString() !== readerId.toString()) {
//       logger.log("HELPERS-QUERIES", "VO", "allowedId.toString() !== readerId.toString()");
//     } else {
//       logger.log("HELPERS-QUERIES", "VO", "readerId is:", { readerId });
//       logger.log("HELPERS-QUERIES", "VO", "allowedId is:", { allowedId });
//       const readDocVerification = await this.verifyDocAndUserReadPermissions(
//         readerId,
//         doc
//       );
//       logger.log("HELPERS-QUERIES", "VO", null, { readDocVerification });
//       if (readDocVerification !== true) {
//         logger.log("HELPERS-QUERIES", "VO", "readDocVerification !== true");
//         return false;
//       } else {
//         logger.log("HELPERS-QUERIES", "VO", "readDocVerification === true");
//         return true;
//       };
//     };
//   });
// };

module.exports.readDocByAllowedOnly = async (readerId, doc, allowedIds) => {
  logger.log("HELPERS-QUERIES", "VO", null, { readerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })
  logger.log("HELPERS-QUERIES", "VO", null, { allowedIds })

  let isReaderIdAnAllowedId

  await allowedIds.map(async allowedId => {
    if (allowedId.toString() !== readerId.toString()) {
      logger.log(
        "HELPERS-QUERIES",
        "VO",
        "readerId not found in allowedIds array"
      )
      isReaderIdAnAllowedId = false
    } else {
      logger.log("HELPERS-QUERIES", "VO", "readerId found in allowedIds array")
      isReaderIdAnAllowedId = true
    }
  })

  logger.log("HELPERS-QUERIES", "VO", null, { isReaderIdAnAllowedId })

  if (isReaderIdAnAllowedId !== true) {
    return false
  } else {
    const readDocVerification = await this.verifyDocAndUserReadPermissions(
      readerId,
      doc
    )
    logger.log("HELPERS-QUERIES", "VO", null, { readDocVerification })

    if (readDocVerification !== true) {
      return false
    } else {
      return true
    }
  }
}

module.exports.readUserDocSelfOnly = async (readerId, userDoc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { readerId })
  logger.log("HELPERS-QUERIES", "VO", null, { userDoc })

  const readDocVerification = await this.verifyDocAndUserReadPermissions(
    readerId,
    userDoc
  )
  logger.log("HELPERS-QUERIES", "VO", null, { readDocVerification })

  if (readDocVerification !== true) {
    return false
  } else {
    const isSameUser = verifyUser.isSameUser(readerId, userDoc._id)
    logger.log("HELPERS-QUERIES", "VO", null, { isSameUser })

    if (isSameUser !== true) {
      return false
    } else {
      return true
    }
  }
}

// write create

module.exports.createNewDoc = async writerId => {
  logger.log("HELPERS-QUERIES", "VO", null, { writerId })

  const canUserWrite = await verifyUser.canUserWrite(writerId)
  logger.log("HELPERS-QUERIES", "VO", null, { canUserWrite })

  if (canUserWrite !== true) {
    return false
  } else {
    return true
  }
}

module.exports.createNewSubdoc = async (writerId, doc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { writerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })

  const writeDocVerification = await this.verifyDocAndUserWritePermissions(
    writerId,
    doc
  )
  logger.log("HELPERS-QUERIES", "VO", null, { writeDocVerification })

  if (writeDocVerification !== true) {
    return false
  } else {
    const creatorId = this.getUserIdDocCreator(doc)
    logger.log("HELPERS-QUERIES", "VO", null, { creatorId })

    const canUserReadUser = await verifyUser.canUserReadUser(
      writerId,
      creatorId
    )
    logger.log("HELPERS-QUERIES", "VO", null, { canUserReadUser })

    if (canUserReadUser !== true) {
      return false
    } else {
      return true
    }
  }
}

// write update/delete

module.exports.writeDoc = async (writerId, doc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { writerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })

  const writeDocVerification = await this.verifyDocAndUserWritePermissions(
    writerId,
    doc
  )
  logger.log("HELPERS-QUERIES", "VO", null, { writeDocVerification })

  if (writeDocVerification !== true) {
    return false
  } else {
    const creatorId = this.getUserIdDocCreator(doc)
    logger.log("HELPERS-QUERIES", "VO", null, { creatorId })

    const canUserReadUser = await verifyUser.canUserReadUser(
      writerId,
      creatorId
    )
    logger.log("HELPERS-QUERIES", "VO", null, { canUserReadUser })

    if (canUserReadUser !== true) {
      return false
    } else {
      return true
    }
  }
}

module.exports.writeDocByCreatorOnly = async (writerId, doc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { writerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })

  const writeDocVerification = await this.verifyDocAndUserWritePermissions(
    writerId,
    doc
  )
  logger.log("HELPERS-QUERIES", "VO", null, { writeDocVerification })

  if (writeDocVerification !== true) {
    return false
  } else {
    const isSameUser = verifyUser.isSameUser(
      writerId,
      this.getUserIdDocCreator(doc)
    )
    logger.log("HELPERS-QUERIES", "VO", null, { isSameUser })

    if (isSameUser !== true) {
      return false
    } else {
      return true
    }
  }
}

module.exports.writeDocByAllowedOnly = async (writerId, doc, allowedIds) => {
  logger.log("HELPERS-QUERIES", "VO", null, { writerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })
  logger.log("HELPERS-QUERIES", "VO", null, { allowedIds })

  let isWriterIdAnAllowedId

  await allowedIds.map(async allowedId => {
    if (allowedId.toString() !== writerId.toString()) {
      logger.log(
        "HELPERS-QUERIES",
        "VO",
        "writerId not found in allowedIds array"
      )
      isWriterIdAnAllowedId = false
    } else {
      logger.log("HELPERS-QUERIES", "VO", "writerId found in allowedIds array")
      isWriterIdAnAllowedId = true
    }
  })

  logger.log("HELPERS-QUERIES", "VO", null, { isWriterIdAnAllowedId })

  if (isWriterIdAnAllowedId !== true) {
    return false
  } else {
    const writeDocVerification = await this.verifyDocAndUserWritePermissions(
      writerId,
      doc
    )
    logger.log("HELPERS-QUERIES", "VO", null, { writeDocVerification })

    if (writeDocVerification !== true) {
      return false
    } else {
      return true
    }
  }
}

module.exports.writeSubdoc = async (writerId, doc, subdoc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { writerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })
  logger.log("HELPERS-QUERIES", "VO", null, { subdoc })

  const verifyDoc = this.verifyDoc(doc)
  const verifySubdoc = this.verifyDoc(subdoc)
  logger.log("HELPERS-QUERIES", "VO", null, { verifyDoc })
  logger.log("HELPERS-QUERIES", "VO", null, { verifySubdoc })

  if (!(verifyDoc === true && verifySubdoc === true)) {
    logger.log(
      "HELPERS-QUERIES",
      "VO",
      "Either the doument or the subdocument failed verification"
    )
    return false
  } else {
    const isWriterCreatorOfParentDoc = await verifyUser.isSameUser(
      writerId,
      this.getUserIdDocCreator(doc)
    )
    logger.log("HELPERS-QUERIES", "VO", null, { isWriterCreatorOfParentDoc })

    const isWriterCreatorOfSubDoc = await verifyUser.isSameUser(
      writerId,
      this.getUserIdDocCreator(subdoc)
    )
    logger.log("HELPERS-QUERIES", "VO", null, { isWriterCreatorOfSubDoc })

    if (
      !(isWriterCreatorOfSubDoc === true || isWriterCreatorOfParentDoc === true)
    ) {
      logger.log(
        "HELPERS-QUERIES",
        "VO",
        "writerId is not the creator of the parent document or the subdocument"
      )
      return false
    } else {
      let canUserWrite = await verifyUser.canUserWrite(writerId)
      logger.log("HELPERS-QUERIES", "VO", null, { canUserWrite })

      if (canUserWrite !== true) {
        return false
      } else {
        return true
      }
    }
  }
}

// Write User Settings

module.exports.writeUserDocSelfOnly = async (writerId, userDoc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { writerId })
  logger.log("HELPERS-QUERIES", "VO", null, { userDoc })

  const writeDocVerification = await this.verifyDocAndUserWritePermissions(
    writerId,
    userDoc
  )
  logger.log("HELPERS-QUERIES", "VO", null, { writeDocVerification })

  if (writeDocVerification !== true) {
    return false
  } else {
    const isSameUser = verifyUser.isSameUser(writerId, userDoc._id)
    logger.log("HELPERS-QUERIES", "VO", null, { isSameUser })

    if (isSameUser !== true) {
      return false
    } else {
      return true
    }
  }
}

// module.exports.writeSubdocByCreatorOnly = async (writerId, doc) => {
// };

// module.exports.writeSubdocByAllowedOnly = async (writerId, doc, allowedIds) => {
// };

// helpers

module.exports.verifyDocAndUserReadPermissions = async (readerId, doc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { readerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })

  const verifyDoc = this.verifyDoc(doc)
  logger.log("HELPERS-QUERIES", "VO", null, { verifyDoc })

  if (verifyDoc !== true) {
    return false
  } else {
    const canUserRead = await verifyUser.canUserRead(readerId)
    logger.log("HELPERS-QUERIES", "VO", null, { canUserRead })

    if (canUserRead !== true) {
      return false
    } else {
      return true
    }
  }
}

module.exports.verifyDocAndUserWritePermissions = async (writerId, doc) => {
  logger.log("HELPERS-QUERIES", "VO", null, { writerId })
  logger.log("HELPERS-QUERIES", "VO", null, { doc })

  const verifyDoc = this.verifyDoc(doc)
  logger.log("HELPERS-QUERIES", "VO", null, { verifyDoc })

  if (verifyDoc !== true) {
    return false
  } else {
    const canUserWrite = await verifyUser.canUserWrite(writerId)
    logger.log("HELPERS-QUERIES", "VO", null, { canUserWrite })

    if (canUserWrite !== true) {
      return false
    } else {
      return true
    }
  }
}

module.exports.verifyDoc = doc => {
  logger.log("HELPERS-QUERIES", "VO", null, { doc })

  if (doc === null || doc === undefined) {
    logger.log(
      "HELPERS-QUERIES",
      "VO",
      "The document is either null or undefined"
    )
    return false
  } else if (doc.constructor === Array && doc.length === 0) {
    logger.log(
      "HELPERS-QUERIES",
      "VO",
      "The document was found but it is an empty array with length of 0"
    )
    return null
  } else {
    return true
  }
}

module.exports.getUserIdDocCreator = doc => {
  logger.log("HELPERS-QUERIES", "VO", null, { doc })

  if (doc && doc.userId) {
    logger.log("HELPERS-QUERIES", "VO", "doc && doc.userId found", {
      docUserId: doc.userId,
    })

    if (doc.userId && doc.userId._id) {
      logger.log(
        "HELPERS-QUERIES",
        "VO",
        "doc.userId && doc.userId._id found",
        { docUserId: doc.userId._id }
      )
      return doc.userId._id.toString()
    } else {
      return doc.userId.toString()
    }
  } else if (doc && doc._id) {
    logger.log("HELPERS-QUERIES", "VO", "doc && doc._id found", {
      docId: doc._id,
    })
    return doc._id.toString()
  } else {
    logger.log(
      "HELPERS-QUERIES",
      "VO",
      "doc.userId || doc.userId._id || doc._id not found"
    )
    return false
  }
}

// module.exports.templateFunction = async writerId => {
// };
