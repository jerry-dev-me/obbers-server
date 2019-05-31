const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TagSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: [true, "postId is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user", // REQUIRED
    required: [true, "userId is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  // position: {
  //   // REQUIRED
  //   x: Number,
  //   y: Number
  // },
  position: {
    x: {
      type: Number,
      required: [true, "position x is required"],
    },
    y: {
      type: Number,
      required: [true, "position y is required"],
    },
  },
  // position: {
  //     type: [ String ],
  //     validate: {
  //         validator: (contents) => contents.length > 0 && contents.length < 11,
  //         message: 'Content must have more than 0 and less than 10 contents.'
  //     },
  //     required: [true, 'Content is required.']
  // },
  createdAt: {
    type: String,
    required: [true, "createdAt is required"],
  },
})

// TagSchema.pre('remove', function(next) {
//   this.model('user').update(
//     { },
//     { $pull: { taggedPosts: this._id } },
//     { multi: true },
//     next
//   );
// });

// TagSchema.pre('remove', function(next) {
//   this.model('post').update(
//     { },
//     { $pull: { tags: this._id } },
//     { multi: true },
//     next
//   );
//
//   this.model('user').update(
//     { },
//     { $pull: { taggedPosts: this._id } },
//     { multi: true },
//     next
//   );
// });

// const Tag = mongoose.model('tag', TagSchema);
// module.exports = Tag;

module.exports = TagSchema
