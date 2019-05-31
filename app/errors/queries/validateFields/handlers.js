module.exports.HandleValidateFieldsError = err => {
  console.log("\n err info stack at HandleValidateFieldsError");
  console.log(err.stack);
  // console.log("\n trace at HandleValidateFieldsError");
  // console.trace();
  const e = require("./");
  if (err.customErr) throw new e[err.name](err.at, err.message);
  else throw new Error(err.message);
};
