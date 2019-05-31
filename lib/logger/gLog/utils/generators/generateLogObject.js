const config = require('../../config');
const gLogSettings = require('../../config').settings;
const logGroups = require('../../config').logGroups;

const winstonLoggers = require("../../winston");

module.exports.generateLogObject = (
  logGroup,
  logSubgroup,
  message,
  data) => {

  const getLogCode = () => {
    if (logGroup === "ONLY") {
      return logGroup;
    };
    return `${logGroup}-${logSubgroup}`;
  };

  const getLogGroup = () => {
    if (logGroup === null || logGroup === undefined) {
      return null;
    };
    return logGroup;
  };

  const getLogSubgroup = () => {
    if (logGroup === "ONLY") {
      return "N/A"
    };
    if (logSubgroup === null || logSubgroup === undefined) {
      return null;
    };
    return logSubgroup;
  };

  const getLogTitle = () => {
    if (logGroup === "ONLY") {
      return logGroups[logGroup].description;
    };
    if (logSubgroup === null || logSubgroup === undefined) {
      return logGroups[logGroup].description;
    };
    let groupDescription = logGroups[logGroup].description;
    let subgroupDescription = logGroups[logGroup].subgroups[logSubgroup].description;
    return `${groupDescription} - ${subgroupDescription}`;
  };

  if (gLogSettings.simplifiedLogs === true) {
    return {
      message: message ? message : null,
      data: (function() {
        if (data === null || data === undefined) return null;
        else return Object.keys(data)[0];
      })(),
      value: (function() {
        if (data === null || data === undefined) return null;
        else return data[Object.keys(data)[0]];
      })()
    }
  } else {
    return {
      logCode: getLogCode(),
      logGroup: getLogGroup(),
      logSubgroup: getLogSubgroup(),
      title: getLogTitle(),
      message: message ? message : null,
      data: (function() {
        if (data === null || data === undefined) return null;
        else return Object.keys(data)[0];
      })(),
      // typeof: (function() {
      //   if (data === null || data === undefined) return typeof data;
      //   else return typeof data[Object.keys(data)[0]];
      // })(),
      value: (function() {
        if (data === null || data === undefined) return null;
        else return data[Object.keys(data)[0]];
      })(),
      createdAt: new Date()
    };
  };
};
