/*
RECOMMENDED USAGE:
- NOTES:
  - IF settings.createJSONFilesAsArrayOfLogs TRUE:
    • SET allLogs TO FALSE CASUE IT TAKES A LOT OF MEMORY AND COMPILING TIME
    • LOGGING logsByLogGroup ALSO TAKES A LOT OF MEMORY, SET IT TO FALSE
    • PREFERABLY USE logsByLogSubgroup AND ONLY LOG THE logSubgroup YOULL NEED
    • WE HIGHLY RECOMMEND TO ONLY USE logsByLogSubgroup WHENEVER NEEDED
      AND TO ENABLE JUST THE ONES THAT YOU WILL NEED WHEN DEBUGGING
  - IF settings.createJSONFilesAsArrayOfLogs FALSE:
    • YOU CAN FORGET ABOUT ALL THE PREVIOUS WARNINGS, SAVING LOGS IS MUCH FASTER
      THEREFORE allLogs, logsByLogGroup, logsByLogSubgroup CAN BE SET TO TRUE
    • JSON FILES WILL BE CREATED FILLED WITH OBJECTS AS OPPOSED TO THE JSON FILE
      BEING CREATED AS AN ARRAY OF LOG OBJECTS
    • RIGHT NOW THERE IS AN ERROR:
      `EMFILE: too many open files, uv_cwd`
      WHICH HAPPENS IF allLogs and logsByLogGroup ARE ENABLED...
      FOR NOW JUST ENABLE logsByLogSubgroup...
  - MAKE USE OF .only() TO SEE ONLY SPECIFIC LOGS

  settings.allLogs = "true"
  is not recommended for large log operations,
  it'll take too much time
*/

module.exports.settings = {
  logsEnabled: true,
  allLogs: true,
  simplifiedLogs: false,
  createJSONFileAsArrayOfLogObjects: true, // this takes 1k years, not recommended !!!
  saveLocations: {
    allLogs: "./lib/logger/gLog/logs/log/default/",
    logsByLogGroup: "./lib/logger/gLog/logs/log/byLogGroup/",
    logsByLogSubgroup: "./lib/logger/gLog/logs/log/byLogSubgroup/",
    jsonLogs: "./lib/logger/gLog/logs/json/default/",
    jsonLogsByLogGroup: "./lib/logger/gLog/logs/json/byLogGroup/",
    jsonLogsByLogSubgroup: "./lib/logger/gLog/logs/json/byLogSubgroup/"
  },
  skip: {
    groups: [],
    subgroups: []
  }
};
