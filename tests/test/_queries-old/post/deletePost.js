// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "D-POST"; // logSubgroup
//
// let testUser;
// let testPost;
//
// const findAndReadPost = async () => {
//   const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//   th.logger.log(lG, lS, null, { foundPost });
//
//   const foundUser = await q.user.read.profileById(testUser._id, testUser._id);
//
//   th.logger.log(lG, lS, null, { foundUser });
//
//   th.logger.log(lG, lS,
//   foundUser.posts, { foundUserPosts: foundUser.posts });
//
//   th.logger.log(lG, lS,
//   foundUser.posts.length, { foundUserPostsLength: foundUser.posts.length });
// };
//
// describe("Post Model - Delete Query Tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser });
//
//     testPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.post({ userId: testUser._id })
//     );
//
//     th.logger.log(lG, lS, null, { testPost });
//
//     await findAndReadPost();
//   });
//
//   it("Create a new post and then delete it", async () => {
//     const deletedPost = await q.post.delete.byId(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { deletedPost });
//
//     assert(deletedPost === null);
//
//     await findAndReadPost();
//   });
//
//   it("Other user attempts to delete test user post", async () => {
//     const newUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { newUser });
//
//     const deletedPost = await q.post.delete.byId(newUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { deletedPost });
//
//     assert(deletedPost === false);
//
//     await findAndReadPost();
//   });
// });
