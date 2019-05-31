module.exports = {
  post: {
    commentLike: require("./post/commentLike"),
    postLike: require("./post/postLike"),
    responseLike: require("./post/responseLike"),
  },
  get: {
    byId: require("./get/byId"),
  },
  put: {},
  delete: {
    byId: require("./delete/byId"),
  },
}
