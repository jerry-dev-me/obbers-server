module.exports = {
  create: {
    new: require("./create/new"),
  },
  read: {
    byId: require("./read/byId"),
  },
  update: {
    position: require("./update/position"),
  },
  delete: {
    byId: require("./delete/byId"),
  },
}
