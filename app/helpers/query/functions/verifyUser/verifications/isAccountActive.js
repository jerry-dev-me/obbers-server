const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-IS-ACCOUNT-ACTIVE" // logSubgroup

module.exports = async accountStatusOrIdToRead => {
  logger.log(lG, lS, null, { accountStatusOrIdToRead })

  if (accountStatusOrIdToRead === "ACTIVE") return true
  else return false

  // this can receive an id to read and it will find that user
  // or just receive the account.status object and check if value is string "ACTIVE"

  // let val = accountStatusOrIdToRead;
  // if(typeof val === 'string' || val instanceof String || val.constructor === String) {
  //     if(val === 'ACTIVE') return true;
  //         else return false;
  // } else {
  //     let idToRead = accountStatusOrIdToRead;
  //     const foundUser = await User.findOne({ _id: idToRead }, { account: 1 });
  //     if(foundUser.account.status === 'ACTIVE') return true;
  //         else return false;
  // };
}
