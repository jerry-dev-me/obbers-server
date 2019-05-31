// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// let testUser;
// let archivedPosts;
// let testUserPosts;
//
// describe("User Model Tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   it("testUser1 archives posts and then removes archived posts", async () => {
//     let postsToCreate = 3;
//
//     for (let i = 0; i < postsToCreate; i++) {
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       const newPost = await q.post.create.new(
//         newUser._id,
//         th.fakeFields.post({ userId: newUser._id })
//       );
//
//       const updatedUser = await q.user.update.addArchivedPost(
//         testUser._id,
//         newPost._id
//       );
//
//       th.logger.log(lG, lS, null, { newUser });
//       th.logger.log(lG, lS, null, { newPost });
//       th.logger.log(lG, lS, null, { updatedUser });
//     };
//
//     await readPostsAndArchivedPosts();
//
//     assert(testUserPosts.length === 0);
//     assert(archivedPosts.length === 3);
//
//     await Promise.all(
//       archivedPosts.map(async archivedPost => {
//         th.logger.log(lG, lS, null, { archivedPost });
//
//         const updatedUser = await q.user.update.removeArchivedPost(
//           testUser._id,
//           archivedPost._id
//         );
//
//         th.logger.log(lG, lS, null, { updatedUser });
//       })
//     );
//
//     await readPostsAndArchivedPosts();
//
//     assert(testUserPosts.length === 3);
//     assert(archivedPosts === null);
//   });
// });
//
// const readPostsAndArchivedPosts = async () => {
//   testUserPosts = await q.post.read.allByUserId(testUser._id, testUser._id);
//   archivedPosts = await q.user.read.archivedPosts(testUser._id, testUser._id);
//
//   th.logger.log(lG, lS, null, { testUserPosts });
//   th.logger.log(lG, lS, null, { archivedPosts });
// };
//
// // other user atempts to read testUser archivedPosts
