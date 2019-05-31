const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-nodejs")
const c = require("../config/constants")

const UserSchema = new Schema({
  local: {
    email: {
      // email: { type: String, validate: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, required: true, unique: true },
      type: String,
      validate: {
        validator: email => email.length > 2,
        message: "Email must be longer than 2 characters.",
      },
      // required: [true, 'Email is required.']
    },
    password: {
      type: String,
      validate: {
        validator: password => password.length > 7,
        password: "Password must have at least 8 characters.",
        // Password cant be equal than email string
        // Password should contain number, upper and lower case letters
        // Cant contain dashes or points
      },
      // required: [true, 'Password is required.']
    },
  },

  facebook: {
    id: String,
    token: String,
    email: String,
    fullName: String,
    // username: String,
    profilePic: String,
  },
  twitter: {
    id: String,
    token: String,
    // email: String,
    fullName: String,
    username: String,
    profilePic: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    fullName: String,
    // username: String,
    profilePic: String,
  },
  info: {
    avatar: String,
    username: {
      type: String,
      validate: {
        validator: username => username.length > 3,
        message: "Username must be longer than 3 characters.",
      },
      // required: [true, 'Username is required.']
    },
    name: {
      type: String,
      validate: {
        validator: name => name.length > 1,
        message: "Name must be longer than 1 characters.",
      },
      // required: [true, 'Name is required.']
    },
    lastName: {
      type: String,
      validate: {
        validator: lastName => lastName.length > 1,
        message: "Last Name must be longer than 1 characters.",
      },
      // required: [true, 'Last Name is required.']
    },
    phone: String,
    website: String,
    bio: String,
    sex: {
      type: String,
      default: "Not Specified",
      enum: ["Not Specified", "Male", "Female", "Other"],
    },
  },

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
      // index: true,
      // unique: true
    },
  ],
  postLikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  taggedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  archivedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  collections: [
    {
      type: Schema.Types.ObjectId,
      ref: "collection",
    },
  ],

  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "request",
    },
  ],
  blockedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "action",
    },
  ],
  account: {
    createdAt: Date,
    status: {
      type: String,
      default: c.ACTIVE,
      enum: [c.ACTIVE, c.INACTIVE, c.SUSPENDED, c.BANNED],
    },
    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: "report",
      },
    ],
    permissions: {
      type: String,
      default: c.READ_WRITE,
      enum: [c.READ_WRITE, c.READ_ONLY, c.ADMIN, c.NONE],
    },
  },
  settings: {
    private: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    language: {
      type: String,
      default: c.ENGLISH,
      enum: [c.ENGLISH, c.SPANISH],
    },
    notifications: {
      type: Boolean,
      default: true,
      enum: [true, false],
    },
  },
})

UserSchema.pre("remove", function(next) {
  this.model("post").update(
    {},
    { $pull: { tags: { userId: this._id } } },
    { multi: true },
    next
  )
})

UserSchema.virtual("totalPosts").get(function() {
  if (this.totalPosts && this.totalPosts.length) return this.totalPosts.length
  else return 0
})
UserSchema.virtual("totalLikedPosts").get(function() {
  if (this.postLikes && this.postLikes.length) return this.postLikes.length
  else return 0
})
UserSchema.virtual("totalTaggedPosts").get(function() {
  if (this.taggedPosts && this.taggedPosts.length)
    return this.taggedPosts.length
  else return 0
})
UserSchema.virtual("totalArchivedPosts").get(function() {
  if (this.archivedPosts && this.archivedPosts.length)
    return this.archivedPosts.length
  else return 0
})
UserSchema.virtual("totalCollections").get(function() {
  if (this.collections && this.collections.length)
    return this.collections.length
  else return 0
})
UserSchema.virtual("totalFollowing").get(function() {
  if (this.following && this.following.length) return this.following.length
  else return 0
})
UserSchema.virtual("totalFollowers").get(function() {
  if (this.followers && this.followers.length) return this.followers.length
  else return 0
})
UserSchema.virtual("totalRequests").get(function() {
  if (this.requests && this.requests.length) return this.requests.length
  else return 0
})
UserSchema.virtual("totalBlockedUsers").get(function() {
  if (this.blockedUsers && this.blockedUsers.length)
    return this.blockedUsers.length
  else return 0
})

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

const User = mongoose.model("user", UserSchema)
module.exports = User
