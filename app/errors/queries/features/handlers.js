module.exports.HandleFeatureError = err => {
  console.log("\n err info stack at HandleFeatureError");
  console.log(err.stack);
  // console.log("\n trace at HandleFeatureError");
  // console.trace();
  const e = require("./");

  // or throw a new cusotm error based on the received 'err'
  // if (err.customErr) return new e[err.name](err.at, err.message);

  if (err.customErr) return err;
  else return new Error(err.message);
};
