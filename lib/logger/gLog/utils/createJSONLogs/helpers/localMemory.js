const store = require("store");

const config = require('../config');
const logSettings = require('../config').settings;

module.exports.setLogsOnlyActiveToTrue = () => {
  store.set("logs-only-active", true);
}

module.exports.setPreviousFilesRemovedToTrue = () => {
  console.log("\nSetting Previous Files Removed STORE to TRUE");
  store.set("previous-files-removed", true);
}

module.exports.setLogGroupAndLogSubgroupFilesRemovedToTrue = () => {
  store.set("log-group-and-log-subgroup-files-removed", true);
}

module.exports.setAllLogsArrayToEmptyArray = () => {
  store.set("all-logs", []);
}

module.exports.setAllLogsArrayRestartedToTrue = () => {
  store.set("all-logs-array-restarted", true);
}

module.exports.getAllLogsArray = () => {
  store.get("all-logs");
}

// module.exports.func = () => {
//
// }
