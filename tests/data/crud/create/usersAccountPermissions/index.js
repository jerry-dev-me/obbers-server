/**
 * user1: private profile, testUser is following this user, account permissions READ_WRITE
 * user2: private profile, testUser is following this user, account permissions READ_ONLY
 * user3: public profile, testUser is following this user, account permissions READ_WRITE
 * user4: public profile, testUser is following this user, account permissions READ_ONLY
 * user5: private profile, testUser is not following this user, account permissions READ_WRITE
 * user6: private profile, testUser is not following this user, account permissions READ_ONLY
 * user7: public profile, testUser is not following this user, account permissions READ_WRITE
 * user8: public profile, testUser is not following this user, account permissions READ_ONLY
 * user9: public profile, testUser is following this user, account permissions ADMIN
 */

const logger = require('../../../../../lib/logger')
const lG = 'TESTS-HELPERS' // logGroup
const lS = 'CREATE-USERS' // logSubgroup

const c = require('../../../../../app/config/constants')
const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createPrivateUser = async () => {
  try {
    const fields = { settings: { private: true } }
    return await q.crud.create.user.new(h.fakeFields.user(fields))
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

const createPublicUser = async () => {
  try {
    const fields = { settings: { private: false } }
    return await q.crud.create.user.new(h.fakeFields.user(fields))
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

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

const blockUser = async (userId, userIdToBlock) => {
  try {
    const fields = { blockedUsers: userIdToBlock }
    return await q.crud.update.user.findByIdAndAddToSet(userId, fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

const updateAccountStatus = {
  active: async userId => {
    try {
      const fields = { account: { status: c.ACTIVE } }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  inactive: async userId => {
    try {
      const fields = { account: { status: c.INACTIVE } }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  suspended: async userId => {
    try {
      const fields = { account: { status: c.SUSPENDED } }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  banned: async userId => {
    try {
      const fields = { account: { status: c.BANNED } }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
}

const updateAccountPermissions = {
  admin: async userId => {
    try {
      const fields = { account: { permissions: c.ADMIN } }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  readWrite: async userId => {
    try {
      const fields = { account: { permissions: c.READ_WRITE } }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  readOnly: async userId => {
    try {
      const fields = { account: { permissions: c.READ_ONLY } }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
}

module.exports = async testUserId => {
  try {
    let ids = []
    let docs = []
    let docsByUserId = {}

    const user1 = await createPrivateUser()
    await followUser(testUserId, user1._id)
    await updateAccountPermissions.readWrite(user1._id)

    const user2 = await createPrivateUser()
    await followUser(testUserId, user2._id)
    await updateAccountPermissions.readOnly(user2._id)

    const user3 = await createPublicUser()
    await followUser(testUserId, user3._id)
    await updateAccountPermissions.readWrite(user3._id)

    const user4 = await createPublicUser()
    await followUser(testUserId, user4._id)
    await updateAccountPermissions.readOnly(user4._id)

    const user5 = await createPrivateUser()
    await updateAccountPermissions.readWrite(user5._id)

    const user6 = await createPrivateUser()
    await updateAccountPermissions.readOnly(user6._id)

    const user7 = await createPublicUser()
    await updateAccountPermissions.readWrite(user7._id)

    const user8 = await createPublicUser()
    await updateAccountPermissions.readOnly(user8._id)

    const user9 = await createPublicUser()
    await updateAccountPermissions.admin(user9._id)

    ids.push(user1._id)
    ids.push(user2._id)
    ids.push(user3._id)
    ids.push(user4._id)
    ids.push(user5._id)
    ids.push(user6._id)
    ids.push(user7._id)
    ids.push(user8._id)
    ids.push(user9._id)
    docs.push(user1)
    docs.push(user2)
    docs.push(user3)
    docs.push(user4)
    docs.push(user5)
    docs.push(user6)
    docs.push(user7)
    docs.push(user8)
    docs.push(user9)
    docsByUserId[user1._id] = user1
    docsByUserId[user2._id] = user2
    docsByUserId[user3._id] = user3
    docsByUserId[user4._id] = user4
    docsByUserId[user5._id] = user5
    docsByUserId[user6._id] = user6
    docsByUserId[user7._id] = user7
    docsByUserId[user8._id] = user8
    docsByUserId[user9._id] = user9

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
      user9: { id: user9._id, doc: user9 },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
