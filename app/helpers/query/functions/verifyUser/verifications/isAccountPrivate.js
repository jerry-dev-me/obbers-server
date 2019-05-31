const logger = require("../../../../../../lib/logger")
const lG = "HELPERS-QUERIES" // logGroup
const lS = "VERIFY-USER-IS-ACCOUNT-PRIVATE" // logSubgroup

module.exports = async privateSettingsOrIdToRead => {
  logger.log(lG, lS, null, { privateSettingsOrIdToRead })

  if (privateSettingsOrIdToRead === true) return true
  else return false

  // this can receive a user id string to read and find that user record
  // or just receive the object and operate with that object

  // if(typeof privateSettingsOrIdToRead === 'bool') {
  //     if(privateSettingsOrIdToRead === true) return true;
  //         else return false;
  // } else {
  //     let idToRead = privateSettingsOrIdToRead;
  //     const foundUser = await User.findOne({ _id: idToRead }, { settings: 1 });
  //     return settings.private;
  // };
}
