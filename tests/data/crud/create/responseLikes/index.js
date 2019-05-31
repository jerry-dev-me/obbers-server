const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-RESPONSE-LIKES' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')
const createPosts = require('../posts')
const createComments = require('../comments')
const createResponses = require('../responses')

const createLike = async (userId, responseId) => {
  try {
    const fields = {
      refModel: 'response',
      refId: responseId,
      userId,
      createdAt: new Date(),
    }
    return await q.crud.create.like.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersLikeExistingResponses = async (
  arrayOfExistingUserIds,
  arrayOfExistingResponseIds
) => {
  try {
    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    await Promise.all(
      arrayOfExistingUserIds.map(async userId => {
        idsByUserId[userId] = []
        docsByUserId[userId] = []
        await Promise.all(
          arrayOfExistingResponseIds.map(async responseId => {
            const newLike = await createLike(userId, responseId)
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

module.exports.existingUsersLikeNewResponses = async (
  arrayOfExistingUserIds,
  numOfResponseLikesPerUser
) => {
  try {
    const responses = await createResponses.fromNewUsersOnNewComments(
      numOfResponseLikesPerUser,
      1,
      1
    )
    const arrayOfExistingResponseIds = responses.ids

    return await this.existingUsersLikeExistingResponses(
      arrayOfExistingUserIds,
      arrayOfExistingResponseIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersLikeExistingResponses = async (
  numOfNewUsers,
  arrayOfExistingResponseIds
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.existingUsersLikeExistingResponses(
      arrayOfExistingUserIds,
      arrayOfExistingResponseIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersLikeNewResponses = async (
  numOfNewUsers,
  numOfResponseLikesPerUser
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    const responses = await createResponses.fromNewUsersOnNewComments(
      numOfResponseLikesPerUser,
      1,
      1
    )
    const arrayOfExistingResponseIds = responses.ids

    return await this.existingUsersLikeExistingResponses(
      arrayOfExistingUserIds,
      arrayOfExistingResponseIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
