module.exports = {
  post: {
    new: require("./post/new"),
  },
  get: {
    allByPostId: require("./get/allByPostId"),
    likes: require("./get/likes"),
  },
  put: {
    content: require("./put/content"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
