module.exports = {
  createLogObject: require("./createLogObject"),
  createJSONLogs: require("./createJSONLogs").logs,
  createJSONLogsOnly: require("./createJSONLogs").logsOnly,
  createWinstonLogs: require("./createWinstonLogs")
};
