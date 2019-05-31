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

const findByIdAndUpdate = async (id, fieldsAndValues) => {
  const newPromise = new Promise((resolve, reject) => {
    return Model.findByIdAndUpdate(
      { _id: id },
      fieldsAndValues,
      { new: true },
      async function(error, updatedDoc) {
        if (error) reject(error)
        else resolve(updatedDoc)
      }
    )
  })
  return newPromise
    .then(updatedDoc => {
      return updatedDoc
    })
    .catch(error => {
      return error
    })
}

const findByIdAndAddToSet = async (id, fieldsAndValues) => {
  const newPromise = new Promise((resolve, reject) => {
    return Model.findByIdAndUpdate(
      { _id: id },
      { $addToSet: fieldsAndValues },
      { new: true },
      async function(error, updatedDoc) {
        if (error) reject(error)
        else resolve(updatedDoc)
      }
    )
  })
  return newPromise
    .then(updatedDoc => {
      return updatedDoc
    })
    .catch(error => {
      return error
    })
}

const findByIdAndPull = async (id, fieldsAndValues) => {
  const newPromise = new Promise((resolve, reject) => {
    return Model.findByIdAndUpdate(
      { _id: id },
      { $pull: fieldsAndValues },
      { new: true },
      async function(error, updatedDoc) {
        if (error) reject(error)
        else resolve(updatedDoc)
      }
    )
  })
  return newPromise
    .then(updatedDoc => {
      return updatedDoc
    })
    .catch(error => {
      return error
    })
}

module.exports = {
  activity: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = Activity
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = Activity
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = Activity
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
  collection: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = Collection
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = Collection
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = Collection
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
  comment: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = Comment
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = Comment
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = Comment
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
  like: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = Like
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = Like
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = Like
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
  post: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = Post
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = Post
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = Post
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
  report: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = Report
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = Report
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = Report
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
  request: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = Request
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = Request
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = Request
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
  response: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = Response
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = Response
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = Response
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
  tag: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = Tag
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = Tag
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = Tag
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
  user: {
    findByIdAndUpdate: async (id, fieldsAndValues) => {
      Model = User
      return await findByIdAndUpdate(id, fieldsAndValues)
    },
    findByIdAndAddToSet: async (id, fieldsAndValues) => {
      Model = User
      return await findByIdAndAddToSet(id, fieldsAndValues)
    },
    findByIdAndPull: async (id, fieldsAndValues) => {
      Model = User
      return await findByIdAndPull(id, fieldsAndValues)
    },
  },
}
