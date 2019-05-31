const mongoose = require("mongoose")
const Schema = mongoose.Schema
const c = require("../config/constants")

const RequestSchema = new Schema({
  sentFromUserId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "sentFromUserId is required"],
  },
  sentToUserId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "sentToUserId is required"],
  },
  status: {
    type: String,
    default: c.PENDING,
    enum: [c.PENDING, c.ACCEPTED, c.DECLINED],
  },
  createdAt: {
    type: Date,
    required: [true, "createdAt is required"],
  },
})

RequestSchema.pre("remove", function(next) {
  this.model("user").update(
    {},
    { $pull: { requests: this._id } },
    { multi: true },
    next
  )
})

const Request = mongoose.model("request", RequestSchema)
module.exports = Request
