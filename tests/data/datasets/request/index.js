const logger = require('../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'DATASETS-REQUEST' // logSubgroup

const faker = require('faker')
const q = require('../../../../app/queries')
const h = require('../../../helpers')
const u = require('../../../../utils')
const create = require('../../crud/create')

module.exports.fields = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }

    const valid = {
      sentFromUserId: testUserId,
      sentToUserId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        return users.ids[0]
      })(),
      status: 'PENDING', // PENDING, ACCEPTED, DECLINED
      createdAt: new Date(),
    }

    const invalid = {
      sentFromUserId: 123,
      sentToUserId: 123,
      status: 123,
      createdAt: 123,
    }

    const otherUserId = {
      sentFromUserId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        return users.ids[0]
      })(),
      sentToUserId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        return users.ids[0]
      })(),
      status: 'PENDING', // PENDING, ACCEPTED, DECLINED
      createdAt: new Date(),
    }

    const deletedRefId = {
      sentFromUserId: testUserId,
      sentToUserId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        const userId = users.ids[0]
        await q.crud.delete.user.findByIdAndRemove(userId)
        // await q.crud.delete.user.remove(userId);
        return userId
      })(),
      status: 'PENDING', // PENDING, ACCEPTED, DECLINED
      createdAt: new Date(),
    }

    const empty = {
      sentFromUserId: '',
      sentToUserId: '',
      status: '',
      createdAt: '',
    }

    const missing = {}

    const createFieldsWithUsersStatusRefs = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          sentFromUserId: testUserId,
          sentToUserId: refId,
          status: 'PENDING',
          createdAt: new Date(),
        })
      }

      const users = await create.usersAccountStatus(testUserId)

      users.ids.map(userId => {
        let { user1, user2, user3, user4, user5 } = users
        if (u.isSameId(userId, user1.id) === true) fieldsObj('fields1', userId)
        if (u.isSameId(userId, user2.id) === true) fieldsObj('fields2', userId)
        if (u.isSameId(userId, user3.id) === true) fieldsObj('fields3', userId)
        if (u.isSameId(userId, user4.id) === true) fieldsObj('fields4', userId)
        if (u.isSameId(userId, user5.id) === true) fieldsObj('fields5', userId)
      })

      return fields
    }

    const createFieldsWithSocialConnectionsRefs = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          sentFromUserId: testUserId,
          sentToUserId: refId,
          status: 'PENDING',
          createdAt: new Date(),
        })
      }

      const users = await create.userSocialConnections(testUserId)

      users.ids.map(userId => {
        let { user1, user2, user3, user4, user5, user6, user7, user8 } = users
        if (u.isSameId(userId, user1.id) === true) fieldsObj('fields1', userId)
        if (u.isSameId(userId, user2.id) === true) fieldsObj('fields2', userId)
        if (u.isSameId(userId, user3.id) === true) fieldsObj('fields3', userId)
        if (u.isSameId(userId, user4.id) === true) fieldsObj('fields4', userId)
        if (u.isSameId(userId, user5.id) === true) fieldsObj('fields5', userId)
        if (u.isSameId(userId, user6.id) === true) fieldsObj('fields6', userId)
        if (u.isSameId(userId, user7.id) === true) fieldsObj('fields7', userId)
        if (u.isSameId(userId, user8.id) === true) fieldsObj('fields8', userId)
      })

      return fields
    }

    const createFieldsWithNonexistentRefs = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          sentFromUserId: testUserId,
          sentToUserId: refId,
          status: 'PENDING',
          createdAt: new Date(),
        })
      }

      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )

      await q.crud.delete.user.findByIdAndRemove(users.ids[0])

      fieldsObj('fields1', users.ids[0])

      return fields
    }

    return {
      testUserId,
      testUser: { id: testUserId },
      valid,
      invalid,
      otherUserId,
      deletedRefId,
      empty,
      missing,
      withUsersStatusRefs: await createFieldsWithUsersStatusRefs(),
      withSocialConnectionsRefs: await createFieldsWithSocialConnectionsRefs(),
      withNonexistentRefs: await createFieldsWithNonexistentRefs(),
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.adminOnly = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }

    let set1
    const createUsersDocs = await (async function() {
      const users = await create.users.newPrivateUsers(1)
      const user1 = users.docs[0]
      const requests = await create.requests.fromExistingUsersToNewUsers(
        [user1._id],
        1
      )
      set1 = { user1, requests }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set1.user1._id,
        request1: set1.requests.idsSentFromUserId[set1.user1._id],
      },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.selfOnly = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }

    let set1
    const createTestUserDocs = await (async function() {
      const id = testUserId
      const requests1 = await create.requests.fromExistingUsersToNewUsers(
        [id],
        1
      )
      const requests2 = await create.requests.fromNewUsersToExistingUsers(1, [
        id,
      ])
      const request1 = requests1.docs[0]
      const request2 = requests2.docs[0]
      set1 = { request1, request2 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const user1 = users.docs[0]
      const id = user1._id
      const requests1 = await create.requests.fromExistingUsersToNewUsers(
        [id],
        1
      )
      const requests2 = await create.requests.fromNewUsersToExistingUsers(1, [
        id,
      ])
      const request1 = requests1.docs[0]
      const request2 = requests2.docs[0]
      set2 = { user1, request1, request2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        sent: {
          request1: { id: set1.request1._id },
        },
        received: {
          request1: { id: set1.request2._id },
        },
      },
      user1: {
        id: set2.user1._id,
        sent: {
          request1: { id: set2.request1._id },
        },
        received: {
          request1: { id: set2.request2._id },
        },
      },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.accountStatus = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }

    let set1
    const createTestUserDocs = await (async function() {
      const users = await create.usersAccountStatus(testUserId)
      const requests1 = await create.requests.fromExistingUsersToExistingUsers(
        [testUserId],
        users.ids
      )
      const requests2 = await create.requests.fromExistingUsersToExistingUsers(
        users.ids,
        [testUserId]
      )
      set1 = { users, requests1, requests2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        sent: {
          request1: set1.requests1.idsSentToUserId[set1.users.user1.id][0],
          request2: set1.requests1.idsSentToUserId[set1.users.user2.id][0],
          request3: set1.requests1.idsSentToUserId[set1.users.user3.id][0],
          request4: set1.requests1.idsSentToUserId[set1.users.user4.id][0],
          request5: set1.requests1.idsSentToUserId[set1.users.user5.id][0],
        },
        received: {
          request1: set1.requests2.idsSentFromUserId[set1.users.user1.id][0],
          request2: set1.requests2.idsSentFromUserId[set1.users.user2.id][0],
          request3: set1.requests2.idsSentFromUserId[set1.users.user3.id][0],
          request4: set1.requests2.idsSentFromUserId[set1.users.user4.id][0],
          request5: set1.requests2.idsSentFromUserId[set1.users.user5.id][0],
        },
      },
      user1: { id: set1.users.user1.id },
      user2: { id: set1.users.user2.id },
      user3: { id: set1.users.user3.id },
      user4: { id: set1.users.user4.id },
      user5: { id: set1.users.user5.id },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.accountPermissions = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }

    let set1
    const createTestUserDocs = await (async function() {
      const users = await create.usersAccountPermissions(testUserId)
      const requests1 = await create.requests.fromExistingUsersToExistingUsers(
        [testUserId],
        users.ids
      )
      const requests2 = await create.requests.fromExistingUsersToExistingUsers(
        users.ids,
        [testUserId]
      )
      set1 = { users, requests1, requests2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        sent: {
          request1: set1.requests1.idsSentToUserId[set1.users.user1.id][0],
          request2: set1.requests1.idsSentToUserId[set1.users.user2.id][0],
          request3: set1.requests1.idsSentToUserId[set1.users.user3.id][0],
          request4: set1.requests1.idsSentToUserId[set1.users.user4.id][0],
          request5: set1.requests1.idsSentToUserId[set1.users.user5.id][0],
          request6: set1.requests1.idsSentToUserId[set1.users.user6.id][0],
          request7: set1.requests1.idsSentToUserId[set1.users.user7.id][0],
          request8: set1.requests1.idsSentToUserId[set1.users.user8.id][0],
          request9: set1.requests1.idsSentToUserId[set1.users.user9.id][0],
        },
        received: {
          request1: set1.requests2.idsSentFromUserId[set1.users.user1.id][0],
          request2: set1.requests2.idsSentFromUserId[set1.users.user2.id][0],
          request3: set1.requests2.idsSentFromUserId[set1.users.user3.id][0],
          request4: set1.requests2.idsSentFromUserId[set1.users.user4.id][0],
          request5: set1.requests2.idsSentFromUserId[set1.users.user5.id][0],
          request6: set1.requests2.idsSentFromUserId[set1.users.user6.id][0],
          request7: set1.requests2.idsSentFromUserId[set1.users.user7.id][0],
          request8: set1.requests2.idsSentFromUserId[set1.users.user8.id][0],
          request9: set1.requests2.idsSentFromUserId[set1.users.user9.id][0],
        },
      },
      user1: { id: set1.users.user1.id },
      user2: { id: set1.users.user2.id },
      user3: { id: set1.users.user3.id },
      user4: { id: set1.users.user4.id },
      user5: { id: set1.users.user5.id },
      user6: { id: set1.users.user6.id },
      user7: { id: set1.users.user7.id },
      user8: { id: set1.users.user8.id },
      user9: { id: set1.users.user9.id },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.many = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }

    let set1
    const createTestUserDocs = await (async function() {
      const id = testUserId
      const requests1 = await create.requests.fromExistingUsersToNewUsers(
        [id],
        50
      )
      const requests2 = await create.requests.fromNewUsersToExistingUsers(50, [
        id,
      ])
      set1 = { requests1, requests2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        requests1: set1.requests1,
        requests2: set1.requests2,
      },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.empty = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }

    let set1
    const createTestUserDocs = await (async function() {
      // delete all requests sent to test user or received...
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      set2 = { users }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: { id: set2.users.ids[0] },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.socialConnections = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }

    let set1
    const createTestUserDocs = await (async function() {
      const users = await create.userSocialConnections(testUserId)
      const requests1 = await create.requests.fromExistingUsersToExistingUsers(
        [testUserId],
        users.ids
      )
      const requests2 = await create.requests.fromExistingUsersToExistingUsers(
        users.ids,
        [testUserId]
      )
      set1 = { users, requests1, requests2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        sent: {
          request1: set1.requests1.idsSentToUserId[set1.users.user1.id][0],
          request2: set1.requests1.idsSentToUserId[set1.users.user2.id][0],
          request3: set1.requests1.idsSentToUserId[set1.users.user3.id][0],
          request4: set1.requests1.idsSentToUserId[set1.users.user4.id][0],
          request5: set1.requests1.idsSentToUserId[set1.users.user5.id][0],
          request6: set1.requests1.idsSentToUserId[set1.users.user6.id][0],
          request7: set1.requests1.idsSentToUserId[set1.users.user7.id][0],
          request8: set1.requests1.idsSentToUserId[set1.users.user8.id][0],
        },
        received: {
          request1: set1.requests2.idsSentFromUserId[set1.users.user1.id][0],
          request2: set1.requests2.idsSentFromUserId[set1.users.user2.id][0],
          request3: set1.requests2.idsSentFromUserId[set1.users.user3.id][0],
          request4: set1.requests2.idsSentFromUserId[set1.users.user4.id][0],
          request5: set1.requests2.idsSentFromUserId[set1.users.user5.id][0],
          request6: set1.requests2.idsSentFromUserId[set1.users.user6.id][0],
          request7: set1.requests2.idsSentFromUserId[set1.users.user7.id][0],
          request8: set1.requests2.idsSentFromUserId[set1.users.user8.id][0],
        },
      },
      user1: { id: set1.users.user1.id },
      user2: { id: set1.users.user2.id },
      user3: { id: set1.users.user3.id },
      user4: { id: set1.users.user4.id },
      user5: { id: set1.users.user5.id },
      user6: { id: set1.users.user6.id },
      user7: { id: set1.users.user7.id },
      user8: { id: set1.users.user8.id },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.nonexistent = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }
    let set1
    const createTestUserDocs = await (async function() {
      const users = await create.users.newPrivateUsers(2)
      const user1 = users.docs[0]
      const user2 = users.docs[1]

      const sent1 = await create.requests.fromExistingUsersToExistingUsers(
        [testUserId],
        [user1._id]
      )
      const sent2 = await create.requests.fromExistingUsersToExistingUsers(
        [testUserId],
        [user2._id]
      )
      const received1 = await create.requests.fromExistingUsersToExistingUsers(
        [user1._id],
        [testUserId]
      )
      const received2 = await create.requests.fromExistingUsersToExistingUsers(
        [user2._id],
        [testUserId]
      )

      await q.crud.delete.user.findByIdAndRemove(user1._id)
      await q.crud.delete.request.findByIdAndRemove(sent2.ids[0])
      await q.crud.delete.request.findByIdAndRemove(received2.ids[0])

      set1 = { user1, sent1, sent2, received1, received2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        sent: {
          request1: { id: set1.sent1.ids[0] },
          request2: { id: set1.sent2.ids[0] },
        },
        received: {
          request1: { id: set1.received1.ids[0] },
          request2: { id: set1.received2.ids[0] },
        },
      },
      user1: { id: set1.user1._id },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.refs = {
  accountStatus: async testUserId => {
    try {
      if (testUserId === null || testUserId === undefined) {
        const testUser = await q.crud.create.user.new(h.fakeFields.user())
        testUserId = testUser._id
      }
      return {
        testUserId,
        testUser: { id: testUserId },
      }
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  socialConnections: async testUserId => {
    try {
      if (testUserId === null || testUserId === undefined) {
        const testUser = await q.crud.create.user.new(h.fakeFields.user())
        testUserId = testUser._id
      }
      return {
        testUserId,
        testUser: { id: testUserId },
      }
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  nonexistent: async testUserId => {
    try {
      if (testUserId === null || testUserId === undefined) {
        const testUser = await q.crud.create.user.new(h.fakeFields.user())
        testUserId = testUser._id
      }
      return {
        testUserId,
        testUser: { id: testUserId },
      }
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
}

module.exports.all = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }
    return {
      testUserId,
      testUser: { id: testUserId },
      fields: await this.fields(testUserId),
      adminOnly: await this.adminOnly(testUserId),
      selfOnly: await this.selfOnly(testUserId),
      accountStatus: await this.accountStatus(testUserId),
      accountPermissions: await this.accountPermissions(testUserId),
      many: await this.many(testUserId),
      empty: await this.empty(testUserId),
      socialConnections: await this.socialConnections(testUserId),
      nonexistent: await this.nonexistent(testUserId),
      refs: {
        accountStatus: await this.refs.accountStatus(testUserId),
        socialConnections: await this.refs.socialConnections(testUserId),
        nonexistent: await this.refs.nonexistent(testUserId),
      },
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
