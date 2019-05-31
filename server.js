process.on("uncaughtException", function(exception) {
  console.log(exception)
})

const express = require("express")
const app = express()

const myApp = require("./app")

const passport = require("passport")
const flash = require("connect-flash")

const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const session = require("express-session")

const configKeys = require("./app/config").keys

// DATABASE CONNECTION

myApp.database

// COOKIES

// const cookieSession = require('cookie-session');
// app.use(express.cookieSession({ secret: 'tobo!', maxAge: 360*5 }));

// LOGGER

app.use(morgan("dev"))
// app.use(cookieParser());
app.use(bodyParser())

// VIEWS TEMPLATE ENGINE

app.set("view engine", "ejs")

// SESSION

app.use(myApp.session)

// PASSPORT INIT

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// ROUTERS ROUTES

app.use("/api", myApp.routes.apiRoutes) // change "/api" to "/v1"
app.use("/auth", myApp.routes.authRoutes)
app.use("/", myApp.routes.homeRoutes)

// PORT

module.exports = app.listen(configKeys.port)
console.log("Listening on port " + configKeys.port)
