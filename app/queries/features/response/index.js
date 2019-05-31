module.exports = {
  create: {
    new: require("./create/new"),
  },
  read: {
    allByCommentId: require("./read/allByCommentId"),
    likes: require("./read/likes"),
  },
  update: {
    content: require("./update/content"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
