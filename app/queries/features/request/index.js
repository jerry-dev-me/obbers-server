module.exports = {
  create: {
    new: require("./create/new"),
  },
  read: {
    byId: require("./read/byId"),
    allSentToUserId: require("./read/allSentToUserId"),
  },
  update: {
    status: require("./update/status"),
  },
  delete: {},
}
