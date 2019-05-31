const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-ARCHIVED-POSTS' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')
const createPosts = require('../posts')

const addArchivedPost = async (userId, postId) => {
  try {
    const updatedFields = { archivedPosts: postId }
    return await q.crud.update.user.findByIdAndAddToSet(userId, updatedFields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUserArchiveExistingPosts = async (
  userId,
  arrayOfExistingPostIdsToArchive
) => {
  try {
    let ids = []
    await Promise.all(
      arrayOfExistingPostIdsToArchive.map(async postId => {
        updatedUser = await addArchivedPost(userId, postId)
        ids.push(postId)
      })
    )
    return ids
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersArchiveNewPosts = async (
  arrayOfExistingUserIds,
  numOfNewArchivedPostsPerUser
) => {
  try {
    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    await Promise.all(
      arrayOfExistingUserIds.map(async existingUserId => {
        idsByUserId[existingUserId] = []
        docsByUserId[existingUserId] = []
        const posts = await createPosts.createPosts(
          existingUserId,
          numOfNewArchivedPostsPerUser
        )
        await this.existingUserArchiveExistingPosts(existingUserId, posts.ids)
        ids.push(...posts.ids)
        docs.push(...posts.docs)
        idsByUserId[existingUserId].push(...posts.ids)
        docsByUserId[existingUserId].push(...posts.docs)
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

module.exports.newUsersArchiveNewPosts = async (
  numOfNewUsers,
  numOfNewArchivedPostsPerUser
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids
    return await this.existingUsersArchiveNewPosts(
      arrayOfExistingUserIds,
      numOfNewArchivedPostsPerUser
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
