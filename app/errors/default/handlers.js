module.exports.HandleDefaultError = err => {
  const e = require("./");
  if (err.customErr) throw new e[err.name](err.at, err.message);
  else throw new Error(err.message);
};
