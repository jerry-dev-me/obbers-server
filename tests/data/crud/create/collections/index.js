const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-COLLECTIONS' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')
const u = require('../../../../../utils')

const createUsers = require('../users')
const createPosts = require('../posts')

const createNewCollection = async fields => {
  try {
    return await q.crud.create.collection.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
const readCollection = async collectionId => {
  try {
    return await q.crud.read.collection.findById(collectionId)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
const updateCollectionAddPost = async (collectionId, postId) => {
  try {
    const updatedFields = { posts: postId }
    return await q.crud.update.collection.findByIdAndAddToSet(
      collectionId,
      updatedFields
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.createCollections = async (userId, numOfCollections) => {
  try {
    let ids = []
    let docs = []

    const create = async fields => {
      const newCollection = await createNewCollection(fields)
      ids.push(newCollection._id)
      docs.push(newCollection)
    }

    let promises = []
    for (let i = 0; i < numOfCollections; i++) {
      const fields = {
        userId,
        name: `collection ${i + 1} by user ${userId}`,
        createdAt: new Date(),
      }
      promises.push(await create(fields))
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

module.exports.existingUsersAddExistingPostsToExistingCollections = async (
  arrayOfExistingUserIds,
  arrayOfExistingPostIds,
  arrayOfExistingCollectionIds
) => {
  try {
    let promises = []

    let ids = arrayOfExistingCollectionIds
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}
    let postIdsByUserIdAndCollectionId = {}

    let i = 0

    await (async function() {
      arrayOfExistingUserIds.map(async userId => {
        idsByUserId[userId] = []
        docsByUserId[userId] = []
        postIdsByUserIdAndCollectionId[userId] = {}
        arrayOfExistingCollectionIds.map(async collectionId => {
          const asyncFunction = async () => {
            const currentCollection = await readCollection(collectionId)
            if (currentCollection !== false) {
              const isFound = u.isIdFoundInArray(
                currentCollection._id,
                idsByUserId[currentCollection.userId]
              )
              if (isFound !== true) {
                idsByUserId[currentCollection.userId].push(collectionId)
              }
              postIdsByUserIdAndCollectionId[currentCollection.userId][
                collectionId
              ] = []
              await Promise.all(
                arrayOfExistingPostIds.map(async postId => {
                  postIdsByUserIdAndCollectionId[currentCollection.userId][
                    collectionId
                  ].push(postId)
                  const updatedCollection = await updateCollectionAddPost(
                    collectionId,
                    postId
                  )
                  i++
                  if (i === arrayOfExistingPostIds.length) {
                    i = 0
                    // console.log("\n updatedCollection._id: " + updatedCollection._id)
                    // console.log("updatedCollection.posts.length: " + updatedCollection.posts.length)
                    // console.log("arrayOfExistingPostIds.length: " + arrayOfExistingPostIds.length)
                    docs.push(updatedCollection)
                    docsByUserId[updatedCollection.userId].push(
                      updatedCollection
                    )
                  }
                })
              )
            }
          }
          promises.push(asyncFunction())
        })
      })
      await Promise.all(promises)
    })()

    return {
      ids,
      docs,
      idsByUserId,
      docsByUserId,
      postIdsByUserIdAndCollectionId,
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersAddNewPostsToExistingCollections = async (
  arrayOfExistingUserIds,
  numOfNewPostsPerUser,
  arrayOfExistingCollectionIds
) => {
  try {
    let arrayOfExistingPostIds = []
    const posts = await createPosts.fromNewUsers(numOfNewPostsPerUser, 1)
    posts.ids.map(postId => arrayOfExistingPostIds.push(postId))

    return await this.existingUsersAddExistingPostsToExistingCollections(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      arrayOfExistingCollectionIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersAddExistingPostsToNewCollections = async (
  arrayOfExistingUserIds,
  arrayOfExistingPostIds,
  numOfNewCollectionsPerUser
) => {
  try {
    const _createCollections = async (userId, numOfNewCollectionsPerUser) => {
      return await this.createCollections(userId, numOfNewCollectionsPerUser)
    }

    let arrayOfExistingCollectionIds = []

    await Promise.all(
      arrayOfExistingUserIds.map(async userId => {
        const collections = await _createCollections(
          userId,
          numOfNewCollectionsPerUser
        )
        arrayOfExistingCollectionIds.push(...collections.ids)
      })
    )

    return await this.existingUsersAddExistingPostsToExistingCollections(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      arrayOfExistingCollectionIds
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersAddNewPostsToNewCollections = async (
  arrayOfExistingUserIds,
  numOfNewPostsPerUser,
  numOfNewCollectionsPerUser
) => {
  try {
    const posts = await createPosts.fromNewUsers(numOfNewPostsPerUser, 1)
    const arrayOfExistingPostIds = posts.ids

    return await this.existingUsersAddExistingPostsToNewCollections(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      numOfNewCollectionsPerUser
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersAddExistingPostsToNewCollections = async (
  numOfNewUsers,
  arrayOfExistingPostIds,
  numOfNewCollectionsPerUser
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.existingUsersAddExistingPostsToNewCollections(
      arrayOfExistingUserIds,
      arrayOfExistingPostIds,
      numOfNewCollectionsPerUser
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersAddNewPostsToNewCollections = async (
  numOfNewUsers,
  numOfNewPostsPerUser, // numOfNewPostsPerCollection
  numOfNewCollectionsPerUser
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.existingUsersAddNewPostsToNewCollections(
      arrayOfExistingUserIds,
      numOfNewPostsPerUser,
      numOfNewCollectionsPerUser
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
