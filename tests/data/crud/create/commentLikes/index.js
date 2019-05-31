const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-COMMENT-LIKES' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')
const createPosts = require('../posts')
const createComments = require('../comments')
const createResponses = require('../responses')

const createLike = async (userId, commentId) => {
  try {
    const fields = {
      refModel: 'comment',
      refId: commentId,
      userId,
      createdAt: new Date(),
    }
    return await q.crud.create.like.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.createCommentLike = async (userId, commentId) => {
  try {
    return await createLike(userId, commentId)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersLikeExistingComments = async (
  arrayOfExistingUserIds,
  arrayOfExistingCommentIds
) => {
  try {
    const _createCommentLike = async (userId, commentId) => {
      return await this.createCommentLike(userId, commentId)
    }

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    arrayOfExistingUserIds.map(userId => {
      idsByUserId[userId] = []
      docsByUserId[userId] = []
    })

    await Promise.all(
      arrayOfExistingUserIds.map(async userId => {
        idsByUserId[userId] = []
        docsByUserId[userId] = []
        await Promise.all(
          arrayOfExistingCommentIds.map(async commentId => {
            const newLike = await _createCommentLike(userId, commentId)
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

module.exports.existingUsersLikeNewComments = async (
  arrayOfExistingUserIds,
  numOfCommentLikesPerUser
) => {
  try {
    const comments = await createComments.fromNewUsersOnNewPosts(
      numOfCommentLikesPerUser,
      1,
      1
    )
    const arrayOfExistingCommentIds = comments.ids

    return await this.existingUsersLikeExistingComments(
      arrayOfExistingUserIds,
      arrayOfExistingCommentIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersLikeExistingComments = async (
  numOfNewUsers,
  arrayOfExistingCommentIds
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.existingUsersLikeExistingComments(
      arrayOfExistingUserIds,
      arrayOfExistingCommentIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersLikeNewComments = async (
  numOfNewUsers,
  numOfCommentLikesPerUser
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    const comments = await createComments.fromNewUsersOnNewPosts(
      numOfCommentLikesPerUser,
      1,
      1
    )
    const arrayOfExistingCommentIds = comments.ids

    return await this.existingUsersLikeExistingComments(
      arrayOfExistingUserIds,
      arrayOfExistingCommentIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
