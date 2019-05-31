module.exports = {
  create: {
    new: require("./create/new"),
  },
  read: {
    byId: require("./read/byId"),
    all: require("./read/all"),
    allSentFromUserId: require("./read/allSentFromUserId"),
    allSentToUserId: require("./read/allSentToUserId"),
    allByCategory: require("./read/allByCategory"),
  },
  update: {
    status: require("./update/status"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
