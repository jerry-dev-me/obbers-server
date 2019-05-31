const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TagSchema = require("./tag")

const PointSchema = new Schema({
  type: { type: String, default: "Point" },
  coordinates: { type: [Number], index: "2dsphere" },
})

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "userId is required"],
    },
    location: {
      lng: Number,
      lat: Number,
    },
    geometry: PointSchema,
    content: {
      type: [String],
      // validate: {
      //     validator: (contents) => contents.length > 0 && contents.length < 11,
      //     message: 'Content must have more than 0 and less than 10 contents.'
      // },
      required: [true, "content is required"],
    }, // Array of Content URL's and Required Cant be Blank
    // thumbnail: {
    //   type: String,
    //   required: [true, "thumbnail is required"]
    // },
    // firstContent: { // like the first image to show, thumbnail can also do this job...
    //   type: String,
    // },
    caption: {
      type: String,
      validate: {
        validator: caption => caption.length > 0 && caption.length < 101,
        message: "caption must have more than 0 and less than 100 characters",
      },
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "like",
      },
    ],
    tags: [TagSchema],
    commentsEnabled: {
      type: Boolean,
      default: true,
      enum: [true, false],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    createdAt: {
      type: Date,
      required: [true, "createdAt is required"],
    },
    modifiedAt: Date,
  }
  // // {
  // //   toObject: { virtuals: true },
  // //   toJSON: { virtuals: true }
  // // }
  // { toObject: { virtuals: true } },
  // { toJSON: { virtuals: true } }
)

PostSchema.virtual("totalComments").get(function() {
  if (this.comments) return this.comments.length
  else return 0
})

PostSchema.virtual("totalLikes").get(function() {
  if (this.likes && this.likes.length) return this.likes.length
  else return 0
})

PostSchema.pre("remove", function(next) {
  this.model("user").update(
    {},
    { $pull: { posts: this._id } },
    { multi: true },
    next
  )

  this.model("collection").update(
    {},
    { $pull: { posts: this._id } },
    { multi: true },
    next
  )

  this.model("user").update(
    {},
    { $pull: { archivedPosts: this._id } },
    { multi: true },
    next
  )

  this.model("user").update(
    {},
    { $pull: { postLikes: this._id } },
    { multi: true },
    next
  )

  this.model("user").update(
    {},
    { $pull: { taggedPosts: this._id } },
    { multi: true },
    next
  )
})

const Post = mongoose.model("post", PostSchema)
module.exports = Post
