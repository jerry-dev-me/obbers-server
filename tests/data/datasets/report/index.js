const logger = require('../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'DATASETS-REPORT' // logSubgroup

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
        const users = await create.following.existingUsersFollowNewPublicUsers(
          [testUserId],
          1
        )
        return users.ids[0]
      })(),
      category: 'OTHER',
      description: faker.lorem.sentence(),
      status: 'UNREAD',
      createdAt: new Date(),
    }

    const invalid = {
      sentFromUserId: 123,
      sentToUserId: 123,
      category: 123,
      description: 123,
      status: 123,
      createdAt: 123,
    }

    const otherUserId = {
      sentFromUserId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        return users.ids[0]
      })(),
      sentToUserId: await (async function() {
        const following = await create.following.existingUsersFollowNewPublicUsers(
          [testUserId],
          1
        )
        return following.ids[0]
      })(),
      category: 'OTHER',
      description: faker.lorem.sentence(),
      status: 'UNREAD',
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
      category: 'OTHER',
      description: faker.lorem.sentence(),
      status: 'UNREAD',
      createdAt: new Date(),
    }

    const empty = {
      sentFromUserId: '',
      sentToUserId: '',
      category: '',
      description: '',
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
          category: 'OTHER',
          description: faker.lorem.sentence(),
          status: 'UNREAD',
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
          category: 'OTHER',
          description: faker.lorem.sentence(),
          status: 'UNREAD',
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
          category: 'OTHER',
          description: faker.lorem.sentence(),
          status: 'UNREAD',
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
      const users1 = await create.users.newPrivateUsers(1)
      const users2 = await create.users.newPrivateUsers(1)
      const reports1 = await create.reports.fromExistingUsersToExistingUsers(
        users1.ids,
        users2.ids
      )
      const reports2 = await create.reports.fromExistingUsersToExistingUsers(
        users2.ids,
        users1.ids
      )
      set1 = { users1, users2, reports1, reports2 }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set1.users1.ids[0],
        report1: { id: set1.reports1.ids[0] },
      },
      user2: {
        id: set1.users2.ids[0],
        report1: { id: set1.reports2.ids[0] },
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
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const reports = await create.reports.fromExistingUsersToExistingUsers(
        [testUserId],
        users.ids
      )
      set1 = { reports }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const reports = await create.reports.fromExistingUsersToNewUsers(
        users.ids,
        1
      )
      set2 = { users, reports }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        report1: { id: set1.reports.ids[0] },
      },
      user1: {
        id: set2.users.ids[0],
        report1: { id: set2.reports.ids[0] },
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
      const id = testUserId
      const reports = await create.reports.fromExistingUsersToNewUsers([id], 1)
      set1 = { reports }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountStatus(testUserId)
      const reports = await create.reports.fromExistingUsersToNewUsers(
        users.ids,
        1
      )
      set2 = { users, reports }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        report1: { id: set1.reports.ids[0] },
      },
      user1: {
        id: set2.users.user1.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user1.id][0] },
      },
      user2: {
        id: set2.users.user2.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user2.id][0] },
      },
      user3: {
        id: set2.users.user3.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user3.id][0] },
      },
      user4: {
        id: set2.users.user4.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user4.id][0] },
      },
      user5: {
        id: set2.users.user5.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user5.id][0] },
      },
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
      const id = testUserId
      const reports = await create.reports.fromExistingUsersToNewUsers([id], 1)
      set1 = { reports }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountPermissions(testUserId)
      const reports = await create.reports.fromExistingUsersToNewUsers(
        users.ids,
        1
      )
      set2 = { users, reports }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        report1: { id: set1.reports.ids[0] },
      },
      user1: {
        id: set2.users.user1.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user1.id][0] },
      },
      user2: {
        id: set2.users.user2.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user2.id][0] },
      },
      user3: {
        id: set2.users.user3.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user3.id][0] },
      },
      user4: {
        id: set2.users.user4.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user4.id][0] },
      },
      user5: {
        id: set2.users.user5.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user5.id][0] },
      },
      user6: {
        id: set2.users.user6.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user6.id][0] },
      },
      user7: {
        id: set2.users.user7.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user7.id][0] },
      },
      user8: {
        id: set2.users.user8.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user8.id][0] },
      },
      user9: {
        id: set2.users.user9.id,
        report1: { id: set2.reports.idsSentFromUserId[set2.users.user9.id][0] },
      },
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
      const reports = await create.reports.fromExistingUsersToNewUsers([id], 1)
      set1 = { reports }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.users.newPrivateUsers(2)
      const user1 = users.docs[0]
      const user2 = users.docs[1]
      await create.reports.fromNewUsersToExistingUsers(50, [user1._id])
      await create.reports.fromExistingUsersToNewUsers([user2._id], 50)

      await create.reports.fromNewUsersToNewUsers(50, 2, 'OTHER')
      await create.reports.fromNewUsersToNewUsers(50, 2, 'SPAM_BEHAVIOUR')
      await create.reports.fromNewUsersToNewUsers(50, 2, 'AGGRESSIVE_BEHAVIOUR')
      await create.reports.fromNewUsersToNewUsers(50, 2, 'EXPLICIT_CONTENT')

      set2 = { user1, user2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        report1: { id: set1.reports.ids[0] },
      },
      user1: {
        id: set2.user1._id,
      },
      user2: {
        id: set2.user2._id,
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

    // clear database, make sure no reports docs are found...

    let set1
    const createUsersDocs = await (async function() {
      const users = await create.users.newPrivateUsers(2)
      set1 = { users }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: { id: set1.users.ids[0] },
      user2: { id: set1.users.ids[1] },
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
    const createUsersDocs = await (async function() {
      const users = await create.userSocialConnections(testUserId)
      set1 = { users }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
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
    const createUsersDocs = await (async function() {
      const users = await create.users.newPrivateUsers(2)
      const user1 = users.docs[0]
      const user2 = users.docs[1]

      const reports = await create.reports.fromExistingUsersToNewUsers(
        users.ids,
        1
      )
      const report1 = { id: reports.idsSentFromUserId[user1._id][0] }
      const report2 = { id: reports.idsSentFromUserId[user2._id][0] }

      await q.crud.delete.user.findByIdAndRemove(user1._id)
      await q.crud.delete.report.findByIdAndRemove(report2.id)

      set1 = { user1, user2, report1, report2 }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set1.user1._id,
        report1: { id: set1.report1.id },
      },
      user2: {
        id: set1.user2._id,
        report1: { id: set1.report2.id },
      },
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
