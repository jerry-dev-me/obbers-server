/**
 * - usersStatusAccount (users with different account status)
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
 *
 * - social connections users (testUser social connections users)
 * user1: private profile, testUser is following this user
 * user2: public profile, testUser is following this user
 * user3: private profile, testUser is following this user, has blocked testUser
 * user4: public profile, testUser is following this user, has blocked testUser
 * user5: private profile, testUser is not following this user
 * user6: public profile, testUser is not following this user
 * user7: private profile, testUser is not following this user, has blocked testUser
 * user8: public profile, testUser is not following this user, has blocked testUser
 *
 * Each document name ends with a number. This number is the user who is
 * referenced. User ID referenced in a document might be a direct referece, user
 * is the creator of such document, or that document contains a reference to
 * another document where the creator is the user.
 *
 * documentsWithDirectRefs
 * Say we have a comment document, a direct ref means that the userId ref found
 * at that comment document belongs to one of the users created before, users
 * with different account statuses and social connections.
 *
 * documentsWithDeepRefs
 * Say we have a response document, a deep ref means that the userId ref is
 * found not at the commentId ref found at the response document, but on another
 * nested ref id found at the comment document where you have more refs, postId
 * is a ref found at the comment document which is a ref of the response document.
 * Those are deep refs and the userId creator is found at the post document and
 * such user is one of the users created before, users with different account
 * statuses and social connections.
 *
 * - testUser
 * comment1 - testUser comment on post from testUser
 * comment2 - testUser comment on post from public user
 * response1 - testUser response on comment and post from testUser
 * response2 - testUser response on comment and post from public user
 *
 * - documentsWithDeepRefs
 *
 *
 *
 *
 *
 *
 */

const config = require('../../../config')
const q = require('../../../../app/queries')
const h = require('../../../helpers')
const datasets = require('../../../data/datasets')
const create = require('../../../data/crud/create')

// docs for testing adminOnly
// docs for testing selfOnly
// docs for testing default
// docs for testing followingOnly
// docs for testing valueFoundInFields
// docs for testing valueFoundInAnyFields

module.exports = async () => {
  const testUser = await q.crud.create.user.new(h.fakeFields.user())

  // create userIds

  const connections = await create.userSocialConnections(testUser._id)
  const usersAccountStatus = await create.usersAccountStatus(testUser._id)

  const userIds = [...connections.ids, ...usersAccountStatus.ids]

  // directRefs
  // documents from userIds on new public user ids
  // deepRefs
  // documents from new public user ids on documents from userIds

  // • deeper refs

  // userIds have posts

  const posts1 = await create.posts.fromExistingUserIds(userIds, 1)
  const comments1 = await create.comments.fromNewPublicUsersOnExistingPosts(
    1,
    posts1.ids,
    1
  )
  const responses1 = await create.responses.fromNewUsersOnExistingComments(
    1,
    comments1.ids,
    1
  )

  let postDocumentByPostId = {}
  posts1.documents.map(postDocument => {
    postDocumentByPostId[postDocument._id] = postDocument
  })

  let commentsByPostUserId = {}
  comments1.documents.map(commentDocument => {
    const postUserId = postDocumentByPostId[commentDocument.postId].userId
    commentsByPostUserId[postUserId] = commentDocument
  })

  let responsesByPostUserId = {}
  await Promise.all(
    responses1.documents.map(async responseDocument => {
      const commentId = responseDocument.commentId
      const comment = await q.crud.read.comment.findById(commentId)
      const postId = comment.postId
      const post = await q.crud.read.post.findById(postId)
      const postUserId = post.userId
      responsesByPostUserId[postUserId] = responseDocument
    })
  )

  // • direct refs

  // userIds have comments

  const comments2 = await create.comments.fromExistingUsersOnNewPosts(
    userIds,
    1,
    1
  )
  const responses2 = await create.responses.fromExistingUsersOnNewComments(
    userIds,
    1,
    1
  )

  let commentsByUserId = {}
  comments2.documents.map(commentDocument => {
    commentsByUserId[commentDocument.userId] = commentDocument
  })

  let responsesByUserId = {}
  responses2.documents.map(responseDocument => {
    responsesByUserId[responseDocument.userId] = responseDocument
  })

  // testUser post and comments own post

  const posts3 = await create.posts.fromExistingUserIds([testUser._id], 1)
  const comments3 = await create.comments.fromExistingUsersOnExistingPosts(
    [testUser._id],
    [posts3.ids[0]],
    1
  )
  const testUserComment1 = comments3.documents[0]

  // testUser comments public post

  const posts4 = await create.posts.fromNewPublicUsers(1, 1)
  const comments4 = await create.comments.fromExistingUsersOnExistingPosts(
    [testUser._id],
    [posts4.ids[0]],
    1
  )
  const testUserComment2 = comments4.documents[0]

  // testUser response on own comment from own post

  const responses3 = await create.responses.fromExistingUsersOnExistingComments(
    [testUser._id],
    [testUserComment1._id],
    1
  )
  const testUserResponse1 = responses3.documents[0]

  // testUser response on comment from public user

  const responses4 = await create.responses.fromExistingUsersOnNewComments(
    [testUser._id],
    1,
    1
  )
  const testUserResponse2 = responses4.documents[0]

  // testUser documents

  const testUserDocuments = {
    withDirectRefs: {
      comment2: { id: testUserComment2._id },
      response2: { id: testUserResponse2._id },
    },
    withDeepRefs: {
      comment1: { id: testUserComment1._id },
      response1: { id: testUserResponse1._id },
    },
  }

  // documents with direct refIds to userIds

  const documentsWithDirectRefs = {
    fromUsersStatus: {
      comment1: { id: commentsByUserId[usersAccountStatus.user1.id]._id },
      comment2: { id: commentsByUserId[usersAccountStatus.user2.id]._id },
      comment3: { id: commentsByUserId[usersAccountStatus.user3.id]._id },
      comment4: { id: commentsByUserId[usersAccountStatus.user4.id]._id },
      comment5: { id: commentsByUserId[usersAccountStatus.user5.id]._id },
      comment6: { id: commentsByUserId[usersAccountStatus.user6.id]._id },
      comment7: { id: commentsByUserId[usersAccountStatus.user7.id]._id },
      comment8: { id: commentsByUserId[usersAccountStatus.user8.id]._id },
      comment9: { id: commentsByUserId[usersAccountStatus.user9.id]._id },
      comment10: { id: commentsByUserId[usersAccountStatus.user10.id]._id },
      comment11: { id: commentsByUserId[usersAccountStatus.user11.id]._id },
      comment12: { id: commentsByUserId[usersAccountStatus.user12.id]._id },
      comment13: { id: commentsByUserId[usersAccountStatus.user13.id]._id },
      comment14: { id: commentsByUserId[usersAccountStatus.user14.id]._id },
      comment15: { id: commentsByUserId[usersAccountStatus.user15.id]._id },
      comment16: { id: commentsByUserId[usersAccountStatus.user16.id]._id },
      comment17: { id: commentsByUserId[usersAccountStatus.user17.id]._id },
      comment18: { id: commentsByUserId[usersAccountStatus.user18.id]._id },
      comment19: { id: commentsByUserId[usersAccountStatus.user19.id]._id },
      comment20: { id: commentsByUserId[usersAccountStatus.user20.id]._id },
      response1: { id: responsesByUserId[usersAccountStatus.user1.id]._id },
      response2: { id: responsesByUserId[usersAccountStatus.user2.id]._id },
      response3: { id: responsesByUserId[usersAccountStatus.user3.id]._id },
      response4: { id: responsesByUserId[usersAccountStatus.user4.id]._id },
      response5: { id: responsesByUserId[usersAccountStatus.user5.id]._id },
      response6: { id: responsesByUserId[usersAccountStatus.user6.id]._id },
      response7: { id: responsesByUserId[usersAccountStatus.user7.id]._id },
      response8: { id: responsesByUserId[usersAccountStatus.user8.id]._id },
      response9: { id: responsesByUserId[usersAccountStatus.user9.id]._id },
      response10: { id: responsesByUserId[usersAccountStatus.user10.id]._id },
      response11: { id: responsesByUserId[usersAccountStatus.user11.id]._id },
      response12: { id: responsesByUserId[usersAccountStatus.user12.id]._id },
      response13: { id: responsesByUserId[usersAccountStatus.user13.id]._id },
      response14: { id: responsesByUserId[usersAccountStatus.user14.id]._id },
      response15: { id: responsesByUserId[usersAccountStatus.user15.id]._id },
      response16: { id: responsesByUserId[usersAccountStatus.user16.id]._id },
      response17: { id: responsesByUserId[usersAccountStatus.user17.id]._id },
      response18: { id: responsesByUserId[usersAccountStatus.user18.id]._id },
      response19: { id: responsesByUserId[usersAccountStatus.user19.id]._id },
      response20: { id: responsesByUserId[usersAccountStatus.user20.id]._id },
    },
    fromSocialConnections: {
      comment1: { id: commentsByUserId[connections.user1.id]._id },
      comment2: { id: commentsByUserId[connections.user2.id]._id },
      comment3: { id: commentsByUserId[connections.user3.id]._id },
      comment4: { id: commentsByUserId[connections.user4.id]._id },
      comment5: { id: commentsByUserId[connections.user5.id]._id },
      comment6: { id: commentsByUserId[connections.user6.id]._id },
      comment7: { id: commentsByUserId[connections.user7.id]._id },
      comment8: { id: commentsByUserId[connections.user8.id]._id },
      response1: { id: responsesByUserId[connections.user1.id]._id },
      response2: { id: responsesByUserId[connections.user2.id]._id },
      response3: { id: responsesByUserId[connections.user3.id]._id },
      response4: { id: responsesByUserId[connections.user4.id]._id },
      response5: { id: responsesByUserId[connections.user5.id]._id },
      response6: { id: responsesByUserId[connections.user6.id]._id },
      response7: { id: responsesByUserId[connections.user7.id]._id },
      response8: { id: responsesByUserId[connections.user8.id]._id },
    },
  }

  // documents with deep refIds to userIds

  const documentsWithDeepRefs = {
    fromUsersStatus: {
      comment1: { id: commentsByPostUserId[usersAccountStatus.user1.id]._id },
      comment2: { id: commentsByPostUserId[usersAccountStatus.user2.id]._id },
      comment3: { id: commentsByPostUserId[usersAccountStatus.user3.id]._id },
      comment4: { id: commentsByPostUserId[usersAccountStatus.user4.id]._id },
      comment5: { id: commentsByPostUserId[usersAccountStatus.user5.id]._id },
      comment6: { id: commentsByPostUserId[usersAccountStatus.user6.id]._id },
      comment7: { id: commentsByPostUserId[usersAccountStatus.user7.id]._id },
      comment8: { id: commentsByPostUserId[usersAccountStatus.user8.id]._id },
      comment9: { id: commentsByPostUserId[usersAccountStatus.user9.id]._id },
      comment10: {
        id: commentsByPostUserId[usersAccountStatus.user10.id]._id,
      },
      comment11: {
        id: commentsByPostUserId[usersAccountStatus.user11.id]._id,
      },
      comment12: {
        id: commentsByPostUserId[usersAccountStatus.user12.id]._id,
      },
      comment13: {
        id: commentsByPostUserId[usersAccountStatus.user13.id]._id,
      },
      comment14: {
        id: commentsByPostUserId[usersAccountStatus.user14.id]._id,
      },
      comment15: {
        id: commentsByPostUserId[usersAccountStatus.user15.id]._id,
      },
      comment16: {
        id: commentsByPostUserId[usersAccountStatus.user16.id]._id,
      },
      comment17: {
        id: commentsByPostUserId[usersAccountStatus.user17.id]._id,
      },
      comment18: {
        id: commentsByPostUserId[usersAccountStatus.user18.id]._id,
      },
      comment19: {
        id: commentsByPostUserId[usersAccountStatus.user19.id]._id,
      },
      comment20: {
        id: commentsByPostUserId[usersAccountStatus.user20.id]._id,
      },
      response1: {
        id: responsesByPostUserId[usersAccountStatus.user1.id]._id,
      },
      response2: {
        id: responsesByPostUserId[usersAccountStatus.user2.id]._id,
      },
      response3: {
        id: responsesByPostUserId[usersAccountStatus.user3.id]._id,
      },
      response4: {
        id: responsesByPostUserId[usersAccountStatus.user4.id]._id,
      },
      response5: {
        id: responsesByPostUserId[usersAccountStatus.user5.id]._id,
      },
      response6: {
        id: responsesByPostUserId[usersAccountStatus.user6.id]._id,
      },
      response7: {
        id: responsesByPostUserId[usersAccountStatus.user7.id]._id,
      },
      response8: {
        id: responsesByPostUserId[usersAccountStatus.user8.id]._id,
      },
      response9: {
        id: responsesByPostUserId[usersAccountStatus.user9.id]._id,
      },
      response10: {
        id: responsesByPostUserId[usersAccountStatus.user10.id]._id,
      },
      response11: {
        id: responsesByPostUserId[usersAccountStatus.user11.id]._id,
      },
      response12: {
        id: responsesByPostUserId[usersAccountStatus.user12.id]._id,
      },
      response13: {
        id: responsesByPostUserId[usersAccountStatus.user13.id]._id,
      },
      response14: {
        id: responsesByPostUserId[usersAccountStatus.user14.id]._id,
      },
      response15: {
        id: responsesByPostUserId[usersAccountStatus.user15.id]._id,
      },
      response16: {
        id: responsesByPostUserId[usersAccountStatus.user16.id]._id,
      },
      response17: {
        id: responsesByPostUserId[usersAccountStatus.user17.id]._id,
      },
      response18: {
        id: responsesByPostUserId[usersAccountStatus.user18.id]._id,
      },
      response19: {
        id: responsesByPostUserId[usersAccountStatus.user19.id]._id,
      },
      response20: {
        id: responsesByPostUserId[usersAccountStatus.user20.id]._id,
      },
    },
    fromSocialConnections: {
      comment1: { id: commentsByPostUserId[connections.user1.id]._id },
      comment2: { id: commentsByPostUserId[connections.user2.id]._id },
      comment3: { id: commentsByPostUserId[connections.user3.id]._id },
      comment4: { id: commentsByPostUserId[connections.user4.id]._id },
      comment5: { id: commentsByPostUserId[connections.user5.id]._id },
      comment6: { id: commentsByPostUserId[connections.user6.id]._id },
      comment7: { id: commentsByPostUserId[connections.user7.id]._id },
      comment8: { id: commentsByPostUserId[connections.user8.id]._id },
      response1: { id: responsesByPostUserId[connections.user1.id]._id },
      response2: { id: responsesByPostUserId[connections.user2.id]._id },
      response3: { id: responsesByPostUserId[connections.user3.id]._id },
      response4: { id: responsesByPostUserId[connections.user4.id]._id },
      response5: { id: responsesByPostUserId[connections.user5.id]._id },
      response6: { id: responsesByPostUserId[connections.user6.id]._id },
      response7: { id: responsesByPostUserId[connections.user7.id]._id },
      response8: { id: responsesByPostUserId[connections.user8.id]._id },
    },
  }

  // documents for testing all different restrictions

  const docsWithDirRefsUStatus = documentsWithDirectRefs.fromUsersStatus
  const docsWithDirRefsUSocial = documentsWithDirectRefs.fromSocialConnections

  const docsWithDeepRefsUStatus = documentsWithDeepRefs.fromUsersStatus
  const docsWithDeepRefsUSocial = documentsWithDeepRefs.fromSocialConnections

  const defaultRestriction = {
    directRefs: {
      validationSuccessExpected: [
        { model: 'comment', id: docsWithDirRefsUStatus.comment1.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment3.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment6.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment8.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment16.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment18.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment1.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment2.id },
        { model: 'response', id: docsWithDirRefsUStatus.response1.id },
        { model: 'response', id: docsWithDirRefsUStatus.response3.id },
        { model: 'response', id: docsWithDirRefsUStatus.response6.id },
        { model: 'response', id: docsWithDirRefsUStatus.response8.id },
        { model: 'response', id: docsWithDirRefsUStatus.response16.id },
        { model: 'response', id: docsWithDirRefsUStatus.response18.id },
        { model: 'response', id: docsWithDirRefsUSocial.response1.id },
        { model: 'response', id: docsWithDirRefsUSocial.response2.id },
      ],
      validationFailExpected: [
        { model: 'comment', id: docsWithDirRefsUStatus.comment2.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment4.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment5.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment7.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment9.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment10.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment11.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment12.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment13.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment14.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment15.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment17.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment19.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment20.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment3.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment4.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment5.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment6.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment7.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment8.id },
        { model: 'response', id: docsWithDirRefsUStatus.response2.id },
        { model: 'response', id: docsWithDirRefsUStatus.response4.id },
        { model: 'response', id: docsWithDirRefsUStatus.response5.id },
        { model: 'response', id: docsWithDirRefsUStatus.response7.id },
        { model: 'response', id: docsWithDirRefsUStatus.response9.id },
        { model: 'response', id: docsWithDirRefsUStatus.response10.id },
        { model: 'response', id: docsWithDirRefsUStatus.response11.id },
        { model: 'response', id: docsWithDirRefsUStatus.response12.id },
        { model: 'response', id: docsWithDirRefsUStatus.response13.id },
        { model: 'response', id: docsWithDirRefsUStatus.response14.id },
        { model: 'response', id: docsWithDirRefsUStatus.response15.id },
        { model: 'response', id: docsWithDirRefsUStatus.response17.id },
        { model: 'response', id: docsWithDirRefsUStatus.response19.id },
        { model: 'response', id: docsWithDirRefsUStatus.response20.id },
        { model: 'response', id: docsWithDirRefsUSocial.response3.id },
        { model: 'response', id: docsWithDirRefsUSocial.response4.id },
        { model: 'response', id: docsWithDirRefsUSocial.response5.id },
        { model: 'response', id: docsWithDirRefsUSocial.response6.id },
        { model: 'response', id: docsWithDirRefsUSocial.response7.id },
        { model: 'response', id: docsWithDirRefsUSocial.response8.id },
      ],
    },
    deepRefs: {
      validationSuccessExpected: [
        { model: 'comment', id: docsWithDeepRefsUStatus.comment1.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment3.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment6.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment8.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment16.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment18.id },
        { model: 'comment', id: docsWithDeepRefsUSocial.comment1.id },
        { model: 'comment', id: docsWithDeepRefsUSocial.comment2.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response1.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response3.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response6.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response8.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response16.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response18.id },
        { model: 'response', id: docsWithDeepRefsUSocial.response1.id },
        { model: 'response', id: docsWithDeepRefsUSocial.response2.id },
      ],
      validationFailExpected: [
        { model: 'comment', id: docsWithDeepRefsUStatus.comment2.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment4.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment5.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment7.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment9.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment10.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment11.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment12.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment13.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment14.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment15.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment17.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment19.id },
        { model: 'comment', id: docsWithDeepRefsUStatus.comment20.id },
        { model: 'comment', id: docsWithDeepRefsUSocial.comment3.id },
        { model: 'comment', id: docsWithDeepRefsUSocial.comment4.id },
        { model: 'comment', id: docsWithDeepRefsUSocial.comment5.id },
        { model: 'comment', id: docsWithDeepRefsUSocial.comment6.id },
        { model: 'comment', id: docsWithDeepRefsUSocial.comment7.id },
        { model: 'comment', id: docsWithDeepRefsUSocial.comment8.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response2.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response4.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response5.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response7.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response9.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response10.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response11.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response12.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response13.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response14.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response15.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response17.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response19.id },
        { model: 'response', id: docsWithDeepRefsUStatus.response20.id },
        { model: 'response', id: docsWithDeepRefsUSocial.response3.id },
        { model: 'response', id: docsWithDeepRefsUSocial.response4.id },
        { model: 'response', id: docsWithDeepRefsUSocial.response5.id },
        { model: 'response', id: docsWithDeepRefsUSocial.response6.id },
        { model: 'response', id: docsWithDeepRefsUSocial.response7.id },
        { model: 'response', id: docsWithDeepRefsUSocial.response8.id },
      ],
    },
  }

  const adminOnlyRestriction = [
    ...defaultRestriction.directRefs.validationSuccessExpected,
    ...defaultRestriction.directRefs.validationFailExpected,
    ...defaultRestriction.deepRefs.validationSuccessExpected,
    ...defaultRestriction.deepRefs.validationFailExpected,
  ]

  const selfOnlyRestriction = {
    directRefs: {
      validationSuccessExpected: [
        { model: 'comment', id: testUserComment2._id },
        { model: 'response', id: testUserResponse2._id },
      ],
      validationFailExpected: [
        { model: 'comment', id: docsWithDirRefsUStatus.comment1.id },
        { model: 'response', id: docsWithDirRefsUStatus.response1.id },
      ],
    },
    deepRefs: {
      validationSuccessExpected: [
        { model: 'comment', id: testUserComment1._id },
        { model: 'response', id: testUserResponse1._id },
      ],
      validationFailExpected: [
        { model: 'comment', id: testUserComment2._id },
        { model: 'response', id: testUserResponse2._id },
      ],
    },
  }

  const followingOnlyRestriction = {
    directRefs: {
      validationSuccessExpected: [
        { model: 'comment', id: docsWithDirRefsUStatus.comment1.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment6.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment1.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment2.id },
        { model: 'response', id: docsWithDirRefsUStatus.response1.id },
        { model: 'response', id: docsWithDirRefsUStatus.response6.id },
        { model: 'response', id: docsWithDirRefsUSocial.response1.id },
        { model: 'response', id: docsWithDirRefsUSocial.response2.id },
      ],
      validationFailExpected: [
        { model: 'comment', id: docsWithDirRefsUStatus.comment11.id },
        { model: 'comment', id: docsWithDirRefsUStatus.comment16.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment5.id },
        { model: 'comment', id: docsWithDirRefsUSocial.comment6.id },
        { model: 'response', id: docsWithDirRefsUStatus.response11.id },
        { model: 'response', id: docsWithDirRefsUStatus.response16.id },
        { model: 'response', id: docsWithDirRefsUSocial.response5.id },
        { model: 'response', id: docsWithDirRefsUSocial.response6.id },
      ],
    },
    deepRefs: {
      validationSuccessExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
      validationFailExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
    },
  }

  const valueFoundInFieldsRestriction = {
    directRefs: {
      validationSuccessExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
      validationFailExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
    },
    deepRefs: {
      validationSuccessExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
      validationFailExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
    },
  }

  const valueFoundInAnyFieldsRestriction = {
    directRefs: {
      validationSuccessExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
      validationFailExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
    },
    deepRefs: {
      validationSuccessExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
      validationFailExpected: [
        { model: '', id: '' },
        { model: '', id: '' },
        { model: '', id: '' },
      ],
    },
  }

  // global.testData = {
  return {
    testUserId: testUser._id,
    testUserDocuments,
    documentsWithDirectRefs,
    documentsWithDeepRefs,
    adminOnlyRestriction,
    defaultRestriction,
    selfOnlyRestriction,
    followingOnlyRestriction,
  }
}
