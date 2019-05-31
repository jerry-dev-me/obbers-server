const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-TAGGED-POSTS' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const Post = require('../../../../../app/models/post')

const createUsers = require('../users')
const createPosts = require('../posts')

const updatePostAddTag = async (postId, fields) => {
  try {
    const updatedFields = { tags: fields }
    return await q.crud.update.post.findByIdAndAddToSet(postId, updatedFields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.tagExistingUsersOnExistingPosts = async (
  arrayOfExistingUserIds,
  arrayOfExistingPostIds
) => {
  try {
    let ids = []
    let taggedPostIdsByUserId = {}
    let taggedUserIdsByPostId = {}

    await Promise.all(
      arrayOfExistingUserIds.map(async existingUserId => {
        taggedPostIdsByUserId[existingUserId] = []
        return Promise.all(
          arrayOfExistingPostIds.map(async existingPostId => {
            const foundPost = await Post.findOne({ _id: existingPostId })
            const x = Math.floor(Math.random() * 10) + 10
            const y = Math.floor(Math.random() * 10) + 10
            const fields = {
              userId: existingUserId,
              username: existingUserId,
              position: { x, y },
              createdAt: new Date(),
            }
            const updatedPost = await updatePostAddTag(existingPostId, fields)
            taggedPostIdsByUserId[existingUserId].push(updatedPost._id)
          })
        )
      })
    )

    await Promise.all(
      arrayOfExistingPostIds.map(async existingPostId => {
        taggedUserIdsByPostId[existingPostId] = []
        return Promise.all(
          arrayOfExistingUserIds.map(async existingUserId => {
            const foundPost = await Post.findOne({ _id: existingPostId })
            const x = Math.floor(Math.random() * 10) + 10
            const y = Math.floor(Math.random() * 10) + 10
            const fields = {
              userId: existingUserId,
              username: existingUserId,
              position: { x, y },
              createdAt: new Date(),
            }
            const updatedPost = await updatePostAddTag(existingPostId, fields)
            taggedUserIdsByPostId[existingPostId].push(existingUserId)
          })
        )
      })
    )

    return { ids, taggedPostIdsByUserId, taggedUserIdsByPostId }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.tagNewUsersOnExistingPosts = async (
  numOfNewUsers,
  arrayOfExistingPostIds
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.tagExistingUsersOnExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.tagExistingUsersOnNewPosts = async (
  arrayOfExistingUserIds,
  numOfNewTaggedPostsPerUser
) => {
  try {
    const posts = await createPosts.fromNewUsers(numOfNewTaggedPostsPerUser, 1)
    const arrayOfExistingPostIds = posts.ids

    return await this.tagExistingUsersOnExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.tagNewUsersOnNewPosts = async (
  numOfNewUsers,
  numOfNewTaggedPostsPerUser
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    const posts = await createPosts.fromNewUsers(numOfNewTaggedPostsPerUser, 1)
    const arrayOfExistingPostIds = posts.ids

    return await this.tagExistingUsersOnExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
