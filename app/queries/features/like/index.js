module.exports = {
  create: {
    postLike: require("./create/postLike"),
    commentLike: require("./create/commentLike"),
    responseLike: require("./create/responseLike"),
  },
  read: {
    byId: require("./read/byId"),
  },
  update: {},
  delete: {
    byId: require("./delete/byId"),
  },
}
