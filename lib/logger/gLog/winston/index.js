module.exports = {
  defaultLogger: require("./loggers/defaultLogger"),
  logsByLogGroup: require("./loggers/groupsLogger").logsByLogGroup,
  logsByLogSubgroup: require("./loggers/groupsLogger").logsByLogSubgroup,
  errorsLogger: require("./loggers/errorsLogger"),
  onlyLogger: require("./loggers/onlyLogger"),
  undefinedLogger: require("./loggers/undefinedLogger"),
};
