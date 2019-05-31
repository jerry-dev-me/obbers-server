module.exports.HandleValidateOperationError = err => {
  console.log("\n err info stack at HandleValidateOperationError");
  console.log(err.stack);
  // console.log("\n trace at HandleValidateOperationError");
  // console.trace();
  const e = require("./");
  // if (err.customErr) throw new e[err.name](err.at, err.message);
  if (err.customErr) throw err;
  else throw new Error(err.message);
};
