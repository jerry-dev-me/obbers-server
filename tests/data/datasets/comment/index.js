const logger = require('../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'DATASETS-COMMENT' // logSubgroup

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
      userId: testUserId,
      postId: await (async function() {
        const posts = await create.posts.fromExistingUserIds([testUserId], 1)
        return posts.ids[0]
      })(),
      content: faker.lorem.sentence(),
      likes: [],
      responses: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const invalid = {
      userId: 123,
      postId: 123,
      content: 123,
      likes: 123,
      responses: 123,
      createdAt: 123,
      modifiedAt: 123,
    }

    const otherUserId = {
      userId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        return users.ids[0]
      })(),
      postId: await (async function() {
        const posts = await create.posts.fromExistingUserIds([testUserId], 1)
        return posts.ids[0]
      })(),
      content: faker.lorem.sentence(),
      likes: [],
      responses: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const deletedRefId = {
      userId: testUserId,
      postId: await (async function() {
        const posts = await create.posts.fromExistingUserIds([testUserId], 1)
        const postId = posts.ids[0]
        await q.crud.delete.post.findByIdAndRemove(postId)
        // await q.crud.delete.user.remove(postId);
        return postId
      })(),
      content: faker.lorem.sentence(),
      likes: [],
      responses: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const empty = {
      userId: '',
      postId: '',
      content: '',
      likes: '',
      responses: '',
      createdAt: '',
      modifiedAt: '',
    }

    const missing = {}

    const createFieldsWithUsersStatusRefs = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          postId: refId,
          content: faker.lorem.sentence(),
          likes: [],
          responses: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
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
          postId: refId,
          content: faker.lorem.sentence(),
          likes: [],
          responses: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
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
          postId: refId,
          content: faker.lorem.sentence(),
          likes: [],
          responses: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
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
      const ids = users.ids
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        ids,
        1,
        1
      )
      set1 = { users, comments }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set1.users.ids[0],
        comment1: { id: set1.comments.ids[0] },
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
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        1
      )
      const posts = await create.posts.fromExistingUserIds([id], 1)
      const comments2 = await create.comments.fromNewUsersOnExistingPosts(
        1,
        posts.ids,
        1
      )
      set1 = { comments, posts, comments2 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const id = testUserId
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [id],
        1
      )
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        users.ids,
        1,
        1
      )
      set2 = { users, comments }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        comment1: { id: set1.comments.ids[0] },
        post1: {
          id: set1.posts.ids[0],
          comment1: { id: set1.comments2.ids[0] },
        },
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

module.exports.accountStatus = async testUserId => {
  try {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }

    let set1
    const createTestUserDocs = await (async function() {
      const id = testUserId
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        2
      )
      const posts = await create.posts.fromExistingUserIds([id], 1)
      const users = await create.usersAccountStatus(testUserId)
      const comments2 = await create.comments.fromExistingUsersOnExistingPosts(
        users.ids,
        posts.ids,
        1
      )
      set1 = { comments, posts, users, comments2 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountStatus(testUserId)
      const ids = users.ids
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        ids,
        1,
        1
      )
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)
      const comments2 = await create.comments.fromNewPublicUsersOnExistingPosts(
        10,
        posts.ids,
        1
      )
      set2 = { users, comments, posts, comments2 }
    })()

    const { user1, user2, user3, user4, user5 } = users

    return {
      testUserId,
      testUser: {
        id: testUserId,
        comment1: { id: set1.comments.ids[0] },
        comment2: { id: set1.comments.ids[1] },
        post1: {
          id: set1.posts.ids[0],
          comment1: { id: set1.comments2.idsByUserId[set1.users.user1.id][0] },
          comment2: { id: set1.comments2.idsByUserId[set1.users.user2.id][0] },
          comment3: { id: set1.comments2.idsByUserId[set1.users.user3.id][0] },
          comment4: { id: set1.comments2.idsByUserId[set1.users.user4.id][0] },
          comment5: { id: set1.comments2.idsByUserId[set1.users.user5.id][0] },
        },
      },
      user1: {
        id: user1.id,
        comment1: { id: set2.comments.idsByUserId[user1.id][0] },
        post1: { id: set2.posts.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        comment1: { id: set2.comments.idsByUserId[user2.id][0] },
        post1: { id: set2.posts.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        comment1: { id: set2.comments.idsByUserId[user3.id][0] },
        post1: { id: set2.posts.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        comment1: { id: set2.comments.idsByUserId[user4.id][0] },
        post1: { id: set2.posts.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        comment1: { id: set2.comments.idsByUserId[user5.id][0] },
        post1: { id: set2.posts.idsByUserId[user5.id][0] },
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
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        2
      )
      const posts = await create.posts.fromExistingUserIds([id], 1)
      const comments2 = await create.comments.fromNewPublicUsersOnExistingPosts(
        10,
        posts.ids,
        1
      )
      set1 = { comments, posts, comments2 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountPermissions(testUserId)
      const ids = users.ids
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        ids,
        1,
        1
      )
      set2 = { users, comments }
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
    } = users

    return {
      testUserId,
      testUser: {
        id: testUserId,
        comment1: { id: set1.comments.ids[0] },
        comment2: { id: set1.comments.ids[1] },
        post1: { id: set1.posts.ids[0] },
      },
      user1: {
        id: user1.id,
        comment1: { id: set2.comments.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        comment1: { id: set2.comments.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        comment1: { id: set2.comments.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        comment1: { id: set2.comments.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        comment1: { id: set2.comments.idsByUserId[user5.id][0] },
      },
      user6: {
        id: user6.id,
        comment1: { id: set2.comments.idsByUserId[user6.id][0] },
      },
      user7: {
        id: user7.id,
        comment1: { id: set2.comments.idsByUserId[user7.id][0] },
      },
      user8: {
        id: user8.id,
        comment1: { id: set2.comments.idsByUserId[user8.id][0] },
      },
      user9: {
        id: user9.id,
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
      const id = testUserId
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        50
      )
      const posts = await create.posts.fromExistingUserIds([id], 1)
      const comments2 = await create.comments.fromNewPublicUsersOnExistingPosts(
        50,
        posts.ids,
        1
      )
      set1 = { comments, posts, comments2 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        50
      )
      const ids = users.ids
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        ids,
        1,
        1
      )
      const posts = await create.posts.fromExistingUserIds(ids, 1)
      const comments2 = await create.comments.fromNewPublicUsersOnExistingPosts(
        10,
        posts.ids,
        1
      )
      set2 = { users, comments, posts, comments2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        comments: set1.comments.docsByUserId[testUserId],
        post1: { id: set1.posts.ids[0] },
      },
      user1: {
        id: set2.users.ids[0],
        comments: set2.comments.docsByUserId[set2.users.ids[0]],
        comment1: { id: set2.comments2.idsByUserId[set2.users.ids[0]][0] },
      },
      post1: { id: set1.comments.docs[0].postId },
      post2: { id: set2.comments.docs[0].postId },
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
      const id = testUserId
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        1
      )
      set1 = { comments }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        50
      )
      const ids = users.ids
      const posts = await create.posts.fromExistingUserIds(ids, 1, 1)
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        ids,
        1,
        1
      )
      const posts2 = await create.posts.fromExistingUserIds(ids[0], 1, 1)
      set2 = { users, comments, posts2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        comments: set1.comments.docsByUserId[testUserId],
        comment1: set1.comments.ids[0],
      },
      user1: {
        id: set2.users.ids[0],
        comments: set2.comments.docsByUserId[set2.users.ids[0]],
        comment1: set2.comments.idsByUserId[set2.users.ids[0]][0],
        post1: { id: set2.posts2.ids[0] },
      },
      post1: { id: set1.comments.docs[0].postId },
      post2: { id: set2.comments.docs[0].postId },
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
      const ids = users.ids
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        ids,
        1,
        1
      )

      const posts = await create.posts.fromExistingUserIds([testUserId], 1)
      const comments2 = await create.comments.fromExistingUsersOnExistingPosts(
        users.ids,
        posts.ids,
        1
      )

      const posts2 = await create.posts.fromExistingUserIds(ids, 1)
      const comments3 = await create.comments.fromNewPublicUsersOnExistingPosts(
        10,
        posts2.ids,
        1
      )

      set1 = { users, comments, posts, comments2, posts2, comments3 }
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
        post1: {
          id: set1.posts.ids[0],
          comment1: { id: set1.comments2.idsByUserId[user1.id][0] },
          comment2: { id: set1.comments2.idsByUserId[user2.id][0] },
          comment3: { id: set1.comments2.idsByUserId[user3.id][0] },
          comment4: { id: set1.comments2.idsByUserId[user4.id][0] },
          comment5: { id: set1.comments2.idsByUserId[user5.id][0] },
          comment6: { id: set1.comments2.idsByUserId[user6.id][0] },
          comment7: { id: set1.comments2.idsByUserId[user7.id][0] },
          comment8: { id: set1.comments2.idsByUserId[user8.id][0] },
        },
      },
      user1: {
        id: user1.id,
        comments: set1.comments.docsByUserId[user1.id],
        comment1: { id: set1.comments.idsByUserId[user1.id][0] },
        post1: { id: set1.posts2.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        comments: set1.comments.docsByUserId[user2.id],
        comment1: { id: set1.comments.idsByUserId[user2.id][0] },
        post1: { id: set1.posts2.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        comments: set1.comments.docsByUserId[user3.id],
        comment1: { id: set1.comments.idsByUserId[user3.id][0] },
        post1: { id: set1.posts2.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        comments: set1.comments.docsByUserId[user4.id],
        comment1: { id: set1.comments.idsByUserId[user4.id][0] },
        post1: { id: set1.posts2.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        comments: set1.comments.docsByUserId[user5.id],
        comment1: { id: set1.comments.idsByUserId[user5.id][0] },
        post1: { id: set1.posts2.idsByUserId[user5.id][0] },
      },
      user6: {
        id: user6.id,
        comments: set1.comments.docsByUserId[user6.id],
        comment1: { id: set1.comments.idsByUserId[user6.id][0] },
        post1: { id: set1.posts2.idsByUserId[user6.id][0] },
      },
      user7: {
        id: user7.id,
        comments: set1.comments.docsByUserId[user7.id],
        comment1: { id: set1.comments.idsByUserId[user7.id][0] },
        post1: { id: set1.posts2.idsByUserId[user7.id][0] },
      },
      user8: {
        id: user8.id,
        comments: set1.comments.docsByUserId[user8.id],
        comment1: { id: set1.comments.idsByUserId[user8.id][0] },
        post1: { id: set1.posts2.idsByUserId[user8.id][0] },
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
      const id = testUserId
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        1
      )
      set1 = { comments }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPrivateUsers(
        [testUserId],
        1
      )
      const ids = users.ids
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        ids,
        1,
        1
      )
      const posts = await create.posts.fromExistingUserIds(ids, 1)
      set2 = { users, comments, posts }
    })()

    await q.crud.delete.comment.findByIdAndRemove(set1.comments.ids[0])
    await q.crud.delete.comment.findByIdAndRemove(set2.comments.ids[0])

    return {
      testUserId,
      testUser: {
        id: testUserId,
        comment1: { id: set1.comments.ids[0] },
      },
      user1: {
        id: set2.users.ids[0],
        comment1: { id: set2.comments.ids[0] },
        post1: { id: set2.posts.ids[0] },
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
        set2['refUsers'] = refUsers
        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)
        set1['posts'] = posts
        set1['commentsByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const comments = await create.comments.fromExistingUsersOnExistingPosts(
              [testUserId],
              posts.ids,
              1
            )
            set1.commentsByRefUserId[refUserId] = comments
            await Promise.all(
              comments.ids.map(async commentId => {
                const responses = await create.responses.fromExistingUsersOnExistingComments(
                  users1.ids,
                  [commentId],
                  1
                )
                const likes = await create.commentLikes.existingUsersLikeExistingComments(
                  users2.ids,
                  [commentId]
                )
              })
            )
          })
        )
      })()

      let set2 = {}
      const createUsersDocs = await (async function() {
        const users = await create.following.existingUsersFollowNewPublicUsers(
          [testUserId],
          1
        )
        const user1 = users.docs[0]
        set2['user1'] = user1
        const refUsers = await create.usersAccountStatus(user1._id)
        set2['refUsers'] = refUsers
        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)
        set2['posts'] = posts
        set2['commentsByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const comments = await create.comments.fromExistingUsersOnExistingPosts(
              [user1._id],
              posts.ids,
              1
            )
            set2.commentsByRefUserId[refUserId] = comments
            await Promise.all(
              comments.ids.map(async commentId => {
                const responses = await create.responses.fromExistingUsersOnExistingComments(
                  users1.ids,
                  [commentId],
                  1
                )
                const likes = await create.commentLikes.existingUsersLikeExistingComments(
                  users2.ids,
                  [commentId]
                )
              })
            )
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          comment1: {
            id: set1.commentsByRefUserId[set1.refUsers.user1.id].ids[0],
          },
          comment2: {
            id: set1.commentsByRefUserId[set1.refUsers.user2.id].ids[0],
          },
          comment3: {
            id: set1.commentsByRefUserId[set1.refUsers.user3.id].ids[0],
          },
          comment4: {
            id: set1.commentsByRefUserId[set1.refUsers.user4.id].ids[0],
          },
          comment5: {
            id: set1.commentsByRefUserId[set1.refUsers.user5.id].ids[0],
          },
        },
        user1: {
          id: set2.user1._id,
          comment1: {
            id: set2.commentsByRefUserId[set2.refUsers.user1.id].ids[0],
          },
          comment2: {
            id: set2.commentsByRefUserId[set2.refUsers.user2.id].ids[0],
          },
          comment3: {
            id: set2.commentsByRefUserId[set2.refUsers.user3.id].ids[0],
          },
          comment4: {
            id: set2.commentsByRefUserId[set2.refUsers.user4.id].ids[0],
          },
          comment5: {
            id: set2.commentsByRefUserId[set2.refUsers.user5.id].ids[0],
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
        set2['refUsers'] = refUsers
        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)
        set1['posts'] = posts
        set1['commentsByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const comments = await create.comments.fromExistingUsersOnExistingPosts(
              [testUserId],
              posts.ids,
              1
            )
            set1.commentsByRefUserId[refUserId] = comments
            await Promise.all(
              comments.ids.map(async commentId => {
                const responses = await create.responses.fromExistingUsersOnExistingComments(
                  users1.ids,
                  [commentId],
                  1
                )
                const likes = await create.commentLikes.existingUsersLikeExistingComments(
                  users2.ids,
                  [commentId]
                )
              })
            )
          })
        )
      })()

      let set2 = {}
      const createUsersDocs = await (async function() {
        const users = await create.following.existingUsersFollowNewPublicUsers(
          [testUserId],
          1
        )
        const user1 = users.docs[0]
        set2['user1'] = user1
        const refUsers = await create.userSocialConnections(user1._id)
        set2['refUsers'] = refUsers
        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)
        set2['posts'] = posts
        set2['commentsByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const comments = await create.comments.fromExistingUsersOnExistingPosts(
              [user1._id],
              posts.ids,
              1
            )
            set2.commentsByRefUserId[refUserId] = comments
            await Promise.all(
              comments.ids.map(async commentId => {
                const responses = await create.responses.fromExistingUsersOnExistingComments(
                  users1.ids,
                  [commentId],
                  1
                )
                const likes = await create.commentLikes.existingUsersLikeExistingComments(
                  users2.ids,
                  [commentId]
                )
              })
            )
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          comment1: {
            id: set1.commentsByRefUserId[set1.refUsers.user1.id].ids[0],
          },
          comment2: {
            id: set1.commentsByRefUserId[set1.refUsers.user2.id].ids[0],
          },
          comment3: {
            id: set1.commentsByRefUserId[set1.refUsers.user3.id].ids[0],
          },
          comment4: {
            id: set1.commentsByRefUserId[set1.refUsers.user4.id].ids[0],
          },
          comment5: {
            id: set1.commentsByRefUserId[set1.refUsers.user5.id].ids[0],
          },
          comment6: {
            id: set1.commentsByRefUserId[set1.refUsers.user6.id].ids[0],
          },
          comment7: {
            id: set1.commentsByRefUserId[set1.refUsers.user7.id].ids[0],
          },
          comment8: {
            id: set1.commentsByRefUserId[set1.refUsers.user8.id].ids[0],
          },
        },
        user1: {
          id: set2.user1._id,
          comment1: {
            id: set2.commentsByRefUserId[set2.refUsers.user1.id].ids[0],
          },
          comment2: {
            id: set2.commentsByRefUserId[set2.refUsers.user2.id].ids[0],
          },
          comment3: {
            id: set2.commentsByRefUserId[set2.refUsers.user3.id].ids[0],
          },
          comment4: {
            id: set2.commentsByRefUserId[set2.refUsers.user4.id].ids[0],
          },
          comment5: {
            id: set2.commentsByRefUserId[set2.refUsers.user5.id].ids[0],
          },
          comment6: {
            id: set2.commentsByRefUserId[set2.refUsers.user6.id].ids[0],
          },
          comment7: {
            id: set2.commentsByRefUserId[set2.refUsers.user7.id].ids[0],
          },
          comment8: {
            id: set2.commentsByRefUserId[set2.refUsers.user8.id].ids[0],
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

      let set1
      const createTestUserDocs = await (async function() {
        const id = testUserId
        const posts = await create.posts.fromNewPublicUsers(2, 1)
        const comments = await create.comments.fromExistingUsersOnExistingPosts(
          [id],
          posts.ids,
          1
        )
        await q.crud.delete.user.findByIdAndRemove(comments.docs[0]._id)
        await q.crud.delete.post.findByIdAndRemove(comments.docs[1].postId)
        set1 = { comments }
      })()

      let set2
      const createUsersDocs = await (async function() {
        const users = await create.following.existingUsersFollowNewPublicUsers(
          [testUserId],
          1
        )
        const user1 = users.docs[0]
        const posts = await create.posts.fromNewPublicUsers(2, 1)
        const comments = await create.comments.fromExistingUsersOnExistingPosts(
          [user1._id],
          posts.ids,
          1
        )
        await q.crud.delete.user.findByIdAndRemove(comments.docs[0]._id)
        await q.crud.delete.post.findByIdAndRemove(comments.docs[1].postId)
        set2 = { user1, comments }
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          comment1: { id: set1.comments.docs[0]._id },
          comment2: { id: set1.comments.docs[1]._id },
        },
        user1: {
          id: set2.user1._id,
          comment1: { id: set2.comments.docs[0]._id },
          comment2: { id: set2.comments.docs[1]._id },
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
