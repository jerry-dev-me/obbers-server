const logger = require("../../../../lib/logger");
const lG = "QUERIES-VALIDATE-OP"; // logGroup
const lS = "VALIDATE-FIELDS"; // logSubgroup

const e = require("../../../errors/queries/validateFields");
const validateFields = require("../../validateFields");
const verifyDoc = require("../../verifyDoc");

module.exports.new = async (userId, model, fields) => {
  try {
    logger.log(lG, lS, null, { userId });
    logger.log(lG, lS, null, { models });
    logger.log(lG, lS, null, { fields });

    if (model === "user") {
      const validFields = await validateFields.user.new(fields);
      logger.log(lG, lS, null, { validFields });

      return validFields;
    }

    const validFields = await validateFields[model].new(fields);
    logger.log(lG, lS, null, { validFields });

    const isUserIdCreator = verifyDoc.isUserIdCreator[model].checkDoc(
      userId,
      fields
    );
    logger.log(lG, lS, null, { isUserIdCreator });

    if (isUserIdCreator === false)
      throw new e.UserIsNotDocCreator(new Error().stack);

    return validFields;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleValidateFieldsError(err);
  }
};

module.exports.update = async (userId, model, fields) => {
  try {
    logger.log(lG, lS, null, { userId });
    logger.log(lG, lS, null, { model });
    logger.log(lG, lS, null, { fields });

    if (model === "user") {
      const validFields = await validateFields.user.update(fields);
      logger.log(lG, lS, null, { validFields });

      return validFields;
    }

    const validFields = await validateFields[model].update(fields);
    logger.log(lG, lS, null, { validFields });

    return validFields;
  } catch (err) {
    logger.log(lG, lS, null, { err });
    return e.HandleValidateFieldsError(err);
  }
};
