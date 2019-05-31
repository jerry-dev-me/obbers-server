module.exports = {
  basicProfile: require("./profiles/basicProfile"),
  fullProfile: require("./profiles/fullProfile"),
  personalProfile: require("./profiles/personalProfile"),

  profileFields: require("./verifications/getProfileFields"),
  canUserRead: require("./verifications/canUserRead"),
  canUserReadUser: require("./verifications/canUserReadUser"),
  canUserWrite: require("./verifications/canUserWrite"),
  isAccountActive: require("./verifications/isAccountActive"),
  isAccountPrivate: require("./verifications/isAccountPrivate"),
  isReaderFollowing: require("./verifications/isReaderFollowing"),
  isSameUser: require("./verifications/isSameUser"),
  isUserAdmin: require("./verifications/isUserAdmin"),
  isUserBlocked: require("./verifications/isUserBlocked"),
  shouldWeFindUser: require("./verifications/shouldWeFindUser"),
}
