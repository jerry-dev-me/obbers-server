const logger = require('../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'DATASETS-RESPONSE' // logSubgroup

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

    const valid1 = {
      userId: testUserId,
      commentId: await (async function() {
        const comments = await create.comments.fromNewUsersOnNewPosts(1, 1, 1)
        return comments.ids[0]
      })(),
      content: faker.lorem.sentence(),
      likes: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const valid2 = {
      userId: testUserId,
      commentId: await (async function() {
        const comments = await create.comments.fromNewUsersOnNewPosts(1, 1, 1)
        return comments.ids[0]
      })(),
      content: faker.lorem.sentence(),
      // likes: [], // create likes and add !?!?!...
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const invalid = {
      userId: 123,
      commentId: 123,
      content: 123,
      likes: 123,
      createdAt: 123,
      modifiedAt: 123,
    }

    const otherUserId = {
      userId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        return users.ids[0]
      })(),
      commentId: await (async function() {
        const comments = await create.comments.fromNewUsersOnNewPosts(1, 1, 1)
        return comments.ids[0]
      })(),
      content: faker.lorem.sentence(),
      likes: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const deletedRefId = {
      userId: testUserId,
      commentId: await (async function() {
        const comments = await create.comments.fromNewUsersOnNewPosts(1, 1, 1)
        const commentId = comments.ids[0]
        await q.crud.delete.comment.findByIdAndRemove(commentId)
        // await q.crud.delete.comment.remove(commentId);
        return commentId
      })(),
      content: faker.lorem.sentence(),
      likes: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const empty = {
      userId: '',
      commentId: '',
      content: '',
      likes: '',
      createdAt: '',
      modifiedAt: '',
    }

    const missing = {}

    const createFieldsWithUsersStatusRefs1 = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          commentId: refId,
          content: faker.lorem.sentence(),
          likes: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
        })
      }

      const users = await create.usersAccountStatus(testUserId)
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)

      posts.docs.map(async post => {
        const userId = post.userId
        let { user1, user2, user3, user4, user5 } = users

        const comments = await create.comments.fromNewUsersOnExistingPosts(
          1,
          [post._id],
          1
        )
        const refId = comments.ids[0]

        if (u.isSameId(userId, user1.id) === true) fieldsObj('fields1', refId)
        if (u.isSameId(userId, user2.id) === true) fieldsObj('fields2', refId)
        if (u.isSameId(userId, user3.id) === true) fieldsObj('fields3', refId)
        if (u.isSameId(userId, user4.id) === true) fieldsObj('fields4', refId)
        if (u.isSameId(userId, user5.id) === true) fieldsObj('fields5', refId)
      })

      return fields
    }

    const createFieldsWithUsersStatusRefs2 = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          commentId: refId,
          content: faker.lorem.sentence(),
          likes: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
        })
      }

      const users = await create.usersAccountStatus(testUserId)
      const posts = await create.posts.fromNewPublicUsers(1, 1)
      const comments = await create.comments.fromExistingUsersOnExistingPosts(
        users.ids,
        posts.ids,
        1
      )

      comments.docs.map(comment => {
        const userId = comment.userId
        let { user1, user2, user3, user4, user5 } = users

        const refId = comment._id

        if (u.isSameId(userId, user1.id) === true) fieldsObj('fields1', refId)
        if (u.isSameId(userId, user2.id) === true) fieldsObj('fields2', refId)
        if (u.isSameId(userId, user3.id) === true) fieldsObj('fields3', refId)
        if (u.isSameId(userId, user4.id) === true) fieldsObj('fields4', refId)
        if (u.isSameId(userId, user5.id) === true) fieldsObj('fields5', refId)
      })

      return fields
    }

    const createFieldsWithSocialConnectionsRefs1 = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          commentId: refId,
          content: faker.lorem.sentence(),
          likes: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
        })
      }

      const users = await create.userSocialConnections(testUserId)
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)

      posts.docs.map(async post => {
        const userId = post.userId
        let { user1, user2, user3, user4, user5, user6, user7, user8 } = users

        const comments = await create.comments.fromNewUsersOnExistingPosts(
          1,
          [post._id],
          1
        )
        const refId = comments.ids[0]

        if (u.isSameId(userId, user1.id) === true) fieldsObj('fields1', refId)
        if (u.isSameId(userId, user2.id) === true) fieldsObj('fields2', refId)
        if (u.isSameId(userId, user3.id) === true) fieldsObj('fields3', refId)
        if (u.isSameId(userId, user4.id) === true) fieldsObj('fields4', refId)
        if (u.isSameId(userId, user5.id) === true) fieldsObj('fields5', refId)
        if (u.isSameId(userId, user6.id) === true) fieldsObj('fields6', refId)
        if (u.isSameId(userId, user7.id) === true) fieldsObj('fields7', refId)
        if (u.isSameId(userId, user8.id) === true) fieldsObj('fields8', refId)
      })

      return fields
    }

    const createFieldsWithSocialConnectionsRefs2 = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          commentId: refId,
          content: faker.lorem.sentence(),
          likes: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
        })
      }

      const users = await create.userSocialConnections(testUserId)
      const posts = await create.posts.fromNewPublicUsers(1, 1)
      const comments = await create.comments.fromExistingUsersOnExistingPosts(
        users.ids,
        posts.ids,
        1
      )

      comments.docs.map(comment => {
        const userId = comment.userId
        let { user1, user2, user3, user4, user5, user6, user7, user8 } = users

        const refId = comment._id

        if (u.isSameId(userId, user1.id) === true) fieldsObj('fields1', refId)
        if (u.isSameId(userId, user2.id) === true) fieldsObj('fields2', refId)
        if (u.isSameId(userId, user3.id) === true) fieldsObj('fields3', refId)
        if (u.isSameId(userId, user4.id) === true) fieldsObj('fields4', refId)
        if (u.isSameId(userId, user5.id) === true) fieldsObj('fields5', refId)
        if (u.isSameId(userId, user6.id) === true) fieldsObj('fields6', refId)
        if (u.isSameId(userId, user7.id) === true) fieldsObj('fields7', refId)
        if (u.isSameId(userId, user8.id) === true) fieldsObj('fields8', refId)
      })

      return fields
    }

    const createFieldsWithNonexistentRefs1 = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          commentId: refId,
          content: faker.lorem.sentence(),
          likes: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
        })
      }

      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        2
      )

      const user1 = users.docs[0]
      const user2 = users.docs[1]

      const posts = await create.posts.fromExistingUserIds(users.ids, 1)

      const post1 = posts.docsByUserId[user1._id][0]
      const post2 = posts.docsByUserId[user2._id][0]

      const comments1 = await create.comments.fromNewUsersOnExistingPosts(
        1,
        [post1._id],
        1
      )
      const comments2 = await create.comments.fromNewUsersOnExistingPosts(
        1,
        [post1._id],
        1
      )

      const comment1 = comments1.docs[0]
      const comment2 = comments2.docs[0]

      await q.crud.delete.user.findByIdAndRemove(user1._id)
      await q.crud.delete.post.findByIdAndRemove(post2._id)

      fieldsObj('fields1', comment1._id)
      fieldsObj('fields2', comment2._id)

      return fields
    }

    const createFieldsWithNonexistentRefs2 = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          commentId: refId,
          content: faker.lorem.sentence(),
          likes: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
        })
      }

      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        2
      )

      const user1 = users.docs[0]
      const user2 = users.docs[1]

      const posts = await create.posts.fromExistingUserIds(users.ids, 1)

      const post1 = posts.docsByUserId[user1._id][0]
      const post2 = posts.docsByUserId[user2._id][0]

      const comments1 = await create.comments.fromNewUsersOnExistingPosts(
        1,
        [post1._id],
        1
      )
      const comments2 = await create.comments.fromNewUsersOnExistingPosts(
        1,
        [post1._id],
        1
      )

      const comment1 = comments1.docs[0]
      const comment2 = comments2.docs[0]

      await q.crud.delete.user.findByIdAndRemove(comment1.userId)
      await q.crud.delete.post.findByIdAndRemove(comment2._id)

      fieldsObj('fields1', comment1._id)
      fieldsObj('fields2', comment2._id)

      return fields
    }

    return {
      testUserId,
      testUser: { id: testUserId },
      valid1,
      valid2,
      invalid,
      otherUserId,
      deletedRefId,
      empty,
      missing,
      withUsersStatusRefs1: await createFieldsWithUsersStatusRefs1(),
      withUsersStatusRefs2: await createFieldsWithUsersStatusRefs2(),
      withSocialConnectionsRefs1: await createFieldsWithSocialConnectionsRefs1(),
      withSocialConnectionsRefs2: await createFieldsWithSocialConnectionsRefs2(),
      withNonexistentRefs1: await createFieldsWithNonexistentRefs1(),
      withNonexistentRefs2: await createFieldsWithNonexistentRefs2(),
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
      const responses = await create.responses.fromExistingUsersOnNewComments(
        users.ids,
        1
      )
      set1 = { users, responses }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set1.users.ids[0],
        response1: { id: set1.responses.ids[0] },
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
      const responses = await create.responses.fromExistingUsersOnNewComments(
        [testUserId],
        1
      )
      set1 = { responses }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.users.newPrivateUsers(1)
      const responses = await create.responses.fromExistingUsersOnNewComments(
        users.ids,
        1
      )
      set2 = { users, responses }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        response1: { id: set1.responses.ids[0] },
      },
      user1: {
        id: set2.users.ids[0],
        response1: { id: set2.responses.ids[0] },
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
      const responses = await create.responses.fromExistingUsersOnNewComments(
        [testUserId],
        1
      )
      set1 = { responses }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountStatus(testUserId)
      const responses = await create.responses.fromExistingUsersOnNewComments(
        users.ids,
        1
      )
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        users.ids,
        1,
        1
      )
      await create.responses.fromNewUsersOnExistingComments(10, comments.ids, 1)
      set2 = { users, responses, comments }
    })()

    const { user1, user2, user3, user4, user5 } = set2.users

    return {
      testUserId,
      testUser: {
        id: testUserId,
        response1: { id: set1.responses.ids[0] },
      },
      user1: {
        id: user1.id,
        response1: { id: set2.responses.idsByUserId[user1.id][0] },
        comment1: { id: set2.comments.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        response1: { id: set2.responses.idsByUserId[user2.id][0] },
        comment1: { id: set2.comments.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        response1: { id: set2.responses.idsByUserId[user3.id][0] },
        comment1: { id: set2.comments.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        response1: { id: set2.responses.idsByUserId[user4.id][0] },
        comment1: { id: set2.comments.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        response1: { id: set2.responses.idsByUserId[user5.id][0] },
        comment1: { id: set2.comments.idsByUserId[user5.id][0] },
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
      const responses = await create.responses.fromExistingUsersOnNewComments(
        [testUserId],
        1
      )
      set1 = { responses }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountPermissions(testUserId)
      const responses = await create.responses.fromExistingUsersOnNewComments(
        users.ids,
        1
      )
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        users.ids,
        1,
        1
      )
      await create.responses.fromNewUsersOnExistingComments(10, comments.ids, 1)
      set2 = { users, responses, comments }
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
        response1: { id: set1.responses.ids[0] },
      },
      user1: {
        id: user1.id,
        response1: { id: set2.responses.idsByUserId[user1.id][0] },
        comment1: { id: set2.comments.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        response1: { id: set2.responses.idsByUserId[user2.id][0] },
        comment1: { id: set2.comments.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        response1: { id: set2.responses.idsByUserId[user3.id][0] },
        comment1: { id: set2.comments.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        response1: { id: set2.responses.idsByUserId[user4.id][0] },
        comment1: { id: set2.comments.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        response1: { id: set2.responses.idsByUserId[user5.id][0] },
        comment1: { id: set2.comments.idsByUserId[user5.id][0] },
      },
      user6: {
        id: user6.id,
        response1: { id: set2.responses.idsByUserId[user6.id][0] },
        comment1: { id: set2.comments.idsByUserId[user6.id][0] },
      },
      user7: {
        id: user7.id,
        response1: { id: set2.responses.idsByUserId[user7.id][0] },
        comment1: { id: set2.comments.idsByUserId[user7.id][0] },
      },
      user8: {
        id: user8.id,
        response1: { id: set2.responses.idsByUserId[user8.id][0] },
        comment1: { id: set2.comments.idsByUserId[user8.id][0] },
      },
      user9: {
        id: user9.id,
        response1: { id: set2.responses.idsByUserId[user9.id][0] },
        comment1: { id: set2.comments.idsByUserId[user9.id][0] },
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
      const comments = await create.comments.fromExistingUsersOnNewPublicPosts(
        [testUserId],
        1,
        1
      )
      const comment1 = comments.docs[0]
      await create.responses.fromNewUsersOnExistingComments(50, [comment1._id])
      await create.responses.fromExistingUsersOnNewComments([testUserId], 50, 1)
      set1 = { comment1 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const user1 = users.docs[0]
      const comments = await create.comments.fromExistingUsersOnNewPublicPosts(
        [user1._id],
        1,
        1
      )
      const comment1 = comments.docs[0]
      await create.responses.fromNewUsersOnExistingComments(50, [comment1._id])
      await create.responses.fromExistingUsersOnNewComments([user1._id], 50, 1)
      set2 = { user1, comment1 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        comment1: { id: set1.comment1._id },
      },
      user1: {
        id: set2.user1._id,
        comment1: { id: set2.comment1._id },
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
      const comments = await create.comments.fromExistingUsersOnNewPublicPosts(
        [testUserId],
        1,
        1
      )
      // clear all responses docs from testUser
      set1 = { comments }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const comments = await create.comments.fromNewUsersOnNewPosts(1, 1, 1)
      set2 = { users, comments }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        comment1: { id: set1.comments.ids[0] },
      },
      user1: {
        id: set2.users.ids[0],
        comment1: { id: set2.comments.ids[0] },
      },
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
      const responses = await create.responses.fromExistingUsersOnNewComments(
        users.ids,
        1
      )
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        users.ids,
        1,
        1
      )
      await create.responses.fromNewUsersOnExistingComments(10, comments.ids, 1)
      set1 = { users, responses, comments }
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
      testUser: {
        id: testUserId,
        response1: { id: set1.responses.ids[0] },
      },
      user1: {
        id: user1.id,
        response1: { id: set1.responses.idsByUserId[user1.id][0] },
        comment1: { id: set1.comments.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        response1: { id: set1.responses.idsByUserId[user2.id][0] },
        comment1: { id: set1.comments.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        response1: { id: set1.responses.idsByUserId[user3.id][0] },
        comment1: { id: set1.comments.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        response1: { id: set1.responses.idsByUserId[user4.id][0] },
        comment1: { id: set1.comments.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        response1: { id: set1.responses.idsByUserId[user5.id][0] },
        comment1: { id: set1.comments.idsByUserId[user5.id][0] },
      },
      user6: {
        id: user6.id,
        response1: { id: set1.responses.idsByUserId[user6.id][0] },
        comment1: { id: set1.comments.idsByUserId[user6.id][0] },
      },
      user7: {
        id: user7.id,
        response1: { id: set1.responses.idsByUserId[user7.id][0] },
        comment1: { id: set1.comments.idsByUserId[user7.id][0] },
      },
      user8: {
        id: user8.id,
        response1: { id: set1.responses.idsByUserId[user8.id][0] },
        comment1: { id: set1.comments.idsByUserId[user8.id][0] },
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

    let set1
    const createTestUserDocs = await (async function() {
      const responses = await create.responses.fromExistingUsersOnNewComments(
        [testUserId],
        50,
        1
      )
      const response1 = responses.docs[0]
      await q.crud.delete.response.findByIdAndRemove(response1._id)
      set1 = { response1 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        2
      )
      const user1 = users.docs[0]
      const user2 = users.docs[1]

      const responses = await create.responses.fromExistingUsersOnNewComments(
        users.ids,
        1,
        1
      )

      const response1 = responses.docsByUserId[user1._id][0]
      const response2 = responses.docsByUserId[user2._id][0]

      const comments = await create.comments.fromExistingUsersOnNewPosts(
        users.ids,
        1,
        1
      )

      const comment1 = comments.docsByUserId[user1._id][0]
      const comment2 = comments.docsByUserId[user2._id][0]

      await q.crud.delete.user.findByIdAndRemove(user1._id)
      await q.crud.delete.response.findByIdAndRemove(response2._id)
      await q.crud.delete.comment.findByIdAndRemove(comment2._id)

      set2 = { user1, user2, response1, response2, comment1, comment2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        response1: { id: set1.response1._id },
      },
      user1: {
        id: set2.user1._id,
        response1: { id: set2.response1._id },
        comment1: { id: set2.comment1._id },
      },
      user2: {
        id: set2.user2._id,
        response1: { id: set2.response2._id },
        comment1: { id: set2.comment2._id },
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
      const createTestUserDocs1 = await (async function() {
        set1['postsByRefUserId'] = {}
        set1['responsesByRefUserId'] = {}
        const refUsers = await create.usersAccountStatus(testUserId)
        set1['refUsers'] = refUsers
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromExistingUserIds([refUserId], 1)
            const comments = await create.comments.fromNewUsersOnExistingPosts(
              1,
              posts.ids,
              1
            )
            const responses = await create.responses.fromExistingUsersOnExistingComments(
              [testUserId],
              comments.ids,
              1
            )
            set1.postsByRefUserId[refUserId] = posts.docs
            set1.responsesByRefUserId[refUserId] = responses.docs
          })
        )
      })()

      let set2 = {}
      const createTestUserDocs2 = await (async function() {
        set2['commentsByRefUserId'] = {}
        set2['responsesByRefUserId'] = {}
        const refUsers = await create.usersAccountStatus(testUserId)
        set2['refUsers'] = refUsers
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromNewUsers(1, 1)
            const comments = await create.comments.fromExistingUsersOnExistingPosts(
              [refUserId],
              posts.ids,
              1
            )
            const responses = await create.responses.fromExistingUsersOnExistingComments(
              [testUserId],
              comments.ids,
              1
            )
            set2.commentsByRefUserId[refUserId] = comments.docs
            set2.responsesByRefUserId[refUserId] = responses.docs
          })
        )
      })()

      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const user1 = users.docs[0]

      let set3 = {}
      const createUsersDocs1 = await (async function() {
        set3['postsByRefUserId'] = {}
        set3['responsesByRefUserId'] = {}
        const refUsers = await create.usersAccountStatus(user1._id)
        set3['refUsers'] = refUsers
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromExistingUserIds([refUserId], 1)
            const comments = await create.comments.fromNewUsersOnExistingPosts(
              1,
              posts.ids,
              1
            )
            const responses = await create.responses.fromExistingUsersOnExistingComments(
              [user1._id],
              comments.ids,
              1
            )
            set3.postsByRefUserId[refUserId] = posts.docs
            set3.responsesByRefUserId[refUserId] = responses.docs
          })
        )
      })()

      let set4 = {}
      const createUsersDocs2 = await (async function() {
        set4['commentsByRefUserId'] = {}
        set4['responsesByRefUserId'] = {}
        const refUsers = await create.usersAccountStatus(user1._id)
        set4['refUsers'] = refUsers
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromNewUsers(1, 1)
            const comments = await create.comments.fromExistingUsersOnExistingPosts(
              [refUserId],
              posts.ids,
              1
            )
            const responses = await create.responses.fromExistingUsersOnExistingComments(
              [user1._id],
              comments.ids,
              1
            )

            set4.commentsByRefUserId[refUserId] = comments.docs
            set4.responsesByRefUserId[refUserId] = responses.docs
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          // post1: { comments from other users }
          // post1: { responses on comments from testUser }
          // post1: { responses on comments from other users }
          refsLev3: {
            response1: {
              id: set1.responsesByRefUserId[set1.refUsers.user1.id][0]._id,
            },
            response2: {
              id: set1.responsesByRefUserId[set1.refUsers.user2.id][0]._id,
            },
            response3: {
              id: set1.responsesByRefUserId[set1.refUsers.user3.id][0]._id,
            },
            response4: {
              id: set1.responsesByRefUserId[set1.refUsers.user4.id][0]._id,
            },
            response5: {
              id: set1.responsesByRefUserId[set1.refUsers.user5.id][0]._id,
            },
          },
          refsLev2: {
            response1: {
              id: set2.responsesByRefUserId[set2.refUsers.user1.id][0]._id,
            },
            response2: {
              id: set2.responsesByRefUserId[set2.refUsers.user2.id][0]._id,
            },
            response3: {
              id: set2.responsesByRefUserId[set2.refUsers.user3.id][0]._id,
            },
            response4: {
              id: set2.responsesByRefUserId[set2.refUsers.user4.id][0]._id,
            },
            response5: {
              id: set2.responsesByRefUserId[set2.refUsers.user5.id][0]._id,
            },
          },
        },
        user1: {
          id: user1._id,
          refsLev3: {
            response1: {
              id: set3.responsesByRefUserId[set3.refUsers.user1.id][0]._id,
            },
            response2: {
              id: set3.responsesByRefUserId[set3.refUsers.user2.id][0]._id,
            },
            response3: {
              id: set3.responsesByRefUserId[set3.refUsers.user3.id][0]._id,
            },
            response4: {
              id: set3.responsesByRefUserId[set3.refUsers.user4.id][0]._id,
            },
            response5: {
              id: set3.responsesByRefUserId[set3.refUsers.user5.id][0]._id,
            },
          },
          refsLev2: {
            response1: {
              id: set4.responsesByRefUserId[set4.refUsers.user1.id][0]._id,
            },
            response2: {
              id: set4.responsesByRefUserId[set4.refUsers.user2.id][0]._id,
            },
            response3: {
              id: set4.responsesByRefUserId[set4.refUsers.user3.id][0]._id,
            },
            response4: {
              id: set4.responsesByRefUserId[set4.refUsers.user4.id][0]._id,
            },
            response5: {
              id: set4.responsesByRefUserId[set4.refUsers.user5.id][0]._id,
            },
          },
        },
        refsLev3: {
          post1: { id: set1.postsByRefUserId[set1.refUsers.user1.id][0]._id },
          post2: { id: set1.postsByRefUserId[set1.refUsers.user2.id][0]._id },
          post3: { id: set1.postsByRefUserId[set1.refUsers.user3.id][0]._id },
          post4: { id: set1.postsByRefUserId[set1.refUsers.user4.id][0]._id },
          post5: { id: set1.postsByRefUserId[set1.refUsers.user5.id][0]._id },
        },
        refsLev2: {
          comment1: {
            id: set2.commentsByRefUserId[set2.refUsers.user1.id][0]._id,
          },
          comment2: {
            id: set2.commentsByRefUserId[set2.refUsers.user2.id][0]._id,
          },
          comment3: {
            id: set2.commentsByRefUserId[set2.refUsers.user3.id][0]._id,
          },
          comment4: {
            id: set2.commentsByRefUserId[set2.refUsers.user4.id][0]._id,
          },
          comment5: {
            id: set2.commentsByRefUserId[set2.refUsers.user5.id][0]._id,
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
      const createTestUserDocs1 = await (async function() {
        set1['postsByRefUserId'] = {}
        set1['responsesByRefUserId'] = {}
        const refUsers = await create.userSocialConnections(testUserId)
        set1['refUsers'] = refUsers
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromExistingUserIds([refUserId], 1)
            const comments = await create.comments.fromNewUsersOnExistingPosts(
              1,
              posts.ids,
              1
            )
            const responses = await create.responses.fromExistingUsersOnExistingComments(
              [testUserId],
              comments.ids,
              1
            )
            set1.postsByRefUserId[refUserId] = posts.docs
            set1.responsesByRefUserId[refUserId] = responses.docs
          })
        )
      })()

      let set2 = {}
      const createTestUserDocs2 = await (async function() {
        set2['commentsByRefUserId'] = {}
        set2['responsesByRefUserId'] = {}
        const refUsers = await create.userSocialConnections(testUserId)
        set2['refUsers'] = refUsers
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromNewUsers(1, 1)
            const comments = await create.comments.fromExistingUsersOnExistingPosts(
              [refUserId],
              posts.ids,
              1
            )
            const responses = await create.responses.fromExistingUsersOnExistingComments(
              [testUserId],
              comments.ids,
              1
            )
            set2.commentsByRefUserId[refUserId] = comments.docs
            set2.responsesByRefUserId[refUserId] = responses.docs
          })
        )
      })()

      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const user1 = users.docs[0]

      let set3 = {}
      const createUsersDocs1 = await (async function() {
        set3['postsByRefUserId'] = {}
        set3['responsesByRefUserId'] = {}
        const refUsers = await create.userSocialConnections(user1._id)
        set3['refUsers'] = refUsers
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromExistingUserIds([refUserId], 1)
            const comments = await create.comments.fromNewUsersOnExistingPosts(
              1,
              posts.ids,
              1
            )
            const responses = await create.responses.fromExistingUsersOnExistingComments(
              [user1._id],
              comments.ids,
              1
            )
            set3.postsByRefUserId[refUserId] = posts.docs
            set3.responsesByRefUserId[refUserId] = responses.docs
          })
        )
      })()

      let set4 = {}
      const createUsersDocs2 = await (async function() {
        set4['commentsByRefUserId'] = {}
        set4['responsesByRefUserId'] = {}
        const refUsers = await create.userSocialConnections(user1._id)
        set4['refUsers'] = refUsers
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const posts = await create.posts.fromNewUsers(1, 1)
            const comments = await create.comments.fromExistingUsersOnExistingPosts(
              [refUserId],
              posts.ids,
              1
            )
            const responses = await create.responses.fromExistingUsersOnExistingComments(
              [user1._id],
              comments.ids,
              1
            )
            set4.commentsByRefUserId[refUserId] = comments.docs
            set4.responsesByRefUserId[refUserId] = responses.docs
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          refsLev3: {
            response1: {
              id: set1.responsesByRefUserId[set1.refUsers.user1.id][0]._id,
            },
            response2: {
              id: set1.responsesByRefUserId[set1.refUsers.user2.id][0]._id,
            },
            response3: {
              id: set1.responsesByRefUserId[set1.refUsers.user3.id][0]._id,
            },
            response4: {
              id: set1.responsesByRefUserId[set1.refUsers.user4.id][0]._id,
            },
            response5: {
              id: set1.responsesByRefUserId[set1.refUsers.user5.id][0]._id,
            },
            response6: {
              id: set1.responsesByRefUserId[set1.refUsers.user6.id][0]._id,
            },
            response7: {
              id: set1.responsesByRefUserId[set1.refUsers.user7.id][0]._id,
            },
            response8: {
              id: set1.responsesByRefUserId[set1.refUsers.user8.id][0]._id,
            },
          },
          refsLev2: {
            response1: {
              id: set2.responsesByRefUserId[set2.refUsers.user1.id][0]._id,
            },
            response2: {
              id: set2.responsesByRefUserId[set2.refUsers.user2.id][0]._id,
            },
            response3: {
              id: set2.responsesByRefUserId[set2.refUsers.user3.id][0]._id,
            },
            response4: {
              id: set2.responsesByRefUserId[set2.refUsers.user4.id][0]._id,
            },
            response5: {
              id: set2.responsesByRefUserId[set2.refUsers.user5.id][0]._id,
            },
            response6: {
              id: set2.responsesByRefUserId[set2.refUsers.user6.id][0]._id,
            },
            response7: {
              id: set2.responsesByRefUserId[set2.refUsers.user7.id][0]._id,
            },
            response8: {
              id: set2.responsesByRefUserId[set2.refUsers.user8.id][0]._id,
            },
          },
        },
        user1: {
          id: user1._id,
          refsLev3: {
            response1: {
              id: set3.responsesByRefUserId[set3.refUsers.user1.id][0]._id,
            },
            response2: {
              id: set3.responsesByRefUserId[set3.refUsers.user2.id][0]._id,
            },
            response3: {
              id: set3.responsesByRefUserId[set3.refUsers.user3.id][0]._id,
            },
            response4: {
              id: set3.responsesByRefUserId[set3.refUsers.user4.id][0]._id,
            },
            response5: {
              id: set3.responsesByRefUserId[set3.refUsers.user5.id][0]._id,
            },
            response6: {
              id: set3.responsesByRefUserId[set3.refUsers.user6.id][0]._id,
            },
            response7: {
              id: set3.responsesByRefUserId[set3.refUsers.user7.id][0]._id,
            },
            response8: {
              id: set3.responsesByRefUserId[set3.refUsers.user8.id][0]._id,
            },
          },
          refsLev2: {
            response1: {
              id: set4.responsesByRefUserId[set4.refUsers.user1.id][0]._id,
            },
            response2: {
              id: set4.responsesByRefUserId[set4.refUsers.user2.id][0]._id,
            },
            response3: {
              id: set4.responsesByRefUserId[set4.refUsers.user3.id][0]._id,
            },
            response4: {
              id: set4.responsesByRefUserId[set4.refUsers.user4.id][0]._id,
            },
            response5: {
              id: set4.responsesByRefUserId[set4.refUsers.user5.id][0]._id,
            },
            response6: {
              id: set4.responsesByRefUserId[set4.refUsers.user6.id][0]._id,
            },
            response7: {
              id: set4.responsesByRefUserId[set4.refUsers.user7.id][0]._id,
            },
            response8: {
              id: set4.responsesByRefUserId[set4.refUsers.user8.id][0]._id,
            },
          },
        },
        refsLev3: {
          post1: { id: set1.postsByRefUserId[set1.refUsers.user1.id][0]._id },
          post2: { id: set1.postsByRefUserId[set1.refUsers.user2.id][0]._id },
          post3: { id: set1.postsByRefUserId[set1.refUsers.user3.id][0]._id },
          post4: { id: set1.postsByRefUserId[set1.refUsers.user4.id][0]._id },
          post5: { id: set1.postsByRefUserId[set1.refUsers.user5.id][0]._id },
          post6: { id: set1.postsByRefUserId[set1.refUsers.user6.id][0]._id },
          post7: { id: set1.postsByRefUserId[set1.refUsers.user7.id][0]._id },
          post8: { id: set1.postsByRefUserId[set1.refUsers.user8.id][0]._id },
        },
        refsLev2: {
          comment1: {
            id: set2.commentsByRefUserId[set2.refUsers.user1.id][0]._id,
          },
          comment2: {
            id: set2.commentsByRefUserId[set2.refUsers.user2.id][0]._id,
          },
          comment3: {
            id: set2.commentsByRefUserId[set2.refUsers.user3.id][0]._id,
          },
          comment4: {
            id: set2.commentsByRefUserId[set2.refUsers.user4.id][0]._id,
          },
          comment5: {
            id: set2.commentsByRefUserId[set2.refUsers.user5.id][0]._id,
          },
          comment6: {
            id: set2.commentsByRefUserId[set2.refUsers.user6.id][0]._id,
          },
          comment7: {
            id: set2.commentsByRefUserId[set2.refUsers.user7.id][0]._id,
          },
          comment8: {
            id: set2.commentsByRefUserId[set2.refUsers.user8.id][0]._id,
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

      const createResponse = async () => {
        const users = await create.following.existingUsersFollowNewPublicUsers(
          [testUserId],
          3
        )
        const user1 = users.docs[0]
        const user2 = users.docs[1]
        const user3 = users.docs[2]

        const posts = await create.posts.fromExistingUserIds([user1._id], 1)
        const comments = await create.comments.fromExistingUsersOnExistingPosts(
          [user2._id],
          posts.ids,
          1
        )
        const responses = await create.responses.fromExistingUsersOnExistingComments(
          [user3._id],
          comments.ids,
          1
        )

        return {
          user1: {
            id: user1._id,
            post1: { id: posts.ids[0] },
          },
          user2: {
            id: user2._id,
            comment1: { id: comments.ids[0] },
          },
          user3: {
            id: user3._id,
            response1: { id: responses.ids[0] },
          },
        }
      }

      let set1 = {}
      const nonexistentPostUser = await (async function() {
        const responseData = await createResponse()
        const id = responseData.user1.id
        await q.crud.delete.user.findByIdAndRemove(id)
        set1['response1'] = { id: responseData.user3.response1.id }
      })()

      let set2 = {}
      const nonexistentCommentUser = await (async function() {
        const responseData = await createResponse()
        const id = responseData.user2.id
        await q.crud.delete.user.findByIdAndRemove(id)
        set2['response2'] = { id: responseData.user3.response1.id }
      })()

      let set3 = {}
      const nonexistentResponseUser = await (async function() {
        const responseData = await createResponse()
        const id = responseData.user3.id
        await q.crud.delete.user.findByIdAndRemove(id)
        set3['response3'] = { id: responseData.user3.response1.id }
      })()

      let set4 = {}
      const nonexistentPostDoc = await (async function() {
        const responseData = await createResponse()
        const id = responseData.user1.post1.id
        await q.crud.delete.post.findByIdAndRemove(id)
        set4['response4'] = { id: responseData.user3.response1.id }
      })()

      let set5 = {}
      const nonexistentCommentDoc = await (async function() {
        const responseData = await createResponse()
        const id = responseData.user2.comment1.id
        await q.crud.delete.comment.findByIdAndRemove(id)
        set5['response5'] = { id: responseData.user3.response1.id }
      })()

      let set6 = {}
      const nonexistentResponseDoc = await (async function() {
        const responseData = await createResponse()
        const id = responseData.user3.response1.id
        await q.crud.delete.response.findByIdAndRemove(id)
        set6['response6'] = { id: responseData.user3.response1.id }
      })()

      return {
        testUserId,
        testUser: { id: testUserId },
        response1: { id: set1.response1.id },
        response2: { id: set2.response2.id },
        response3: { id: set3.response3.id },
        response4: { id: set4.response4.id },
        response5: { id: set5.response5.id },
        response6: { id: set6.response6.id },
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
