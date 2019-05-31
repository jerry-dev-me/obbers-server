module.exports = {
  post: {
    new: require("./post/new"),
  },
  get: {
    allByCommentId: require("./get/allByCommentId"),
    likes: require("./get/likes"),
  },
  put: {
    content: require("./put/content"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
