module.exports = {
  create: {
    new: require("./create/new"),
  },
  read: {
    allByUserId: require("./read/allByUserId"),
    allFromUsersFollowing: require("./read/allFromUsersFollowing"),
    byId: require("./read/byId"),
  },
  update: {},
  delete: {},
}
