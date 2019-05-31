// const logger = require("../../../../lib/logger");
// const lG = "TESTDATA"; // logGroup
// const lS = "DATASETS-TAG"; // logSubgroup
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
//     // fields: await this.fields(testUserId),
//     // - create tags on existing post....
//
//     const valid = {
//       userId: await (async function() {
//         const following = await create.following.existingUsersFollowNewPublicUsers(
//           [testUserId],
//           1
//         );
//         return following.ids[0];
//       })(),
//       username: faker.internet.userName(),
//       position: { x: 20, y: 20 },
//       createdAt: new Date()
//     };
//
//     const invalid1 = {
//       userId: 123,
//       username: 123,
//       position: 123,
//       createdAt: 123
//     };
//
//     const invalid2 = {
//       userId: 123,
//       username: 123,
//       position: { x: "123", y: "123" },
//       createdAt: 123
//     };
//
//     // private user, not following
//     const otherUserId1 = {
//       userId: await (async function() {
//         const privateUsers = await create.users.newPrivateUsers(1);
//         return privateUsers.ids[0];
//       })(),
//       username: faker.internet.userName(),
//       position: { x: 20, y: 20 },
//       createdAt: new Date()
//     };
//
//     // private user, following, blocked by tag creator
//     const otherUserId2 = {
//       userId: await (async function() {
//         const blockedUserIds = await create.blockedUsers.existingUsersBlockNewUsers(
//           [testUserId],
//           1
//         );
//         return blockedUserIds[0];
//       })(),
//       username: faker.internet.userName(),
//       position: { x: 20, y: 20 },
//       createdAt: new Date()
//     };
//
//     // private user, following, has blocked tag creator
//     const otherUserId3 = {
//       userId: await (async function() {
//         const blockedUserIds = await create.blockedUsers.newUsersBlockExistingUsers(
//           1,
//           [testUserId]
//         );
//         return blockedUserIds[0];
//       })(),
//       username: faker.internet.userName(),
//       position: { x: 20, y: 20 },
//       createdAt: new Date()
//     };
//
//     const deletedRefId = {
//       userId: await (async function() {
//         const following = await create.following.existingUsersFollowNewPublicUsers(
//           [testUserId],
//           1
//         );
//         const userId = following.ids[0];
//         await q.crud.delete.user.findByIdAndRemove(userId);
//         // await q.crud.delete.user.remove(userId);
//         return userId;
//       })(),
//       username: faker.internet.userName(),
//       position: { x: 20, y: 20 },
//       createdAt: new Date()
//     };
//
//     const empty1 = {
//       userId: "",
//       username: "",
//       position: { x: "", y: "" },
//       createdAt: ""
//     };
//
//     const empty2 = {
//       userId: "",
//       username: "",
//       position: "",
//       createdAt: ""
//     };
//
//     const missing = {};
//
//     return {
//       testUserId,
//       testUser: { id: testUserId },
//       valid,
//       invalid1,
//       invalid2,
//       otherUserId1,
//       otherUserId2,
//       otherUserId3,
//       deletedRefId,
//       empty1,
//       empty2,
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
//     let set1;
//     const createUsersDocs = await (async function() {
//       const users = await create.users.newPrivateUsers(1);
//       const docs = await create.model.fromExistingUserIds(users.ids, 1);
//       set1 = { users, docs };
//     })();
//
//     let users;
//     let docs2;
//     const createUsersDocs = await (async function() {
//       users = await create.users.newPrivateUsers(1);
//       // function to create docs...
//       // const docs2 = await create.model.func(argz)
//     })();
//
//     // adminOnly: await this.adminOnly(testUserId), // 200
//     // - tag1: private user tags private user on private post
//
//     const privateUsers = await create.users.newPrivateUsers(2);
//
//     const user1 = privateUsers.docs[0];
//     const user2 = privateUsers.docs[1];
//
//     const posts = await create.posts.fromExistingUserIds([user1._id], 1);
//     const post1 = posts.docs[0];
//
//     const tag1 = await create.taggedPosts.tagExistingUsersOnExistingPosts(
//       [user2._id],
//       [post1._id]
//     );
//
//     return {
//       testUserId,
//   testUser: { id: testUserId },
//       tag1
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
//     let set1;
//     const createTestUserDocs = await (async function() {
//       const id = testUserId;
//       const docs = await create.model.fromExistingUserIds([id], 1);
//       set1 = { docs };
//     })();
//
//     let set2;
//     const createUsersDocs = await (async function() {
//       const users = await create.following.existingUsersFollowNewPublicUsers(
//         [id],
//         1
//       );
//       const docs = await create.model.fromExistingUserIds(users.ids, 1);
//       set2 = { users, docs };
//     })();
//
//
//
//     let docs1;
//     const createTestUserDocs = await (async function() {
//       // function to create docs...
//       // const docs1 = await create.model.func(argz)
//     })();
//
//     let users;
//     let docs2;
//     const createUsersDocs = await (async function() {
//       const id = testUserId;
//       users = await create.following.existingUsersFollowNewPublicUsers([id], 1);
//       // function to create docs...
//       // const docs2 = await create.model.func(argz)
//     })();
//
//
//     const { user1, user2, user3, user4, user5 } = users;
//
//
//
//
//       let docs1;
//       const createTestUserDocs = await (async function() {
//         // function to create docs...
//       })();
//
//       let users;
//       let docs2;
//       const createUsersDocs = await (async function() {
//         // users = await create.users.newPrivateUsers(1);
//         // users = await create.following.existingUsersFollowNewPrivateUsers(
//         //   [testUserId],
//         //   1
//         // );
//         // function to create docs...
//       })();
//
//
//     // selfOnly: await this.selfOnly(testUserId), // 100
//     // - tag1: testUser creates post and tags other user, update, testUser tags other user
//     // - tag2: testUser creates post and tags other user, delete, testUser tags other user
//     // - tag3: other user creates post and tags testUser, other user tags testUser
//     // - tag4: other user creates post and tags other user, other user tags other user
//
//     const publicUsers = await create.users.newPublicUsers(5);
//
//     const user1 = publicUsers.docs[0];
//     const user2 = publicUsers.docs[1];
//     const user3 = publicUsers.docs[2];
//     const user4 = publicUsers.docs[3];
//     const user5 = publicUsers.docs[4];
//
//     const userIds = [...publicUsers.ids];
//     userIds.push(testUserId);
//
//     await create.followers.existingUsersFollowExistingUsers(userIds, userIds);
//     await create.following.existingUsersFollowExistingUsers(userIds, userIds);
//
//     // console.log(userIds);
//
//     const posts1 = await create.posts.fromExistingUserIds([testUserId], 2);
//
//     const posts2 = await create.posts.fromExistingUserIds(
//       [user3._id, user4._id],
//       1
//     );
//
//     const testUserPost1 = posts1.docs[0];
//     const testUserPost2 = posts1.docs[1];
//
//     const post3 = posts2.docsByUserId[user3._id][0];
//     const post4 = posts2.docsByUserId[user4._id][0];
//
//     // console.log(posts);
//
//     const tag1 = await create.taggedPosts.tagExistingUsersOnExistingPosts(
//       [user1._id],
//       [testUserPost1._id]
//     );
//
//     const tag2 = await create.taggedPosts.tagExistingUsersOnExistingPosts(
//       [user2._id],
//       [testUserPost2._id]
//     );
//
//     const tag3 = await create.taggedPosts.tagExistingUsersOnExistingPosts(
//       [testUserId],
//       [post3._id]
//     );
//
//     const tag4 = await create.taggedPosts.tagExistingUsersOnExistingPosts(
//       [user5._id],
//       [post4._id]
//     );
//
//     return {
//       testUser: {
//         id: testUserId,
//         comment1: { id: comments1.ids[0] }
//       },
//       user1: {
//         id: users.ids[0],
//         comment1: { id: comments2.ids[0] }
//       }
//
//       testUserId,
//       tag1,
//       tag2,
//       tag3,
//       tag4
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
//
//     let set1;
//     const createTestUserDocs = await (async function() {
//       const id = testUserId;
//       const docs = await create.model.fromExistingUserIds([id], 1);
//       set1 = { docs };
//     })();
//
//     let set2;
//     const createUsersDocs = await (async function() {
//       const users = await create.usersAccountStatus(testUserId);
//       const docs = await create.model.fromExistingUserIds(users.ids, 1);
//       set2 = { users, docs };
//     })();
//
//
//
//     let docs1;
//     const createTestUserDocs = await (async function() {
//       // function to create docs...
//       // const docs1 = await create.model.func(argz)
//     })();
//
//     let users;
//     let docs2;
//     const createUsersDocs = await (async function() {
//       users = await create.usersAccountStatus(testUserId);
//       // function to create docs...
//       // const docs2 = await create.model.func(argz)
//     })();
//
//     const usersStatus = await create.usersAccountStatus(testUserId);
//
//     const posts = await create.posts.fromExistingUserIds(usersStatus.ids, 1);
//
//     const tags1 = await create.taggedPosts.tagExistingUsersOnExistingPosts(
//       [testUserId],
//       posts.ids
//     );
//
//     const tags2 = await create.taggedPosts.tagExistingUsersOnNewPosts(
//       usersStatus.ids,
//       1
//     );
//
//     return {
//       testUserId,
//       usersStatus,
//       tags1,
//       tags2
//     };
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
//
//
//
//     let set1;
//     const createTestUserDocs = await (async function() {
//       const id = testUserId;
//       const docs = await create.model.fromExistingUserIds([id], 1);
//       set1 = { docs };
//     })();
//
//     let set2;
//     const createUsersDocs = await (async function() {
//       const users = await create.usersAccountPermissions(testUserId);
//       const docs = await create.model.fromExistingUserIds(users.ids, 1);
//       set2 = { users, docs };
//     })();
//
//
//
//     let docs1;
//     const createTestUserDocs = await (async function() {
//       // function to create docs...
//       // const docs1 = await create.model.func(argz)
//     })();
//
//     let users;
//     let docs2;
//     const createUsersDocs = await (async function() {
//       users = await create.usersAccountPermissions(testUserId);
//       // function to create docs...
//       // const docs2 = await create.model.func(argz)
//     })();
//
//     const usersPermissions = await create.usersAccountPermissions(testUserId);
//
//     const posts = await create.posts.fromExistingUserIds(usersPermissions.ids, 1);
//
//     const tags1 = await create.taggedPosts.tagExistingUsersOnExistingPosts(
//       [testUserId],
//       posts.ids
//     );
//
//     const tags2 = await create.taggedPosts.tagExistingUsersOnNewPosts(
//       usersPermissions.ids,
//       1
//     );
//
//     return {
//       testUserId,
//       usersPermissions,
//       tags1,
//       tags2
//     };
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
//
//     let set1;
//     const createTestUserDocs = await (async function() {
//       const id = testUserId;
//       const docs = await create.model.fromExistingUserIds([id], 1);
//       set1 = { docs };
//     })();
//
//     let set2;
//     const createUsersDocs = await (async function() {
//       const users = await create.following.existingUsersFollowNewPublicUsers(
//         [testUserId],
//         1
//       );
//       const docs = await create.model.fromExistingUserIds(users.ids, 1);
//       set2 = { users, docs };
//     })();
//
//
//
//     let docs1;
//     const createTestUserDocs = await (async function() {
//       // function to create docs...
//       // const docs1 = await create.model.func(argz)
//     })();
//
//     let users;
//     let docs2;
//     const createUsersDocs = await (async function() {
//       users = await create.following.existingUsersFollowNewPublicUsers(
//     [testUserId],
//     50
//   );
//       // function to create docs...
//       // const docs2 = await create.model.func(argz)
//     })();
//
//     // many: await this.many(testUserId), // 300
//     // - post1: post doc with 25 tags
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
//     let set1;
//     const createTestUserDocs = await (async function() {
//       const id = testUserId;
//       const docs = await create.model.fromExistingUserIds([id], 1);
//       set1 = { docs };
//     })();
//
//     let set2;
//     const createUsersDocs = await (async function() {
//       const users = await create.following.existingUsersFollowNewPublicUsers(
//         [testUserId],
//         1
//       );
//       const docs = await create.model.fromExistingUserIds(users.ids, 1);
//       set2 = { users, docs };
//     })();
//
//     let docs1;
//     const createTestUserDocs = await (async function() {
//       // function to create docs...
//       // const docs1 = await create.model.func(argz)
//     })();
//
//     let users;
//     let docs2;
//     const createUsersDocs = await (async function() {
//       users = await create.following.existingUsersFollowNewPublicUsers(
//     [testUserId],
//     50
//   );
//       // function to create docs...
//       // const docs2 = await create.model.func(argz)
//     })();
//
//     // empty: await this.empty(testUserId), // 600
//     // - post1: post doc with no tags
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
//     let set1;
//     const createTestUserDocs = await (async function() {
//       const id = testUserId;
//       const docs = await create.model.fromExistingUserIds([id], 1);
//       set1 = { docs };
//     })();
//
//     let set2;
//     const createUsersDocs = await (async function() {
//       const users = await create.userSocialConnections(testUserId);
//       const docs = await create.model.fromExistingUserIds(users.ids, 1);
//       set2 = { users, docs };
//     })();
//
//     let docs1;
//     const createTestUserDocs = await (async function() {
//       // function to create docs...
//       // const docs1 = await create.model.func(argz)
//     })();
//
//     let users;
//     let docs2;
//     const createUsersDocs = await (async function() {
//       users = await create.userSocialConnections(testUserId);
//       // function to create docs...
//       // const docs2 = await create.model.func(argz)
//     })();
//
//     // socialConnections: await this.socialConnections(testUserId), // 400
//     // - testUser tags each social connection user
//     // - testUser has been tagged by each social connection user
//     // - post tagIds: social connection user tags new public user
//     // - post tagIds: social connection user is tagged on post from new public user
//
//     const socialConnections = await create.userSocialConnections(testUserId);
//
//     let socialConnectionsUserIds = Object.keys(socialConnections).map(key => {
//       return socialConnections[key].id;
//     });
//
//     const tags = await create.taggedPosts.tagExistingUsersOnNewPosts(
//       socialConnectionsUserIds,
//       1
//     );
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
//       user8: { id: socialConnections.user8.id },
//       tag1: { id: tags.taggedPostIdsByUserId[socialConnections.user1.id][0] },
//       tag2: { id: tags.taggedPostIdsByUserId[socialConnections.user2.id][0] },
//       tag3: { id: tags.taggedPostIdsByUserId[socialConnections.user3.id][0] },
//       tag4: { id: tags.taggedPostIdsByUserId[socialConnections.user4.id][0] },
//       tag5: { id: tags.taggedPostIdsByUserId[socialConnections.user5.id][0] },
//       tag6: { id: tags.taggedPostIdsByUserId[socialConnections.user6.id][0] },
//       tag7: { id: tags.taggedPostIdsByUserId[socialConnections.user7.id][0] },
//       tag8: { id: tags.taggedPostIdsByUserId[socialConnections.user8.id][0] }
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
//     let set1;
//     const createTestUserDocs = await (async function() {
//       const id = testUserId;
//       const docs = await create.model.fromExistingUserIds([id], 1);
//       set1 = { docs };
//     })();
//
//     let set2;
//     const createUsersDocs = await (async function() {
//       const users = await create.following.existingUsersFollowNewPublicUsers(
//         [testUserId],
//         1
//       );
//       const docs = await create.model.fromExistingUserIds(users.ids, 1);
//       set2 = { users, docs };
//     })();
//
//     let docs1;
//     const createTestUserDocs = await (async function() {
//       // function to create docs...
//       // const docs1 = await create.model.func(argz)
//     })();
//
//     let users;
//     let docs2;
//     const createUsersDocs = await (async function() {
//       users = await create.following.existingUsersFollowNewPrivateUsers(
//     [testUserId],
//     1
//   );
//       // function to create docs...
//       // const docs2 = await create.model.func(argz)
//     })();
//
//     // deletedDocs: await this.deletedDocs(testUserId) // 700
//     // - tag1: tag doc has been deleted
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
//       const users = await create.usersAccountStatus(testUserId);
//       const { user1, user2, user3, user4, user5 } = users;
//
//       let set1 = {};
//       const createTestUserDocs = await (async function() {
//         const id = testUserId;
//         set1["docsByUserIdRefCreator"] = {};
//         await Promise.all(
//           users.ids.map(userId => {
//             const refDoc = await create.model.fromExistingUserIds(userId, 1);
//             const refIds = refDoc.ids[0];
//             const modelDocs = await create.model.fromExistingUserIds([id], 1);
//             set1.docsByUserIdRefCreator[userId] = modelDocs.docs;
//           })
//         )
//       })();
//
//       let set2 = {};
//       const createUsersDocs = await (async function() {
//         const following = await create.following.existingUsersFollowNewPublicUsers(
//           [testUserId],
//           1
//         );
//         const userFollowing = following.docs[0];
//         set2["userFollowing"] = userFollowing;
//         const id = userFollowing._id;
//         set2["docsByUserIdRefCreator"] = {};
//         await Promise.all(
//           users.ids.map(userId => {
//             const refDoc = await create.model.fromExistingUserIds(userId, 1);
//             const refIds = refDoc.ids[0];
//             const modelDocs = await create.model.fromExistingUserIds([id], 1);
//             set2.docsByUserIdRefCreator[userId] = modelDocs.docs;
//           })
//         )
//       })();
//
//       const users = await create.usersAccountStatus(testUserId);
//   const { user1, user2, user3, user4, user5 } = users;
//
//       let docs1;
//       const createTestUserDocs = await (async function() {
//         // function to create docs...
//         // const docs1 = await create.model.func(argz)
//       })();
//
//       let users;
//       let docs2;
//       const createUsersDocs = await (async function() {
//         // users = await create.usersAccountStatus(testUserId);
//         // function to create docs...
//         // const docs2 = await create.model.func(argz)
//       })();
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
//
//       const users = await create.userSocialConnections(testUserId);
//       const { user1, user2, user3, user4, user5, user6, user7, user8 } = users;
//
//       let set1 = {};
//       const createTestUserDocs = await (async function() {
//         const id = testUserId;
//         set1["docsByUserIdRefCreator"] = {};
//         await Promise.all(
//           users.ids.map(userId => {
//             const refDoc = await create.model.fromExistingUserIds(userId, 1);
//             const refIds = refDoc.ids[0];
//             const modelDocs = await create.model.fromExistingUserIds([id], 1);
//             set1.docsByUserIdRefCreator[userId] = modelDocs.docs;
//           })
//         )
//       })();
//
//       let set2 = {};
//       const createUsersDocs = await (async function() {
//         const following = await create.following.existingUsersFollowNewPublicUsers(
//           [testUserId],
//           1
//         );
//         const userFollowing = following.docs[0];
//         set2["userFollowing"] = userFollowing;
//         const id = userFollowing._id;
//         set2["docsByUserIdRefCreator"] = {};
//         await Promise.all(
//           users.ids.map(userId => {
//             const refDoc = await create.model.fromExistingUserIds(userId, 1);
//             const refIds = refDoc.ids[0];
//             const modelDocs = await create.model.fromExistingUserIds([id], 1);
//             set2.docsByUserIdRefCreator[userId] = modelDocs.docs;
//           })
//         )
//       })();
//
//       let set1;
//       const createTestUserDocs = await (async function() {
//         const id = testUserId;
//         const docs = await create.model.fromExistingUserIds([id], 1);
//         set1 = { docs };
//       })();
//
//       let set2;
//       const createUsersDocs = await (async function() {
//         const users = await create.users.newPrivateUsers(1);
//         const docs = await create.model.fromExistingUserIds(users.ids, 1);
//         set2 = { users, docs };
//       })();
//
//       const users = await create.userSocialConnections(testUserId);
//   const { user1, user2, user3, user4, user5, user6, user7, user8 } = users;
//
//       let docs1;
//       const createTestUserDocs = await (async function() {
//         // function to create docs...
//         // const docs1 = await create.model.func(argz)
//       })();
//
//       let users;
//       let docs2;
//       const createUsersDocs = await (async function() {
//         // users = await create.usersAccountStatus(testUserId);
//         // function to create docs...
//         // const docs2 = await create.model.func(argz)
//       })();
//
//       // ref: await this.ref(testUserId), // 500
//       // - tag1: tag postId refId creator is private and testUser is not following
//       // - tag2: tag postId refId creator is private and testUser is following, has blocked testUser
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
//
//       let set1;
//       const createTestUserDocs = await (async function() {
//         const id = testUserId;
//
//         const users = await create.following.existingUsersFollowNewPublicUsers(
//           [testUserId],
//           2
//         );
//         const user1 = users.docs[0];
//         const user2 = users.docs[1];
//
//         // set1.docsByUserIdRefCreator = {} // appr1
//         // set1.docsByUserIdRefCreator = {} // appr1
//         set1.docsByUserIdRefCreator[user1._id] = [] // appr2
//         set1.docsByUserIdRefCreator[user2._id] = [] // appr2
//
//
//         await Promise.all(
//           users.ids.map(userId => {
//             const refDocs = await create.model.fromExistingUserIds([id], 1);
//             const refIds = refDocs.ids;
//             const docs = await create.model.fromExistingUserIds([id], 1);
//             // set1.docsByUserIdRefCreator[userId] = docs.ids; // appr1
//             set1.docsByUserIdRefCreator.userId = [...docs.ids]; // appr2
//           })
//         );
//
//         set1 = { docs };
//       })();
//
//       let set2;
//       const createUsersDocs = await (async function() {
//         const users = await create.following.existingUsersFollowNewPublicUsers(
//           [testUserId],
//           1
//         );
//         const userFollowing = users.docs[0];
//         set2["userFollowing"] = userFollowing;
//
//         const users = await create.following.existingUsersFollowNewPublicUsers(
//           [userFollowing._id],
//           2
//         );
//         const user1 = users.docs[0];
//         const user2 = users.docs[1];
//
//         // set2.docsByUserIdRefCreator = {} // appr1
//         // set2.docsByUserIdRefCreator = {} // appr1
//         set2.docsByUserIdRefCreator[user1._id] = [] // appr2
//         set2.docsByUserIdRefCreator[user2._id] = [] // appr2
//
//         await Promise.all(
//           users.ids.map(userId => {
//             const refDocs = await create.model.fromExistingUserIds(users.ids, 1);
//             const refIds = refDocs.ids;
//             const docs = await create.model.fromExistingUserIds(users.ids, 1);
//             // set2.docsByUserIdRefCreator[userId] = docs.ids; // appr1
//             set2.docsByUserIdRefCreator.userId = [...docs.ids]; // appr2
//           })
//         );
//       })();
//
//       let docs1;
//       const createTestUserDocs = await (async function() {
//         // function to create docs...
//         // const docs1 = await create.model.func(argz)
//       })();
//
//       let users;
//       let docs2;
//       const createUsersDocs = await (async function() {
//         const following = await create.following.existingUsersFollowNewPublicUsers(
//     [testUserId],
//     1
//   );
//         // function to create docs...
//         // const docs2 = await create.model.func(argz)
//       })();
//
//       // deletedDocs: await this.deletedDocs(testUserId) // 800
//       // - tag1: tag userId refId doc has been deleted
//       // - tag2: tag postId refId doc has been deleted
//       return {
//         testUserId
//       };
//     } catch (err) {
//       logger.log(lG, lS, null, { err });
// throw err;
//     }
//   }
// };
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
