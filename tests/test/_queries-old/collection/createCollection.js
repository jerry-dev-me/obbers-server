// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-COLLECTION"; // logSubgroup
//
// describe("Collection Model Create Tests", async function() {
//   this.timeout(0);
//
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS,
//     null, { testUserId: testUser._id });
//   });
//
//   it("Create a new collection", async () => {
//     let customCollectionName = "funny cats";
//
//     const newCollection = await q.collection.create.new(
//       testUser._id,
//       th.fakeFields.collection({
//         userId: testUser._id,
//         name: customCollectionName
//       })
//     );
//
//     th.logger.log(lG, lS,
//     null, { newCollection });
//
//     assert(newCollection !== null);
//     assert(newCollection.userId.toString() === testUser._id.toString());
//     assert(newCollection.name === customCollectionName);
//   });
//
//   it("Test User has 3 collections, each has 3 posts from different users", async () => {
//     let users = {};
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
//         }
//
//         let newKey = newUser._id;
//         let newValue = userPosts;
//         users[newKey] = newValue;
//
//         th.logger.log(lG, lS,
//         "userPosts.length", { userPosts: userPosts.length });
//
//         th.logger.log(lG, lS, null, { userPosts });
//
//         userPosts = [];
//       };
//
//       th.logger.log(lG, lS,
//       "users object length", { users: Object.keys(users).length });
//
//       th.logger.log(lG, lS, null, { users });
//     };
//
//     await createNewUsersWithPosts();
//     // return;
//
//     const createTestUserCollections = async () => {
//       let collectionsToCreate = 3;
//       for (let i = 0; i < collectionsToCreate; i++) {
//
//         let collectionName = `New Collection ${i + 1}`;
//         const newCollection = await q.collection.create.new(
//           testUser._id,
//           th.fakeFields.collection({
//             userId: testUser._id,
//             name: collectionName
//           })
//         );
//
//         th.logger.log(lG, lS, null, { newCollection });
//       };
//     };
//
//     await createTestUserCollections();
//     // return;
//
//     const addPostsToCollections = async () => {
//       let i = 0;
//
//       const foundUser = await q.user.read.profileById(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { foundUser });
//
//       const collections = foundUser.collections;
//
//       th.logger.log(lG, lS,
//       `userId ${foundUser._id} collections`, { collections });
//
//       return await Promise.all(
//         collections.map(async collectionId => {
//
//           th.logger.log(lG, lS,
//           `Adding posts to collection id: ${collectionId} ...`);
//
//           for (key in users) {
//             th.logger.log(lG, lS,
//             null, { collectionId });
//
//             th.logger.log(lG, lS,
//             null, { postId: users[key][i] });
//
//             const updatedCollection = await q.collection.update.addPost(
//               testUser._id,
//               collectionId,
//               users[key][i]
//             );
//
//             th.logger.log(lG, lS,
//             null, { updatedCollection });
//           }
//           i++;
//         })
//       );
//     };
//
//     await addPostsToCollections();
//     // return;
//
//     const readTestUserCollections = async () => {
//       const foundCollections = await q.collection.read.allByUserId(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { foundCollections });
//     };
//
//     await readTestUserCollections();
//     // return;
//
//     const readCollectionPosts = async () => {
//       const foundCollections = await q.collection.read.allByUserId(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS,
//       `foundCollections.length`, { foundCollections: foundCollections.length });
//
//       th.logger.log(lG, lS, null, { foundCollections });
//
//       return await Promise.all(
//         foundCollections.map(async collection => {
//           const collectionId = collection._id;
//
//           const foundCollection = await q.collection.read.byId(
//             testUser._id,
//             testUser._id,
//             collectionId
//           );
//
//           th.logger.log(lG, lS, null, { collectionId });
//
//           th.logger.log(lG, lS,
//           null, { collectionName: collection.name });
//
//           th.logger.log(lG, lS,
//           `foundCollection.posts.length`,
//           { foundCollection: foundCollection.posts.length });
//
//           th.logger.log(lG, lS,
//           `foundCollection.posts`,
//           { foundCollection: foundCollection.posts });
//
//           th.logger.log(lG, lS,
//           `foundCollection`,
//           { foundCollection });
//
//           assert(foundCollection.posts.length === 3);
//         })
//       );
//     };
//
//     await readCollectionPosts();
//     return;
//
//     // // Call every function right below its declaration or call all of them
//     // // at once using Promise.all() below:
//     // Promise.all([
//     //   await createNewUsersWithPosts(),
//     //   await createTestUserCollections(),
//     //   await addPostsToCollections(),
//     //   await readTestUserCollections(),
//     //   await readCollectionPosts()
//     // ]);
//
//   });
// });
