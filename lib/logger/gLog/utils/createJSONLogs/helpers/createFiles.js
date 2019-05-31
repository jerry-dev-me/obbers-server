// const store = require("store");
// const fs = require('fs');
//
// const config = require('../config');
// const logSettings = require('../config').settings;
//
// const verify = require("./verify");
// const generateData = require("./generateData");
// const operations = require("./operations");
//
// // create logsFile
// module.exports.logsFile = async (logsArray, nameOfFile, saveLocation) => {
//   // console.log("\ngenerateLogsFile Params Received:");
//   // console.log(logsArray);
//   // console.log(nameOfFile);
//   // console.log(saveLocation);
//
//   // console.log("\n≥≥≥≥≥ Generating Logs File...");
//   // console.log("File name: " + nameOfFile);
//   // console.log("logsArray Received Which Will Be Stored on this new File is:");
//   // console.log(logsArray);
//
//   // // Appending New Data to the JSON File
//   // // const logger = fs.createWriteStream("logs.json", {
//   // const logger = fs.createWriteStream(`${saveLocation}${nameOfFile}.json`, {
//   //   flags: "w" // "a" means appending (old data will be preserved)
//   // });
//   // logger.write(JSON.stringify(logsArray, null, 4));
//   // // logger.end();
//
//   const callbackFunction = (filenameExtAndLocation, cb) => {
//     // do something inside var...
//     const logger = fs.createWriteStream(filenameExtAndLocation, {
//       flags: "w" // "a" means appending (old data will be preserved)
//     });
//
//     let error;
//     if (!logger) {
//       error = "fs.createWriteStream error!";
//     } else {
//       error = null;
//     };
//     // return that in cb
//     cb(error, logger);
//   };
//
//
//
//
//   const newPromise = new Promise((resolve, reject) => {
//     // const logger = fs.createWriteStream(`${saveLocation}${nameOfFile}.json`, {
//     //   flags: "w" // "a" means appending (old data will be preserved)
//     // });
//     // return fs.createWriteStream(`${saveLocation}${nameOfFile}.json`, {
//     //   flags: "w" // "a" means appending (old data will be preserved)
//     // });
//     // if (error) reject(error);
//     // resolve(logger);
//     let filenameExtAndLocation = `${saveLocation}${nameOfFile}.json`;
//     return callbackFunction(filenameExtAndLocation, (error, logger) => {
//       // console.log("\nLogger at newPromise is");
//       // console.log(logger);
//       if (error) reject(error);
//       resolve(logger);
//     })
//   });
//
//   // const newPromise = new Promise((resolve, reject) => {
//   //   return fs.writeFile(
//   //     `${saveLocation}${nameOfFile}.json`,
//   //     logsArray,
//   //     "utf8",
//   //     (error, logger) => {
//   //       if (error) reject(error);
//   //       console.log("\nLogger is:\n" + logger);
//   //       resolve(logger);
//   //     }
//   //   );
//   // });
//
//   return newPromise
//     .then(logger => {
//       // console.log("\nLogger at return newPromise is");
//       // console.log(logger);
//       logger.write(JSON.stringify(logsArray, null, 4));
//     })
//     .catch(error => console.log(error));
//
// };
//
// // create filesByLogGroup
// module.exports.logFilesByLogGroup = async (logObject, logGroup) => {
//
//   // console.log("\n≥≥≥≥≥ Generating log file by logGroup: " + logGroup);
//
//   if (verify.canCreateFilesByLogGroup() === true) {
//     // console.log("\nCreate Files by Log Group is TRUE");
//     let logsArray = generateData.logsArray(logObject, logGroup);
//     let nameOfFile = `${logGroup}`;
//     let saveLocation = logSettings.saveLocations.logsByLogGroup;
//     await this.logsFile(logsArray, nameOfFile, saveLocation);
//   }
//
//   // let logsOnlyActive = store.get("logs-only-active");
//   // if (logsOnlyActive !== true) {
//   //   if (config.settings.createFilesByLogGroup === true) {
//   //
//   //     // console.log("\ngenerateFilesByLogGroupAndLogSubgroup()");
//   //     // console.log("Generating file by > Log Group");
//   //     // console.log("Log Group is:");
//   //     // console.log(logGroup);
//   //
//   //     let logsArray = generateLogsArray(logObject, logGroup);
//   //     let nameOfFile = `${logGroup}`;
//   //     let saveLocation = logSettings.saveLocations.logsByLogGroup;
//   //     generateLogsFile(logsArray, nameOfFile, saveLocation);
//   //   };
//   // };
// };
//
// // create filesByLogGroupAndLogSubgroup
// module.exports.logFilesByLogSubgroup = async (logObject, logGroup, logSubgroup) => {
//
//   // console.log("\n≥≥≥≥≥ Generating log file by logSubgroup: " + logSubgroup);
//
//   if (verify.canCreateFilesByLogSubgroup() === true) {
//     // console.log("\nCreate Files by Log Subgroup is TRUE");
//     let logsArray = generateData.logsArray(logObject, logSubgroup);
//     let nameOfFile = `${logGroup}-${logSubgroup}`;
//     let saveLocation = logSettings.saveLocations.logsByLogSubgroup;
//     await this.logsFile(logsArray, nameOfFile, saveLocation);
//   }
//
//   // let logsOnlyActive = store.get("logs-only-active");
//   // if (logsOnlyActive !== true) {
//   //   if (config.settings.createFilesByLogSubgroup === true) {
//   //
//   //     // console.log("\ncreateFilesByLogSubgroup()");
//   //     // console.log("Generating file by > Log Subgroup");
//   //     // console.log("Log Subgroup is:");
//   //     // console.log(logSubgroup);
//   //
//   //     let logsArray = generateLogsArray(logObject, logSubgroup);
//   //     let nameOfFile = `${logGroup}-${logSubgroup}`;
//   //     let saveLocation = logSettings.saveLocations.logsByLogSubgroup;
//   //     generateLogsFile(logsArray, nameOfFile, saveLocation);
//   //   };
//   // };
// };
