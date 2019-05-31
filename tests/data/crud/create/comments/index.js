const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-COMMENTS' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')
const createPosts = require('../posts')

const createNewComment = async fields => {
  try {
    return await q.crud.create.comment.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.createComments = async (
  numOfComments,
  userId,
  postId,
  fields
) => {
  try {
    let ids = []
    let docs = []

    const createComment = async () => {
      const newComment = await createNewComment(fields)
      ids.push(newComment._id)
      docs.push(newComment)
    }

    let promises = []
    for (let i = 0; i < numOfComments; i++) {
      promises.push(await createComment())
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

module.exports.fromExistingUsersOnExistingPosts = async (
  arrayOfExistingUserIds,
  arrayOfExistingPostIds,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const _createComments = this.createComments

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
          arrayOfExistingPostIds.map(async postId => {
            const fields = {
              postId,
              userId,
              content: `comment by ${userId}`,
              createdAt: new Date(),
            }
            const comments = await _createComments(
              numOfCommentsPerUserOnEachPost,
              userId,
              postId,
              fields
            )
            ids.push(...comments.ids)
            docs.push(...comments.docs)
            idsByUserId[userId].push(...comments.ids)
            docsByUserId[userId].push(...comments.docs)
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

module.exports.fromExistingUsersOnNewPosts = async (
  arrayOfExistingUserIds,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const posts = await createPosts.fromNewUsers(numOfNewPosts, 1)
    const arrayOfExistingPostIds = posts.ids

    return await this.fromExistingUsersOnExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromExistingUsersOnNewPublicPosts = async (
  arrayOfExistingUserIds,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const posts = await createPosts.fromNewPublicUsers(numOfNewPosts, 1)
    const arrayOfExistingPostIds = posts.ids

    return await this.fromExistingUsersOnExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromExistingUsersOnNewPrivatePosts = async (
  arrayOfExistingUserIds,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const posts = await createPosts.fromNewPrivateUsers(numOfNewPosts, 1)
    const arrayOfExistingPostIds = posts.ids

    return await this.fromExistingUsersOnExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewUsersOnExistingPosts = async (
  numOfNewUsers,
  arrayOfExistingPostIds,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewUsersOnNewPosts = async (
  numOfNewUsers,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnNewPosts(
      arrayOfExistingUserIds,
      numOfNewPosts,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPublicUsersOnExistingPosts = async (
  numOfNewUsers,
  arrayOfExistingPostIds,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPublicUsersOnNewPosts = async (
  numOfNewUsers,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnNewPosts(
      arrayOfExistingUserIds,
      numOfNewPosts,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPublicUsersOnNewPublicPosts = async (
  numOfNewUsers,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnNewPublicPosts(
      arrayOfExistingUserIds,
      numOfNewPosts,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPublicUsersOnNewPrivatePosts = async (
  numOfNewUsers,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnNewPrivatePosts(
      arrayOfExistingUserIds,
      numOfNewPosts,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPrivateUsersOnExistingPosts = async (
  numOfNewUsers,
  arrayOfExistingPostIds,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPrivateUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnExistingPosts(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPrivateUsersOnNewPosts = async (
  numOfNewUsers,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPrivateUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnNewPosts(
      arrayOfExistingUserIds,
      numOfNewPosts,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPrivateUsersOnNewPublicPosts = async (
  numOfNewUsers,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPrivateUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnNewPublicPosts(
      arrayOfExistingUserIds,
      numOfNewPosts,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPrivateUsersOnNewPrivatePosts = async (
  numOfNewUsers,
  numOfNewPosts,
  numOfCommentsPerUserOnEachPost
) => {
  try {
    const users = await createUsers.newPrivateUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUsersOnNewPrivatePosts(
      arrayOfExistingUserIds,
      numOfNewPosts,
      numOfCommentsPerUserOnEachPost
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
