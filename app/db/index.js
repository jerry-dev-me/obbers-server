const configKeys = require("../config/keys")
const Mongoose = require("mongoose").connect(configKeys.dbURI)

Mongoose.connection.on("error", error => {
  console.log("Mongoose Error: ", error)
})

Mongoose.connection.once("open", () => {
  console.log("Mongoose DB Connection Successfull!")
})

module.exports = {
  Mongoose,
}
