const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-DOC"; // logGroup
const lS = "GET-ALL-REFS"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyDoc");
const u = require("../../../utils");
const crud = require("../crud");
const exists = require("./exists");
const getDocRefs = require("./getDocRefs");

const User = require("../../models/user");

const getAllRefs = async (model, docRefs) => {
  try {
    logger.log(lG, lS, null, { model });
    logger.log(lG, lS, null, { docRefs });

    let allRefs = [];

    allRefs.push(...docRefs.refs);
    logger.log(lG, lS, null, { allRefs });

    let repeat = false;

    const findRefs = async () => {
      await Promise.all(
        docRefs.refs.map(async ref => {
          const foundDoc = await exists.checkId(ref.refModel, ref.refId);
          logger.log(lG, lS, null, { foundDoc });

          if (foundDoc === false)
            throw new e.DocDoesNotExist(ref.refModel, new Error().stack);

          const foundDocRefs = getDocRefs.checkDoc(ref.refModel, foundDoc);
          logger.log(lG, lS, null, { foundDocRefs });

          if (foundDocRefs && foundDocRefs.refs.length > 0) {
            allRefs.push(...foundDocRefs.refs);
            repeat = true;
          }
        })
      );
    };

    await findRefs();

    if (repeat === true) {
      repeat = false;
      await findRefs();
    }

    const removedDuplicates = u.arrayRemoveDuplicated.objects(allRefs);
    logger.log(lG, lS, null, { removedDuplicates });

    const creatorRef = [
      {
        refModel: "user",
        refId: docRefs.docInfo.creator
      }
    ];
    logger.log(lG, lS, null, { creatorRef });

    const arrWithCreatorRefSubtracted = u.subtractObjectsFromArrays.byObjProp(
      removedDuplicates,
      creatorRef,
      "refId"
    );
    logger.log(lG, lS, null, { arrWithCreatorRefSubtracted });

    logger.log(lG, lS, null, { docRefs });
    logger.log(lG, lS, null, { allRefs });

    return {
      docInfo: docRefs.docInfo,
      refs: arrWithCreatorRefSubtracted
    };
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleVerifyDocError(err);
  }
};

module.exports = {
  checkId: async (model, id) => {
    try {
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { doc });

      const doc = await exists.checkId(model, id);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      const docRefs = getDocRefs.checkDoc(model, doc);
      logger.log(lG, lS, null, { docRefs });

      return getAllRefs("activity", docRefs);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  },
  checkDoc: async (model, doc) => {
    try {
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { doc });

      doc = exists.checkDoc(doc);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      const docRefs = getDocRefs.checkDoc(model, doc);
      logger.log(lG, lS, null, { docRefs });

      return getAllRefs("activity", docRefs);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }
};
