const store = require("store");
const fs = require("fs");

const config = require("../../config");
const logSettings = config.settings;
const logGroups = config.logGroups;

const clearPreviousLogs = (async function() {
  const wereFilesRemoved = store.get("wereFilesRemoved");
  if (wereFilesRemoved === undefined || wereFilesRemoved !== true) {
    store.set("wereFilesRemoved", true);
    const fs = require("fs");
    const path = require("path");
    let directories = [];
    const saveLocationsObj = config.settings.saveLocations;
    Object.keys(saveLocationsObj).map(key => {
      directories.push(saveLocationsObj[key]);
    });
    await Promise.all(
      directories.map(async directory => {
        await fs.readdir(directory, async (err, files) => {
          if (err) throw err;
          if (files.length > 0) {
            for (const file of files) {
              await fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
              });
            }
          }
        });
      })
    );
  }
})();

const getLogsArray = (logObject, storeKey) => {
  let newArray = [];
  let localMemoryArray = store.get(storeKey);
  if (!(localMemoryArray === null || localMemoryArray === undefined)) {
    if (localMemoryArray.length > -1) {
      newArray = localMemoryArray;
    }
  }
  newArray.push(logObject);
  store.set(storeKey, newArray);
  newArray = store.get(storeKey);
  return newArray;
};

const createJSONFileAsArrayOfLogObjects = (filePathNameAndExt, logsArray) => {
  const callbackFunction = (filePathNameAndExt, cb) => {
    const logger = fs.createWriteStream(filePathNameAndExt, {
      flags: "w"
    });
    let error;
    if (!logger) {
      error = "fs.createWriteStream error!";
    } else {
      error = null;
    }
    cb(error, logger);
  };

  const newPromise = new Promise((resolve, reject) => {
    return callbackFunction(filePathNameAndExt, (error, logger) => {
      if (error) reject(error);
      resolve(logger);
    });
  });

  return newPromise
    .then(file => {
      file.write(JSON.stringify(logsArray, null, 2));
    })
    .catch(error => console.log(error));
};

const createJSONFileFilledWithLogObjects = (filePathNameAndExt, logObject) => {
  const callbackFunction = (filePathNameAndExt, cb) => {
    const logger = fs.createWriteStream(filePathNameAndExt, {
      flags: "a"
    });
    let error;
    if (!logger) {
      error = "fs.createWriteStream error!";
    } else {
      error = null;
    }
    cb(error, logger);
  };

  const newPromise = new Promise((resolve, reject) => {
    return callbackFunction(filePathNameAndExt, (error, logger) => {
      if (error) reject(error);
      resolve(logger);
    });
  });

  return newPromise
    .then(file => {
      file.write(JSON.stringify(logObject, null, 2));
    })
    .catch(error => console.log(error));
};

module.exports.logs = async (logObject, logGroup, logSubgroup) => {
  removeFiles(logObject);

  if (logSettings.allLogs) {
    let path = logSettings.saveLocations.jsonLogs;
    let name = "logs";
    let filePathNameAndExt = `${path}${name}.json`;
    if (logSettings.createJSONFileAsArrayOfLogObjects === true) {
      let logsArray = getLogsArray(logObject, "jsonLogs");
      await createJSONFileAsArrayOfLogObjects(filePathNameAndExt, logsArray);
    } else {
      await createJSONFileFilledWithLogObjects(filePathNameAndExt, logObject);
    }
  }

  const createLogsByLogGroup = (async function() {
    let path = logSettings.saveLocations.jsonLogsByLogGroup;
    let name = logGroup;
    let filePathNameAndExt = `${path}${name}.json`;
    if (logSettings.createJSONFileAsArrayOfLogObjects === true) {
      let logsArray = getLogsArray(logObject, name);
      await createJSONFileAsArrayOfLogObjects(filePathNameAndExt, logsArray);
    } else {
      await createJSONFileFilledWithLogObjects(filePathNameAndExt, logObject);
    }
  })();

  const createLogsByLogSubgroup = (async function() {
    let path = logSettings.saveLocations.jsonLogsByLogSubgroup;
    let name = `${logGroup}-${logSubgroup}`;
    let filePathNameAndExt = `${path}${name}.json`;
    if (logSettings.createJSONFileAsArrayOfLogObjects === true) {
      let logsArray = getLogsArray(logObject, name);
      await createJSONFileAsArrayOfLogObjects(filePathNameAndExt, logsArray);
    } else {
      await createJSONFileFilledWithLogObjects(filePathNameAndExt, logObject);
    }
  })();

  if (logObject && logObject.value && logObject.value.isError) {
    let path = logSettings.saveLocations.jsonLogs;
    let name = "errors";
    let filePathNameAndExt = `${path}${name}.json`;
    if (logSettings.createJSONFileAsArrayOfLogObjects === true) {
      let logsArray = getLogsArray(logObject, name);
      await createJSONFileAsArrayOfLogObjects(filePathNameAndExt, logsArray);
    } else {
      await createJSONFileFilledWithLogObjects(filePathNameAndExt, logObject);
    }
  }

  // if "ValidationError"
  // if "ReferenceError"
  // if "SyntaxError"
  // if "TypeError"
  // if "InternalError"
  // if "EvalError"
  // if "RangeError"
  // if "URIError"

  if (logObject.value === undefined || logObject.value === "undefined") {
    let path = logSettings.saveLocations.jsonLogs;
    let name = "undefined";
    let filePathNameAndExt = `${path}${name}.json`;
    if (logSettings.createJSONFileAsArrayOfLogObjects === true) {
      let logsArray = getLogsArray(logObject, name);
      await createJSONFileAsArrayOfLogObjects(filePathNameAndExt, logsArray);
    } else {
      await createJSONFileFilledWithLogObjects(filePathNameAndExt, logObject);
    }
  }

  if (logObject.value === null || logObject.value === "null") {
    let path = logSettings.saveLocations.jsonLogs;
    let name = "null";
    let filePathNameAndExt = `${path}${name}.json`;
    if (logSettings.createJSONFileAsArrayOfLogObjects === true) {
      let logsArray = getLogsArray(logObject, name);
      await createJSONFileAsArrayOfLogObjects(filePathNameAndExt, logsArray);
    } else {
      await createJSONFileFilledWithLogObjects(filePathNameAndExt, logObject);
    }
  }
};

module.exports.logsOnly = async (logObject, logGroup, logSubgroup) => {
  removeFiles(logObject);

  let path = logSettings.saveLocations.jsonLogs;
  let name = "only";
  let filePathNameAndExt = `${path}${name}.json`;
  if (logSettings.createJSONFileAsArrayOfLogObjects === true) {
    let logsArray = getLogsArray(logObject, name);
    await createJSONFileAsArrayOfLogObjects(filePathNameAndExt, logsArray);
  } else {
    await createJSONFileFilledWithLogObjects(filePathNameAndExt, logObject);
  }
};

const removeFiles = async logObject => {
  const wereFilesRemoved = store.get("wereFilesRemoved");
  if (wereFilesRemoved === undefined || wereFilesRemoved !== true) {
    let jsonLogFilesArray = [];

    let logsFile = {
      filename: "logs",
      data: [],
      path: logSettings.saveLocations.jsonLogs
    };
    jsonLogFilesArray.push(logsFile);

    let onlyFile = {
      filename: "only",
      data: [],
      path: logSettings.saveLocations.jsonLogs
    };
    jsonLogFilesArray.push(onlyFile);

    let errorsFile = {
      filename: "errors",
      data: [],
      path: logSettings.saveLocations.jsonLogs
    };
    jsonLogFilesArray.push(errorsFile);

    let undefinedFile = {
      filename: "undefined",
      data: [],
      path: logSettings.saveLocations.jsonLogs
    };
    jsonLogFilesArray.push(undefinedFile);

    Object.keys(logGroups).forEach(function(groupKey) {
      let logGroupKey = logGroups[groupKey];
      let groupName = `${groupKey.toString()}`;

      let groupFile = {
        filename: groupName,
        data: [],
        path: logSettings.saveLocations.jsonLogsByLogGroup
      };
      jsonLogFilesArray.push(groupFile);

      if (logGroups[groupKey] && logGroups[groupKey].subgroups) {
        let logSubgroups = logGroups[groupKey].subgroups;
        Object.keys(logSubgroups).forEach(function(subgroupKey) {
          let subgroupName = `${groupName.toString()}-${subgroupKey.toString()}`;
          let subgroupFile = {
            filename: subgroupName,
            data: [],
            path: logSettings.saveLocations.jsonLogsByLogSubgroup
          };
          jsonLogFilesArray.push(subgroupFile);
        });
      }
    });

    await Promise.all(
      jsonLogFilesArray.map(async jsonLogFileData => {
        let filePathNameAndExt = `${jsonLogFileData.path}${
          jsonLogFileData.filename
        }.json`;
        // await createJSONFile(filePathNameAndExt, data);

        const callbackFunction = (filePathNameAndExt, cb) => {
          const logger = fs.createWriteStream(filePathNameAndExt, {
            flags: "w"
          });
          let error;
          if (!logger) {
            error = "fs.createWriteStream error!";
          } else {
            error = null;
          }
          cb(error, logger);
        };

        const newPromise = new Promise((resolve, reject) => {
          let filePathNameAndExt = `${jsonLogFileData.path}${
            jsonLogFileData.filename
          }.json`;
          return callbackFunction(filePathNameAndExt, (error, logger) => {
            if (error) reject(error);
            resolve(logger);
          });
        });

        return newPromise
          .then(file => {
            // console.log("\n file");
            // console.log(file);
            // file.write(JSON.stringify("new_content", null, 4));
          })
          .catch(error => console.log(error));
      })
    );

    store.set("wereFilesRemoved", true);
  }
};
