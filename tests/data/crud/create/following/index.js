const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-FOLLOWING' // logSubgroup

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

module.exports.existingUsersFollowNewPublicUsers = async (
  arrayOfExistingUserIds,
  numOfNewUsers
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
            const update = await followUser(existingUserId, newPublicUserId)
            ids.push(update.userFollowing._id)
            docs.push(update.userFollowing)
            idsByUserId[existingUserId].push(update.userFollowing._id)
            docsByUserId[existingUserId].push(update.userFollowing)
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

module.exports.existingUsersFollowNewPrivateUsers = async (
  arrayOfExistingUserIds,
  numOfNewUsers
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
            const update = await followUser(existingUserId, newPrivateUserId)

            ids.push(update.userFollowing._id)
            docs.push(update.userFollowing)
            idsByUserId[existingUserId].push(update.userFollowing._id)
            docsByUserId[existingUserId].push(update.userFollowing)
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
    let ids = arrayOfExistingUserIdsToFollow
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    let updatedDocs = []

    await Promise.all(
      arrayOfExistingUserIdsFollowers.map(async existingUserIdFollower => {
        idsByUserId[existingUserIdFollower] = []
        return await Promise.all(
          arrayOfExistingUserIdsToFollow.map(async existingUserIdToFollow => {
            const update = await followUser(
              existingUserIdFollower,
              existingUserIdToFollow
            )

            const usersFollowersLength = arrayOfExistingUserIdsFollowers.length
            if (
              update.userFollowing.followers.length === usersFollowersLength
            ) {
              docs.push(update.userFollowing)
              updatedDocs.push(update.userFollowing)
            }

            idsByUserId[existingUserIdFollower].push(update.userFollowing._id)
          })
        )
      })
    )

    // return docs and ids of users following, "create following"
    arrayOfExistingUserIdsFollowers.map(async existingUserIdFollower => {
      docsByUserId[existingUserIdFollower] = updatedDocs
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
