process.on("uncaughtException", function(exception) {
  console.log(exception);
});

const store = require("store");
const fs = require("fs");

const config = require("./config");
const settings = require("./config").settings;
const logGroups = require("./config").logGroups;

const u = require("./utils");

const winstonLoggers = require("./winston");

const canWeLog = (logGroup, logSubgroup) => {
  if (process.env.NODE_ENV === "production") {
    window.console || (console = { log: function() {} });
    return false;
  }

  const logsEnabled = config.settings.logsEnabled;
  if (logsEnabled !== true) return false;

  const isFoundInArray = (groupOrSubgroup, arr) => {
    let found;
    arr.map(element => {
      if (element.toString() === groupOrSubgroup.toString()) found = true;
    });
    if (found !== true) found = false;
    return found;
  };

  const skip = settings.skip;
  const shouldSkipGroup = isFoundInArray(logGroup, skip.groups);
  const shouldSkipSubgroup = isFoundInArray(logSubgroup, skip.subgroups);

  if (shouldSkipGroup === true) return false;
  if (shouldSkipSubgroup === true) return false;

  return true;
};

module.exports.log = async (logGroup, logSubgroup, message, data) => {
  if (canWeLog(logGroup, logSubgroup) === true) {
    let logObject = u.createLogObject(logGroup, logSubgroup, message, data);
    u.createJSONLogs(logObject, logGroup, logSubgroup);
    // u.createWinstonLogs(logObject, logGroup, logSubgroup);
  }
};

module.exports.only = async (logGroup, logSubgroup, message, data) => {
  if (canWeLog(logGroup, logSubgroup) === true) {
    let logObject = u.createLogObject(logGroup, logSubgroup, message, data);
    u.createJSONLogs(logObject, logGroup, logSubgroup);
    u.createJSONLogsOnly(logObject, logGroup, logSubgroup);
    // winstonLoggers.onlyLogger.logFile.log("info", logObject);
    // u.createWinstonLogs(logObject, logGroup, logSubgroup);
  }
};

module.exports.skip = async (logGroup, logSubgroup, message, data) => {
  return;
};
