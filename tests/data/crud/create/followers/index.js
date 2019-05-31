const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-FOLLOWERS' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')

const followUser = async (userFollower, userFollowing) => {
  try {
    return {
      userFollower: await q.crud.update.user.findByIdAndAddToSet(userFollower, {
        following: userFollowing,
      }),
      userFollowing: await q.crud.update.user.findByIdAndAddToSet(
        userFollowing,
        {
          followers: userFollower,
        }
      ),
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPublicUsersFollowExistingUsers = async (
  numOfNewUsers,
  arrayOfExistingUserIds
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
        const newPublicUsers = await createUsers.newPublicUsers(numOfNewUsers)
        return Promise.all(
          newPublicUsers.ids.map(async newPublicUserId => {
            const update = await followUser(newPublicUserId, existingUserId)
            ids.push(update.userFollower._id)
            docs.push(update.userFollower)
            idsByUserId[existingUserId].push(update.userFollower._id)
            docsByUserId[existingUserId].push(update.userFollower)
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

module.exports.newPrivateUsersFollowExistingUsers = async (
  numOfNewUsers,
  arrayOfExistingUserIds
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
        const newPrivateUsers = await createUsers.newPrivateUsers(numOfNewUsers)
        return Promise.all(
          newPrivateUsers.ids.map(async newPrivateUserId => {
            const update = await followUser(newPrivateUserId, existingUserId)
            ids.push(update.userFollower._id)
            docs.push(update.userFollower)
            idsByUserId[existingUserId].push(update.userFollower._id)
            docsByUserId[existingUserId].push(update.userFollower)
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

module.exports.existingUsersFollowExistingUsers = async (
  arrayOfExistingUserIdsFollowers,
  arrayOfExistingUserIdsToFollow
) => {
  try {
    let ids = arrayOfExistingUserIdsFollowers
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    let updatedDocs = []

    await Promise.all(
      arrayOfExistingUserIdsToFollow.map(async existingUserIdToFollow => {
        idsByUserId[existingUserIdToFollow] = []
        return await Promise.all(
          arrayOfExistingUserIdsFollowers.map(async existingUserIdFollower => {
            const update = await followUser(
              existingUserIdFollower,
              existingUserIdToFollow
            )

            const usersToFollowLength = arrayOfExistingUserIdsToFollow.length
            if (update.userFollower.following.length === usersToFollowLength) {
              docs.push(update.userFollower)
              updatedDocs.push(update.userFollower)
            }

            idsByUserId[existingUserIdToFollow].push(update.userFollower._id)
          })
        )
      })
    )

    // return docs and ids of users followers, "create followers"
    arrayOfExistingUserIdsToFollow.map(async existingUserIdToFollow => {
      docsByUserId[existingUserIdToFollow] = updatedDocs
    })

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
