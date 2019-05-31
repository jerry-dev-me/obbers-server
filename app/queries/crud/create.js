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

const createDoc = async fields => {
  const newModel = new Model(fields)
  const newDoc = await newModel.save()
  return newDoc
}

module.exports = {
  activity: {
    new: async fields => {
      Model = Activity
      return await createDoc(fields)
    },
  },
  collection: {
    new: async fields => {
      Model = Collection
      return await createDoc(fields)
    },
  },
  comment: {
    new: async fields => {
      Model = Comment
      return await createDoc(fields)
    },
  },
  like: {
    new: async fields => {
      Model = Like
      return await createDoc(fields)
    },
  },
  post: {
    new: async fields => {
      Model = Post
      return await createDoc(fields)
    },
  },
  report: {
    new: async fields => {
      Model = Report
      return await createDoc(fields)
    },
  },
  request: {
    new: async fields => {
      Model = Request
      return await createDoc(fields)
    },
  },
  response: {
    new: async fields => {
      Model = Response
      return await createDoc(fields)
    },
  },
  // tag: {
  //   new: async fields => {
  //     Model = require("../../models/tag");
  //     return await createDoc(fields);
  //   }
  // },
  user: {
    new: async fields => {
      Model = User
      return await createDoc(fields)
    },
  },
}
