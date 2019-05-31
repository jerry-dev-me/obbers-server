const config = require("../../config");
const gLogSettings = require("../../config").settings;
const logGroups = require("../../config").logGroups;

const winstonLoggers = require("../../winston");

module.exports = (logGroup, logSubgroup, message, data) => {
  const getLogTitle = () => `${logGroup} - ${logSubgroup}`;

  const getMessage = () => (message ? message : null);

  const getData = () => {
    if (data === null || data === undefined) return null;
    else return Object.keys(data)[0];
  };

  const getValue = () => {
    let dataValue = data[Object.keys(data)[0]];
    if (data === null || data === undefined) return null;
    if (data && dataValue === undefined) return "undefined";
    if (dataValue instanceof Error) {
      let errorObj = {};
      errorObj["isError"] = true;
      var errorProps = Object.getOwnPropertyNames(dataValue);
      for (var property, i = 0, len = errorProps.length; i < len; ++i) {
        property = errorProps[i];
        let propertyValue = Object.getOwnPropertyDescriptor(dataValue, property).value;
        errorObj[property] = propertyValue;
      }
      return errorObj;
    }
    return dataValue;
  };

  const getDate = () => new Date();

  if (gLogSettings.simplifiedLogs === true) {
    return {
      title: getLogTitle(),
      message: getMessage(),
      data: getData(),
      value: getValue()
    };
  } else {
    return {
      logGroup,
      logSubgroup,
      title: getLogTitle(),
      message: getMessage(),
      data: getData(),
      value: getValue(),
      createdAt: getDate()
    };
  }
};
