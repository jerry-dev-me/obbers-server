const User = require("../../models/user")
const Post = require("../../models/post")
const Comment = require("../../models/comment")
const Response = require("../../models/response")

module.exports.userPosts = async userId => {
  const foundUser = await User.findOne({ _id: userId }, { totalPosts: 1 })
  if (foundUser && foundUser.totalPosts) return foundUser.totalPosts
  else return 0
}

module.exports.userLikedPosts = async userId => {
  const foundUser = await User.findOne({ _id: userId }, { totalLikedPosts: 1 })
  if (foundUser && foundUser.totalLikedPosts) return foundUser.totalLikedPosts
  else return 0
}

module.exports.userTaggedPosts = async userId => {
  const foundUser = await User.findOne({ _id: userId }, { totalTaggedPosts: 1 })
  if (foundUser && foundUser.totalTaggedPosts) return foundUser.totalTaggedPosts
  else return 0
}

module.exports.userArchivedPosts = async userId => {
  const foundUser = await User.findOne(
    { _id: userId },
    { totalArchivedPosts: 1 }
  )
  if (foundUser && foundUser.totalArchivedPosts)
    return foundUser.totalArchivedPosts
  else return 0
}

module.exports.userCollections = async userId => {
  const foundUser = await User.findOne({ _id: userId }, { totalCollections: 1 })
  if (foundUser && foundUser.totalCollections) return foundUser.totalCollections
  else return 0
}

module.exports.userFollowing = async userId => {
  const foundUser = await User.findOne({ _id: userId }, { totalFollowing: 1 })
  if (foundUser && foundUser.totalFollowing) return foundUser.totalFollowing
  else return 0
}

module.exports.userFollowers = async userId => {
  const foundUser = await User.findOne({ _id: userId }, { totalFollowers: 1 })
  if (foundUser && foundUser.totalFollowers) return foundUser.totalFollowers
  else return 0
}

module.exports.userRequests = async userId => {
  const foundUser = await User.findOne({ _id: userId }, { totalRequests: 1 })
  if (foundUser && foundUser.totalRequests) return foundUser.totalRequests
  else return 0
}

module.exports.userBlockedUsers = async userId => {
  const foundUser = await User.findOne(
    { _id: userId },
    { totalBlockedUsers: 1 }
  )
  if (foundUser && foundUser.totalBlockedUsers)
    return foundUser.totalBlockedUsers
  else return 0
}

module.exports.postComments = async postId => {
  const foundPost = await Post.findOne(
    { _id: postId }
    // { totalComments: 1 }
  )
  if (foundPost && foundPost.totalComments) return foundPost.totalComments
  else return 0
}

module.exports.postLikes = async postId => {
  const foundPost = await Post.findOne({ _id: postId }, { totalLikes: 1 })
  if (foundPost && foundPost.totalLikes) return foundPost.totalLikes
  else return 0
}

module.exports.commentResponses = async commentId => {
  const foundComment = await Comment.findOne(
    { _id: commentId },
    { totalResponses: 1 }
  )
  if (foundComment && foundComment.totalResponses)
    return foundComment.totalResponses
  else return 0
}

module.exports.commentLikes = async commentId => {
  const foundComment = await Comment.findOne(
    { _id: commentId },
    { totalLikes: 1 }
  )
  if (foundComment && foundComment.totalLikes) return foundComment.totalLikes
  else return 0
}

module.exports.responseLikes = async responseId => {
  const foundResponse = await Response.findOne(
    { _id: responseId },
    { totalLikes: 1 }
  )
  if (foundResponse && foundResponse.totalLikes) return foundResponse.totalLikes
  else return 0
}
