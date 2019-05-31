const mongoose = require("mongoose")
const Schema = mongoose.Schema
const c = require("../config/constants")

const ActivitySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "userId is required"],
  },
  activityType: {
    type: String,
    enum: [
      c.NEW_POST,
      c.NEW_TAG,
      c.NEW_COMMENT,
      c.NEW_RESPONSE,
      c.POST_LIKE,
      c.COMMENT_LIKE,
      c.RESPONSE_LIKE,
      c.NEW_FOLLOWING,
    ],
    required: [true, "activityType is required"],
  },
  // Check:
  // https://stackoverflow.com/questions/27644505/mongoose-schema-multi-ref-for-one-property
  refModel: {
    type: String,
    enum: ["user", "post", "comment", "response", "like", "request", "tag"],
    required: [true, "refModel is required"],
  },
  refId: {
    type: Schema.Types.ObjectId,
    ref: "refModel", // or try -> refPath: 'refModel'
    required: [true, "refId is required"],
  },
  createdAt: {
    type: Date,
    required: [true, "createdAt is required"],
  },
})

const Activity = mongoose.model("activity", ActivitySchema)
module.exports = Activity
