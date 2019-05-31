// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "D-COLLECTION"; // logSubgroup
//
// const mongoose = require("mongoose");
// const User = mongoose.model("user");
//
// let testUser;
// let testUserCollections = [];
// let users = {};
// let allUsersPosts = [];
//
// const getTestUserCollections = async () => {
//   th.logger.log(lG, lS,
//   `Retrieving test user collections...`);
//
//   const testUserCollections = await q.collection.read.allByUserId(
//     testUser._id,
//     testUser._id
//   );
//
//   th.logger.log(lG, lS,
//   `testUserCollections.length`,
//   { testUserCollectionsLength: testUserCollections.length });
//
//   th.logger.log(lG, lS,
//   null, { testUserCollections: testUserCollections });
//
//   testUserCollections.map(collection => {
//     th.logger.log(lG, lS,
//     null, { collectionId: collection._id });
//
//     th.logger.log(lG, lS,
//     `collection.posts.length`,
//     { collectionPostsLength: collection.posts.length });
//   });
//
//   return testUserCollections;
// };
// let foundTestUserCollections;
//
// describe("Collection Model - Delete Query Tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS,
//     null, { testUserId: testUser._id });
//
//     const createNewUsersWithPosts = async () => {
//       let usersToCreate = 3;
//       let postsToCreate = 3;
//       let userPosts = [];
//
//       for (let i = 0; i < usersToCreate; i++) {
//         const newUser = await q.user.create.new(th.fakeFields.user());
//
//         th.logger.log(lG, lS,
//         null, { newUserId: newUser._id });
//
//         for (let i = 0; i < postsToCreate; i++) {
//           const newPost = await q.post.create.new(
//             newUser._id,
//             th.fakeFields.post({ userId: newUser._id })
//           );
//
//           th.logger.log(lG, lS, null, { newPost });
//
//           userPosts.push(newPost._id);
//           allUsersPosts.push(newPost._id);
//         };
//
//         let newKey = newUser._id;
//         let newValue = userPosts;
//         users[newKey] = newValue;
//
//         th.logger.log(lG, lS, null, { users });
//
//         th.logger.log(lG, lS,
//         `User id ${newUser._id} posts`, { userPosts });
//
//         th.logger.log(lG, lS, null, { allUsersPosts });
//
//         userPosts = [];
//       }
//     };
//
//     const createTestUserCollections = async () => {
//       let collectionsToCreate = 3;
//
//       for (let i = 0; i < collectionsToCreate; i++) {
//         let collectionName = `New Collection ${i+1}`;
//
//         const newCollection = await q.collection.create.new(
//           testUser._id,
//           th.fakeFields.collection({
//             userId: testUser._id,
//             name: collectionName
//           })
//         );
//
//         th.logger.log(lG, lS, null, { newCollection });
//
//         testUserCollections.push(newCollection._id);
//       };
//
//       th.logger.log(lG, lS, null, { testUserCollections });
//     };
//
//     const addPostsToCollections = async () => {
//       let i = 0;
//       let promises = [];
//
//       const testUserProfile = await q.user.read.profileById(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { testUserProfile });
//
//       const collections = testUserProfile.collections;
//
//       th.logger.log(lG, lS,
//       `testUserProfile.collections`, { collections });
//
//       th.logger.log(lG, lS,
//       `Adding posts to testUser collections...`);
//
//       return await Promise.all(
//         collections.map(async collectionId => {
//           th.logger.log(lG, lS, null, { collectionId });
//
//           for (key in users) {
//             th.logger.log(lG, lS,
//             `key - is userId`, { key });
//
//             th.logger.log(lG, lS,
//             `users[key][i] - is postId`, { postId: users[key][i] });
//
//             th.logger.log(lG, lS, null, { users });
//
//             const promise = q.collection.update.addPost(
//               testUser._id,
//               collectionId,
//               users[key][i]
//             );
//
//             th.logger.log(lG, lS, null, { promise });
//
//             promises.push(promise);
//           };
//           i++;
//
//           const execAllPromises = await Promise.all(promises);
//           th.logger.log(lG, lS, null, { execAllPromises });
//         })
//       );
//     };
//
//     const readTestUserCollections = async () => {
//       const testUserCollections = await q.collection.read.allByUserId(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { testUserCollections });
//     };
//
//     Promise.all([
//       await createNewUsersWithPosts(),
//       await createTestUserCollections(),
//       await addPostsToCollections(),
//       await readTestUserCollections()
//     ]);
//   });
//
//   afterEach(async () => {
//     th.logger.log(lG, lS, `Final check...`);
//
//     const readTestUserCollections = async () => {
//       const testUserCollections = await q.collection.read.allByUserId(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { testUserCollections });
//     };
//
//     const readAllUsersPosts = async () => {
//       th.logger.log(lG, lS,
//       `Reading all posts from every user...`);
//       return User.find({}).then(users => {
//         users.map(user => {
//           if (user._id.toString() != testUser._id.toString()) {
//             th.logger.log(lG, lS,
//             null, { userId: user._id });
//
//             th.logger.log(lG, lS,
//             `user.posts.length`, { userPostsLength: user.posts.length });
//
//             th.logger.log(lG, lS,
//             `user.posts`, { userPosts: user.posts });
//           };
//         });
//       });
//     };
//
//     Promise.all([await readTestUserCollections(), await readAllUsersPosts()]);
//   });
//
//   it("Delete test user collections but make sure posts still exist", async () => {
//     const deleteAllCollections = async () => {
//       th.logger.log(lG, lS,
//       `Deleting all testUser collections...`);
//
//       return await Promise.all(
//         testUserCollections.map(async collectionId => {
//           th.logger.log(lG, lS, null, { collectionId });
//
//           const deletedCollection = await q.collection.delete.byId(
//             testUser._id,
//             collectionId
//           );
//
//           th.logger.log(lG, lS,
//           `collectionId to delete ${collectionId}`, { deletedCollection });
//
//           assert(deletedCollection === null);
//         })
//       );
//     };
//     Promise.all([await deleteAllCollections()]);
//   });
//
//   it("Remove all posts ref ids from collections but make sure posts still exist", async () => {
//     const removeAllPostsFromCollections = async () => {
//       let i = 0;
//       let promises = [];
//
//       foundTestUserCollections = await getTestUserCollections();
//
//       th.logger.log(lG, lS,
//       null, { foundTestUserCollections });
//
//       await Promise.all(
//         foundTestUserCollections.map(async collection => {
//           th.logger.log(lG, lS, null, { collection });
//
//           const posts = collection.posts;
//
//           th.logger.log(lG, lS,
//           `collection.posts`, { collectionPosts: collection.posts });
//
//           await Promise.all(
//             posts.map(async postId => {
//               th.logger.log(lG, lS, null, { postId });
//
//               const promise = await q.collection.update.removePostFromCollection(
//                 testUser._id,
//                 collection._id,
//                 postId
//               );
//
//               th.logger.log(lG, lS, null, { promise });
//
//               promises.push(promise);
//             })
//           );
//         })
//       );
//
//       th.logger.log(lG, lS,
//       `Removing all posts from test user collections...`);
//
//       await Promise.all(promises);
//
//       foundTestUserCollections = await getTestUserCollections();
//
//       th.logger.log(lG, lS,
//       null, { foundTestUserCollections });
//
//       foundTestUserCollections.map(collection => {
//         th.logger.log(lG, lS,
//         `collectionId ${collection._id} collection.posts.length`,
//         { collectionPostsLength: collection.posts.length });
//
//         assert(collection.posts.length === 0);
//       });
//
//       const allUsers = await User.find({});
//       allUsers.map(user => {
//         if (user._id.toString() !== testUser._id.toString()) {
//           th.logger.log(lG, lS,
//           `userId ${user._id} user.posts.length`,
//           { userPostsLength: user.posts.length });
//
//           assert(user.posts.length === 3);
//         };
//       });
//     };
//
//     Promise.all([await removeAllPostsFromCollections()]);
//   });
//
//   it("Remove a post ref id from a collection but make sure post still exist", async () => {
//     let postIdToRemove;
//     let collectionId;
//     let collectionName;
//
//     const removeAPostFromCollection = async () => {
//       let i = 0;
//
//       foundTestUserCollections = await getTestUserCollections();
//
//       th.logger.log(lG, lS,
//       null, { foundTestUserCollections });
//
//       foundTestUserCollections.map(collection => {
//         if (i === 0) {
//           postIdToRemove = collection.posts[0];
//           collectionId = collection._id;
//           collectionName = collection.name;
//         }
//         i++;
//       });
//
//       th.logger.log(lG, lS, null, { postIdToRemove });
//       th.logger.log(lG, lS, null, { collectionName });
//       th.logger.log(lG, lS, null, { collectionId });
//
//       const updatedCollection = await q.collection.update.removePostFromCollection(
//         testUser._id,
//         collectionId,
//         postIdToRemove
//       );
//
//       th.logger.log(lG, lS, null, { updatedCollection });
//     };
//
//     th.logger.log(lG, lS,
//     `Removing a post from a test user collection...`);
//
//     Promise.all([await removeAPostFromCollection()]);
//
//     foundTestUserCollections = await getTestUserCollections();
//
//     th.logger.log(lG, lS,
//     null, { foundTestUserCollections });
//
//     foundTestUserCollections.map(collection => {
//       th.logger.log(lG, lS,
//       `collection.posts.length`,
//       { collectionPostsLength: collection.posts.length });
//
//       th.logger.log(lG, lS, null, { collection });
//
//       if (collection._id.toString() === collectionId.toString()) {
//         assert(collection.posts.length === 2);
//       } else {
//         assert(collection.posts.length === 3);
//       }
//     });
//
//     const allUsers = await User.find({});
//     allUsers.map(user => {
//       th.logger.log(lG, lS, null, { user });
//       if (user._id.toString() !== testUser._id.toString()) {
//         th.logger.log(lG, lS,
//         `userId ${user._id} num of posts are ${user.posts.length}`,
//         { userPostsLength: user.posts.length });
//         assert(user.posts.length === 3);
//       };
//     });
//   });
//
//   it("Remove a post ref id from every collection but make sure post still exist", async () => {
//     let newTestUser;
//     let newTestPost;
//
//     const createANewPost = async () => {
//       newTestUser = await q.user.create.new(th.fakeFields.user());
//
//       th.logger.log(lG, lS, null, { newTestUser });
//
//       newTestPost = await q.post.create.new(
//         newTestUser._id,
//         th.fakeFields.post({ userId: newTestUser._id })
//       );
//
//       th.logger.log(lG, lS, null, { newTestPost });
//     };
//
//     const addNewPostToAllCollections = async () => {
//
//       foundTestUserCollections = await getTestUserCollections();
//
//       th.logger.log(lG, lS,
//       null, { foundTestUserCollections });
//
//       th.logger.log(lG, lS,
//       `Adding new post to all test user collections...`);
//
//       await Promise.all(
//         foundTestUserCollections.map(async collection => {
//           const collectionId = collection._id;
//
//           const updatedCollection = await q.collection.update.addPost(
//             testUser._id,
//             collectionId,
//             newTestPost._id
//           );
//
//           th.logger.log(lG, lS, null, { collectionId });
//           th.logger.log(lG, lS, null, { updatedCollection });
//         })
//       );
//
//       foundTestUserCollections = await getTestUserCollections();
//
//       th.logger.log(lG, lS,
//       null, { foundTestUserCollections });
//     };
//
//     const removeAPostFromAllCollections = async () => {
//       th.logger.log(lG, lS,
//       `Post id to remove is ${newTestPost._id}`,
//       { newTestPostId: newTestPost._id });
//
//       th.logger.log(lG, lS,
//       `Removing the new post from all test user collections...`);
//
//       const updatedCollections = await q.collection.update.removePostFromAllCollections(
//         testUser._id,
//         newTestPost._id
//       );
//
//       th.logger.log(lG, lS, null, { updatedCollections });
//     };
//
//     Promise.all([
//       await createANewPost(),
//       await addNewPostToAllCollections(),
//       await removeAPostFromAllCollections()
//     ]);
//
//     foundTestUserCollections = await getTestUserCollections();
//
//     th.logger.log(lG, lS,
//     null, { foundTestUserCollections });
//
//     foundTestUserCollections.map(collection => {
//       assert(collection.posts.length === 3);
//     });
//
//     const allUsers = await User.find({});
//     allUsers.map(user => {
//       th.logger.log(lG, lS, null, { userId: user._id });
//
//       th.logger.log(lG, lS,
//       `user.posts.length`, { userPostsLength: user.posts.length });
//
//       if (
//         !user._id.toString() === testUser._id.toString() ||
//         !user._id.toString() === newTestUser._id.toString()
//       ) {
//         assert(user.posts.length === 3);
//       } else if (user._id.toString() === newTestUser._id.toString()) {
//         assert(user.posts.length === 1);
//       }
//     });
//   });
// });
