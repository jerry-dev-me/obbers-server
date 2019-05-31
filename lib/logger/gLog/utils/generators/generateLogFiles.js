const config = require('../../config');
const gLogSettings = require('../../config').settings;
const logGroups = require('../../config').logGroups;

const winstonLoggers = require("../../winston");

module.exports.generateLogFiles = (logObject, logGroup, logSubgroup) => {
  const logsFile = () => {
    winstonLoggers.defaultLogger.logFile.log("info", logObject);
  };
  logsFile();

  if (gLogSettings.logsByLogGroup !== true) {
    // console.log("\nGLog logs by log group are not enabled.");
    // console.log("Go to GLog configuration settings to enable group logs.");
  } else {
    let filePath = gLogSettings.saveLocations.logsByLogGroup;
    let fileName = `${logGroup}`;
    let fileExt = `.log`;
    let filePathNameExt = `${filePath}${fileName}${fileExt}`;
    winstonLoggers.logsByLogGroup(filePathNameExt, logObject);
  };

  if (gLogSettings.logsByLogGroup !== true) {
    // console.log("\nGLog logs by log subgroup are not enabled.");
    // console.log("Go to GLog configuration settings to enable subgroup logs.");
  } else {
    let filePath = gLogSettings.saveLocations.logsByLogSubgroup;
    let fileName = `${logGroup}-${logSubgroup}`;
    let fileExt = `.log`;
    let filePathNameExt = `${filePath}${fileName}${fileExt}`;
    winstonLoggers.logsByLogSubgroup(filePathNameExt, logObject);
  };

  // const errorsFile = () => {
  //   if (logObject.data === "error") {
  //     winstonLoggers.errorsLogger.logFile.log("info", logObject);
  //   }
  // };
  // errorsFile();
  //
  // const undefinedFile = () => {
  //   if (logObject.value === undefined) {
  //     winstonLoggers.undefinedLogger.logFile.log("info", logObject);
  //   }
  // };
  // undefinedFile();
};
