const winston = require("winston");
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const gLogSettings = require("../../config").settings;

module.exports.logFile = winston.createLogger({
  format: combine(
    // label({ label: 'some label!' }),
    // timestamp(),
    prettyPrint()
  ),
  transports: [
    new (winston.transports.File)({
      json: true,
      level: "info",
      filename: `${gLogSettings.saveLocations.allLogs}only.log`,
      handleExceptions: true,
      prettyPrint: true,
      options: { flags: 'w' },
    })
  ],
  exitOnError: false
});

// module.exports.JSONFile = winston.createLogger({
//   format: combine(
//     winston.format.json(),
//   ),
//   transports: [
//     new winston.transports.File({
//      json: true,
//      stringify: (obj) => JSON.stringify(obj),
//      filename: `${gLogSettings.saveLocations.allLogs}only.json`,
//     })
//   ],
//   exitOnError: false
// });
