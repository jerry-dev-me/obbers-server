const mongoose = require("mongoose")
const Schema = mongoose.Schema
const c = require("../config/constants")

const ReportSchema = new Schema({
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
  category: {
    type: String,
    default: c.OTHER,
    enum: [
      c.EXPLICIT_CONTENT,
      c.AGGRESSIVE_BEHAVIOUR,
      c.SPAM_BEHAVIOUR,
      c.OTHER,
    ],
    required: [true, "category is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  status: {
    type: String,
    default: c.UNREAD,
    enum: [c.UNREAD, c.PROCESSING, c.CLOSED],
  },
  createdAt: {
    type: Date,
    required: [true, "createdAt is required"],
  },
})

ReportSchema.pre("remove", function(next) {
  this.model("user").update(
    {},
    { $pull: { "account.reports": this._id } },
    { multi: true },
    next
  )
})

const Report = mongoose.model("report", ReportSchema)
module.exports = Report
