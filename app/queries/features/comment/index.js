module.exports = {
  create: {
    new: require("./create/new"),
  },
  read: {
    allByPostId: require("./read/allByPostId"),
    likes: require("./read/likes"),
  },
  update: {
    content: require("./update/content"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
