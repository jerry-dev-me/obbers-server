const logger = require('../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'DATASETS-LIKE' // logSubgroup

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
      refModel: 'post',
      refId: await (async function() {
        const posts = await create.posts.fromNewPublicUsers(1, 1)
        return posts.ids[0]
      })(),
      createdAt: new Date(),
    }

    const valid2 = {
      userId: testUserId,
      refModel: 'comment',
      refId: await (async function() {
        const comments = await create.comments.fromNewPublicUsersOnNewPublicPosts(
          1,
          1,
          1
        )
        return comments.ids[0]
      })(),
      createdAt: new Date(),
    }

    const valid3 = {
      userId: testUserId,
      refModel: 'response',
      refId: await (async function() {
        const responses = await create.responses.fromNewUsersOnNewComments(
          1,
          1,
          1
        )
        return responses.ids[0]
      })(),
      createdAt: new Date(),
    }

    const invalid = {
      userId: 123,
      refModel: 123,
      refId: 123,
      createdAt: 123,
    }

    const otherUserId = {
      userId: await (async function() {
        const users = await create.users.newPublicUsers(1)
        return users[0]
      })(),
      refModel: 'post',
      refId: await (async function() {
        const posts = await create.posts.fromNewPublicUsers(1, 1)
        return posts.ids[0]
      })(),
      createdAt: new Date(),
    }

    const deletedRefId1 = {
      userId: testUserId,
      refModel: 'post',
      refId: await (async function() {
        const posts = await create.posts.fromNewPublicUsers(1, 1)
        const postId = posts.ids[0]
        await q.crud.delete.post.findByIdAndRemove(postId)
        // await q.crud.delete.post.remove(postId);
        return postId
      })(),
      createdAt: new Date(),
    }

    const deletedRefId2 = {
      userId: testUserId,
      refModel: 'comment',
      refId: await (async function() {
        const comments = await create.comments.fromNewPublicUsersOnNewPublicPosts(
          1,
          1,
          1
        )
        const commentId = comments.ids[0]
        await q.crud.delete.post.findByIdAndRemove(commentId)
        // await q.crud.delete.post.remove(commentId);
        return commentId
      })(),
      createdAt: new Date(),
    }

    const deletedRefId3 = {
      userId: testUserId,
      refModel: 'response',
      refId: await (async function() {
        const responses = await create.responses.fromNewUsersOnNewComments(
          1,
          1,
          1
        )
        const responseId = responses.ids[0]
        await q.crud.delete.post.findByIdAndRemove(responseId)
        // await q.crud.delete.post.remove(responseId);
        return responseId
      })(),
      createdAt: new Date(),
    }

    const empty = {
      userId: '',
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
          refModel: 'post',
          refId: refId,
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
          refModel: 'post',
          refId: refId,
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
          refModel: 'post',
          refId: refId,
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
      valid1,
      valid2,
      valid3,
      invalid,
      otherUserId,
      deletedRefId1,
      deletedRefId2,
      deletedRefId3,
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
      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        users.ids,
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        users.ids,
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        users.ids,
        1
      )
      set1 = { users, postLikes, commentLikes, responseLikes }
    })()

    return {
      testUserId,
      testUser: { id: testUserId },
      user1: {
        id: set1.users.ids[0],
        postLike1: { id: set1.postLikes.ids[0] },
        commentLike1: { id: set1.commentLikes.ids[0] },
        responseLike1: { id: set1.responseLikes.ids[0] },
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
      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        [testUserId],
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        [testUserId],
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        [testUserId],
        1
      )

      const posts = await create.posts.fromExistingUserIds([testUserId], 1)
      const comments = await create.comments.fromExistingUsersOnNewPublicPosts(
        [testUserId],
        1,
        1
      )
      const responses = await create.responses.fromExistingUsersOnNewComments(
        [testUserId],
        1,
        1
      )

      const postLikes2 = await create.postLikes.newUsersLikeExistingPosts(
        1,
        posts.ids
      )
      const commentLikes2 = await create.commentLikes.newUsersLikeExistingComments(
        1,
        comments.ids
      )
      const responseLikes2 = await create.responseLikes.newUsersLikeExistingResponses(
        1,
        responses.ids
      )

      set1 = {
        postLikes,
        commentLikes,
        responseLikes,
        posts,
        comments,
        responses,
        postLikes2,
        commentLikes2,
        responseLikes2,
      }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const id = testUserId
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [id],
        1
      )
      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        users.ids,
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        users.ids,
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        users.ids,
        1
      )
      set2 = { users, postLikes, commentLikes, responseLikes }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        postLike1: { id: set1.postLikes.ids[0] },
        commentLike1: { id: set1.commentLikes.ids[0] },
        responseLike1: { id: set1.responseLikes.ids[0] },
        post1: {
          id: set1.posts.ids[0],
          postLike1: { id: set1.postLikes2.ids[0] },
        },
        comment1: {
          id: set1.comments.ids[0],
          commentLike1: { id: set1.commentLikes2.ids[0] },
        },
        response1: {
          id: set1.responses.ids[0],
          responseLike1: { id: set1.responseLikes2.ids[0] },
        },
      },
      user1: {
        id: set2.users.ids[0],
        postLike1: { id: set2.postLikes.ids[0] },
        commentLike1: { id: set2.commentLikes.ids[0] },
        responseLike1: { id: set2.responseLikes.ids[0] },
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
      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        [testUserId],
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        [testUserId],
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        [testUserId],
        1
      )
      set1 = { postLikes, commentLikes, responseLikes }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountStatus(testUserId)

      const posts = await create.posts.fromExistingUserIds(users.ids, 1)
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        users.ids,
        1,
        1
      )
      const responses = await create.responses.fromExistingUsersOnNewComments(
        users.ids,
        1,
        1
      )

      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        users.ids,
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        users.ids,
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        users.ids,
        1
      )
      set2 = {
        users,
        posts,
        comments,
        responses,
        postLikes,
        commentLikes,
        responseLikes,
      }
    })()

    const { user1, user2, user3, user4, user5 } = set2.users

    return {
      testUserId,
      testUser: {
        id: testUserId,
        postLike1: { id: set1.postLikes.ids[0] },
        commentLike1: { id: set1.commentLikes.ids[0] },
        responseLike1: { id: set1.responseLikes.ids[0] },
      },
      user1: {
        id: user1.id,
        post1: { id: set2.posts.idsByUserId[user1.id][0] },
        comment1: { id: set2.comments.idsByUserId[user1.id][0] },
        response1: { id: set2.responses.idsByUserId[user1.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user1.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user1.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        post1: { id: set2.posts.idsByUserId[user2.id][0] },
        comment1: { id: set2.comments.idsByUserId[user2.id][0] },
        response1: { id: set2.responses.idsByUserId[user2.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user2.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user2.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        post1: { id: set2.posts.idsByUserId[user3.id][0] },
        comment1: { id: set2.comments.idsByUserId[user3.id][0] },
        response1: { id: set2.responses.idsByUserId[user3.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user3.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user3.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        post1: { id: set2.posts.idsByUserId[user4.id][0] },
        comment1: { id: set2.comments.idsByUserId[user4.id][0] },
        response1: { id: set2.responses.idsByUserId[user4.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user4.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user4.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        post1: { id: set2.posts.idsByUserId[user5.id][0] },
        comment1: { id: set2.comments.idsByUserId[user5.id][0] },
        response1: { id: set2.responses.idsByUserId[user5.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user5.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user5.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user5.id][0] },
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
      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        [testUserId],
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        [testUserId],
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        [testUserId],
        1
      )
      set1 = { postLikes, commentLikes, responseLikes }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.usersAccountPermissions(testUserId)

      const posts = await create.posts.fromExistingUserIds(users.ids, 1)
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        users.ids,
        1,
        1
      )
      const responses = await create.responses.fromExistingUsersOnNewComments(
        users.ids,
        1,
        1
      )

      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        users.ids,
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        users.ids,
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        users.ids,
        1
      )
      set2 = {
        users,
        posts,
        comments,
        responses,
        postLikes,
        commentLikes,
        responseLikes,
      }
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
        postLike1: { id: set1.postLikes.ids[0] },
        commentLike1: { id: set1.commentLikes.ids[0] },
        responseLike1: { id: set1.responseLikes.ids[0] },
      },
      user1: {
        id: user1.id,
        post1: { id: set2.posts.idsByUserId[user1.id][0] },
        comment1: { id: set2.comments.idsByUserId[user1.id][0] },
        response1: { id: set2.responses.idsByUserId[user1.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user1.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user1.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        post1: { id: set2.posts.idsByUserId[user2.id][0] },
        comment1: { id: set2.comments.idsByUserId[user2.id][0] },
        response1: { id: set2.responses.idsByUserId[user2.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user2.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user2.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        post1: { id: set2.posts.idsByUserId[user3.id][0] },
        comment1: { id: set2.comments.idsByUserId[user3.id][0] },
        response1: { id: set2.responses.idsByUserId[user3.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user3.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user3.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        post1: { id: set2.posts.idsByUserId[user4.id][0] },
        comment1: { id: set2.comments.idsByUserId[user4.id][0] },
        response1: { id: set2.responses.idsByUserId[user4.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user4.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user4.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        post1: { id: set2.posts.idsByUserId[user5.id][0] },
        comment1: { id: set2.comments.idsByUserId[user5.id][0] },
        response1: { id: set2.responses.idsByUserId[user5.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user5.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user5.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user5.id][0] },
      },
      user6: {
        id: user6.id,
        post1: { id: set2.posts.idsByUserId[user6.id][0] },
        comment1: { id: set2.comments.idsByUserId[user6.id][0] },
        response1: { id: set2.responses.idsByUserId[user6.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user6.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user6.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user6.id][0] },
      },
      user7: {
        id: user7.id,
        post1: { id: set2.posts.idsByUserId[user7.id][0] },
        comment1: { id: set2.comments.idsByUserId[user7.id][0] },
        response1: { id: set2.responses.idsByUserId[user7.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user7.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user7.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user7.id][0] },
      },
      user8: {
        id: user8.id,
        post1: { id: set2.posts.idsByUserId[user8.id][0] },
        comment1: { id: set2.comments.idsByUserId[user8.id][0] },
        response1: { id: set2.responses.idsByUserId[user8.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user8.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user8.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user8.id][0] },
      },
      user9: {
        id: user9.id,
        post1: { id: set2.posts.idsByUserId[user9.id][0] },
        comment1: { id: set2.comments.idsByUserId[user9.id][0] },
        response1: { id: set2.responses.idsByUserId[user9.id][0] },
        postLike1: { id: set2.postLikes.idsByUserId[user9.id][0] },
        commentLike1: { id: set2.commentLikes.idsByUserId[user9.id][0] },
        responseLike1: { id: set2.responseLikes.idsByUserId[user9.id][0] },
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
      const posts = await create.posts.fromExistingUserIds([id], 1)
      const post1 = posts.docs[0]
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        1
      )
      const comment1 = comments.docs[0]
      const responses = await create.responses.fromExistingUsersOnNewComments(
        [id],
        1,
        1
      )
      const response1 = responses.docs[0]
      const postLikes = await create.postLikes.newUsersLikeExistingPosts(
        50,
        posts.ids
      )
      const commentLikes = await create.commentLikes.newUsersLikeExistingComments(
        50,
        comments.ids
      )
      const responseLikes = await create.responseLikes.newUsersLikeExistingResponses(
        50,
        responses.ids
      )
      set1 = { post1, comment1, response1 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const id = users.ids[0]
      const posts = await create.posts.fromExistingUserIds([id], 1)
      const post1 = posts.docs[0]
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        1
      )
      const comment1 = comments.docs[0]
      const responses = await create.responses.fromExistingUsersOnNewComments(
        [id],
        1,
        1
      )
      const response1 = responses.docs[0]
      const postLikes = await create.postLikes.newUsersLikeExistingPosts(
        50,
        posts.ids
      )
      const commentLikes = await create.commentLikes.newUsersLikeExistingComments(
        50,
        comments.ids
      )
      const responseLikes = await create.responseLikes.newUsersLikeExistingResponses(
        50,
        responses.ids
      )
      set2 = { users, post1, comment1, response1 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        post1: { id: set1.post1._id },
        comment1: { id: set1.comment1._id },
        response1: { id: set1.response1._id },
      },
      user1: {
        id: set2.users.ids[0],
        post1: { id: set2.post1._id },
        comment1: { id: set2.comment1._id },
        response1: { id: set2.response1._id },
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
      const id = testUserId
      const posts = await create.posts.fromExistingUserIds([id], 1)
      const post1 = posts.docs[0]
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        1
      )
      const comment1 = comments.docs[0]
      const responses = await create.responses.fromExistingUsersOnNewComments(
        [id],
        1,
        1
      )
      const response1 = responses.docs[0]
      set1 = { post1, comment1, response1 }
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )
      const id = users.ids
      const posts = await create.posts.fromExistingUserIds([id], 1)
      const post1 = posts.docs[0]
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        [id],
        1,
        1
      )
      const comment1 = comments.docs[0]
      const responses = await create.responses.fromExistingUsersOnNewComments(
        [id],
        1,
        1
      )
      const response1 = responses.docs[0]
      set2 = { users, post1, comment1, response1 }
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        post1: { id: set1.post1._id },
        comment1: { id: set1.comment1._id },
        response1: { id: set1.response1._id },
      },
      user1: {
        id: set2.users.ids,
        post1: { id: set2.post1._id },
        comment1: { id: set2.comment1._id },
        response1: { id: set2.response1._id },
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
      const comments = await create.comments.fromExistingUsersOnNewPosts(
        users.ids,
        1,
        1
      )
      const responses = await create.responses.fromExistingUsersOnNewComments(
        users.ids,
        1,
        1
      )

      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        users.ids,
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        users.ids,
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        users.ids,
        1
      )
      set1 = {
        users,
        posts,
        comments,
        responses,
        postLikes,
        commentLikes,
        responseLikes,
      }
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
        comment1: { id: set1.comments.idsByUserId[user1.id][0] },
        response1: { id: set1.responses.idsByUserId[user1.id][0] },
        postLike1: { id: set1.postLikes.idsByUserId[user1.id][0] },
        commentLike1: { id: set1.commentLikes.idsByUserId[user1.id][0] },
        responseLike1: { id: set1.responseLikes.idsByUserId[user1.id][0] },
      },
      user2: {
        id: user2.id,
        post1: { id: set1.posts.idsByUserId[user2.id][0] },
        comment1: { id: set1.comments.idsByUserId[user2.id][0] },
        response1: { id: set1.responses.idsByUserId[user2.id][0] },
        postLike1: { id: set1.postLikes.idsByUserId[user2.id][0] },
        commentLike1: { id: set1.commentLikes.idsByUserId[user2.id][0] },
        responseLike1: { id: set1.responseLikes.idsByUserId[user2.id][0] },
      },
      user3: {
        id: user3.id,
        post1: { id: set1.posts.idsByUserId[user3.id][0] },
        comment1: { id: set1.comments.idsByUserId[user3.id][0] },
        response1: { id: set1.responses.idsByUserId[user3.id][0] },
        postLike1: { id: set1.postLikes.idsByUserId[user3.id][0] },
        commentLike1: { id: set1.commentLikes.idsByUserId[user3.id][0] },
        responseLike1: { id: set1.responseLikes.idsByUserId[user3.id][0] },
      },
      user4: {
        id: user4.id,
        post1: { id: set1.posts.idsByUserId[user4.id][0] },
        comment1: { id: set1.comments.idsByUserId[user4.id][0] },
        response1: { id: set1.responses.idsByUserId[user4.id][0] },
        postLike1: { id: set1.postLikes.idsByUserId[user4.id][0] },
        commentLike1: { id: set1.commentLikes.idsByUserId[user4.id][0] },
        responseLike1: { id: set1.responseLikes.idsByUserId[user4.id][0] },
      },
      user5: {
        id: user5.id,
        post1: { id: set1.posts.idsByUserId[user5.id][0] },
        comment1: { id: set1.comments.idsByUserId[user5.id][0] },
        response1: { id: set1.responses.idsByUserId[user5.id][0] },
        postLike1: { id: set1.postLikes.idsByUserId[user5.id][0] },
        commentLike1: { id: set1.commentLikes.idsByUserId[user5.id][0] },
        responseLike1: { id: set1.responseLikes.idsByUserId[user5.id][0] },
      },
      user6: {
        id: user6.id,
        post1: { id: set1.posts.idsByUserId[user6.id][0] },
        comment1: { id: set1.comments.idsByUserId[user6.id][0] },
        response1: { id: set1.responses.idsByUserId[user6.id][0] },
        postLike1: { id: set1.postLikes.idsByUserId[user6.id][0] },
        commentLike1: { id: set1.commentLikes.idsByUserId[user6.id][0] },
        responseLike1: { id: set1.responseLikes.idsByUserId[user6.id][0] },
      },
      user7: {
        id: user7.id,
        post1: { id: set1.posts.idsByUserId[user7.id][0] },
        comment1: { id: set1.comments.idsByUserId[user7.id][0] },
        response1: { id: set1.responses.idsByUserId[user7.id][0] },
        postLike1: { id: set1.postLikes.idsByUserId[user7.id][0] },
        commentLike1: { id: set1.commentLikes.idsByUserId[user7.id][0] },
        responseLike1: { id: set1.responseLikes.idsByUserId[user7.id][0] },
      },
      user8: {
        id: user8.id,
        post1: { id: set1.posts.idsByUserId[user8.id][0] },
        comment1: { id: set1.comments.idsByUserId[user8.id][0] },
        response1: { id: set1.responses.idsByUserId[user8.id][0] },
        postLike1: { id: set1.postLikes.idsByUserId[user8.id][0] },
        commentLike1: { id: set1.commentLikes.idsByUserId[user8.id][0] },
        responseLike1: { id: set1.responseLikes.idsByUserId[user8.id][0] },
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
      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        [testUserId],
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        [testUserId],
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        [testUserId],
        1
      )
      set1 = { postLikes, commentLikes, responseLikes }
      await q.crud.delete.like.findByIdAndRemove(postLikes.ids[0])
      await q.crud.delete.like.findByIdAndRemove(commentLikes.ids[0])
      await q.crud.delete.like.findByIdAndRemove(responseLikes.ids[0])
    })()

    let set2
    const createUsersDocs = await (async function() {
      const users = await create.following.existingUsersFollowNewPublicUsers(
        [testUserId],
        1
      )

      // 2 posts.... in post1, userId is deleted. in post2, post2 is deleted...
      const posts = await create.posts.fromNewUsers(2, 1)
      const comments = await create.comments.fromNewUsersOnNewPosts(2, 1, 1)
      const responses = await create.responses.fromNewUsersOnNewComments(
        2,
        1,
        1
      )

      await q.crud.delete.user.findByIdAndRemove(posts.docs[0].userId)
      await q.crud.delete.post.findByIdAndRemove(posts.docs[1]._id)

      await q.crud.delete.user.findByIdAndRemove(comments.docs[0].userId)
      await q.crud.delete.comment.findByIdAndRemove(comments.docs[1]._id)

      await q.crud.delete.user.findByIdAndRemove(responses.docs[0].userId)
      await q.crud.delete.response.findByIdAndRemove(responses.docs[1]._id)

      const postLikes = await create.postLikes.existingUsersLikeNewPosts(
        users.ids,
        1
      )
      const commentLikes = await create.commentLikes.existingUsersLikeNewComments(
        users.ids,
        1
      )
      const responseLikes = await create.responseLikes.existingUsersLikeNewResponses(
        users.ids,
        1
      )
      set2 = {
        users,
        posts,
        comments,
        responses,
        postLikes,
        commentLikes,
        responseLikes,
      }
      await q.crud.delete.like.findByIdAndRemove(postLikes.ids[0])
      await q.crud.delete.like.findByIdAndRemove(commentLikes.ids[0])
      await q.crud.delete.like.findByIdAndRemove(responseLikes.ids[0])
    })()

    return {
      testUserId,
      testUser: {
        id: testUserId,
        postLike1: { id: set1.postLikes.ids[0] },
        commentLike1: { id: set1.commentLikes.ids[0] },
        responseLike1: { id: set1.responseLikes.ids[0] },
      },
      user1: {
        id: set2.users.ids[0],
        postLike1: { id: set2.postLikes.ids[0] },
        commentLike1: { id: set2.commentLikes.ids[0] },
        responseLike1: { id: set2.responseLikes.ids[0] },
      },
      post1: { id: set2.posts.docs[0] },
      post2: { id: set2.posts.docs[1] },
      comment1: { id: set2.comments.docs[0] },
      comment2: { id: set2.comments.docs[1] },
      response1: { id: set2.responses.docs[0] },
      response2: { id: set2.responses.docs[1] },
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

        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)

        const comments = await create.comments.fromExistingUsersOnNewPosts(
          refUsers.ids,
          1,
          1
        )

        const responses = await create.responses.fromExistingUsersOnNewComments(
          refUsers.ids,
          1,
          1
        )

        set1['refUsers'] = refUsers
        set1['posts'] = posts
        set1['comments'] = comments
        set1['responses'] = responses

        set1['postLikesByRefUserId'] = {}
        await Promise.all(
          posts.docs.map(async post => {
            const postLikes = await create.postLikes.existingUsersLikeExistingPosts(
              [testUserId],
              [post._id]
            )
            set1.postLikesByRefUserId[post.userId] = postLikes.docs
          })
        )

        set1['commentLikesByRefUserId'] = {}
        await Promise.all(
          comments.docs.map(async comment => {
            const commentLikes = await create.commentLikes.existingUsersLikeExistingComments(
              [testUserId],
              [comment._id]
            )

            set1.commentLikesByRefUserId[comment.userId] = commentLikes.docs
          })
        )

        set1['responseLikesByRefUserId'] = {}
        await Promise.all(
          responses.docs.map(async response => {
            const responseLikes = await create.responseLikes.existingUsersLikeExistingResponses(
              [testUserId],
              [response._id]
            )
            set1.responseLikesByRefUserId[response.userId] = responseLikes.docs
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

        const refUsers = await create.usersAccountStatus(testUserId)

        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)

        const comments = await create.comments.fromExistingUsersOnNewPosts(
          refUsers.ids,
          1,
          1
        )

        const responses = await create.responses.fromExistingUsersOnNewComments(
          refUsers.ids,
          1,
          1
        )

        set2['refUsers'] = refUsers
        set2['posts'] = posts
        set2['comments'] = comments
        set2['responses'] = responses

        set2['postLikesByRefUserId'] = {}
        await Promise.all(
          posts.docs.map(async post => {
            const postLikes = await create.postLikes.existingUsersLikeExistingPosts(
              [user1._id],
              [post._id]
            )
            set2.postLikesByRefUserId[post.userId] = postLikes.docs
          })
        )

        set2['commentLikesByRefUserId'] = {}
        await Promise.all(
          comments.docs.map(async comment => {
            const commentLikes = await create.commentLikes.existingUsersLikeExistingComments(
              [user1._id],
              [comment._id]
            )
            set2.commentLikesByRefUserId[comment.userId] = commentLikes.docs
          })
        )

        set2['responseLikesByRefUserId'] = {}
        await Promise.all(
          responses.docs.map(async response => {
            const responseLikes = await create.responseLikes.existingUsersLikeExistingResponses(
              [user1._id],
              [response._id]
            )
            set2.responseLikesByRefUserId[response.userId] = responseLikes.docs
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          postLike1: {
            id: set1.postLikesByRefUserId[set1.refUsers.user1.id][0]._id,
          },
          postLike2: {
            id: set1.postLikesByRefUserId[set1.refUsers.user2.id][0]._id,
          },
          postLike3: {
            id: set1.postLikesByRefUserId[set1.refUsers.user3.id][0]._id,
          },
          postLike4: {
            id: set1.postLikesByRefUserId[set1.refUsers.user4.id][0]._id,
          },
          postLike5: {
            id: set1.postLikesByRefUserId[set1.refUsers.user5.id][0]._id,
          },
          commentLike1: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user1.id][0]._id,
          },
          commentLike2: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user2.id][0]._id,
          },
          commentLike3: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user3.id][0]._id,
          },
          commentLike4: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user4.id][0]._id,
          },
          commentLike5: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user5.id][0]._id,
          },
          responseLike1: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user1.id][0]._id,
          },
          responseLike2: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user2.id][0]._id,
          },
          responseLike3: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user3.id][0]._id,
          },
          responseLike4: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user4.id][0]._id,
          },
          responseLike5: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user5.id][0]._id,
          },
        },
        user1: {
          id: set2.user1._id,
          postLike1: {
            id: set2.postLikesByRefUserId[set2.refUsers.user1.id][0]._id,
          },
          postLike2: {
            id: set2.postLikesByRefUserId[set2.refUsers.user2.id][0]._id,
          },
          postLike3: {
            id: set2.postLikesByRefUserId[set2.refUsers.user3.id][0]._id,
          },
          postLike4: {
            id: set2.postLikesByRefUserId[set2.refUsers.user4.id][0]._id,
          },
          postLike5: {
            id: set2.postLikesByRefUserId[set2.refUsers.user5.id][0]._id,
          },
          commentLike1: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user1.id][0]._id,
          },
          commentLike2: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user2.id][0]._id,
          },
          commentLike3: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user3.id][0]._id,
          },
          commentLike4: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user4.id][0]._id,
          },
          commentLike5: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user5.id][0]._id,
          },
          responseLike1: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user1.id][0]._id,
          },
          responseLike2: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user2.id][0]._id,
          },
          responseLike3: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user3.id][0]._id,
          },
          responseLike4: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user4.id][0]._id,
          },
          responseLike5: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user5.id][0]._id,
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

        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)

        const comments = await create.comments.fromExistingUsersOnNewPosts(
          refUsers.ids,
          1,
          1
        )

        const responses = await create.responses.fromExistingUsersOnNewComments(
          refUsers.ids,
          1,
          1
        )

        set1['refUsers'] = refUsers
        set1['posts'] = posts
        set1['comments'] = comments
        set1['responses'] = responses

        set1['postLikesByRefUserId'] = {}
        await Promise.all(
          posts.docs.map(async post => {
            const postLikes = await create.postLikes.existingUsersLikeExistingPosts(
              [testUserId],
              [post._id]
            )
            set1.postLikesByRefUserId[post.userId] = postLikes.docs
          })
        )

        set1['commentLikesByRefUserId'] = {}
        await Promise.all(
          comments.docs.map(async comment => {
            const commentLikes = await create.commentLikes.existingUsersLikeExistingComments(
              [testUserId],
              [comment._id]
            )
            set1.commentLikesByRefUserId[comment.userId] = commentLikes.docs
          })
        )

        set1['responseLikesByRefUserId'] = {}
        await Promise.all(
          responses.docs.map(async response => {
            const responseLikes = await create.responseLikes.existingUsersLikeExistingResponses(
              [testUserId],
              [response._id]
            )
            set1.responseLikesByRefUserId[response.userId] = responseLikes.docs
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

        const refUsers = await create.userSocialConnections(testUserId)

        const posts = await create.posts.fromExistingUserIds(refUsers.ids, 1)

        const comments = await create.comments.fromExistingUsersOnNewPosts(
          refUsers.ids,
          1,
          1
        )

        const responses = await create.responses.fromExistingUsersOnNewComments(
          refUsers.ids,
          1,
          1
        )

        set2['refUsers'] = refUsers
        set2['posts'] = posts
        set2['comments'] = comments
        set2['responses'] = responses

        set2['postLikesByRefUserId'] = {}
        await Promise.all(
          posts.docs.map(async post => {
            const postLikes = await create.postLikes.existingUsersLikeExistingPosts(
              [user1._id],
              [post._id]
            )
            set2.postLikesByRefUserId[post.userId] = postLikes.docs
          })
        )

        set2['commentLikesByRefUserId'] = {}
        await Promise.all(
          comments.docs.map(async comment => {
            const commentLikes = await create.commentLikes.existingUsersLikeExistingComments(
              [user1._id],
              [comment._id]
            )
            set2.commentLikesByRefUserId[comment.userId] = commentLikes.docs
          })
        )

        set2['responseLikesByRefUserId'] = {}
        await Promise.all(
          responses.docs.map(async response => {
            const responseLikes = await create.responseLikes.existingUsersLikeExistingResponses(
              [user1._id],
              [response._id]
            )
            set2.responseLikesByRefUserId[response.userId] = responseLikes.docs
          })
        )
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          postLike1: {
            id: set1.postLikesByRefUserId[set1.refUsers.user1.id][0]._id,
          },
          postLike2: {
            id: set1.postLikesByRefUserId[set1.refUsers.user2.id][0]._id,
          },
          postLike3: {
            id: set1.postLikesByRefUserId[set1.refUsers.user3.id][0]._id,
          },
          postLike4: {
            id: set1.postLikesByRefUserId[set1.refUsers.user4.id][0]._id,
          },
          postLike5: {
            id: set1.postLikesByRefUserId[set1.refUsers.user5.id][0]._id,
          },
          postLike6: {
            id: set1.postLikesByRefUserId[set1.refUsers.user6.id][0]._id,
          },
          postLike7: {
            id: set1.postLikesByRefUserId[set1.refUsers.user7.id][0]._id,
          },
          postLike8: {
            id: set1.postLikesByRefUserId[set1.refUsers.user8.id][0]._id,
          },
          commentLike1: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user1.id][0]._id,
          },
          commentLike2: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user2.id][0]._id,
          },
          commentLike3: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user3.id][0]._id,
          },
          commentLike4: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user4.id][0]._id,
          },
          commentLike5: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user5.id][0]._id,
          },
          commentLike6: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user6.id][0]._id,
          },
          commentLike7: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user7.id][0]._id,
          },
          commentLike8: {
            id: set1.commentLikesByRefUserId[set1.refUsers.user8.id][0]._id,
          },
          responseLike1: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user1.id][0]._id,
          },
          responseLike2: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user2.id][0]._id,
          },
          responseLike3: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user3.id][0]._id,
          },
          responseLike4: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user4.id][0]._id,
          },
          responseLike5: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user5.id][0]._id,
          },
          responseLike6: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user6.id][0]._id,
          },
          responseLike7: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user7.id][0]._id,
          },
          responseLike8: {
            id: set1.responseLikesByRefUserId[set1.refUsers.user8.id][0]._id,
          },
        },
        user1: {
          id: set2.user1._id,
          postLike1: {
            id: set2.postLikesByRefUserId[set2.refUsers.user1.id][0]._id,
          },
          postLike2: {
            id: set2.postLikesByRefUserId[set2.refUsers.user2.id][0]._id,
          },
          postLike3: {
            id: set2.postLikesByRefUserId[set2.refUsers.user3.id][0]._id,
          },
          postLike4: {
            id: set2.postLikesByRefUserId[set2.refUsers.user4.id][0]._id,
          },
          postLike5: {
            id: set2.postLikesByRefUserId[set2.refUsers.user5.id][0]._id,
          },
          postLike6: {
            id: set2.postLikesByRefUserId[set2.refUsers.user6.id][0]._id,
          },
          postLike7: {
            id: set2.postLikesByRefUserId[set2.refUsers.user7.id][0]._id,
          },
          postLike8: {
            id: set2.postLikesByRefUserId[set2.refUsers.user8.id][0]._id,
          },
          commentLike1: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user1.id][0]._id,
          },
          commentLike2: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user2.id][0]._id,
          },
          commentLike3: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user3.id][0]._id,
          },
          commentLike4: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user4.id][0]._id,
          },
          commentLike5: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user5.id][0]._id,
          },
          commentLike6: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user6.id][0]._id,
          },
          commentLike7: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user7.id][0]._id,
          },
          commentLike8: {
            id: set2.commentLikesByRefUserId[set2.refUsers.user8.id][0]._id,
          },
          responseLike1: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user1.id][0]._id,
          },
          responseLike2: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user2.id][0]._id,
          },
          responseLike3: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user3.id][0]._id,
          },
          responseLike4: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user4.id][0]._id,
          },
          responseLike5: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user5.id][0]._id,
          },
          responseLike6: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user6.id][0]._id,
          },
          responseLike7: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user7.id][0]._id,
          },
          responseLike8: {
            id: set2.responseLikesByRefUserId[set2.refUsers.user8.id][0]._id,
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
        const refUsers = await create.following.existingUsersFollowNewPublicUsers(
          [testUserId],
          2
        )

        let postLikesByRefUserId = {}
        let commentLikesByRefUserId = {}
        let responseLikesByRefUserId = {}

        await Promise.all(
          refUsers.ids.map(async userId => {
            const posts = await create.posts.fromExistingUserIds([userId], 1)
            const comments = await create.comments.fromExistingUsersOnNewPosts(
              [userId],
              1,
              1
            )
            const responses = await create.responses.fromExistingUsersOnNewComments(
              [userId],
              1,
              1
            )
            const postLikes = await create.postLikes.existingUsersLikeExistingPosts(
              [testUserId],
              posts.ids
            )
            const commentLikes = await create.commentLikes.existingUsersLikeExistingComments(
              [testUserId],
              comments.ids
            )
            const responseLikes = await create.responseLikes.existingUsersLikeExistingResponses(
              [testUserId],
              responses.ids
            )
            postLikesByRefUserId[userId] = postLikes.docs
            commentLikesByRefUserId[userId] = commentLikes.docs
            responseLikesByRefUserId[userId] = responseLikes.docs
          })
        )

        const refUser1 = refUsers.docs[0]
        const refUser2 = refUsers.docs[1]

        await q.crud.delete.user.findByIdAndRemove(refUser1._id)

        const post2 = postLikesByRefUserId[refUser2._id][0]
        const comment2 = commentLikesByRefUserId[refUser2._id][0]
        const response2 = responseLikesByRefUserId[refUser2._id][0]

        await q.crud.delete.post.findByIdAndRemove(post2._id)
        await q.crud.delete.comment.findByIdAndRemove(comment2._id)
        await q.crud.delete.response.findByIdAndRemove(response2._id)

        set1 = {
          postLike1: postLikesByRefUserId[refUser1._id][0],
          postLike2: postLikesByRefUserId[refUser2._id][0],
          commentLike1: commentLikesByRefUserId[refUser1._id][0],
          commentLike2: commentLikesByRefUserId[refUser2._id][0],
          responseLike1: responseLikesByRefUserId[refUser1._id][0],
          responseLike2: responseLikesByRefUserId[refUser2._id][0],
        }
      })()

      let set2
      const createUsersDocs = await (async function() {
        const users = await create.following.existingUsersFollowNewPublicUsers(
          [testUserId],
          1
        )
        const user1 = users.docs[0]
        // set2["user1"] = user1;

        const refUsers = await create.following.existingUsersFollowNewPublicUsers(
          [user1._id],
          2
        )

        let postLikesByRefUserId = {}
        let commentLikesByRefUserId = {}
        let responseLikesByRefUserId = {}

        await Promise.all(
          refUsers.ids.map(async userId => {
            const posts = await create.posts.fromExistingUserIds([userId], 1)
            const comments = await create.comments.fromExistingUsersOnNewPosts(
              [userId],
              1,
              1
            )
            const responses = await create.responses.fromExistingUsersOnNewComments(
              [userId],
              1,
              1
            )
            const postLikes = await create.postLikes.existingUsersLikeExistingPosts(
              [user1._id],
              posts.ids
            )
            const commentLikes = await create.commentLikes.existingUsersLikeExistingComments(
              [user1._id],
              comments.ids
            )
            const responseLikes = await create.responseLikes.existingUsersLikeExistingResponses(
              [user1._id],
              responses.ids
            )
            postLikesByRefUserId[userId] = postLikes.docs
            commentLikesByRefUserId[userId] = commentLikes.docs
            responseLikesByRefUserId[userId] = responseLikes.docs
          })
        )

        const refUser1 = refUsers.docs[0]
        const refUser2 = refUsers.docs[1]

        await q.crud.delete.user.findByIdAndRemove(refUser1._id)

        const post2 = postLikesByRefUserId[refUser2._id][0]
        const comment2 = commentLikesByRefUserId[refUser2._id][0]
        const response2 = responseLikesByRefUserId[refUser2._id][0]

        await q.crud.delete.post.findByIdAndRemove(post2._id)
        await q.crud.delete.comment.findByIdAndRemove(comment2._id)
        await q.crud.delete.response.findByIdAndRemove(response2._id)

        set2 = {
          user1,
          postLike1: postLikesByRefUserId[refUser1._id][0],
          postLike2: postLikesByRefUserId[refUser2._id][0],
          commentLike1: commentLikesByRefUserId[refUser1._id][0],
          commentLike2: commentLikesByRefUserId[refUser2._id][0],
          responseLike1: responseLikesByRefUserId[refUser1._id][0],
          responseLike2: responseLikesByRefUserId[refUser2._id][0],
        }
      })()

      return {
        testUserId,
        testUser: {
          id: testUserId,
          postLike1: { id: set1.postLike1._id },
          postLike2: { id: set1.postLike2._id },
          commentLike1: { id: set1.commentLike1._id },
          commentLike2: { id: set1.commentLike2._id },
          responseLike1: { id: set1.responseLike1._id },
          responseLike2: { id: set1.responseLike2._id },
        },
        user1: {
          id: set2.user1._id,
          postLike1: { id: set2.postLike1._id },
          postLike2: { id: set2.postLike2._id },
          commentLike1: { id: set2.commentLike1._id },
          commentLike2: { id: set2.commentLike2._id },
          responseLike1: { id: set2.responseLike1._id },
          responseLike2: { id: set2.responseLike2._id },
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
