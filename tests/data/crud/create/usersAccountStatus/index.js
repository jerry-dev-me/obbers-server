/**
 * user1: private profile, testUser is following this user, account status ACTIVE
 * user2: private profile, testUser is following this user, account status INACTIVE
 * user3: private profile, testUser is following this user, account status SUSPENDED
 * user4: private profile, testUser is following this user, account status BANNED
 * user5: private profile, testUser is following this user, user account is deleted
 * user6: public profile, testUser is following this user, account status ACTIVE
 * user7: public profile, testUser is following this user, account status INACTIVE
 * user8: public profile, testUser is following this user, account status SUSPENDED
 * user9: public profile, testUser is following this user, account status BANNED
 * user10: public profile, testUser is following this user, user account is deleted
 * user11: private profile, testUser is not following this user, account status ACTIVE
 * user12: private profile, testUser is not following this user, account status INACTIVE
 * user13: private profile, testUser is not following this user, account status SUSPENDED
 * user14: private profile, testUser is not following this user, account status BANNED
 * user15: private profile, testUser is not following this user, user account is deleted
 * user16: public profile, testUser is not following this user, account status ACTIVE
 * user17: public profile, testUser is not following this user, account status INACTIVE
 * user18: public profile, testUser is not following this user, account status SUSPENDED
 * user19: public profile, testUser is not following this user, account status BANNED
 * user20: public profile, testUser is not following this user, user account is deleted
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

const deleteUser = async userId => {
  try {
    return await q.crud.delete.user.findByIdAndRemove(userId)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports = async testUserId => {
  try {
    let ids = []
    let docs = []
    let docsByUserId = {}

    const user1 = await createPrivateUser()
    await followUser(testUserId, user1._id)
    await updateAccountStatus.active(user1._id)

    const user2 = await createPrivateUser()
    await followUser(testUserId, user2._id)
    await updateAccountStatus.inactive(user2._id)

    const user3 = await createPrivateUser()
    await followUser(testUserId, user3._id)
    await updateAccountStatus.suspended(user3._id)

    const user4 = await createPrivateUser()
    await followUser(testUserId, user4._id)
    await updateAccountStatus.banned(user4._id)

    const user5 = await createPrivateUser()
    await followUser(testUserId, user5._id)
    await deleteUser(user5._id)

    const user6 = await createPublicUser()
    await followUser(testUserId, user6._id)
    await updateAccountStatus.active(user6._id)

    const user7 = await createPublicUser()
    await followUser(testUserId, user7._id)
    await updateAccountStatus.inactive(user7._id)

    const user8 = await createPublicUser()
    await followUser(testUserId, user8._id)
    await updateAccountStatus.suspended(user8._id)

    const user9 = await createPublicUser()
    await followUser(testUserId, user9._id)
    await updateAccountStatus.banned(user9._id)

    const user10 = await createPublicUser()
    await followUser(testUserId, user10._id)
    await deleteUser(user10._id)

    const user11 = await createPrivateUser()
    await updateAccountStatus.active(user11._id)

    const user12 = await createPrivateUser()
    await updateAccountStatus.inactive(user12._id)

    const user13 = await createPrivateUser()
    await updateAccountStatus.suspended(user13._id)

    const user14 = await createPrivateUser()
    await updateAccountStatus.banned(user14._id)

    const user15 = await createPrivateUser()
    await deleteUser(user15._id)

    const user16 = await createPublicUser()
    await updateAccountStatus.active(user16._id)

    const user17 = await createPublicUser()
    await updateAccountStatus.inactive(user17._id)

    const user18 = await createPublicUser()
    await updateAccountStatus.suspended(user18._id)

    const user19 = await createPublicUser()
    await updateAccountStatus.banned(user19._id)

    const user20 = await createPublicUser()
    await deleteUser(user20._id)

    ids.push(user1._id)
    ids.push(user2._id)
    ids.push(user3._id)
    ids.push(user4._id)
    ids.push(user5._id)
    ids.push(user6._id)
    ids.push(user7._id)
    ids.push(user8._id)
    ids.push(user9._id)
    ids.push(user10._id)
    ids.push(user11._id)
    ids.push(user12._id)
    ids.push(user13._id)
    ids.push(user14._id)
    ids.push(user15._id)
    ids.push(user16._id)
    ids.push(user17._id)
    ids.push(user18._id)
    ids.push(user19._id)
    ids.push(user20._id)
    docs.push(user1)
    docs.push(user2)
    docs.push(user3)
    docs.push(user4)
    docs.push(user5)
    docs.push(user6)
    docs.push(user7)
    docs.push(user8)
    docs.push(user9)
    docs.push(user10)
    docs.push(user11)
    docs.push(user12)
    docs.push(user13)
    docs.push(user14)
    docs.push(user15)
    docs.push(user16)
    docs.push(user17)
    docs.push(user18)
    docs.push(user19)
    docs.push(user20)
    docsByUserId[user1._id] = user1
    docsByUserId[user2._id] = user2
    docsByUserId[user3._id] = user3
    docsByUserId[user4._id] = user4
    docsByUserId[user5._id] = user5
    docsByUserId[user6._id] = user6
    docsByUserId[user7._id] = user7
    docsByUserId[user8._id] = user8
    docsByUserId[user9._id] = user9
    docsByUserId[user10._id] = user10
    docsByUserId[user11._id] = user11
    docsByUserId[user12._id] = user12
    docsByUserId[user13._id] = user13
    docsByUserId[user14._id] = user14
    docsByUserId[user15._id] = user15
    docsByUserId[user16._id] = user16
    docsByUserId[user17._id] = user17
    docsByUserId[user18._id] = user18
    docsByUserId[user19._id] = user19
    docsByUserId[user20._id] = user20

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
      user10: { id: user10._id, doc: user10 },
      user11: { id: user11._id, doc: user11 },
      user12: { id: user12._id, doc: user12 },
      user13: { id: user13._id, doc: user13 },
      user14: { id: user14._id, doc: user14 },
      user15: { id: user15._id, doc: user15 },
      user16: { id: user16._id, doc: user16 },
      user17: { id: user17._id, doc: user17 },
      user18: { id: user18._id, doc: user18 },
      user19: { id: user19._id, doc: user19 },
      user20: { id: user20._id, doc: user20 },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
