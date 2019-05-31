const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-nodejs")

const TempUserSchema = new Schema({
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String,
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  createdAt: Date,
})

const TempUser = mongoose.model("tempUser", TempUserSchema)
module.exports = TempUser
