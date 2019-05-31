const winston = require("winston");
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logsByLogGroup = (filePathNameExt, logObject) => {
  const logger = winston.createLogger({
    format: combine(
      // label({ label: 'some label!' }),
      // timestamp(),
      prettyPrint()
    ),
    // format: winston.format.json(),
    transports: [
      new (winston.transports.File)({
        json: true,
        level: "info",
        filename: filePathNameExt,
        handleExceptions: true,
        // prettyPrint: true,
        options: { flags: 'a' },
      })
    ],
    exitOnError: false
  });
  logger.log("info", logObject);
};

const logsByLogSubgroup = (filePathNameExt, logObject) => {
  const logger = winston.createLogger({
    format: combine(
      // label({ label: 'some label!' }),
      // timestamp(),
      prettyPrint()
    ),
    transports: [
      new (winston.transports.File)({
        json: true,
        level: "info",
        filename: filePathNameExt,
        handleExceptions: true,
        // prettyPrint: true,
        options: { flags: 'a' },
      })
    ],
    exitOnError: false
  });
  logger.log("info", logObject);
};

module.exports = {
  logsByLogGroup,
  logsByLogSubgroup
};
