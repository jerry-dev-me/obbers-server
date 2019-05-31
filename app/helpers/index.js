module.exports = {
  api: require("./api"),

  auth: require("./auth"),

  query: require("./query"),
  queryOutput: require("./query").queryOutput,
  getTotal: require("./query").getTotal,
  validateFields: require("./query").validateFields,
  verifyOperation: require("./query").verifyOperation,
  verifyUser: require("./query").verifyUser,

  logger: require("../../lib/logger"),

  stringifyCircularJSON: require("./utils/stringifyCircularJSON"),
  numDigits: require("./utils/numDigits"),
  isIdFoundInArray: require("./utils/isIdFoundInArray"),
  areObjectsEqual: require("./utils/areObjectsEqual"),
}
