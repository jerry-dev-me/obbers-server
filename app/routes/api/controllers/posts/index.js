module.exports = {
  post: {
    new: require("./post/new"),
  },
  get: {
    allByUserId: require("./get/allByUserId"),
    byId: require("./get/byId"),
    comments: require("./get/comments"),
    likes: require("./get/likes"),
    tags: require("./get/tags"),
  },
  put: {
    caption: require("./put/caption"),
    commentsEnabled: require("./put/commentsEnabled"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
