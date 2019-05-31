const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CollectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "userId is required"],
  },
  name: {
    type: String,
    validate: {
      validator: name => name.length > 0,
      name: "name must have at least 1 character",
    },
    required: [true, "name is required"],
  },
  thumbnail: {
    type: Schema.Types.ObjectId,
    ref: "post",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  createdAt: {
    type: Date,
    required: [true, "createdAt is required"],
  },
  modifiedAt: Date,
})

CollectionSchema.pre("remove", function(next) {
  this.model("user").update(
    {},
    { $pull: { collections: this._id } },
    { multi: true },
    next
  )
})

const Collection = mongoose.model("collection", CollectionSchema)
module.exports = Collection
