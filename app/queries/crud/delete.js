const Activity = require("../../models/activity")
const Collection = require("../../models/collection")
const Comment = require("../../models/comment")
const Like = require("../../models/like")
const Post = require("../../models/post")
const Report = require("../../models/report")
const Request = require("../../models/request")
const Response = require("../../models/response")
const User = require("../../models/user")

let Model

const remove = async id => {
  const foundDoc = await Model.findById({ _id: id })
  await foundDoc.remove()
}

const findByIdAndRemove = async id => {
  const removeDoc = await Model.findByIdAndRemove(id)
}

module.exports = {
  activity: {
    remove: async id => {
      Model = Activity
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = Activity
      return await findByIdAndRemove(id)
    },
  },
  collection: {
    remove: async id => {
      Model = Collection
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = Collection
      return await findByIdAndRemove(id)
    },
  },
  comment: {
    remove: async id => {
      Model = Comment
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = Comment
      return await findByIdAndRemove(id)
    },
  },
  like: {
    remove: async id => {
      Model = Like
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = Like
      return await findByIdAndRemove(id)
    },
  },
  post: {
    remove: async id => {
      Model = Post
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = Post
      return await findByIdAndRemove(id)
    },
  },
  report: {
    remove: async id => {
      Model = Report
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = Report
      return await findByIdAndRemove(id)
    },
  },
  request: {
    remove: async id => {
      Model = Request
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = Request
      return await findByIdAndRemove(id)
    },
  },
  response: {
    remove: async id => {
      Model = Response
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = Response
      return await findByIdAndRemove(id)
    },
  },
  tag: {
    remove: async id => {
      Model = Tag
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = Tag
      return await findByIdAndRemove(id)
    },
  },
  user: {
    remove: async id => {
      Model = User
      return await remove(id)
    },
    findByIdAndRemove: async id => {
      Model = User
      return await findByIdAndRemove(id)
    },
  },
}
