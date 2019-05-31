module.exports = {
  post: {
    new: require("./post/new"),
  },
  get: {
    allByUserId: require("./get/allByUserId"),
    byId: require("./get/byId"),
  },
  put: {
    addPost: require("./put/addPost"),
    name: require("./put/name"),
    removePostFromAll: require("./put/removePostFromAll"),
    removePostFromOne: require("./put/removePostFromOne"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
