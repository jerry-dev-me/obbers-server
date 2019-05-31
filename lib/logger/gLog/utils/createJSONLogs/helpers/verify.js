// const store = require("store");
// const config = require('../config');
// const logSettings = require('../config').settings;
// const logGroups = require('../config').logGroups;
//
// // module.exports.verifyLogsEnabled = (logGroup, logSubgroup) => {
// module.exports.areLogsEnabled = (logGroup, logSubgroup) => {
//   if (config.settings.logsEnabled === true) {
//     if (logGroups[logGroup].enabled === true
//     && logGroups[logGroup].subgroups[logSubgroup].enabled === true) {
//       return true;
//     } else {
//       return false;
//     };
//   } else {
//     return false;
//   }
// };
//
// module.exports.stubLogs = () => {
//   if(process.env.NODE_ENV === 'production') {
//     // shorter method to stub out all console.logs
//     window.console||(console={log:function(){}})
//   };
// };
//
// module.exports.isLogsOnlyActive = () => {
//   return store.get("logs-only-active");
// }
//
// module.exports.werePreviousFilesRemoved = () => {
//   return store.get("previous-files-removed");
// }
//
// module.exports.wereLogGroupAndLogSubgroupFilesRemoved = () => {
//   return store.get("log-group-and-log-subgroup-files-removed");
// }
//
// module.exports.wasAllLogsArrayRestarted = () => {
//   return store.get("all-logs-array-restarted");
// }
//
// module.exports.canCreateFilesByLogGroup = () => {
//   // console.log("\ncanCreateFilesByLogGroup function called");
//   if (logSettings.logsEnabled === true
//   && this.isLogsOnlyActive() !== true
//   && logSettings.createFilesByLogGroup === true) {
//     // console.log("\ncanCreateFilesByLogGroup returning TRUE");
//     return true;
//   } else {
//     return false;
//   }
// }
//
// module.exports.canCreateFilesByLogSubgroup = () => {
//   // console.log("\ncanCreateFilesByLogSubgroup function called");
//   if (logSettings.logsEnabled === true
//   && this.isLogsOnlyActive() !== true
//   && logSettings.createFilesByLogSubgroup === true) {
//     // console.log("\ncanCreateFilesByLogSubgroup returning TRUE");
//     return true;
//   } else {
//     return false;
//   }
// }
