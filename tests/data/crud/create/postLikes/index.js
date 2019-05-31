const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-POST-LIKES' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')
const createPosts = require('../posts')
const createComments = require('../comments')
const createResponses = require('../responses')

const createLike = async (userId, postId) => {
  try {
    const fields = {
      refModel: 'post',
      refId: postId,
      userId,
      createdAt: new Date(),
    }
    return await q.crud.create.like.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.createPostLike = async (userId, postId) => {
  try {
    return await createLike(userId, postId)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersLikeExistingPosts = async (
  arrayOfExistingUserIds,
  arrayOfExistingPostIds
) => {
  try {
    const _createPostLike = async (userId, postId) => {
      return await createLike(userId, postId)
    }

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    await Promise.all(
      arrayOfExistingUserIds.map(async userId => {
        idsByUserId[userId] = []
        docsByUserId[userId] = []
        await Promise.all(
          arrayOfExistingPostIds.map(async postId => {
            const newLike = await _createPostLike(userId, postId)
            ids.push(newLike._id)
            docs.push(newLike)
            idsByUserId[userId].push(newLike._id)
            docsByUserId[userId].push(newLike)
          })
        )
      })
    )

    return {
      ids,
      docs,
      idsByUserId,
      docsByUserId,
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersLikeNewPosts = async (
  arrayOfExistingUserIds,
  numOfPostLikesPerUser
) => {
  try {
    const posts = await createPosts.fromNewUsers(numOfPostLikesPerUser, 1)
    const arrayOfExistingPostIds = posts.ids

    return await this.existingUsersLikeExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersLikeExistingPosts = async (
  numOfNewUsers,
  arrayOfExistingPostIds
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.existingUsersLikeExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersLikeNewPosts = async (
  numOfNewUsers,
  numOfPostLikesPerUser
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    const posts = await createPosts.fromNewUsers(numOfPostLikesPerUser, 1)
    const arrayOfExistingPostIds = posts.ids

    return await this.existingUsersLikeExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
