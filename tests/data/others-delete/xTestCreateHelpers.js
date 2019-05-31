// const q = require("../../../../app/queries");
// const fakeFields = require("../../fakeFields");
// const logger = require("../../../../lib/logger");
//
// const createUsers = require("./createUsers");
// const createRequests = require("./createRequests");
// const createFollowers = require("./createFollowers");
// const createFollowing = require("./createFollowing");
// const createBlockedUsers = require("./createBlockedUsers");
// const createReports = require("./createReports");
// const createPosts = require("./createPosts");
// const createArchivedPosts = require("./createArchivedPosts");
// const createTaggedPosts = require("./createTaggedPosts");
// const createCollections = require("./createCollections");
// const createComments = require("./createComments");
// const createResponses = require("./createResponses");
// const createPostLikes = require("./createPostLikes");
// const createCommentLikes = require("./createCommentLikes");
// const createResponseLikes = require("./createResponseLikes");
//
// const lG = "TESTS-HELPERS"; // logGroup
// const lS = "TEST-CREATE-HELPERS"; // logSubgroup
//
// module.exports = async () => {
//   // ===========================================================================
//   // CREATE USERS
//   // ===========================================================================
//
//   // returns ids: { 1, 2, 3 }
//
//   // // √
//   // console.log("\n NEW PUBLIC USERS:");
//   // const newPublicUsers = await createUsers.newPublicUsers(3);
//   // console.log(newPublicUsers);
//
//   // // √
//   // console.log("\n NEW PRIVATE USERS:");
//   // const newPrivateUsers = await createUsers.newPrivateUsers(3);
//   // console.log(newPrivateUsers);
//
//   // // √
//   // console.log("\n MAKE EXISTING PUBLIC USERS PRIVATE:");
//   // const publicUsers = await createUsers.newPublicUsers(3);
//   // const publicUsersBecomePrivate = await createUsers.toggleExistingUsersSettingsPrivate(
//   //   publicUsers
//   // );
//   // console.log(publicUsersBecomePrivate);
//
//   // // √
//   // console.log("\n MAKE EXISTING PRIVATE USERS PUBLIC:");
//   // const privateUsers = await createUsers.newPrivateUsers(3);
//   // const privateUsersBecomePublic = await createUsers.toggleExistingUsersSettingsPrivate(
//   //   privateUsers
//   // );
//   // console.log(privateUsersBecomePublic);
//
//   // // √
//   // console.log("\n NEW USER ACCOUNT PERMISSIONS ARE NOW ADMIN:");
//   // const newUsersAdmin = await createUsers.newUsersAdmin(3);
//   // console.log(newUsersAdmin);
//
//   // // √
//   // console.log("\n EXISTING USERS ACCOUNT PERMISSIONS ARE NOW ADMIN:");
//   // const notAdminUsers = await createUsers.newPublicUsers(3);
//   // const existingUsersNowAdmin = await createUsers.makeExistingUsersAdmin(
//   //   notAdminUsers
//   // );
//   // console.log(existingUsersNowAdmin);
//
//   // ===========================================================================
//   // CREATE REQUESTS
//   // ===========================================================================
//
//   // returns {
//   // requestIdsSentFromUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // requestIdsSentToUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allRequestIds: [1,2,3]
//   // }
//
//   // // { sentFromUserId, sentToUserId, ids }
//   // // { "1": { requestIds: ["1", "2", "3"] }, "2": {}, "3": {} }
//   // // √
//   // console.log("\n EXISTING USERS SEND REQUESTS TO EXISTING USERS:");
//   // const users1 = await createUsers.newPublicUsers(2);
//   // const users2 = await createUsers.newPrivateUsers(3);
//   // const reqFromExistingUsersToExistingUsers = await createRequests.fromExistingUsersToExistingUsers(
//   //   users1,
//   //   users2
//   // );
//   // console.log(reqFromExistingUsersToExistingUsers);
//
//   // // √
//   // console.log("\n NEW USERS SEND REQUESTS TO EXISTING USERS:");
//   // const users2 = await createUsers.newPrivateUsers(3);
//   // const reqFromNewUsersToExistingUsers = await createRequests.fromNewUsersToExistingUsers(
//   //   2,
//   //   users2
//   // );
//   // console.log(reqFromNewUsersToExistingUsers);
//
//   // // √
//   // console.log("\n EXISTING USERS SEND REQUESTS TO NEW USERS:");
//   // const users = await createUsers.newPublicUsers(2);
//   // const reqFromExistingUsersToNewUsers = await createRequests.fromExistingUsersToNewUsers(
//   //   users,
//   //   3
//   // );
//   // console.log(reqFromExistingUsersToNewUsers);
//
//   // // √
//   // console.log("\n NEW USERS SEND REQUESTS TO NEW USERS:");
//   // const reqFromNewUsersToNewUsers = await createRequests.fromNewUsersToNewUsers(
//   //   2,
//   //   3
//   // );
//   // console.log(reqFromNewUsersToNewUsers);
//
//   // ===========================================================================
//   // CREATE FOLLOWERS
//   // ===========================================================================
//
//   // returns {
//   // followersUserIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allFollowersUserIds: [1,2,3]
//   // }
//
//   // // √
//   // console.log("\n NEW PUBLIC USERS FOLLOWERS OF EXISTING USER IDS:");
//   // const testUsers = await createUsers.newPublicUsers(2);
//   // const testUser1Id = testUsers[0];
//   // const testUser2Id = testUsers[1];
//   // const followers = await createFollowers.newPublicUsersFollowExistingUsers(
//   //   3,
//   //   [testUser1Id, testUser2Id]
//   // );
//   // console.log(followers);
//   // logger.log(lG, lS, null, { followers });
//
//   // // √
//   // console.log("\n NEW PRIVATE USERS FOLLOWERS OF EXISTING USER IDS:");
//   // const testUsers = await createUsers.newPublicUsers(2);
//   // const testUser1Id = testUsers[0];
//   // const testUser2Id = testUsers[1];
//   // const followers = await createFollowers.newPrivateUsersFollowExistingUsers(
//   //   3,
//   //   [testUser1Id, testUser2Id]
//   // );
//   // console.log(followers);
//   // logger.log(lG, lS, null, { followers });
//
//   // // √
//   // console.log("\n EXISTING USERS FOLLOWERS OF EXISTING USER IDS:");
//   // const usersFollowers = await createUsers.newPublicUsers(2);
//   // const usersToFollow = await createUsers.newPrivateUsers(2);
//   // const userFollower1Id = usersFollowers[0];
//   // const userFollower2Id = usersFollowers[1];
//   // const usersToFollow1Id = usersToFollow[0];
//   // const usersToFollow2Id = usersToFollow[1];
//   // const existingUsersFollowers = await createFollowers.existingUsersFollowExistingUsers(
//   //   [userFollower1Id, userFollower2Id],
//   //   [usersToFollow1Id, usersToFollow2Id]
//   // );
//   // console.log(existingUsersFollowers);
//   // logger.log(lG, lS, null, { existingUsersFollowers });
//
//   // ===========================================================================
//   // CREATE FOLLOWING
//   // ===========================================================================
//
//   // returns {
//   // followingUserIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allFollowingUserIds: [1,2,3]
//   // }
//
//   // // √
//   // console.log("\n EXISTING USER IDS FOLLOWING NEW PUBLIC USERS:");
//   // const testUsers = await createUsers.newPrivateUsers(2);
//   // const testUser1Id = testUsers[0];
//   // const testUser2Id = testUsers[1];
//   // const following = await createFollowing.existingUsersFollowNewPublicUsers(
//   //   [testUser1Id, testUser2Id],
//   //   3
//   // );
//   // console.log(following);
//   // logger.log(lG, lS, null, { following });
//
//   // // √
//   // console.log("\n EXISTING USER IDS FOLLOWING NEW PRIVATE USERS:");
//   // const testUsers = await createUsers.newPrivateUsers(2);
//   // const testUser1Id = testUsers[0];
//   // const testUser2Id = testUsers[1];
//   // const following = await createFollowing.existingUsersFollowNewPrivateUsers(
//   //   [testUser1Id, testUser2Id],
//   //   3
//   // );
//   // console.log(following);
//   // logger.log(lG, lS, null, { following });
//
//   // // √
//   // console.log("\n EXISTING USER IDS FOLLOWING EXISTING USERS:");
//   // const usersFollowers = await createUsers.newPublicUsers(2);
//   // const usersToFollow = await createUsers.newPrivateUsers(2);
//   // const userFollower1Id = usersFollowers[0];
//   // const userFollower2Id = usersFollowers[1];
//   // const usersToFollow1Id = usersToFollow[0];
//   // const usersToFollow2Id = usersToFollow[1];
//   // const following = await createFollowing.existingUsersFollowExistingUsers(
//   //   [userFollower1Id, userFollower2Id],
//   //   [usersToFollow1Id, usersToFollow2Id]
//   // );
//   // console.log(following);
//   // logger.log(lG, lS, null, { following });
//
//   // ===========================================================================
//   // CREATE BLOCKED USERS
//   // ===========================================================================
//
//   // returns {
//   // blockedUserIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allBlockedUserIds: [1,2,3]
//   // }
//
//   // // √
//   // console.log("\n EXISTING USERS BLOCK EXISTING USERS:");
//   // const users1 = await createUsers.newPrivateUsers(2);
//   // const users2 = await createUsers.newPrivateUsers(2);
//   // const existingUsersBlockExistingUsers = await createBlockedUsers.existingUsersBlockExistingUsers(
//   //   users1,
//   //   users2
//   // );
//   // console.log(existingUsersBlockExistingUsers);
//   // logger.log(lG, lS, null, { existingUsersBlockExistingUsers });
//
//   // // √
//   // console.log("\n EXISTING USERS BLOCK NEW USERS:");
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const existingUsersBlockNewUsers = await createBlockedUsers
//   //   .existingUsersBlockNewUsers(userIds, 2);
//   // console.log(existingUsersBlockNewUsers);
//
//   // // √
//   // console.log("\n NEW USERS BLOCK EXISTING USERS:");
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const newUsersBlockExistingUsers = await createBlockedUsers
//   //   .newUsersBlockExistingUsers(2, userIds);
//   // console.log(newUsersBlockExistingUsers);
//
//   // // √
//   // console.log("\n NEW USERS BLOCK NEW USERS:");
//   // const newUsersBlockNewUsers =
//   //   await createBlockedUsers.newUsersBlockNewUsers(2, 2);
//   // console.log(newUsersBlockNewUsers);
//
//   // ===========================================================================
//   // CREATE REPORTS
//   // ===========================================================================
//
//   // returns {
//   // reportIdsSentFromUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // reportIdsSentToUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allReportIds: [1,2,3]
//   // }
//
//   // // √
//   // console.log("\n EXISTING USERS REPORT EXISTING USERS:");
//   // const users1Ids = await createUsers.newPublicUsers(2);
//   // const users2Ids = await createUsers.newPublicUsers(3);
//   // const reportFromExistingUsersToExistingUsers =
//   // await createReports.fromExistingUsersToExistingUsers(users1Ids, users2Ids);
//   // console.log(reportFromExistingUsersToExistingUsers);
//
//   // // √
//   // console.log("\n NEW USERS REPORT EXISTING USERS:");
//   // const userIds = await createUsers.newPublicUsers(3);
//   // const fromNewUsersToExistingUsers =
//   // await createReports.fromNewUsersToExistingUsers(2, userIds);
//   // console.log(fromNewUsersToExistingUsers);
//
//   // // √
//   // console.log("\n EXISTING USERS REPORT NEW USERS:");
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const fromExistingUsersToNewUsers =
//   // await createReports.fromExistingUsersToNewUsers(userIds, 3);
//   // console.log(fromExistingUsersToNewUsers);
//
//   // // √
//   // console.log("\n NEW USERS REPORT NEW USERS:");
//   // const fromNewUsersToNewUsers =
//   // await createReports.fromNewUsersToNewUsers(2, 3);
//   // console.log(fromNewUsersToNewUsers);
//
//   // ===========================================================================
//   // CREATE POSTS
//   // ===========================================================================
//
//   // returns {
//   // postIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allPostIds: [1,2,3]
//   // }
//
//   // // √
//   // console.log("\n EXISTING USERS CREATE NEW POSTS:");
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const postsFromExistingUserIds = await createPosts.fromExistingUserIds(
//   //   userIds,
//   //   3
//   // );
//   // console.log(postsFromExistingUserIds);
//
//   // // √
//   // console.log("\n NEW USERS CREATE NEW POSTS:");
//   // const postsFromNewUsers = await createPosts.fromNewUsers(2, 3);
//   // console.log(postsFromNewUsers);
//
//   // ===========================================================================
//   // CREATE ARCHIVED POSTS
//   // ===========================================================================
//
//   // returns {
//   // archivedPostIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allArchivedPostIds: [1,2,3]
//   // }
//
//   // // √
//   // console.log("\n EXISTING USER ARCHIVES EXISTING POSTS:");
//   // const userIds = await createUsers.newPublicUsers(1);
//   // const posts = await createPosts.fromExistingUserIds(userIds, 3);
//   // const existingUserArchivesExistingPosts =
//   // await createArchivedPosts.existingUserArchivesExistingPosts(userIds[0], posts.ids);
//   // console.log(existingUserArchivesExistingPosts);
//
//   // // √
//   // console.log("\n EXISTING USERS ARCHIVE NEW POSTS:");
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const existingUsersArchiveNewPosts =
//   // await createArchivedPosts.existingUsersArchiveNewPosts(userIds, 3);
//   // console.log(existingUsersArchiveNewPosts);
//
//   // // √
//   // console.log("\n NEW USERS ARCHIVE NEW POSTS:");
//   // const newUsersArchiveNewPosts =
//   // await createArchivedPosts.newUsersArchiveNewPosts(2, 3);
//   // console.log(newUsersArchiveNewPosts);
//
//   // ===========================================================================
//   // CREATE TAGGED POSTS
//   // ===========================================================================
//
//   // returns {
//   // taggedUserIdsByPostId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // taggedPostIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allTaggedPostIds: [1,2,3]
//   // }
//
//   // // √
//   // console.log("\n TAG EXISTING USERS ON EXISTING POSTS:");
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const posts = await createPosts.fromNewUsers(1, 3);
//   // const tagExistingUsersOnExistingPosts =
//   //   await createTaggedPosts.tagExistingUsersOnExistingPosts(userIds, posts.ids);
//   // console.log(tagExistingUsersOnExistingPosts);
//
//   // // √
//   // console.log("\n TAG NEW USERS ON EXISTING POSTS:");
//   // const posts = await createPosts.fromNewUsers(1, 3);
//   // const tagNewUsersOnExistingPosts =
//   // await createTaggedPosts.tagNewUsersOnExistingPosts(2, posts.ids);
//   // console.log(tagNewUsersOnExistingPosts);
//
//   // // √
//   // console.log("\n TAG EXISTING USERS ON NEW POSTS:");
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const tagExistingUsersOnNewPosts =
//   // await createTaggedPosts.tagExistingUsersOnNewPosts(userIds, 3);
//   // console.log(tagExistingUsersOnNewPosts);
//
//   // // √
//   // console.log("\n TAG NEW USERS ON NEW POSTS:");
//   // const tagNewUsersOnNewPosts =
//   // await createTaggedPosts.tagNewUsersOnNewPosts(2, 3);
//   // console.log(tagNewUsersOnNewPosts);
//
//   // ===========================================================================
//   // CREATE COLLECTIONS
//   // ===========================================================================
//
//   // returns {
//   // collectionIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // postIdsSavedByUserIdAndCollectionId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allCollectionIds: [1,2,3]
//   // }
//
//   // // TEST DATA
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const user1Id = userIds[0];
//   // const user2Id = userIds[1];
//   // const posts = await createPosts.fromNewUsers(3, 1);
//   // const postIds = posts.ids;
//   // const user1CollectionIds = await createCollections.createCollections(user1Id, 2);
//   // const user2CollectionIds = await createCollections.createCollections(user2Id, 2);
//   // const collectionIds = [...user1CollectionIds, ...user2CollectionIds];
//
//   // // √
//   // console.log("\n EXISTING USERS ADD EXISTING POSTS TO EXISTING COLLECTIONS:");
//   // const existingUsersAddExistingPostsToExistingCollections =
//   //   await createCollections.existingUsersAddExistingPostsToExistingCollections(
//   //     userIds,
//   //     postIds,
//   //     collectionIds
//   //   );
//   // console.log(existingUsersAddExistingPostsToExistingCollections);
//
//   // // √
//   // console.log("\n EXISTING USERS ADD NEW POSTS TO EXISTING COLLECTIONS:");
//   // const existingUsersAddNewPostsToExistingCollections =
//   //   await createCollections
//   //     .existingUsersAddNewPostsToExistingCollections(
//   //       userIds,
//   //       3,
//   //       collectionIds
//   //     );
//   // console.log(existingUsersAddNewPostsToExistingCollections);
//
//   // // √
//   // console.log("\n EXISTING USERS ADD EXISTING POSTS TO NEW COLLECTIONS:");
//   // const existingUsersAddExistingPostsToNewCollections =
//   //   await createCollections
//   //     .existingUsersAddExistingPostsToNewCollections(userIds, postIds, 2);
//   // console.log(existingUsersAddExistingPostsToNewCollections);
//
//   // // √
//   // console.log("\n EXISTING USERS ADD NEW POSTS TO NEW COLLECTIONS:");
//   // const existingUsersAddNewPostsToNewCollections =
//   //   await createCollections
//   //     .existingUsersAddNewPostsToNewCollections(userIds, 2, 2);
//   // console.log(existingUsersAddNewPostsToNewCollections);
//
//   // // √
//   // console.log("\n NEW USERS ADD EXISTING POSTS TO NEW COLLECTIONS:");
//   // const newUsersAddExistingPostsToNewCollections =
//   //   await createCollections
//   //     .newUsersAddExistingPostsToNewCollections(2, postIds, 2);
//   // console.log(newUsersAddExistingPostsToNewCollections);
//
//   // // √
//   // console.log("\n NEW USERS ADD NEW POSTS TO NEW COLLECTIONS:");
//   // const newUsersAddNewPostsToNewCollections =
//   //   await createCollections
//   //     .newUsersAddNewPostsToNewCollections(2, 2, 2);
//   // console.log(newUsersAddNewPostsToNewCollections);
//
//   // ===========================================================================
//   // CREATE COMMENTS
//   // ===========================================================================
//
//   // returns {
//   // commentIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allCommentIds: [1,2,3]
//   // }
//
//   // // TEST DATA
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const user1Id = userIds[0];
//   // const user2Id = userIds[1];
//   // const posts = await createPosts.fromNewUsers(3, 1);
//   // const postIds = posts.ids;
//   //
//   // // √
//   // console.log("\n COMMENTS FROM EXISTING USERS ON EXISTING POSTS:");
//   // const commentsFromExistingUsersOnExistingPosts = await createComments
//   //   .fromExistingUsersOnExistingPosts(userIds, postIds, 1);
//   // console.log(commentsFromExistingUsersOnExistingPosts);
//
//   // // √
//   // console.log("\n COMMENTS FROM EXISTING USERS ON NEW POSTS:");
//   // const fromExistingUsersOnNewPosts = await createComments
//   //   .fromExistingUsersOnNewPosts(userIds, 3, 1);
//   // console.log(fromExistingUsersOnNewPosts);
//
//   // // √
//   // console.log("\n COMMENTS FROM NEW USERS ON EXISTING POSTS:");
//   // const fromNewUsersOnExistingPosts =
//   //   await createComments.fromNewUsersOnExistingPosts(2, postIds, 1);
//   // console.log(fromNewUsersOnExistingPosts);
//
//   // // √
//   // console.log("\n COMMENTS FROM NEW USERS ON NEW POSTS:");
//   // const fromNewUsersOnNewPosts = await createComments.fromNewUsersOnNewPosts(2, 3, 1);
//   // console.log(fromNewUsersOnNewPosts);
//
//   // ===========================================================================
//   // CREATE RESPONSES
//   // ===========================================================================
//
//   // returns {
//   // responseIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allResponseIds: [1,2,3]
//   // }
//
//   // // TEST DATA
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const comments = await createComments.fromNewUsersOnNewPosts(1, 1, 1);
//   // const commentIds = comments.ids;
//
//   // // √
//   // console.log("\n EXISTING USERS RESPONSES ON EXISTING COMMENTS:");
//   // const fromExistingUsersOnExistingComments =
//   //   await createResponses.fromExistingUsersOnExistingComments(userIds, commentIds, 3);
//   // console.log(fromExistingUsersOnExistingComments);
//
//   // // √
//   // console.log("\n EXISTING USERS RESPONSES ON NEW COMMENTS:");
//   // const fromExistingUsersOnNewComments =
//   //   await createResponses.fromExistingUsersOnNewComments(userIds, 3, 1);
//   // console.log(fromExistingUsersOnNewComments);
//
//   // // √
//   // console.log("\n NEW USERS RESPONSES ON EXISTING COMMENTS:");
//   // const fromNewUsersOnExistingComments =
//   //   await createResponses.fromNewUsersOnExistingComments(3, commentIds, 3);
//   // console.log(fromNewUsersOnExistingComments);
//
//   // // √
//   // console.log("\n NEW USERS RESPONSES ON NEW COMMENTS:");
//   // const fromNewUsersOnNewComments =
//   //   await createResponses.fromNewUsersOnNewComments(3, 3, 1);
//   // console.log(fromNewUsersOnNewComments);
//
//   // ===========================================================================
//   // CREATE POST LIKES
//   // ===========================================================================
//
//   // returns {
//   // postLikeIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allPostLikeIds: [1,2,3]
//   // }
//
//   // // TEST DATA
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const posts = await createPosts.fromNewUsers(3, 1);
//   // const postIds = posts.ids;
//
//   // // √
//   // console.log("\n EXISTING USERS LIKE EXISTING POSTS:");
//   // const likesFromExistingUsersOnExistingPosts =
//   //   await createPostLikes.existingUsersLikeExistingPosts(userIds, postIds);
//   // console.log(likesFromExistingUsersOnExistingPosts);
//
//   // // √
//   // console.log("\n EXISTING USERS LIKE NEW POSTS:");
//   // const existingUsersLikeNewPosts = await createPostLikes
//   //   .existingUsersLikeNewPosts(userIds, 3);
//   // console.log(existingUsersLikeNewPosts);
//
//   // // √
//   // console.log("\n NEW USERS LIKE EXISTING POSTS:");
//   // const newUsersLikeExistingPosts =
//   //   await createPostLikes.newUsersLikeExistingPosts(2, postIds);
//   // console.log(newUsersLikeExistingPosts);
//
//   // // √
//   // console.log("\n NEW USERS LIKE NEW POSTS:");
//   // const newUsersLikeNewPosts =
//   //   await createPostLikes.newUsersLikeNewPosts(3, 3);
//   // console.log(newUsersLikeNewPosts);
//
//   // ===========================================================================
//   // CREATE COMMENT LIKES
//   // ===========================================================================
//
//   // returns {
//   // commentLikeIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allCommentLikeIds: [1,2,3]
//   // }
//
//   // // TEST DATA
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const comments = await createComments.fromNewUsersOnNewPosts(3, 1, 1);
//   // const commentIds = comments.ids
//
//   // // √
//   // console.log("\n EXISTING USERS LIKE EXISTING COMMENTS:");
//   // const existingUsersLikeExistingComments =
//   //   await createCommentLikes.existingUsersLikeExistingComments(userIds, commentIds);
//   // console.log(existingUsersLikeExistingComments);
//
//   // // √
//   // console.log("\n EXISTING USERS LIKE NEW COMMENTS:");
//   // const existingUsersLikeNewComments =
//   //   await createCommentLikes.existingUsersLikeNewComments(userIds, 3);
//   // console.log(existingUsersLikeNewComments);
//
//   // // √
//   // console.log("\n NEW USERS LIKE EXISTING COMMENTS:");
//   // const newUsersLikeExistingComments =
//   //   await createCommentLikes.newUsersLikeExistingComments(3, commentIds);
//   // console.log(newUsersLikeExistingComments);
//
//   // // √
//   // console.log("\n NEW USERS LIKE NEW COMMENTS:");
//   // const newUsersLikeNewComments =
//   //   await createCommentLikes.newUsersLikeNewComments(3, 2);
//   // console.log(newUsersLikeNewComments);
//
//   // ===========================================================================
//   // CREATE RESPONSE LIKES
//   // ===========================================================================
//
//   // returns {
//   // responseLikeIdsByUserId: { 1: [1,2,3], 2: [1,2,3], 3: [1,2,3] },
//   // allResponseLikeIds: [1,2,3]
//   // }
//
//   // // TEST DATA
//   // const userIds = await createUsers.newPublicUsers(2);
//   // const responses = await createResponses.fromNewUsersOnNewComments(3, 1, 1);
//   // const responseIds = responses.ids;
//
//   // // √
//   // console.log("\n EXISTING USERS LIKE EXISTING RESPONSES:");
//   // const existingUsersLikeExistingResponses =
//   // await createResponseLikes.existingUsersLikeExistingResponses(userIds, responseIds);
//   // console.log(existingUsersLikeExistingResponses);
//
//   // // √
//   // console.log("\n EXISTING USERS LIKE NEW RESPONSES:");
//   // const existingUsersLikeNewResponses =
//   // await createResponseLikes.existingUsersLikeNewResponses(userIds, 3);
//   // console.log(existingUsersLikeNewResponses);
//
//   // // √
//   // console.log("\n NEW USERS LIKE EXISTING RESPONSES:");
//   // const newUsersLikeExistingResponses =
//   // await createResponseLikes.newUsersLikeExistingResponses(3, responseIds);
//   // console.log(newUsersLikeExistingResponses);
//
//   // // √
//   // console.log("\n NEW USERS LIKE NEW RESPONSES:");
//   // const newUsersLikeNewResponses =
//   // await createResponseLikes.newUsersLikeNewResponses(3, 3);
//   // console.log(newUsersLikeNewResponses);
//
//   // ===========================================================================
//   // TEST USER
//   // ===========================================================================
//
//   // const updatedTestUser = await q.features.user.read.byId(testUser1Id, testUser1Id);
//   // const updatedTestUser = await q.features.user.read.byId(testUser1Id, testUser1Id);
//   // console.log("\n test user updated is:");
//   // console.log("FOLLOWERS:");
//   // console.log(updatedTestUser.followers);
//   // console.log("FOLLOWING:");
//   // console.log(updatedTestUser.following);
// };
