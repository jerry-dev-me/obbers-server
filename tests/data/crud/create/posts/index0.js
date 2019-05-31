const faker = require('faker')
const q = require('../../../../app/queries')
const h = require('../../../helpers')
const u = require('../../../../utils')
const logger = require('../../../../lib/logger')
const create = require('../../crud/create')

const lG = 'TESTS-HELPERS' // logGroup
const lS = 'TEST-DATA-ACTIVITIES' // logSubgroup

module.exports.fields = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }

  const valid1 = (async function() {
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

  const valid2WithTags = (async function() {
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
    valid1,
    valid2WithTags,
    invalid1,
    invalid2,
    otherUserId,
    deletedRefId,
    empty1,
    empty2,
    missing,
  }
}

module.exports.adminOnly = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }

  let data1
  const createUsersDocs = await (async function() {
    const users = await create.users.newPrivateUsers(1)
    const posts = await create.posts.fromExistingUserIds(users.ids, 1)
    data1 = { users, posts }
  })()

  return {
    testUserId,
    testUser: { id: testUserId },
    user1: {
      id: data1.users.ids[0],
      post1: { id: data1.posts.ids[0] },
    },
  }
}

module.exports.selfOnly = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }

  let data1
  const createTestUserDocs = await (async function() {
    const posts = await create.posts.fromExistingUserIds([testUserId], 1)
    data1 = { posts }
  })()

  let data2
  const createUsersDocs = await (async function() {
    const users = await create.following.existingUsersFollowNewPublicUsers(
      [testUserId],
      1
    )
    const posts = await create.posts.fromExistingUserIds(users.ids, 1)
    data2 = { users, posts }
  })()

  return {
    testUserId,
    testUser: {
      id: testUserId,
      post1: {
        id: data1.posts.ids[0],
      },
    },
    user1: {
      id: data2.users.ids[0],
      post1: {
        id: data2.posts.ids[0],
      },
    },
  }
}

module.exports.accountStatus = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }

  let data1
  const createTestUserDocs = await (async function() {
    const posts = await create.posts.fromExistingUserIds([testUserId], 1)
    data1 = { posts }
  })()

  let data2
  const createUsersDocs = await (async function() {
    const users = await create.usersAccountStatus(testUserId)
    const posts = await create.posts.fromExistingUserIds(users.ids, 1)
    data2 = { users, posts }
  })()

  const { user1, user2, user3, user4, user5 } = data2.users

  return {
    testUserId,
    testUser: {
      id: testUserId,
      post1: {
        id: data1.posts.ids[0],
      },
    },
    user1: {
      id: user1.id,
      post1: {
        id: data2.posts.idsByUserId[user1.id][0],
      },
    },
    user2: {
      id: user2.id,
      post1: {
        id: data2.posts.idsByUserId[user2.id][0],
      },
    },
    user3: {
      id: user3.id,
      post1: {
        id: data2.posts.idsByUserId[user3.id][0],
      },
    },
    user4: {
      id: user4.id,
      post1: {
        id: data2.posts.idsByUserId[user4.id][0],
      },
    },
    user5: {
      id: user5.id,
      post1: {
        id: data2.posts.idsByUserId[user5.id][0],
      },
    },
  }
}

module.exports.accountPermissions = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }

  let data1
  const createTestUserDocs = await (async function() {
    const posts = await create.posts.fromExistingUserIds([testUserId], 1)
    data1 = { posts }
  })()

  let data2
  const createUsersDocs = await (async function() {
    const users = await create.usersAccountPermissions(testUserId)
    const posts = await create.posts.fromExistingUserIds(users.ids, 1)
    data2 = { users, posts }
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
  } = data2.users

  return {
    testUserId,
    testUser: {
      id: testUserId,
      post1: {
        id: data1.posts.ids[0],
      },
    },
    user1: {
      id: user1.id,
      post1: {
        id: data2.posts.idsByUserId[user1.id][0],
      },
    },
    user2: {
      id: user2.id,
      post1: {
        id: data2.posts.idsByUserId[user2.id][0],
      },
    },
    user3: {
      id: user3.id,
      post1: {
        id: data2.posts.idsByUserId[user3.id][0],
      },
    },
    user4: {
      id: user4.id,
      post1: {
        id: data2.posts.idsByUserId[user4.id][0],
      },
    },
    user5: {
      id: user5.id,
      post1: {
        id: data2.posts.idsByUserId[user5.id][0],
      },
    },
    user6: {
      id: user6.id,
      post1: {
        id: data2.posts.idsByUserId[user6.id][0],
      },
    },
    user7: {
      id: user7.id,
      post1: {
        id: data2.posts.idsByUserId[user7.id][0],
      },
    },
    user8: {
      id: user8.id,
      post1: {
        id: data2.posts.idsByUserId[user8.id][0],
      },
    },
    user9: {
      id: user9.id,
      post1: {
        id: data2.posts.idsByUserId[user9.id][0],
      },
    },
  }
}

module.exports.many = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }

  let data1
  const createTestUserDocs = await (async function() {
    const posts = await create.posts.fromExistingUserIds([testUserId], 50)
    data1 = { posts }
  })()

  let data2
  const createUsersDocs = await (async function() {
    const users = await create.following.existingUsersFollowNewPublicUsers(
      [testUserId],
      50
    )
    const posts = await create.posts.fromExistingUserIds(users.ids, 50)

    const post1 = posts.docs[0]

    await create.comments.fromNewPublicUsersOnExistingPosts(50, [post1._id], 1)

    await create.postLikes.newUsersLikeExistingPosts(50, [post1._id])

    data2 = { users, posts, post1 }
  })()

  return {
    testUserId,
    testUser: {
      id: testUserId,
      post1: { id: data1.posts.ids[0] },
    },
    user1: {
      id: data2.users.ids[0],
      post1: { id: data2.post1._id },
    },
  }
}

module.exports.empty = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }

  let data1
  const createTestUserDocs = await (async function() {
    const posts = await create.posts.fromExistingUserIds([testUserId], 1)
    data1 = { posts }
  })()

  let data2
  const createUsersDocs = await (async function() {
    const users = await create.following.existingUsersFollowNewPublicUsers(
      [testUserId],
      2
    )
    const posts = await create.posts.fromExistingUserIds([users.ids[1]], 1)
    data2 = { users, posts }
  })()

  return {
    testUserId,
    testUser: {
      id: testUserId,
      post1: { id: data1.posts.ids[0] },
    },
    user1: {
      id: data2.users.ids[0],
    },
    user2: {
      id: data2.users.ids[1],
      post1: { id: data2.posts.ids[0] },
    },
  }
}

module.exports.socialConnections = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }

  let data1
  const createUsersDocs = await (async function() {
    const users = await create.userSocialConnections(testUserId)
    const posts = await create.posts.fromExistingUserIds(users.ids, 1)
    data1 = { users, posts }
  })()

  const { user1, user2, user3, user4, user5, user6, user7, user8 } = data1.users

  return {
    testUserId,
    user1: {
      id: user1.id,
      post1: { id: data1.posts.idsByUserId[user1.id][0] },
    },
    user2: {
      id: user2.id,
      post1: { id: data1.posts.idsByUserId[user2.id][0] },
    },
    user3: {
      id: user3.id,
      post1: { id: data1.posts.idsByUserId[user3.id][0] },
    },
    user4: {
      id: user4.id,
      post1: { id: data1.posts.idsByUserId[user4.id][0] },
    },
    user5: {
      id: user5.id,
      post1: { id: data1.posts.idsByUserId[user5.id][0] },
    },
    user6: {
      id: user6.id,
      post1: { id: data1.posts.idsByUserId[user6.id][0] },
    },
    user7: {
      id: user7.id,
      post1: { id: data1.posts.idsByUserId[user7.id][0] },
    },
    user8: {
      id: user8.id,
      post1: { id: data1.posts.idsByUserId[user8.id][0] },
    },
  }
}

module.exports.nonexistent = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }

  let data1
  const createTestUserDocs = await (async function() {
    const posts = await create.posts.fromExistingUserIds([testUserId], 1)
    await q.crud.delete.post.findByIdAndRemove(posts.ids[0])
    data1 = { posts }
  })()

  let data2
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

    data2 = { users, user1, user2, post1, post2 }
  })()

  return {
    testUserId,
    testUser: {
      id: testUserId,
    },
    user1: {
      id: data2.user1.id,
      post1: data2.post1._id,
    },
    user2: {
      id: data2.user2.id,
      post1: data2.post2._id,
    },
  }
}

module.exports.refs = {
  accountStatus: async testUserId => {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }
    return {
      testUserId,
      testUser: { id: testUserId },
    }
  },
  socialConnections: async testUserId => {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }
    return {
      testUserId,
      testUser: { id: testUserId },
    }
  },
  nonexistent: async testUserId => {
    if (testUserId === null || testUserId === undefined) {
      const testUser = await q.crud.create.user.new(h.fakeFields.user())
      testUserId = testUser._id
    }
    return {
      testUserId,
      testUser: { id: testUserId },
    }
  },
}

module.exports.all = async testUserId => {
  if (testUserId === null || testUserId === undefined) {
    const testUser = await q.crud.create.user.new(h.fakeFields.user())
    testUserId = testUser._id
  }
  return {
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
}
