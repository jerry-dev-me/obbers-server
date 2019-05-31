const logger = require("../../../../lib/logger");
const lG = "QUERIES-VALIDATE-OP"; // logGroup
const lS = "VALIDATE-REFS"; // logSubgroup

const e = require("../../../errors/queries/validateOperation");
const verifyDoc = require("../../verifyDoc");
const verifyUser = require("../../verifyUser");

module.exports.refId = async (userId, refModel, refId) => {
  try {
    logger.log(lG, lS, null, { userId });
    logger.log(lG, lS, null, { refModel });
    logger.log(lG, lS, null, { refId });

    const userDoc = await verifyDoc.exists.checkId("user", userId);
    logger.log(lG, lS, null, { userDoc });

    if (userDoc === false)
      throw new e.DocDoesNotExist("user", new Error().stack);

    const refDoc = await verifyDoc.exists.checkId(refModel, refId);
    logger.log(lG, lS, null, { refDoc });

    if (refDoc === false)
      throw new e.DocDoesNotExist(refModel, new Error().stack);

    const canUserAccessDoc = await verifyDoc.canUserAccessDoc.checkDocs(
      userDoc,
      refModel,
      refDoc
    );
    logger.log(lG, lS, null, { canUserAccessDoc });

    return { refDoc };
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleValidateOperationError(err);
  }
};

module.exports.refIds = async (userId, refModel, refIds) => {
  try {
    logger.log(lG, lS, null, { userId });
    logger.log(lG, lS, null, { refModel });
    logger.log(lG, lS, null, { refIds });

    let results = {};
    results["validRefIds"] = [];
    results["docsById"] = {};

    const userDoc = await verifyDoc.exists.checkId("user", userId);
    logger.log(lG, lS, null, { userDoc });

    results.docsById[userId] = userDoc;

    if (userDoc === false)
      throw new e.DocDoesNotExist("user", new Error().stack);

    if (refModel === "user") {
      await Promise.all(
        refIds.map(async refId => {
          logger.log(lG, lS, null, { refId });

          const refDoc = await verifyDoc.exists.checkId("user", refId);
          logger.log(lG, lS, null, { refDoc });

          results.docsById[refId] = refDoc;

          if (refDoc !== false) {
            const canUserReadUser = verifyUser.canUserReadUser.checkDocs(
              userDoc,
              refDoc
            );
            logger.log(lG, lS, null, { canUserReadUser });

            if (canUserReadUser === true) validRefIds.push(refId);
          }
        })
      );

      return validRefIds;
    }

    await Promise.all(
      refIds.map(async refId => {
        logger.log(lG, lS, null, { refId });

        const refDoc = await verifyDoc.exists.checkId(refModel, refId);
        logger.log(lG, lS, null, { refDoc });

        results.docsById[refId] = refDoc;

        if (refDoc !== false) {
          const canUserAccessDoc = await verifyDoc.canUserAccessDoc.checkDocs(
            userDoc,
            refModel,
            refDoc
          );
          logger.log(lG, lS, null, { canUserAccessDoc });

          if (canUserAccessDoc === true) validRefIds.push(refId);
        }
      })
    );

    logger.log(lG, lS, null, { validRefIds });

    return results;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleValidateOperationError(err);
  }
};

module.exports.allFromDoc = async (userId, model, doc) => {
  try {
    logger.log(lG, lS, null, { userId });
    logger.log(lG, lS, null, { model });
    logger.log(lG, lS, null, { doc });

    let results = {};
    results["refDocs"] = [];
    results["docsById"] = {};

    const userDoc = await verifyDoc.exists.checkId("user", userId);
    logger.log(lG, lS, null, { userDoc });

    results.docsById[userId] = userDoc;

    if (userDoc === false)
      throw new e.DocDoesNotExist("user", new Error().stack);

    const docRefs = verifyDoc.getDocRefs[model].checkDoc(doc);
    logger.log(lG, lS, null, { docRefs });

    const allRefs = await verifyDoc.getAllRefs[model].checkDoc(doc);
    logger.log(lG, lS, null, { allRefs });

    const validateRefs = async refs => {
      await Promise.all(
        refs.map(async ref => {
          logger.log(lG, lS, null, { ref });

          const { refModel, refId } = ref;

          const refDoc = await verifyDoc.exists.checkId(refModel, refId);
          logger.log(lG, lS, null, { refDoc });

          if (refDoc === false)
            throw new e.DocDoesNotExist(refModel, new Error().stack);

          refDocs.push(refDoc);
          results.docsById[refId] = refDoc;

          const canUserAccessDoc = await verifyDoc.canUserAccessDoc.checkDocs(
            userDoc,
            refModel,
            refDoc
          );
          logger.log(lG, lS, null, { canUserAccessDoc });
        })
      );
      return true;
    };

    const docRefsValidation = await validateRefs(docRefs.refs);
    logger.log(lG, lS, null, { docRefsValidation });

    const allRefsValidation = await validateRefs(allRefs.refs);
    logger.log(lG, lS, null, { allRefsValidation });

    logger.log(lG, lS, null, { results });

    return results;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleValidateOperationError(err);
  }
};

module.exports.allFromRefId = async (userId, model, id) => {
  try {
    logger.log(lG, lS, null, { userId });
    logger.log(lG, lS, null, { model });
    logger.log(lG, lS, null, { id });

    let results = {};
    results["refDocs"] = [];
    results["docsById"] = {};

    const userDoc = await verifyDoc.exists.checkId("user", userId);
    logger.log(lG, lS, null, { userDoc });

    if (userDoc === false)
      throw new e.DocDoesNotExist("user", new Error().stack);

    results.docsById[userId] = userDoc;

    const doc = await verifyDoc.exists.checkId(model, id);
    logger.log(lG, lS, null, { doc });

    if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

    refDocs.push(doc);
    results.docsById[id] = doc;

    const canUserAccessDoc = await verifyDoc.canUserAccessDoc.checkDocs(
      userDoc,
      model,
      doc
    );
    logger.log(lG, lS, null, { canUserAccessDoc });

    const docRefs = verifyDoc.getDocRefs.checkDoc(model, doc);
    logger.log(lG, lS, null, { docRefs });

    const allRefs = await verifyDoc.getAllRefs.checkDoc(model, doc);
    logger.log(lG, lS, null, { allRefs });

    const validateRefs = async refs => {
      await Promise.all(
        refs.map(async ref => {
          logger.log(lG, lS, null, { ref });

          const { refModel, refId } = ref;

          const refDoc = await verifyDoc.exists.checkId(refModel, refId);
          logger.log(lG, lS, null, { refDoc });

          if (refDoc === false)
            throw new e.DocDoesNotExist(refModel, new Error().stack);

          refDocs.push(refDoc);
          results.docsById[refId] = refDoc;

          const canUserAccessDoc = await verifyDoc.canUserAccessDoc.checkDocs(
            userDoc,
            refModel,
            refDoc
          );
          logger.log(lG, lS, null, { canUserAccessDoc });
        })
      );
      return true;
    };

    const docRefsValidation = await validateRefs(docRefs.refs);
    logger.log(lG, lS, null, { docRefsValidation });

    const allRefsValidation = await validateRefs(allRefs.refs);
    logger.log(lG, lS, null, { allRefsValidation });

    logger.log(lG, lS, null, { results });

    return results;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleValidateOperationError(err);
  }
};
