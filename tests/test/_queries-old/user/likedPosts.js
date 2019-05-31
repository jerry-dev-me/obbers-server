// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// let testUser;
//
// describe("User Model postLikes Tests", async () => {
//   describe("Like other user posts", () => {
//     let postsToCreate = 3;
//
//     beforeEach(async () => {
//       testUser = await q.user.create.new(th.fakeFields.user());
//
//       th.logger.log(lG, lS, null, { testUserId: testUser._id });
//
//       await createPosts(postsToCreate);
//     });
//
//     it("testUser has 3 liked posts", async () => {
//       const postLikes = await q.user.read.likedPosts(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { postLikes });
//
//       assert(postLikes.length === postsToCreate);
//     });
//
//     it("testUser has 3 liked posts, but a post has been deleted by post creator", async () => {
//       let postLikes;
//
//       postLikes = await q.user.read.likedPosts(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { postLikes });
//
//       const deletedPost = await q.post.delete.byId(
//         postLikes[0].userId,
//         postLikes[0]._id
//       );
//
//       th.logger.log(lG, lS, null, { deletedPost });
//
//       postLikes = await q.user.read.likedPosts(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { postLikes });
//
//       assert(postLikes.length === postsToCreate - 1);
//     });
//
//     it("newUser tries to read testUser postLikes", async () => {
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       const postLikes = await q.user.read.likedPosts(newUser._id, testUser._id);
//
//       th.logger.log(lG, lS, null, { newUser });
//       th.logger.log(lG, lS, null, { postLikes });
//
//       assert(postLikes === null);
//     });
//   });
//
//   describe("Read many liked posts", () => {
//     let postsToCreate = 50;
//
//     beforeEach(async () => {
//       testUser = await q.user.create.new(th.fakeFields.user());
//
//       th.logger.log(lG, lS, null, { testUser });
//
//       await createPosts(postsToCreate);
//     });
//
//     // it('testUser likes 50 posts, read with skip and limit and desc order', async () => {
//     //
//     // });
//   });
// });
//
// const createPosts = async postsToCreate => {
//   for (let i = 0; i < postsToCreate; i++) {
//     const newUser = await q.user.create.new(th.fakeFields.user());
//
//     testPost = await q.post.create.new(
//       newUser._id,
//       th.fakeFields.post({ userId: newUser._id })
//     );
//
//     const updatedUser = await q.user.update.addLikedPost(
//       testUser._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS, null, { newUser });
//     th.logger.log(lG, lS, null, { testPost });
//     th.logger.log(lG, lS, null, { updatedUser });
//   }
// };
