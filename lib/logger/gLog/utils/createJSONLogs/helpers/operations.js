// const config = require('../config');
// const logSettings = require('../config').settings;
// const logGroups = require('../config').logGroups;
//
// const localMemory = require("./localMemory");
// const verify = require("./verify");
// const removeFiles = require("./removeFiles");
//
// module.exports.activateLogsOnly = () => {
//   if (verify.isLogsOnlyActive() !== true) {
//     localMemory.setLogsOnlyActiveToTrue();
//     // clear store "all-logs"
//     this.restartLogsArray();
//     // and start adding new logObjects to the cleaned "all-logs" array
//     // do not create logGroup and logSubgroup files anymore
//     // remove any existing logGroup and logSubgroup files
//     removeFiles.groupAndSubgroupFiles();
//   };
// };
//
// module.exports.restartLogsArray = () => {
//   if (verify.wasAllLogsArrayRestarted() !== true) {
//     localMemory.setAllLogsArrayToEmptyArray();
//     localMemory.setAllLogsArrayRestartedToTrue();
//   };
// }
