const logger = require('../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'DATASETS-POST' // logSubgroup

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

    const valid1 = (function() {
      const fakeLng = parseFloat(faker.address.longitude())
      const fakeLat = parseFloat(faker.address.latitude())
      return {
        userId: testUserId,
        location: {
          lng: fakeLng,
          lat: fakeLat,
        },
        geometry: {
          type: 'Point',
          coordinates: [fakeLng, fakeLat],
        },
        content: faker.image.imageUrl(),
        caption: faker.lorem.sentence(),
        likes: [],
        tags: [],
        commentsEnabled: true, // true, false
        comments: [],
        createdAt: new Date(),
        modifiedAt: new Date(),
      }
    })()

    const valid2 = (function() {
      const fakeLng = parseFloat(faker.address.longitude())
      const fakeLat = parseFloat(faker.address.latitude())
      return {
        userId: testUserId,
        location: {
          lng: fakeLng,
          lat: fakeLat,
        },
        geometry: {
          type: 'Point',
          coordinates: [fakeLng, fakeLat],
        },
        content: faker.image.imageUrl(),
        caption: faker.lorem.sentence(),
        likes: [], // CREATE LIKES
        tags: [], // CREATE TAGS
        commentsEnabled: true, // true, false
        comments: [], // CREATE COMMENTS
        createdAt: new Date(),
        modifiedAt: new Date(),
      }
    })()

    const invalid1 = {
      userId: 123,
      location: {
        lng: 'ABC',
        lat: 'ABC',
      },
      geometry: 123,
      content: 123,
      caption: 123,
      likes: 123,
      tags: 123,
      commentsEnabled: 123,
      comments: 123,
      createdAt: 123,
      modifiedAt: 123,
    }

    const invalid2 = {
      userId: 123,
      location: 123,
      geometry: 123,
      content: 123,
      caption: 123,
      likes: 123,
      tags: 123,
      commentsEnabled: 123,
      comments: 123,
      createdAt: 123,
      modifiedAt: 123,
    }

    const otherUserId = (async function() {
      const fakeLng = parseFloat(faker.address.longitude())
      const fakeLat = parseFloat(faker.address.latitude())
      return {
        userId: await (async function() {
          const users = await create.users.newPublicUsers(1)
          return users.ids[0]
        })(),
        location: {
          lng: fakeLng,
          lat: fakeLat,
        },
        geometry: {
          type: 'Point',
          coordinates: [fakeLng, fakeLat],
        },
        content: faker.image.imageUrl(),
        caption: faker.lorem.sentence(),
        likes: [],
        tags: [],
        commentsEnabled: true, // true, false
        comments: [],
        createdAt: new Date(),
        modifiedAt: new Date(),
      }
    })()

    // add tag userId but userId is deleted
    const deletedRefId = (async function() {
      const fakeLng = parseFloat(faker.address.longitude())
      const fakeLat = parseFloat(faker.address.latitude())
      return {
        userId: testUserId, // deleted userId
        location: {
          lng: fakeLng,
          lat: fakeLat,
        },
        geometry: {
          type: 'Point',
          coordinates: [fakeLng, fakeLat],
        },
        content: faker.image.imageUrl(),
        caption: faker.lorem.sentence(),
        likes: [],
        tags: [], // tag deleted userId
        commentsEnabled: true, // true, false
        comments: [],
        createdAt: new Date(),
        modifiedAt: new Date(),
      }
    })()

    const empty1 = {
      userId: '',
      location: {
        lng: '',
        lat: '',
      },
      geometry: '',
      content: '',
      caption: '',
      likes: '',
      tags: '',
      commentsEnabled: '',
      comments: '',
      createdAt: '',
      modifiedAt: '',
    }

    const empty2 = {
      userId: '',
      location: '',
      geometry: '',
      content: '',
      caption: '',
      likes: '',
      tags: '',
      commentsEnabled: '',
      comments: '',
      createdAt: '',
      modifiedAt: '',
    }

    const missing = {}

    return {
      testUserId,
      testUser: { id: testUserId },
      valid1,
      valid2,
      invalid1,
      invalid2,
      otherUserId,
      deletedRefId,
      empty1,
      empty2,
      missing,
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
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)
      set1 = { users, posts }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set1.users.ids[0],
        post1: { id: set1.posts.ids[0] },
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
      const posts = await create.posts.fromExistingUserIds([testUserId], 1)
      set1 = { posts }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)
      set2 = { users, posts }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        post1: {
          id: set1.posts.ids[0],
        },
      },
      user1: {
        id: set2.users.ids[0],
        post1: {
          id: set2.posts.ids[0],
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
      const posts = await create.posts.fromExistingUserIds([testUserId], 2)
      set1 = { posts }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountStatus(testUserId)
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)
      set2 = { users, posts }
    })()

    const { user1, user2, user3, user4, user5 } = set2.users

    return {
      testUserId,
      testUser: {
        id: testUserId,
        post1: {
          id: set1.posts.ids[0],
        },
        post2: {
          id: set1.posts.ids[1],
        },
      },
      user1: {
        id: user1.id,
        post1: {
          id: set2.posts.idsByUserId[user1.id][0],
        },
      },
      user2: {
        id: user2.id,
        post1: {
          id: set2.posts.idsByUserId[user2.id][0],
        },
      },
      user3: {
        id: user3.id,
        post1: {
          id: set2.posts.idsByUserId[user3.id][0],
        },
      },
      user4: {
        id: user4.id,
        post1: {
          id: set2.posts.idsByUserId[user4.id][0],
        },
      },
      user5: {
        id: user5.id,
        post1: {
          id: set2.posts.idsByUserId[user5.id][0],
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
      const posts = await create.posts.fromExistingUserIds([testUserId], 1)
      set1 = { posts }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountPermissions(testUserId)
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)
      set2 = { users, posts }
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
        post1: {
          id: set1.posts.ids[0],
        },
      },
      user1: {
        id: user1.id,
        post1: {
          id: set2.posts.idsByUserId[user1.id][0],
        },
      },
      user2: {
        id: user2.id,
        post1: {
          id: set2.posts.idsByUserId[user2.id][0],
        },
      },
      user3: {
        id: user3.id,
        post1: {
          id: set2.posts.idsByUserId[user3.id][0],
        },
      },
      user4: {
        id: user4.id,
        post1: {
          id: set2.posts.idsByUserId[user4.id][0],
        },
      },
      user5: {
        id: user5.id,
        post1: {
          id: set2.posts.idsByUserId[user5.id][0],
        },
      },
      user6: {
        id: user6.id,
        post1: {
          id: set2.posts.idsByUserId[user6.id][0],
        },
      },
      user7: {
        id: user7.id,
        post1: {
          id: set2.posts.idsByUserId[user7.id][0],
        },
      },
      user8: {
        id: user8.id,
        post1: {
          id: set2.posts.idsByUserId[user8.id][0],
        },
      },
      user9: {
        id: user9.id,
        post1: {
          id: set2.posts.idsByUserId[user9.id][0],
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
      const posts = await create.posts.fromExistingUserIds([testUserId], 50)
      set1 = { posts }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        50
      )
      const posts = await create.posts.fromExistingUserIds(users.ids, 50)

      const post1 = posts.docs[0]

      await create.comments.fromNewPublicUsersOnExistingPosts(
        50,
        [post1._id],
        1
      )

      await create.postLikes.newUsersLikeExistingPosts(50, [post1._id])

      set2 = { users, posts, post1 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        post1: { id: set1.posts.ids[0] },
      },
      user1: {
        id: set2.users.ids[0],
        post1: { id: set2.post1._id },
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
      const posts = await create.posts.fromExistingUserIds([testUserId], 1)
      set1 = { posts }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        2
      )
      const posts = await create.posts.fromExistingUserIds([users.ids[1]], 1)
      set2 = { users, posts }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        post1: { id: set1.posts.ids[0] },
      },
      user1: {
        id: set2.users.ids[0],
      },
      user2: {
        id: set2.users.ids[1],
        post1: { id: set2.posts.ids[0] },
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
      const posts = await create.posts.fromExistingUserIds(users.ids, 1)
      set1 = { users, posts }
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
        post1: { id: set1.posts.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        post1: { id: set1.posts.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        post1: { id: set1.posts.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        post1: { id: set1.posts.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        post1: { id: set1.posts.idsByUserId[user5.id][0] },
      },
      user6: {
        id: user6.id,
        post1: { id: set1.posts.idsByUserId[user6.id][0] },
      },
      user7: {
        id: user7.id,
        post1: { id: set1.posts.idsByUserId[user7.id][0] },
      },
      user8: {
        id: user8.id,
        post1: { id: set1.posts.idsByUserId[user8.id][0] },
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
      const posts = await create.posts.fromExistingUserIds([testUserId], 1)
      await q.crud.delete.post.findByIdAndRemove(posts.ids[0])
      set1 = { posts }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        2
      )
      const user1 = users.docs[0]
      const user2 = users.docs[1]

      const posts = await create.posts.fromExistingUserIds(users.ids, 1)
      const post1 = posts.docsByUserId[user1._id][0]
      const post2 = posts.docsByUserId[user2._id][0]

      await q.crud.delete.user.findByIdAndRemove(post1.userId)
      await q.crud.delete.post.findByIdAndRemove(post2._id)

      set2 = { users, user1, user2, post1, post2 }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set2.user1.id,
        post1: set2.post1._id,
      },
      user2: {
        id: set2.user2.id,
        post1: set2.post2._id,
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
