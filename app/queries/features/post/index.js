module.exports = {
  create: {
    new: require("./create/new"),
  },
  read: {
    byId: require("./read/byId"),
    allByUserId: require("./read/allByUserId"),
    tags: require("./read/tags"),
    likes: require("./read/likes"),
    comments: require("./read/comments"),
    nearby: require("./read/nearby"),
  },
  update: {
    caption: require("./update/caption"),
    commentsEnabled: require("./update/commentsEnabled"),
    addTag: require("./update/addTag"),
    removeTag: require("./update/removeTag"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
