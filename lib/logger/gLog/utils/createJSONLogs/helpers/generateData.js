// const store = require("store");
// const config = require('../config');
// const logSettings = require('../config').settings;
// const logGroups = require('../config').logGroups;
//
// // module.exports.logObject = object => {
// //   console.log("\nGenerating logObject...");
// //   let logGroup = object.logGroup;
// //   let logSubgroup = object.logSubgroup;
// //   let groupDescription = logGroups[logGroup].description;
// //   let subgroupDescription = logGroups[logGroup].subgroups[logSubgroup].description;
// //
// //   return {
// //     title: `${groupDescription} - ${subgroupDescription}`,
// //     // const sn = path.basename(__filename)
// //     file: require('path').relative(process.cwd(), object.filename),
// //     method: object.method,
// //     message: object.message ? object.message : null,
// //     data: (function() {
// //       if (object.data === null || object.data === undefined) return null;
// //       else return Object.keys(object.data)[0]
// //     })(),
// //     value: (function() {
// //       if (object.data === null || object.data === undefined) return null;
// //       else return object.data[Object.keys(object.data)[0]]
// //     })(),
// //     createdAt: new Date()
// //   };
// // };
//
// module.exports.logsArray = (logObject, storeKey) => {
//   console.log("\nGenerating LogsArray for StoreKey: " + storeKey);
//
//   let logsArray = [];
//   let logs = store.get(storeKey);
//   if (!(logs === null || logs === undefined)) {
//     logsArray = logs;
//   };
//   logsArray.push(logObject);
//   store.set(storeKey, logsArray);
//   logs = store.get(storeKey);
//   logsArray = logs;
//
//   // console.log("\nUpdated logsArray to return from generateLogsArray is:");
//   // console.log(logsArray);
//
//   return logsArray;
// };
