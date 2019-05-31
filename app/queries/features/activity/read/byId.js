const logger = require("../../../../../lib/logger");
const lG = "QUERIES-FEATURES"; // logGroup
const lS = "ACTIVITY-R-BY-ID"; // logSubgroup

const h = require("../../../../helpers");
const crud = require("../../../crud");
const verifyDoc = require("../../../verifyDoc");
const verifyUser = require("../../../verifyUser");
const validateOperation = require("../../../validateOperation");
const validateFields = require("../../../validateFields");
const e = require("../../../../errors/queries/features");

module.exports = async (readerId, activityId) => {
  try {
    logger.log(lG, lS, null, { readerId });
    logger.log(lG, lS, null, { activityId });

    const validation = await validateOperation.read.activity.restriction.default(
      readerId,
      activityId
    );
    logger.log(lG, lS, null, { validation });

    const { docsById } = validation;
    logger.log(lG, lS, null, { docsById });

    const activityDoc = docsById[activityId];
    logger.log(lG, lS, null, { activityDoc });

    return activityDoc;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleFeatureError(err);
  }
};
