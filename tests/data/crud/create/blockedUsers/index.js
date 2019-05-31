const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-BLOCKED-USERS' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')

const addBlockedUser = async (userId, userIdToBlock) => {
  try {
    const updatedFields = { blockedUsers: userIdToBlock }
    return await q.crud.update.user.findByIdAndAddToSet(userId, updatedFields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersBlockExistingUsers = async (
  arrayOfExistingUserIds,
  arrayOfExistingUserIdsToBlock
) => {
  try {
    let ids = arrayOfExistingUserIdsToBlock
    let idsByUserId = []

    const blockUsers = await (async function() {
      return Promise.all(
        arrayOfExistingUserIds.map(async userId => {
          idsByUserId[userId] = []
          return Promise.all(
            arrayOfExistingUserIdsToBlock.map(async userIdToBlock => {
              blockedUser = await addBlockedUser(userId, userIdToBlock)
              idsByUserId[userId].push(userIdToBlock)
            })
          )
        })
      )
    })()

    return {
      ids,
      idsByUserId,
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.existingUsersBlockNewUsers = async (
  arrayOfExistingUserIds,
  numOfNewUsersToBlock
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsersToBlock)
    const arrayOfExistingUserIdsToBlock = users.ids

    return await this.existingUsersBlockExistingUsers(
      arrayOfExistingUserIds,
      arrayOfExistingUserIdsToBlock
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersBlockExistingUsers = async (
  numOfNewUsers,
  arrayOfExistingUserIdsToBlock
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.existingUsersBlockExistingUsers(
      arrayOfExistingUserIds,
      arrayOfExistingUserIdsToBlock
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersBlockNewUsers = async (
  numOfNewUsers,
  numOfNewUsersToBlock
) => {
  try {
    const users1 = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users1.ids

    const users2 = await createUsers.newPublicUsers(numOfNewUsersToBlock)
    const arrayOfExistingUserIdsToBlock = users2.ids

    return await this.existingUsersBlockExistingUsers(
      arrayOfExistingUserIds,
      arrayOfExistingUserIdsToBlock
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPublicUsersBlockExistingUsers = async (
  numOfNewUsers,
  arrayOfExistingUserIdsToBlock
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.existingUsersBlockExistingUsers(
      arrayOfExistingUserIds,
      arrayOfExistingUserIdsToBlock
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPublicUsersBlockNewPrivateUsers = async (
  numOfNewUsers,
  numOfNewUsersToBlock
) => {
  try {
    const users1 = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users1.ids

    const users2 = await createUsers.newPrivateUsers(numOfNewUsersToBlock)
    const arrayOfExistingUserIdsToBlock = users2.ids

    return await this.existingUsersBlockExistingUsers(
      arrayOfExistingUserIds,
      arrayOfExistingUserIdsToBlock
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPublicUsersBlockNewPublicUsers = async (
  numOfNewUsers,
  numOfNewUsersToBlock
) => {
  try {
    const users1 = await createUsers.newPublicUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users1.ids

    const users2 = await createUsers.newPublicUsers(numOfNewUsersToBlock)
    const arrayOfExistingUserIdsToBlock = users2.ids

    return await this.existingUsersBlockExistingUsers(
      arrayOfExistingUserIds,
      arrayOfExistingUserIdsToBlock
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPrivateUsersBlockExistingUsers = async (
  numOfNewUsers,
  arrayOfExistingUserIdsToBlock
) => {
  try {
    const users = await createUsers.newPrivateUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users.ids

    return await this.existingUsersBlockExistingUsers(
      arrayOfExistingUserIds,
      arrayOfExistingUserIdsToBlock
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPrivateUsersBlockNewPublicUsers = async (
  numOfNewUsers,
  numOfNewUsersToBlock
) => {
  try {
    const users1 = await createUsers.newPrivateUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users1.ids

    const users2 = await createUsers.newPublicUsers(numOfNewUsersToBlock)
    const arrayOfExistingUserIdsToBlock = users2.ids

    return await this.existingUsersBlockExistingUsers(
      arrayOfExistingUserIds,
      arrayOfExistingUserIdsToBlock
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPrivateUsersBlockNewPrivateUsers = async (
  numOfNewUsers,
  numOfNewUsersToBlock
) => {
  try {
    const users1 = await createUsers.newPrivateUsers(numOfNewUsers)
    const arrayOfExistingUserIds = users1.ids

    const users2 = await createUsers.newPrivateUsers(numOfNewUsersToBlock)
    const arrayOfExistingUserIdsToBlock = users2.ids

    return await this.existingUsersBlockExistingUsers(
      arrayOfExistingUserIds,
      arrayOfExistingUserIdsToBlock
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
