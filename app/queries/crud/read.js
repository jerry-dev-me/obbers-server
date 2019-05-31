const mongoose = require("mongoose")

// const Activity = require("../../models/activity");
// const Collection = require("../../models/collection");
// const Comment = require("../../models/comment");
// const Like = require("../../models/like");
// const Post = require("../../models/post");
// const Report = require("../../models/report");
// const Request = require("../../models/request");
// const Response = require("../../models/response");
// const Tag = require("../../models/tag");
// const User = require("../../models/user");

const Activity = mongoose.model("activity")
const Collection = mongoose.model("collection")
const Comment = mongoose.model("comment")
const Like = mongoose.model("like")
const Post = mongoose.model("post")
const Report = mongoose.model("report")
const Request = mongoose.model("request")
const Response = mongoose.model("response")
const User = mongoose.model("user")

let Model

const find = async (by, fields) => {
  if (fields === null || fields === undefined) fields = {}
  return await Model.find(by, fields)
}

const findAndPopulate = async (by, fields1, populate, fields2) => {
  if (fields1 === null || fields1 === undefined) fields1 = {}
  if (fields2 === null || fields2 === undefined) fields2 = {}
  return await Model.find(by, fields1).populate(populate, fields2)
}

const findLeanAndPopulate = async (by, fields1, populate, fields2) => {
  if (fields1 === null || fields1 === undefined) fields1 = {}
  if (fields2 === null || fields2 === undefined) fields2 = {}
  return await Model.find(by, fields1)
    .lean()
    .populate(populate, fields2)
}

const findOne = async (by, fields) => {
  if (fields === null || fields === undefined) fields = {}
  return await Model.findOne(by, fields)
}

const findOneAndPopulate = async (by, fields1, populate, fields2) => {
  if (fields1 === null || fields1 === undefined) fields1 = {}
  if (fields2 === null || fields2 === undefined) fields2 = {}
  return await Model.findOne(by, fields1).populate(populate, fields2)
}

const findOneLeanAndPopulate = async (by, fields1, populate, fields2) => {
  if (fields1 === null || fields1 === undefined) fields1 = {}
  if (fields2 === null || fields2 === undefined) fields2 = {}
  return await Model.findOne(by, fields1)
    .lean()
    .populate(populate, fields2)
}

const findById = async (id, fields) => {
  if (fields === null || fields === undefined) fields = {}
  return await Model.findById(id, fields)
}

const findByIdAndPopulate = async (id, fields1, populate, fields2) => {
  if (fields1 === null || fields1 === undefined) fields1 = {}
  if (fields2 === null || fields2 === undefined) fields2 = {}
  return await Model.findById(id, fields1).populate(populate, fields2)
}

const findByIdLeanAndPopulate = async (id, fields1, populate, fields2) => {
  if (fields1 === null || fields1 === undefined) fields1 = {}
  if (fields2 === null || fields2 === undefined) fields2 = {}
  return await Model.findById(id, fields1)
    .lean()
    .populate(populate, fields2)
}

module.exports = {
  activity: {
    find: async (by, fields) => {
      Model = Activity
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Activity
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Activity
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = Activity
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Activity
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Activity
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = Activity
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Activity
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Activity
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
  collection: {
    find: async (by, fields) => {
      Model = Collection
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Collection
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Collection
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = Collection
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Collection
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Collection
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = Collection
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Collection
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Collection
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
  comment: {
    find: async (by, fields) => {
      Model = Comment
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Comment
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Comment
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = Comment
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Comment
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Comment
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = Comment
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Comment
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Comment
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
  like: {
    find: async (by, fields) => {
      Model = Like
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Like
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Like
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = Like
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Like
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Like
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = Like
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Like
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Like
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
  post: {
    find: async (by, fields) => {
      Model = Post
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Post
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Post
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = Post
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Post
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Post
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = Post
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Post
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Post
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
  report: {
    find: async (by, fields) => {
      Model = Report
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Report
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Report
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = Report
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Report
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Report
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = Report
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Report
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Report
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
  request: {
    find: async (by, fields) => {
      Model = Request
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Request
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Request
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = Request
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Request
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Request
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = Request
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Request
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Request
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
  response: {
    find: async (by, fields) => {
      Model = Response
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Response
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Response
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = Response
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Response
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Response
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = Response
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Response
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Response
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
  tag: {
    find: async (by, fields) => {
      Model = Tag
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Tag
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Tag
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = Tag
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Tag
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = Tag
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = Tag
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Tag
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = Tag
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
  user: {
    find: async (by, fields) => {
      Model = User
      return await find(by, fields)
    },
    findAndPopulate: async (by, fields1, populate, fields2) => {
      Model = User
      return await findAndPopulate(by, fields1, populate, fields2)
    },
    findLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = User
      return await findLeanAndPopulate(by, fields1, populate, fields2)
    },
    findOne: async (by, fields) => {
      Model = User
      return await findOne(by, fields)
    },
    findOneAndPopulate: async (by, fields1, populate, fields2) => {
      Model = User
      return await findOneAndPopulate(by, fields1, populate, fields2)
    },
    findOneLeanAndPopulate: async (by, fields1, populate, fields2) => {
      Model = User
      return await findOneLeanAndPopulate(by, fields1, populate, fields2)
    },
    findById: async (id, fields) => {
      Model = User
      return await findById(id, fields)
    },
    findByIdAndPopulate: async (id, fields1, populate, fields2) => {
      Model = User
      return await findByIdAndPopulate(id, fields1, populate, fields2)
    },
    findByIdLeanAndPopulate: async (id, fields1, populate, fields2) => {
      Model = User
      return await findByIdLeanAndPopulate(id, fields1, populate, fields2)
    },
  },
}
