// // create users following again... the ones from test1
// // testUser1 has taggedPosts
// // testUSer1 has collectinos..
// // testUser1 is folowing 50 users..
// // testUser1 has 50 followers...
// // testUse1 has 25 requests... // not sure if add this route and controller. since already have the request model...
// // testUser1 has 25 bloked users...
// // testUser1 has 25 tagged posts..
// // testUser1 has liked 25 posts...
// // return testUser1 email and testUser1 password... in order to update each one...
// // testUser1 archives a new post... return new post to archive
// // testUser1 already has one archived post
// // add an extra following user.. return this userId in order to unfollow
// // create an extra user in order to block it...
//
// /*
// * Test Data Object Properties Description:
// *
// * - newUserData
// * Description: all test data fields required for creating a new user model.
// * Usage: this data will be sent as part of the request body when creating a new
// * user account.
// *
// * - userId1
// * Description: a new private user
// * Usage: delete user by id, read full user profile and user object by id, only
// * user with ADMIN permissions can do this two operations.
// *
// * - usernameToSearch
// * Description: a user username.
// * Usage: search for this username in our records, usernames are unique.
// *
// * - nameToSearch
// * Description: a user name. Create 5 different users with the same name.
// * Usage: search for all users with this same name.
// *
// * - archivedPosts
// * Description: posts created by testUser but have been saved in archived posts.
// * Usage: read user self archived posts.
// *
// * - collections
// * Description: collections created by testUser, they contain posts from other users.
// * Usage: read user selc collections.
// *
// * - following // can be from testUser or from a new user
// * Description: array of userIds that testUser is following. Each user id here
// * has testUser id in their followers array.
// * Usage: read users following.
// *
// * - followers // can be from testUser or from a new user
// * Description: array of userIds that testUser has as followers. Each user id here
// * has testUser id in ther following array.
// * Usage: read users followers.
// *
// * - requests
// * Description: array of request ids sent to testUser from new users.
// * Usage: read user self requests.
// *
// * - blocked
// * Description: array of new user ids that testUser has blocked.
// * Usage: read user self blocked users.
// *
// * - tagged // can be from testUser or from a new user
// * Description: array of postIds where testUser has been tagged, these are new
// * posts from different new users.
// * Usage: read any user tagged posts.
// *
// * - postLikes
// * Description: array of postIds from different new users which testUser has
// * liked. Create x num of users with x num of posts, testUser like each post.
// * Usage: read user self liked posts.
// *
// * - testUserEmail
// * Description: return testUser email
// * Usage: update user email.
// *
// * - testUserPassword
// * Description: return testUser password.
// * Usage: update user password.
// *
// * - postId
// * Description: single postId created by testUser.
// * Usage: add this post to the archived posts, it must be removed from all posts
// * and be found now inside the testUser archived posts.
// *
// * - archivedPostId
// * Description: single postId created by testUser.
// * Usage: this postId is found inside testUser archived posts, remove it from the
// * archived posts and after removal it should be found now in all testUser posts.
// *
// * - userIdFollowing
// * Description: a single user id that testUser is currently following. It is
// * taken from the array of following.
// * Usage: stop following this userId by remove userId from testUser following
// * array.
// *
// * - userIdToBlock
// * Description: a single user id which is a testUser follower. It is taken from
// * one of the userIds found at the followers array.
// * Usage: update testUser by adding a new blocked user id.
// */
//
// /*
// fields: await this.fields(testUserId),
// selfOnly: await this.selfOnly(testUserId), // 100
//   -
//   -
//   -
// adminOnly: await this.adminOnly(testUserId), // 200
//   - read userId
//   -
//   -
// many: await this.many(testUserId), // 300
//   -
//   -
//   -
// socialConnections: await this.socialConnections(testUserId), // 400
//   -
//   -
//   -
// ref: await this.ref(testUserId), // 500
//   -
//   -
//   -
// empty: await this.empty(testUserId), // 600
//   -
//   -
//   -
// deletedDocs: await this.deletedDocs(testUserId) // 700
//   -
//   -
//   -
//
// posts...
// postLikes...
// taggedPosts...
// archivedPosts...
// following...
// followers...
// requests...
// blockedUsers...
// activities...
// account.reports...
//
// on activities, when someone likes testUser post, comment, response, or accepts request... taggedPosts
// when someone comments testUser post, responds testUser comment...
// create a new activity and add it to testUser's activities... which will turn into notifications
// */
//
// const logger = require("../../../../lib/logger");
// const lG = "TESTDATA"; // logGroup
// const lS = "DATASETS-USER"; // logSubgroup
//
// const faker = require("faker");
// const q = require("../../../../app/queries");
// const h = require("../../../helpers");
// const u = require("../../../../utils");
// const create = require("../../crud/create");
//
// module.exports.fields = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//
//     const valid1 = {
//       local: {
//         email: faker.internet.email,
//         password: faker.internet.password
//       },
//       // facebook: {
//       //   id: "String",
//       //   token: "String",
//       //   email: "String",
//       //   fullName: "String",
//       //   profilePic: "String"
//       // },
//       // twitter: {
//       //   id: "String",
//       //   token: "String",
//       //   fullName: "String",
//       //   username: "String",
//       //   profilePic: "String"
//       // },
//       // google: {
//       //   id: "String",
//       //   token: "String",
//       //   email: "String",
//       //   fullName: "String",
//       //   profilePic: "String"
//       // },
//       info: {
//         avatar: faker.internet.avatar(),
//         username: faker.internet.userName(),
//         name: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         phone: faker.phone.phoneNumber(),
//         website: faker.internet.url(),
//         bio: faker.lorem.paragraph(),
//         sex: "Not Specified"
//       },
//       posts: [],
//       postLikes: [],
//       taggedPosts: [],
//       archivedPosts: [],
//       collections: [],
//       following: [],
//       followers: [],
//       requests: [],
//       blockedUsers: [],
//       activities: [],
//       account: {
//         createdAt: new Date(),
//         status: "ACTIVE", // ACTIVE, INACTIVE, SUSPENDED, BANNED
//         reports: [],
//         permissions: "READ_WRITE" //READ_WRITE, READ_ONLY, ADMIN, NONE
//       },
//       settings: {
//         private: false, // true, false
//         language: "ENGLISH", // "ENGLISH", "SPANISH"
//         notifications: true // [true, false]
//       }
//     };
//
//     const valid2 = {
//       local: {
//         email: faker.internet.email,
//         password: faker.internet.password
//       },
//       // facebook: {
//       //   id: "String",
//       //   token: "String",
//       //   email: "String",
//       //   fullName: "String",
//       //   profilePic: "String"
//       // },
//       // twitter: {
//       //   id: "String",
//       //   token: "String",
//       //   fullName: "String",
//       //   username: "String",
//       //   profilePic: "String"
//       // },
//       // google: {
//       //   id: "String",
//       //   token: "String",
//       //   email: "String",
//       //   fullName: "String",
//       //   profilePic: "String"
//       // },
//       info: {
//         avatar: faker.internet.avatar(),
//         username: faker.internet.userName(),
//         name: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         phone: faker.phone.phoneNumber(),
//         website: faker.internet.url(),
//         bio: faker.lorem.paragraph(),
//         sex: "Not Specified"
//       }
//     };
//
//     const invalid = {};
//
//     const otherUserId = {};
//
//     const deletedRefId = {};
//
//     const empty = {};
//
//     const missing = {};
//
//     return {
//       testUserId,
//       valid1,
//       invalid,
//       otherUserId,
//       deletedRefId,
//       empty,
//       missing
//     };
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
//
// module.exports.adminOnly = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//
//     // user1: private/public user doc, update
//     // user2: private/public user doc, delete
//
//     return {
//       testUserId,
//       testUser: { id: testUserId },
//     };
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
//
// module.exports.selfOnly = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//
//     // user1: testUser full doc
//     // user2: other user full doc
//     // user with collections...
//     // user with archivedPosts...
//     // user with postLikes... read likedPosts...
//     // read password...
//     // read email...
//     // read account settings and edit...
//
//     return {
//       testUserId
//     };
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
//
// module.exports.accountStatus = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//     const usersStatus = await create.usersAccountStatus(testUserId);
//     return {
//       testUserId,
//       usersStatus
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
//
// module.exports.accountPermissions = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//     const usersPermissions = await create.usersAccountPermissions(testUserId);
//     return {
//       testUserId,
//       usersPermissions
//     }
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
//
// module.exports.many = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//
//     // users: multiple user docs...
//     // username1: 50 users with 5 same initial username letters
//     // name2: 50 users with 3 same initial name letters
//     // user with many likedPosts...
//     // user with many taggedPosts...
//     // user with many archivedPosts...
//     // user with many following...
//     // user with many followers...
//     // user with many activities...
//
//     return {
//       testUserId
//     };
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
//
// module.exports.empty = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//
//     // user with no:
//     // posts...
//     // postLikes...
//     // taggedPosts...
//     // archivedPosts...
//     // following...
//     // followers...
//     // requests...
//     // blockedUsers...
//     // activities...
//     // account.reports...
//
//     return {
//       testUserId
//     };
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
//
// module.exports.socialConnections = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//
//     const socialConnections = await create.userSocialConnections(testUserId);
//
//     let socialConnectionsUserIds = Object.keys(socialConnections).map(key => {
//       return socialConnections[key].id;
//     });
//
//     return {
//       testUserId,
//       user1: { id: socialConnections.user1.id },
//       user2: { id: socialConnections.user2.id },
//       user3: { id: socialConnections.user3.id },
//       user4: { id: socialConnections.user4.id },
//       user5: { id: socialConnections.user5.id },
//       user6: { id: socialConnections.user6.id },
//       user7: { id: socialConnections.user7.id },
//       user8: { id: socialConnections.user8.id }
//     };
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
//
// module.exports.nonexistent = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//
//     // user1: user doc has been deleted
//
//     return {
//       testUserId
//     };
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
//
// module.exports.refs = {
//   accountStatus: async testUserId => {
//     try {
//       if (testUserId === null || testUserId === undefined) {
//         const testUser = await q.crud.create.user.new(h.fakeFields.user());
//         testUserId = testUser._id;
//       }
//
//       return {
//         testUserId
//       };
//     } catch (err) {
//       logger.log(lG, lS, null, { err });
// throw err;
//     }
//   },
//   socialConnections: async testUserId => {
//     try {
//       if (testUserId === null || testUserId === undefined) {
//         const testUser = await q.crud.create.user.new(h.fakeFields.user());
//         testUserId = testUser._id;
//       }
//       // read user followers... follower refId user has blocked user
//       // read user following... following refId user has blocked user
//       // read user taggedPosts... post creator has blocked user
//       // read user taggedPosts... a tagged user has blocked user
//       // read user post with tags...
//       // read postLikes... post creator has blocked user
//       // read user collections...
//       return {
//         testUserId
//       };
//     } catch (err) {
//       logger.log(lG, lS, null, { err });
// throw err;
//     }
//   },
//   nonexistent: async testUserId => {
//     try {
//       if (testUserId === null || testUserId === undefined) {
//         const testUser = await q.crud.create.user.new(h.fakeFields.user());
//         testUserId = testUser._id;
//       }
//       // user1: has one doc per each field below...
//       // such doc is deleted...
//
//       // read user followers... follower refId user has blocked user
//       // read user following... following refId user has blocked user
//       // read user taggedPosts... post creator has blocked user
//       // read user taggedPosts... a tagged user has blocked user
//       // read user post with tags...
//       // read postLikes... post creator has blocked user
//       // read user collections...
//
//       // user with no:
//       // posts...
//       // postLikes...
//       // taggedPosts...
//       // archivedPosts...
//       // following...
//       // followers...
//       // requests...
//       // blockedUsers...
//       // activities...
//       // account.reports...
//       return {
//         testUserId
//       };
//     } catch (err) {
//       logger.log(lG, lS, null, { err });
// throw err;
//     }
//   }
// }
//
// module.exports.all = async testUserId => {
//   try {
//     if (testUserId === null || testUserId === undefined) {
//       const testUser = await q.crud.create.user.new(h.fakeFields.user());
//       testUserId = testUser._id;
//     }
//     return {
//       testUserId,
//       testUser: { id: testUserId },
//       fields: await this.fields(testUserId),
//       adminOnly: await this.adminOnly(testUserId),
//       selfOnly: await this.selfOnly(testUserId),
//       accountStatus: await this.accountStatus(testUserId),
//       accountPermissions: await this.accountPermissions(testUserId),
//       many: await this.many(testUserId),
//       empty: await this.empty(testUserId),
//       socialConnections: await this.socialConnections(testUserId),
//       nonexistent: await this.nonexistent(testUserId),
//       refs: {
//         accountStatus: await this.refs.accountStatus(testUserId),
//         socialConnections: await this.refs.socialConnections(testUserId),
//         nonexistent: await this.refs.nonexistent(testUserId)
//       }
//     };
//   } catch (err) {
//     logger.log(lG, lS, null, { err });
// throw err;
//   }
// };
