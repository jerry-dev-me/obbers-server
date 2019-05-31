const mongoose = require("mongoose")
const Schema = mongoose.Schema

const LikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "userId is required"],
  },
  refModel: {
    type: String, // Can be 'Post', 'Comment' or 'Response'.
    enum: ["post", "comment", "response"],
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

LikeSchema.pre("remove", function(next) {
  this.model("user").update(
    {},
    { $pull: { postLikes: this._id } },
    { multi: true },
    next
  )
  this.model("post").update(
    {},
    { $pull: { likes: this._id } },
    { multi: true },
    next
  )
  this.model("comment").update(
    {},
    { $pull: { likes: this._id } },
    { multi: true },
    next
  )
  this.model("response").update(
    {},
    { $pull: { likes: this._id } },
    { multi: true },
    next
  )
})

const Like = mongoose.model("like", LikeSchema)
module.exports = Like
