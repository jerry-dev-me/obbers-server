module.exports.HandleVerifyUserError = err => {
  console.log("\n err info stack at HandleVerifyUserError");
  console.log(err.stack);
  // console.log("\n trace at HandleVerifyUserError");
  // console.trace();
  const e = require("./");
  // if (err.customErr) throw new e[err.name](err.at, err.message);
  if (err.customErr) throw err;
  else throw new Error(err.message);
};
