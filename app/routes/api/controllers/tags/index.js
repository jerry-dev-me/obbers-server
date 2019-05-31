module.exports = {
  post: {
    new: require("./post/new"),
  },
  get: {
    byId: require("./get/byId"),
  },
  put: {
    position: require("./put/position"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
