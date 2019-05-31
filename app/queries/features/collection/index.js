module.exports = {
  create: {
    new: require("./create/new"),
  },
  read: {
    byId: require("./read/byId"),
    allByUserId: require("./read/allByUserId"),
  },
  update: {
    addPost: require("./update/addPost"),
    name: require("./update/name"),
    removePostFromAll: require("./update/removePostFromAll"),
    removePostFromOne: require("./update/removePostFromOne"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
