// Authentication Logic
require("./auth")()

module.exports = {
  database: require("./db"),
  session: require("./session"),
  routes: {
    apiRoutes: require("./routes").apiRoutes.router,
    authRoutes: require("./routes").authRoutes.router,
    homeRoutes: require("./routes").homeRoutes.router,
  },
}
