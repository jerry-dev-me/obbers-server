const logger = require('../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'DATASETS-ACTIVITIES' // logSubgroup

const faker = require('faker')
const c = require('../../../../app/config/constants')
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
      userId: testUserId,
      activityType: 'NEW_POST',
      refModel: 'post',
      refId: await (async function() {
        const posts = await create.posts.fromExistingUserIds([testUserId], 1)
        return posts.ids[0]
      })(),
      createdAt: new Date(),
    }

    const invalid = {
      userId: 123,
      activityType: 123,
      refModel: 123,
      refId: 123,
      createdAt: '',
    }

    const otherUserId = {
      userId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        return users.ids[0]
      })(),
      activityType: 'NEW_POST',
      refModel: 'post',
      refId: await (async function() {
        const posts = await create.posts.fromExistingUserIds([testUserId], 1)
        return posts.ids[0]
      })(),
      createdAt: new Date(),
    }

    const deletedRefId = {
      userId: testUserId,
      activityType: 'NEW_POST',
      refModel: 'post',
      refId: await (async function() {
        const posts = await create.posts.fromExistingUserIds([testUserId], 1)
        const postId = posts.ids[0]
        await q.crud.delete.post.findByIdAndRemove(postId)
        // await q.crud.delete.post.remove(postId);
        return postId
      })(),
      createdAt: new Date(),
    }

    const empty = {
      userId: '',
      activityType: '',
      refModel: '',
      refId: '',
      createdAt: '',
    }

    const missing = {}

    const createFieldsWithUsersStatusRefs = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          activityType: 'POST_LIKE',
          refModel: 'post',
          refId,
          createdAt: new Date(),
        })
      }

      const users = await create.usersAccountStatus(testUserId)
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)

      posts.docs.map(post => {
        const userId = post.userId
        let { user1, user2, user3, user4, user5 } = users
        if (u.isSameId(userId, user1.id) === true)
          fieldsObj('fields1', post._id)
        if (u.isSameId(userId, user2.id) === true)
          fieldsObj('fields2', post._id)
        if (u.isSameId(userId, user3.id) === true)
          fieldsObj('fields3', post._id)
        if (u.isSameId(userId, user4.id) === true)
          fieldsObj('fields4', post._id)
        if (u.isSameId(userId, user5.id) === true)
          fieldsObj('fields5', post._id)
      })

      return fields
    }

    const createFieldsWithSocialConnectionsRefs = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          activityType: 'POST_LIKE',
          refModel: 'post',
          refId,
          createdAt: new Date(),
        })
      }

      const users = await create.userSocialConnections(testUserId)
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)

      posts.docs.map(post => {
        const userId = post.userId
        let { user1, user2, user3, user4, user5, user6, user7, user8 } = users
        if (u.isSameId(userId, user1.id) === true)
          fieldsObj('fields1', post._id)
        if (u.isSameId(userId, user2.id) === true)
          fieldsObj('fields2', post._id)
        if (u.isSameId(userId, user3.id) === true)
          fieldsObj('fields3', post._id)
        if (u.isSameId(userId, user4.id) === true)
          fieldsObj('fields4', post._id)
        if (u.isSameId(userId, user5.id) === true)
          fieldsObj('fields5', post._id)
        if (u.isSameId(userId, user6.id) === true)
          fieldsObj('fields6', post._id)
        if (u.isSameId(userId, user7.id) === true)
          fieldsObj('fields7', post._id)
        if (u.isSameId(userId, user8.id) === true)
          fieldsObj('fields8', post._id)
      })

      return fields
    }

    const createFieldsWithNonexistentRefs = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          activityType: 'POST_LIKE',
          refModel: 'post',
          refId,
          createdAt: new Date(),
        })
      }

      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        2
      )

      const posts = await create.posts.fromExistingUserIds(users.ids, 1)

      const post1 = posts.docs[0]
      const post2 = posts.docs[1]

      await q.crud.delete.user.findByIdAndRemove(post1.userId)
      await q.crud.delete.post.findByIdAndRemove(post2._id)

      fieldsObj('fields1', post1._id)
      fieldsObj('fields2', post2._id)

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
      const activities = await create.activities.all(users.ids, 1)
      set1 = { users, activities }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set1.users.ids[0],
        activities: set1.activities.docsByUserId[set1.users.ids[0]],
        activity1: { id: set1.activities.ids[0] },
        activity2: { id: set1.activities.ids[1] },
        activity3: { id: set1.activities.ids[2] },
        activity4: { id: set1.activities.ids[3] },
        activity5: { id: set1.activities.ids[4] },
        activity6: { id: set1.activities.ids[5] },
        activity7: { id: set1.activities.ids[6] },
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
      const activities = await create.activities.all([testUserId], 1)
      const activitiesObject = {}
      activities.docsByUserId[testUserId].map(async activity => {
        activitiesObject[activity.activityType] = activity
      })
      set1 = { activities, activitiesObject }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPrivateUsers(
        [testUserId],
        1
      )
      const activities = await create.activities.all([users.ids[0]], 1)
      const activitiesObject = {}
      activities.docsByUserId[users.ids[0]].map(async activity => {
        activitiesObject[activity.activityType] = activity
      })
      set2 = { users, activities, activitiesObject }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        activities: set1.activities.docsByUserId[testUserId],
        activity1: { id: set1.activitiesObject['NEW_POST']._id },
        activity2: { id: set1.activitiesObject['NEW_COMMENT']._id },
        activity3: { id: set1.activitiesObject['NEW_RESPONSE']._id },
        activity4: { id: set1.activitiesObject['COMMENT_LIKE']._id },
        activity5: { id: set1.activitiesObject['POST_LIKE']._id },
        activity6: { id: set1.activitiesObject['RESPONSE_LIKE']._id },
        activity7: { id: set1.activitiesObject['NEW_FOLLOWING']._id },
      },
      user1: {
        id: set2.users.ids[0],
        activities: set2.activities.docsByUserId[set2.users.ids[0]],
        activity1: { id: set2.activitiesObject['NEW_POST']._id },
        activity2: { id: set2.activitiesObject['NEW_COMMENT']._id },
        activity3: { id: set2.activitiesObject['NEW_RESPONSE']._id },
        activity4: { id: set2.activitiesObject['COMMENT_LIKE']._id },
        activity5: { id: set2.activitiesObject['POST_LIKE']._id },
        activity6: { id: set2.activitiesObject['RESPONSE_LIKE']._id },
        activity7: { id: set2.activitiesObject['NEW_FOLLOWING']._id },
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
      const activities = await create.activities.all([testUserId], 1)
      set1 = { activities }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountStatus(testUserId)
      const activities = await create.activities.all(users.ids, 1)
      set2 = { users, activities }
    })()

    const { user1, user2, user3, user4, user5 } = set2.users

    return {
      testUserId,
      testUser: {
        id: testUserId,
        activities: set1.activities.docsByUserId[testUserId],
        activity1: { id: set1.activities.docsByUserId[testUserId][0]._id },
      },
      user1: {
        id: user1.id,
        activities: set2.activities.docsByUserId[user1.id],
        activity1: { id: set2.activities.docsByUserId[user1.id][0]._id },
      },
      user2: {
        id: user2.id,
        activities: set2.activities.docsByUserId[user2.id],
        activity1: { id: set2.activities.docsByUserId[user2.id][0]._id },
      },
      user3: {
        id: user3.id,
        activities: set2.activities.docsByUserId[user3.id],
        activity1: { id: set2.activities.docsByUserId[user3.id][0]._id },
      },
      user4: {
        id: user4.id,
        activities: set2.activities.docsByUserId[user4.id],
        activity1: { id: set2.activities.docsByUserId[user4.id][0]._id },
      },
      user5: {
        id: user5.id,
        activities: set2.activities.docsByUserId[user5.id],
        activity1: { id: set2.activities.docsByUserId[user5.id][0]._id },
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
      const activities = await create.activities.all([testUserId], 1)
      set1 = { activities }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountPermissions(testUserId)
      const activities = await create.activities.all(users.ids, 1)
      set2 = { users, activities }
    })()

    const {
      user1,
      user2,
      user3,
      user4,
      user5,
      user6,
      user7,
      user8,
      user9,
    } = set2.users

    return {
      testUserId,
      testUser: {
        id: testUserId,
        activities: set1.activities.docsByUserId[testUserId],
        activity1: { id: set1.activities.docsByUserId[testUserId][0]._id },
      },
      user1: {
        id: user1.id,
        activities: set2.activities.docsByUserId[user1.id],
        activity1: { id: set2.activities.docsByUserId[user1.id][0]._id },
      },
      user2: {
        id: user2.id,
        activities: set2.activities.docsByUserId[user2.id],
        activity1: { id: set2.activities.docsByUserId[user2.id][0]._id },
      },
      user3: {
        id: user3.id,
        activities: set2.activities.docsByUserId[user3.id],
        activity1: { id: set2.activities.docsByUserId[user3.id][0]._id },
      },
      user4: {
        id: user4.id,
        activities: set2.activities.docsByUserId[user4.id],
        activity1: { id: set2.activities.docsByUserId[user4.id][0]._id },
      },
      user5: {
        id: user5.id,
        activities: set2.activities.docsByUserId[user5.id],
        activity1: { id: set2.activities.docsByUserId[user5.id][0]._id },
      },
      user6: {
        id: user6.id,
        activities: set2.activities.docsByUserId[user6.id],
        activity1: { id: set2.activities.docsByUserId[user6.id][0]._id },
      },
      user7: {
        id: user7.id,
        activities: set2.activities.docsByUserId[user7.id],
        activity1: { id: set2.activities.docsByUserId[user7.id][0]._id },
      },
      user8: {
        id: user8.id,
        activities: set2.activities.docsByUserId[user8.id],
        activity1: { id: set2.activities.docsByUserId[user8.id][0]._id },
      },
      user9: {
        id: user9.id,
        activities: set2.activities.docsByUserId[user9.id],
        activity1: { id: set2.activities.docsByUserId[user9.id][0]._id },
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
      const activities = await create.activities.all([testUserId], 10)
      set1 = { activities }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPrivateUsers(
        [testUserId],
        10
      )
      const activities = await create.activities.all(users.ids, 10)
      set2 = { users, activities }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        activities: set1.activities.docsByUserId[testUserId],
      },
      user1: {
        id: set2.users.ids[0],
        activities: set2.activities.docsByUserId[set2.users.ids[0]],
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
      const activities = []
      set1 = { activities }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPrivateUsers(
        [testUserId],
        10
      )
      const activities = []
      set2 = { users, activities }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: { id: set2.users.ids[0] },
      user2: { id: set2.users.ids[1] },
      user3: { id: set2.users.ids[2] },
      user4: { id: set2.users.ids[3] },
      user5: { id: set2.users.ids[4] },
      user6: { id: set2.users.ids[5] },
      user7: { id: set2.users.ids[6] },
      user8: { id: set2.users.ids[7] },
      user9: { id: set2.users.ids[8] },
      user10: { id: set2.users.ids[9] },
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
      const activities = await create.activities.all(users.ids, 1)
      set1 = { users, activities }
    })()

    const {
      user1,
      user2,
      user3,
      user4,
      user5,
      user6,
      user7,
      user8,
    } = set1.users

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: user1.id,
        activities: set1.activities.docsByUserId[user1.id],
        activity1: { id: set1.activities.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        activities: set1.activities.docsByUserId[user2.id],
        activity1: { id: set1.activities.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        activities: set1.activities.docsByUserId[user3.id],
        activity1: { id: set1.activities.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        activities: set1.activities.docsByUserId[user4.id],
        activity1: { id: set1.activities.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        activities: set1.activities.docsByUserId[user5.id],
        activity1: { id: set1.activities.idsByUserId[user5.id][0] },
      },
      user6: {
        id: user6.id,
        activities: set1.activities.docsByUserId[user6.id],
        activity1: { id: set1.activities.idsByUserId[user6.id][0] },
      },
      user7: {
        id: user7.id,
        activities: set1.activities.docsByUserId[user7.id],
        activity1: { id: set1.activities.idsByUserId[user7.id][0] },
      },
      user8: {
        id: user8.id,
        activities: set1.activities.docsByUserId[user8.id],
        activity1: { id: set1.activities.idsByUserId[user8.id][0] },
      },
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

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPrivateUsers(
        [testUserId],
        2
      )
      const activities = await create.activities.all(users.ids, 1)

      const user1 = users.docs[0]
      const user2 = users.docs[1]

      let user1ActivitiesByType = {}
      activities.docsByUserId[user1._id].map(activity => {
        user1ActivitiesByType[activity.activityType] = activity
      })

      let user2ActivitiesByType = {}
      activities.docsByUserId[user2._id].map(activity => {
        user2ActivitiesByType[activity.activityType] = activity
      })

      await q.crud.delete.user.findByIdAndRemove(user1._id)

      await Promise.all(
        activities.docsByUserId[user2._id].map(async activity => {
          await q.crud.delete.activity.findByIdAndRemove(activity._id)
        })
      )

      set2 = {
        user1,
        user2,
        activities,
        user1ActivitiesByType,
        user2ActivitiesByType,
      }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set2.user1._id,
        activities: set2.activities.docsByUserId[set2.user1._id],
        activity1: { id: set2.user1ActivitiesByType['NEW_POST']._id },
        activity2: { id: set2.user1ActivitiesByType['NEW_COMMENT']._id },
        activity3: { id: set2.user1ActivitiesByType['NEW_RESPONSE']._id },
        activity4: { id: set2.user1ActivitiesByType['POST_LIKE']._id },
        activity5: { id: set2.user1ActivitiesByType['COMMENT_LIKE']._id },
        activity6: { id: set2.user1ActivitiesByType['RESPONSE_LIKE']._id },
        activity7: { id: set2.user1ActivitiesByType['NEW_FOLLOWING']._id },
      },
      user2: {
        id: set2.user2._id,
        activities: set2.activities.docsByUserId[set2.user2._id],
        activity1: { id: set2.user2ActivitiesByType['NEW_POST']._id },
        activity2: { id: set2.user2ActivitiesByType['NEW_COMMENT']._id },
        activity3: { id: set2.user2ActivitiesByType['NEW_RESPONSE']._id },
        activity4: { id: set2.user2ActivitiesByType['POST_LIKE']._id },
        activity5: { id: set2.user2ActivitiesByType['COMMENT_LIKE']._id },
        activity6: { id: set2.user2ActivitiesByType['RESPONSE_LIKE']._id },
        activity7: { id: set2.user2ActivitiesByType['NEW_FOLLOWING']._id },
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

      let set1 = {}
      const createTestUserDocs = await (async function() {
        const refUsers = await create.usersAccountStatus(testUserId)
        set1['refUsers'] = refUsers
        // const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1);

        set1['activitiesByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromExistingUserIds([refUserId], 1)
            const activity = await create.activities.createActivity(
              testUserId,
              c.POST_LIKE,
              'post',
              posts.ids[0]
            )
            set1.activitiesByRefUserId[refUserId] = activity
          })
        )
      })()

      let set2 = {}
      const createUsersDocs = await (async function() {
        const users = await create.following.existingUsersFollowNewPrivateUsers(
          [testUserId],
          1
        )
        const user1 = users.docs[0]
        set2['user1'] = user1

        const refUsers = await create.usersAccountStatus(user1._id)
        set2['refUsers'] = refUsers

        await create.following.existingUsersFollowExistingUsers(
          [testUserId],
          [
            refUsers.user1.id,
            refUsers.user2.id,
            refUsers.user3.id,
            refUsers.user4.id,
          ]
        )

        set2['activitiesByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromExistingUserIds([refUserId], 1)
            const activity = await create.activities.createActivity(
              user1._id,
              c.POST_LIKE,
              'post',
              posts.ids[0]
            )
            set2.activitiesByRefUserId[refUserId] = activity
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          activity1: {
            id: set1.activitiesByRefUserId[set1.refUsers.user1.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user1.id].userId,
          },
          activity2: {
            id: set1.activitiesByRefUserId[set1.refUsers.user2.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user2.id].userId,
          },
          activity3: {
            id: set1.activitiesByRefUserId[set1.refUsers.user3.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user3.id].userId,
          },
          activity4: {
            id: set1.activitiesByRefUserId[set1.refUsers.user4.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user4.id].userId,
          },
          activity5: {
            id: set1.activitiesByRefUserId[set1.refUsers.user5.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user5.id].userId,
          },
        },
        user1: {
          id: set2.user1._id,
          activity1: {
            id: set2.activitiesByRefUserId[set2.refUsers.user1.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user1.id].userId,
          },
          activity2: {
            id: set2.activitiesByRefUserId[set2.refUsers.user2.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user2.id].userId,
          },
          activity3: {
            id: set2.activitiesByRefUserId[set2.refUsers.user3.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user3.id].userId,
          },
          activity4: {
            id: set2.activitiesByRefUserId[set2.refUsers.user4.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user4.id].userId,
          },
          activity5: {
            id: set2.activitiesByRefUserId[set2.refUsers.user5.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user5.id].userId,
          },
        },
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

      let set1 = {}
      const createTestUserDocs = await (async function() {
        const refUsers = await create.userSocialConnections(testUserId)
        set1['refUsers'] = refUsers
        // const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1);

        set1['activitiesByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromExistingUserIds([refUserId], 1)
            const activity = await create.activities.createActivity(
              testUserId,
              c.POST_LIKE,
              'post',
              posts.ids[0]
            )
            set1.activitiesByRefUserId[refUserId] = activity
          })
        )
      })()

      let set2 = {}
      const createUsersDocs = await (async function() {
        const users = await create.following.existingUsersFollowNewPrivateUsers(
          [testUserId],
          1
        )
        const user1 = users.docs[0]
        set2['user1'] = user1

        const refUsers = await create.userSocialConnections(testUserId)
        set2['refUsers'] = refUsers

        await create.following.existingUsersFollowExistingUsers(
          [user1._id],
          refUsers.ids
        )

        set2['activitiesByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromExistingUserIds([refUserId], 1)
            const activity = await create.activities.createActivity(
              user1._id,
              c.POST_LIKE,
              'post',
              posts.ids[0]
            )
            set2.activitiesByRefUserId[refUserId] = activity
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          activity1: {
            id: set1.activitiesByRefUserId[set1.refUsers.user1.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user1.id].userId,
          },
          activity2: {
            id: set1.activitiesByRefUserId[set1.refUsers.user2.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user2.id].userId,
          },
          activity3: {
            id: set1.activitiesByRefUserId[set1.refUsers.user3.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user3.id].userId,
          },
          activity4: {
            id: set1.activitiesByRefUserId[set1.refUsers.user4.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user4.id].userId,
          },
          activity5: {
            id: set1.activitiesByRefUserId[set1.refUsers.user5.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user5.id].userId,
          },
          activity6: {
            id: set1.activitiesByRefUserId[set1.refUsers.user6.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user6.id].userId,
          },
          activity7: {
            id: set1.activitiesByRefUserId[set1.refUsers.user7.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user7.id].userId,
          },
          activity8: {
            id: set1.activitiesByRefUserId[set1.refUsers.user8.id]._id,
            userId: set1.activitiesByRefUserId[set1.refUsers.user8.id].userId,
          },
        },
        user1: {
          id: set2.user1._id,
          activity1: {
            id: set2.activitiesByRefUserId[set2.refUsers.user1.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user1.id].userId,
          },
          activity2: {
            id: set2.activitiesByRefUserId[set2.refUsers.user2.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user2.id].userId,
          },
          activity3: {
            id: set2.activitiesByRefUserId[set2.refUsers.user3.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user3.id].userId,
          },
          activity4: {
            id: set2.activitiesByRefUserId[set2.refUsers.user4.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user4.id].userId,
          },
          activity5: {
            id: set2.activitiesByRefUserId[set2.refUsers.user5.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user5.id].userId,
          },
          activity6: {
            id: set2.activitiesByRefUserId[set2.refUsers.user6.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user6.id].userId,
          },
          activity7: {
            id: set2.activitiesByRefUserId[set2.refUsers.user7.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user7.id].userId,
          },
          activity8: {
            id: set2.activitiesByRefUserId[set2.refUsers.user8.id]._id,
            userId: set2.activitiesByRefUserId[set2.refUsers.user8.id].userId,
          },
        },
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

      let set1 = {}
      const createTestUserDocs = await (async function() {
        const refUsers = await create.following.existingUsersFollowNewPrivateUsers(
          [testUserId],
          2
        )

        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)

        const post1 = posts.docs[0]
        const post2 = posts.docs[1]

        const activity1 = await create.activities.createActivity(
          testUserId,
          c.POST_LIKE,
          'post',
          post1._id
        )
        const activity2 = await create.activities.createActivity(
          testUserId,
          c.POST_LIKE,
          'post',
          post2._id
        )

        set1['activity1'] = activity1
        set1['activity2'] = activity2

        await q.crud.delete.user.findByIdAndRemove(post1.userId)
        await q.crud.delete.post.findByIdAndRemove(post2._id)
      })()

      let set2 = {}
      const createUsersDocs = await (async function() {
        const users = await create.following.existingUsersFollowNewPrivateUsers(
          [testUserId],
          1
        )
        const user1 = users.docs[0]

        const refUsers = await create.following.existingUsersFollowNewPublicUsers(
          [user1._id],
          2
        )

        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)

        const post1 = posts.docs[0]
        const post2 = posts.docs[1]

        const activity1 = await create.activities.createActivity(
          user1._id,
          c.POST_LIKE,
          'post',
          post1._id
        )
        const activity2 = await create.activities.createActivity(
          user1._id,
          c.POST_LIKE,
          'post',
          post2._id
        )

        set2['user1'] = user1
        set2['activity1'] = activity1
        set2['activity2'] = activity2

        await q.crud.delete.user.findByIdAndRemove(post1.userId)
        await q.crud.delete.post.findByIdAndRemove(post2._id)
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          activity1: {
            id: set1.activity1._id,
            userId: set1.activity1.userId,
          },
          activity2: {
            id: set1.activity2._id,
            userId: set1.activity2.userId,
          },
        },
        user1: {
          id: set2.user1._id,
          activity1: {
            id: set2.activity1._id,
            userId: set2.activity1.userId,
          },
          activity2: {
            id: set2.activity2._id,
            userId: set2.activity2.userId,
          },
        },
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
