const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ResponseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "userId is required"],
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "comment",
    required: [true, "commentId is required"],
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  createdAt: {
    type: Date,
    required: [true, "createdAt is required"],
  },
  modifiedAt: Date,
})

ResponseSchema.pre("remove", function(next) {
  this.model("comment").update(
    {},
    { $pull: { responses: this._id } },
    { multi: true },
    next
  )
})

ResponseSchema.virtual("totalLikes").get(function() {
  if (this.likes && this.likes.length) return this.likes.length
  else return 0
})

const Response = mongoose.model("response", ResponseSchema)
module.exports = Response
