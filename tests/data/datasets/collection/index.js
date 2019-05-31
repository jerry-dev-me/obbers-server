const logger = require('../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'DATASETS-COLLECTION' // logSubgroup

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
      name: 'New Collection',
      posts: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const valid2 = {
      userId: testUserId,
      name: 'New Collection',
      posts: await (async function() {
        const posts = await create.posts.fromExistingUserIds([testUserId], 1)
        return posts.ids
      })(),
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const invalid = {
      userId: 123,
      name: 123,
      thumbnail: 123,
      posts: 123,
      createdAt: 123,
      modifiedAt: 123,
    }

    const otherUserId = {
      userId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        return users[0]
      })(),
      name: 'New Collection',
      posts: await (async function() {
        const posts = await create.posts.fromExistingUserIds([testUserId], 1)
        let arrayOfPosts = []
        return arrayOfPosts.push(posts.ids[0])
      })(),
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const deletedRefId = {
      userId: testUserId,
      name: 'New Collection',
      posts: [],
      refId: await (async function() {
        const posts = await create.posts.fromExistingUserIds([testUserId], 1)
        let arrayOfPosts = []
        await q.crud.delete.post.findByIdAndRemove(posts.ids[0])
        // await q.crud.delete.post.remove(postId);
        return arrayOfPosts.push(posts.ids[0])
      })(),
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const empty = {
      userId: '',
      name: '',
      thumbnail: '',
      posts: '',
      createdAt: '',
      modifiedAt: '',
    }

    const missing = {}

    const createFieldsWithUsersStatusRefs = async () => {
      let fields = {}
      const fieldsObj = (name, refId) => {
        return (fields[name] = {
          userId: testUserId,
          name: 'new collection',
          posts: [refId],
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
          name: 'new collection',
          posts: [refId],
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
          name: 'new collection',
          posts: [refId],
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
      valid1,
      valid2,
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
      const collections = await create.collections.existingUsersAddNewPostsToNewCollections(
        users.ids,
        3,
        3
      )
      set1 = { users, collections }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set1.users.ids[0],
        collection1: {
          id: set1.collections.docs[0]._id,
          doc: set1.collections.docs[0],
          post1: { id: set1.collections.docs[0].posts[0] },
          post2: { id: set1.collections.docs[0].posts[1] },
          post3: { id: set1.collections.docs[0].posts[2] },
        },
        collection2: {
          id: set1.collections.docs[1]._id,
          doc: set1.collections.docs[1],
          post1: { id: set1.collections.docs[1].posts[0] },
          post2: { id: set1.collections.docs[1].posts[1] },
          post3: { id: set1.collections.docs[1].posts[2] },
        },
        collection3: {
          id: set1.collections.docs[2]._id,
          doc: set1.collections.docs[2],
          post1: { id: set1.collections.docs[2].posts[0] },
          post2: { id: set1.collections.docs[2].posts[1] },
          post3: { id: set1.collections.docs[2].posts[2] },
        },
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
      const collections = await create.collections.existingUsersAddNewPostsToNewCollections(
        [testUserId],
        3,
        3
      )
      const posts = await create.posts.fromNewUsers(1, 1)
      const post4 = posts.docs[0]
      await create.collections.existingUsersAddExistingPostsToExistingCollections(
        [testUserId],
        [post4._id],
        collections.ids
      )
      set1 = { collections, post4 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.users.newPrivateUsers(1)
      const collections = await create.collections.existingUsersAddNewPostsToNewCollections(
        users.ids,
        3,
        3
      )
      set2 = { users, collections }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        collection1: {
          id: set1.collections.docs[0]._id,
          doc: set1.collections.docs[0],
          post1: { id: set1.collections.docs[0].posts[0] },
          post2: { id: set1.collections.docs[0].posts[1] },
          post3: { id: set1.collections.docs[0].posts[2] },
          post4: { id: set1.post4._id },
        },
        collection2: {
          id: collections.docs[1]._id,
          doc: collections.docs[1],
          post1: { id: collections.docs[1].posts[0] },
          post2: { id: collections.docs[1].posts[1] },
          post3: { id: collections.docs[1].posts[2] },
          post4: { id: set1.post4._id },
        },
        collection3: {
          id: collections.docs[2]._id,
          doc: collections.docs[2],
          post1: { id: collections.docs[2].posts[0] },
          post2: { id: collections.docs[2].posts[1] },
          post3: { id: collections.docs[2].posts[2] },
          post4: { id: set1.post4._id },
        },
      },
      user1: {
        id: set2.users.ids[0],
        collection1: {
          id: set2.collections.docs[0]._id,
          doc: set2.collections.docs[0],
          post1: { id: set2.collections.docs[0].posts[0] },
          post2: { id: set2.collections.docs[0].posts[1] },
          post3: { id: set2.collections.docs[0].posts[2] },
        },
        collection2: {
          id: set2.collections.docs[1]._id,
          doc: set2.collections.docs[1],
          post1: { id: set2.collections.docs[1].posts[0] },
          post2: { id: set2.collections.docs[1].posts[1] },
          post3: { id: set2.collections.docs[1].posts[2] },
        },
        collection3: {
          id: set2.collections.docs[2]._id,
          doc: set2.collections.docs[2],
          post1: { id: set2.collections.docs[2].posts[0] },
          post2: { id: set2.collections.docs[2].posts[1] },
          post3: { id: set2.collections.docs[2].posts[2] },
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
      const collections = await create.collections.existingUsersAddNewPostsToNewCollections(
        [testUserId],
        1,
        1
      )
      set1 = { collections }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        collections: set1.collections,
        collection1: {
          id: set1.collections.ids[0],
          post1: { id: set1.collections.docs[0].posts[0] },
        },
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
      const collections = await create.collections.existingUsersAddNewPostsToNewCollections(
        [testUserId],
        1,
        1
      )
      set1 = { collections }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        collections: set1.collections,
        collection1: {
          id: set1.collections.ids[0],
          post1: { id: set1.collections.docs[0].posts[0] },
        },
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
      const collections = await create.collections.existingUsersAddNewPostsToNewCollections(
        [testUserId],
        50,
        50
      )
      set1 = { collections }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        collections: set1.collections.docs,
        collection1: {
          id: set1.collections.docs[0]._id,
          post1: { id: set1.collections.docs[0].posts[0] },
        },
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
      const collections = await create.collections.createCollections(
        testUserId,
        1
      )
      set1 = { collections }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.users.newPrivateUsers(1)
      set2 = { users }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        collections: set1.collections.docs,
        collection1: { id: set1.collections.docs[0]._id },
      },
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
    return {
      testUserId,
      testUser: { id: testUserId },
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
      const collections = await create.collections.createCollections(
        testUserId,
        2
      )
      const collection1 = collections.docs[0]
      const collection2 = collections.docs[1]

      const posts = await create.posts.fromExistingUserIds([testUserId], 2)
      const post1 = posts.docs[0]
      const post2 = posts.docs[1]

      await create.collections.existingUsersAddExistingPostsToExistingCollections(
        [testUserId],
        [post1._id],
        [collection1._id]
      )
      await create.collections.existingUsersAddExistingPostsToExistingCollections(
        [testUserId],
        [post2._id],
        [collection2._id]
      )

      await q.crud.delete.collection.findByIdAndRemove(collection1._id)
      await q.crud.delete.post.findByIdAndRemove(post2._id)

      set1 = { collection1, collection2, post1, post2 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        2
      )

      const user1 = users.docs[0]
      const user2 = users.docs[1]

      const collections = await create.collections.existingUsersAddNewPostsToNewCollections(
        users.ids,
        1,
        1
      )

      const collection1 = collections.docsByUserId[user1._id][0]
      const collection2 = collections.docsByUserId[user2._id][0]

      await q.crud.delete.user.findByIdAndRemove(user1._id)
      await q.crud.delete.collection.findByIdAndRemove(collection2._id)

      set2 = { user1, user2, collection1, collection2 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        collection1: {
          id: set1.collection1._id,
          post1: { id: set1.post1._id },
        },
        collection2: {
          id: set1.collection2._id,
          post1: { id: set1.post2._id },
        },
      },
      user1: {
        id: set2.user1._id,
        collection1: { id: set2.collection1._id },
      },
      user2: {
        id: set2.user2._id,
        collection1: { id: set2.collection2._id },
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

      let set1
      const createUsersDocs = await (async function() {
        const refUsers = await create.usersAccountStatus(testUserId)
        set1['refUsers'] = refUsers
        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 2)
        set1['posts'] = posts

        set1['collectionWithPostByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const refPosts = await create.posts.fromExistingUserIds(
              [refUserId],
              1
            )
            const collections = await create.collections.existingUsersAddExistingPostsToNewCollections(
              [testUserId],
              [refPosts.idsByUserId[refUsers.user1.id][0]],
              1
            )
            set1.collectionWithPostByRefUserId[refUserId] = collections.docs[0]
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          collection1: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user1.id]._id,
          },
          collection2: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user2.id]._id,
          },
          collection3: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user3.id]._id,
          },
          collection4: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user4.id]._id,
          },
          collection5: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user5.id]._id,
          },
          post1: {
            id: set1.posts.idsByUserId[set1.refUsers.user1.id][0],
          },
          post2: {
            id: set1.posts.idsByUserId[set1.refUsers.user2.id][0],
          },
          post3: {
            id: set1.posts.idsByUserId[set1.refUsers.user3.id][0],
          },
          post4: {
            id: set1.posts.idsByUserId[set1.refUsers.user4.id][0],
          },
          post5: {
            id: set1.posts.idsByUserId[set1.refUsers.user5.id][0],
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

      let set1
      const createUsersDocs = await (async function() {
        const refUsers = await create.userSocialConnections(testUserId)
        set1['refUsers'] = refUsers
        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 2)
        set1['posts'] = posts

        set1['collectionWithPostByRefUserId'] = {}
        await Promise.all(
          refUsers.ids.map(async refUserId => {
            const refPosts = await create.posts.fromExistingUserIds(
              [refUserId],
              1
            )
            const collections = await create.collections.existingUsersAddExistingPostsToNewCollections(
              [testUserId],
              [refPosts.idsByUserId[refUsers.user1.id][0]],
              1
            )
            set1.collectionWithPostByRefUserId[refUserId] = collections.docs[0]
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          collection1: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user1.id]._id,
          },
          collection2: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user2.id]._id,
          },
          collection3: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user3.id]._id,
          },
          collection4: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user4.id]._id,
          },
          collection5: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user5.id]._id,
          },
          collection6: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user6.id]._id,
          },
          collection7: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user7.id]._id,
          },
          collection8: {
            id: set1.collectionWithPostByRefUserId[set1.refUsers.user8.id]._id,
          },
          post1: {
            id: set1.posts.idsByUserId[set1.refUsers.user1.id][0],
          },
          post2: {
            id: set1.posts.idsByUserId[set1.refUsers.user2.id][0],
          },
          post3: {
            id: set1.posts.idsByUserId[set1.refUsers.user3.id][0],
          },
          post4: {
            id: set1.posts.idsByUserId[set1.refUsers.user4.id][0],
          },
          post5: {
            id: set1.posts.idsByUserId[set1.refUsers.user5.id][0],
          },
          post6: {
            id: set1.posts.idsByUserId[set1.refUsers.user6.id][0],
          },
          post7: {
            id: set1.posts.idsByUserId[set1.refUsers.user7.id][0],
          },
          post8: {
            id: set1.posts.idsByUserId[set1.refUsers.user8.id][0],
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
        const collections = await create.collections.createCollections(
          testUserId,
          3
        )

        const collection1 = collections.docs[0]
        const collection2 = collections.docs[1]
        const collection3 = collections.docs[2]

        const refUsers = await create.following.existingUsersFollowNewPublicUsers(
          [testUserId],
          3
        )

        const refUser1 = refUsers.docs[0]
        const refUser2 = refUsers.docs[1]
        const refUser3 = refUsers.docs[2]

        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)

        const post1 = posts.docsByUserId.refUser1._id
        const post2 = posts.docsByUserId.refUser2._id
        const post3 = posts.docsByUserId.refUser3._id

        await create.collections.existingUsersAddExistingPostsToExistingCollections(
          [testUserId],
          [post1._id],
          [collection1._id]
        )

        await create.collections.existingUsersAddExistingPostsToExistingCollections(
          [testUserId],
          [post2._id],
          [collection2._id]
        )

        await create.collections.existingUsersAddExistingPostsToExistingCollections(
          [testUserId],
          [post2._id],
          [collection3._id]
        )

        await q.crud.delete.collection.findByIdAndRemove(collection1._id)
        await q.crud.delete.user.findByIdAndRemove(refUser2._id)
        await q.crud.delete.post.findByIdAndRemove(post3._id)

        set1['collection1'] = collection1
        set1['collection2'] = collection2
        set1['collection3'] = collection3
        set1['post1'] = post1
        set1['post2'] = post2
        set1['post3'] = post3
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          collection1: { id: set1.collection1._id },
          collection2: { id: set1.collection2._id },
          collection3: { id: set1.collection3._id },
          post1: { id: set1.post1._id },
          post2: { id: set1.post2._id },
          post3: { id: set1.post3._id },
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
