const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const configKeys = require("../config/keys")
const db = require("../db")

if (process.env.NODE_ENV === "production") {
  module.exports = session({
    secret: configKeys.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db.Mongoose.connection,
    }),
  })
} else {
  module.exports = session({
    secret: configKeys.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
}
