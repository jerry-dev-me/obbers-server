/**
 * user1: private profile, testUser is following this user
 * user2: public profile, testUser is following this user
 * user3: private profile, testUser is following this user, has blocked testUser
 * user4: public profile, testUser is following this user, has blocked testUser
 * user5: private profile, testUser is not following this user
 * user6: public profile, testUser is not following this user
 * user7: private profile, testUser is not following this user, has blocked testUser
 * user8: public profile, testUser is not following this user, has blocked testUser
 */

const logger = require('../../../../../lib/logger')
const lG = 'TESTS-HELPERS' // logGroup
const lS = 'CREATE-USERS' // logSubgroup

const c = require('../../../../../app/config/constants')
const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createPrivateUser = async () => {
  try {
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }

  const fields = { settings: { private: true } }
  return await q.crud.create.user.new(h.fakeFields.user(fields))
}

const createPublicUser = async () => {
  try {
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }

  const fields = { settings: { private: false } }
  return await q.crud.create.user.new(h.fakeFields.user(fields))
}

const followUser = async (userFollower, userFollowing) => {
  try {
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }

  return {
    userFollower: await q.crud.update.user.findByIdAndAddToSet(userFollower, {
      following: userFollowing,
    }),
    userFollowing: await q.crud.update.user.findByIdAndAddToSet(userFollowing, {
      followers: userFollower,
    }),
  }
}

const blockUser = async (userId, userIdToBlock) => {
  try {
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }

  const fields = { blockedUsers: userIdToBlock }
  return await q.crud.update.user.findByIdAndAddToSet(userId, fields)
}

const updateAccountStatus = {
  active: async userId => {
    try {
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }

    const fields = { account: { status: c.ACTIVE } }
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  inactive: async userId => {
    try {
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }

    const fields = { account: { status: c.INACTIVE } }
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  suspended: async userId => {
    try {
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }

    const fields = { account: { status: c.SUSPENDED } }
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  banned: async userId => {
    try {
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }

    const fields = { account: { status: c.BANNED } }
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
}

const updateAccountPermissions = {
  admin: async userId => {
    try {
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }

    const fields = { account: { permissions: c.ADMIN } }
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  readWrite: async userId => {
    try {
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }

    const fields = { account: { permissions: c.READ_WRITE } }
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  readOnly: async userId => {
    try {
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }

    const fields = { account: { permissions: c.READ_ONLY } }
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
}

module.exports = async testUserId => {
  try {
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }

  let ids = []
  let docs = []
  let docsByUserId = {}

  const user1 = await createPrivateUser()
  await followUser(testUserId, user1._id)

  const user2 = await createPublicUser()
  await followUser(testUserId, user2._id)

  const user3 = await createPrivateUser()
  await followUser(testUserId, user3._id)
  await blockUser(user3._id, testUserId)

  const user4 = await createPublicUser()
  await followUser(testUserId, user4._id)
  await blockUser(user4._id, testUserId)

  const user5 = await createPrivateUser()

  const user6 = await createPublicUser()

  const user7 = await createPrivateUser()
  await blockUser(user7._id, testUserId)

  const user8 = await createPublicUser()
  await blockUser(user8._id, testUserId)

  ids.push(user1._id)
  ids.push(user2._id)
  ids.push(user3._id)
  ids.push(user4._id)
  ids.push(user5._id)
  ids.push(user6._id)
  ids.push(user7._id)
  ids.push(user8._id)
  docs.push(user1)
  docs.push(user2)
  docs.push(user3)
  docs.push(user4)
  docs.push(user5)
  docs.push(user6)
  docs.push(user7)
  docs.push(user8)
  docsByUserId[user1._id] = user1
  docsByUserId[user2._id] = user2
  docsByUserId[user3._id] = user3
  docsByUserId[user4._id] = user4
  docsByUserId[user5._id] = user5
  docsByUserId[user6._id] = user6
  docsByUserId[user7._id] = user7
  docsByUserId[user8._id] = user8

  return {
    ids,
    docs,
    docsByUserId,
    user1: { id: user1._id, doc: user1 },
    user2: { id: user2._id, doc: user2 },
    user3: { id: user3._id, doc: user3 },
    user4: { id: user4._id, doc: user4 },
    user5: { id: user5._id, doc: user5 },
    user6: { id: user6._id, doc: user6 },
    user7: { id: user7._id, doc: user7 },
    user8: { id: user8._id, doc: user8 },
  }
}
