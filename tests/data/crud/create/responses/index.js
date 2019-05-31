const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-RESPONSES' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')
const createComments = require('../comments')

const createNewResponse = async fields => {
  try {
    return await q.crud.create.response.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.createResponses = async (
  numOfResponses,
  userId,
  commentId,
  fields
) => {
  try {
    let ids = []
    let docs = []

    const createResponse = async () => {
      const newResponse = await createNewResponse(fields)
      ids.push(newResponse._id)
      docs.push(newResponse)
    }

    let promises = []
    for (let i = 0; i < numOfResponses; i++) {
      promises.push(await createResponse())
    }

    return Promise.all(promises)
      .then(results => {
        return { ids, docs }
      })
      .catch(error => {
        return error
      })
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromExistingUsersOnExistingComments = async (
  arrayOfExistingUserIds,
  arrayOfExistingCommentIds,
  numOfResponsesPerUserOnEachComment
) => {
  try {
    const _createResponses = this.createResponses

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    await Promise.all(
      arrayOfExistingUserIds.map(async userId => {
        idsByUserId[userId] = []
        docsByUserId[userId] = []
        await Promise.all(
          arrayOfExistingCommentIds.map(async commentId => {
            const fields = {
              commentId,
              userId,
              content: `response by ${userId}`,
              createdAt: new Date(),
            }
            const responses = await _createResponses(
              numOfResponsesPerUserOnEachComment,
              userId,
              commentId,
              fields
            )
            ids.push(...responses.ids)
            docs.push(...responses.docs)
            idsByUserId[userId].push(...responses.ids)
            docsByUserId[userId].push(...responses.docs)
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

module.exports.fromExistingUsersOnNewComments = async (
  arrayOfExistingUserIds,
  numOfNewComments,
  numOfResponsesPerUserOnEachComment
) => {
  try {
    const comments = await createComments.fromNewUsersOnNewPosts(
      numOfNewComments,
      1,
      1
    )
    const arrayOfExistingCommentIds = comments.ids

    return await this.fromExistingUsersOnExistingComments(
      arrayOfExistingUserIds,
      arrayOfExistingCommentIds,
      numOfResponsesPerUserOnEachComment
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewUsersOnExistingComments = async (
  numOfNewUsers,
  arrayOfExistingCommentIds,
  newOfResponsesPerUserOnEachComment
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnExistingComments(
      arrayOfExistingUserIds,
      arrayOfExistingCommentIds,
      newOfResponsesPerUserOnEachComment
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewUsersOnNewComments = async (
  numOfNewUsers,
  numOfNewComments,
  numOfResponsesPerUserOnEachComment
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnNewComments(
      arrayOfExistingUserIds,
      numOfNewComments,
      numOfResponsesPerUserOnEachComment
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
