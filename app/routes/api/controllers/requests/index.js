module.exports = {
  post: {
    new: require("./post/new"),
  },
  get: {
    byId: require("./get/byId"),
    allSentToUserId: require("./get/allSentToUserId"),
  },
  put: {
    status: require("./put/status"),
  },
  delete: {},
}
