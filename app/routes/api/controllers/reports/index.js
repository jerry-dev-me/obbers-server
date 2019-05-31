module.exports = {
  post: {
    new: require("./post/new"),
  },
  get: {
    all: require("./get/all"),
    allSentFromUserId: require("./get/allSentFromUserId"),
    allSentToUserId: require("./get/allSentToUserId"),
    byId: require("./get/byId"),
    allByCategory: require("./get/allByCategory"),
  },
  put: {
    status: require("./put/status"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
