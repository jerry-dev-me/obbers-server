const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "userId is required"],
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: [true, "postId is required"],
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
  responses: [
    {
      type: Schema.Types.ObjectId,
      ref: "response",
    },
  ],
  createdAt: {
    type: Date,
    required: [true, "createdAt is required"],
  },
  modifiedAt: Date,
})

CommentSchema.pre("remove", function(next) {
  this.model("post").update(
    {},
    { $pull: { comments: this._id } },
    { multi: true },
    next
  )
})

CommentSchema.virtual("totalResponses").get(function() {
  if (this.responses && this.responses.length) return this.responses.length
  else return 0
})
CommentSchema.virtual("totalLikes").get(function() {
  if (this.likes && this.likes.length) return this.likes.length
  else return 0
})

const Comment = mongoose.model("comment", CommentSchema)
module.exports = Comment
