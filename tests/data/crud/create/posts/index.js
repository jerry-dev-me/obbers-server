const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-POSTS' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')

const createNewPost = async fields => {
  try {
    return await q.crud.create.post.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.createPosts = async (userId, numOfPosts) => {
  try {
    let ids = []
    let docs = []
    const createPost = async () => {
      const fields = h.fakeFields.post({ userId })
      const newPost = await createNewPost(fields)
      ids.push(newPost._id)
      docs.push(newPost)
    }

    let promises = []
    for (let i = 0; i < numOfPosts; i++) {
      promises.push(await createPost())
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

module.exports.fromExistingUserIds = async (
  arrayOfExistingUserIds,
  numOfPostsPerUser
) => {
  try {
    let promises = []

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    arrayOfExistingUserIds.map(async existingUserId => {
      idsByUserId[existingUserId] = []
      docsByUserId[existingUserId] = []
      const newPromise = new Promise(async (resolve, reject) => {
        const posts = await this.createPosts(existingUserId, numOfPostsPerUser)
        if (posts === 'error') return reject(posts)
        ids.push(...posts.ids)
        docs.push(...posts.docs)
        idsByUserId[existingUserId] = posts.ids
        docsByUserId[existingUserId] = posts.docs
        resolve(posts)
      })
      promises.push(newPromise)
    })

    await Promise.all(promises)

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

module.exports.fromNewUsers = async (numOfNewUsers, numOfPostsPerUser) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUserIds(
      arrayOfExistingUserIds,
      numOfPostsPerUser
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPublicUsers = async (
  numOfNewUsers,
  numOfPostsPerUser
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUserIds(
      arrayOfExistingUserIds,
      numOfPostsPerUser
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewPrivateUsers = async (
  numOfNewUsers,
  numOfPostsPerUser
) => {
  try {
    const users = await createUsers.newPrivateUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.fromExistingUserIds(
      arrayOfExistingUserIds,
      numOfPostsPerUser
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
