module.exports.HandleVerifyDocError = err => {
  console.log("\n err info stack at HandleVerifyDocError");
  console.log(err.stack);
  // console.log("\n trace at HandleVerifyDocError");
  // console.trace();
  const e = require("./");
  // if (err.customErr) throw new e[err.name](err.at, err.message);
  if (err.customErr) throw err;
  else throw new Error(err.message);
};
