// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "D-COMMENT"; // logSubgroup
//
// describe("Comment Model - Delete Query Tests", async function() {
//   this.timeout(0);
//
//   let testUser;
//   let testPost;
//   let newUser;
//   let testComment;
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
//     newUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { newUser });
//
//     testComment = await q.comment.create.new(
//       newUser._id,
//       testPost._id,
//       {
//         postId: testPost._id,
//         userId: newUser._id,
//         content: `Hi this is a test comment by @${newUser.info.username}`,
//         createdAt: new Date(),
//         modifiedAt: new Date()
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testComment });
//   });
//
//   it("New user comments test user post and then new user deletes his own comment", async () => {
//     const deletedComment = await q.comment.delete.byId(
//       newUser._id,
//       testComment._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedComment });
//
//     const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     const foundComments = await q.comment.read.allByPostId(
//       testUser._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS, null, { foundComments });
//
//     assert(deletedComment === null);
//     assert(foundPost.totalComments === 0);
//     assert(foundPost.comments.length === 0);
//     assert(foundComments === null);
//   });
//
//   it("New user comments test user post and then test user deletes new user comment", async () => {
//     const deletedComment = await q.comment.delete.byId(
//       testUser._id,
//       testComment._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedComment });
//
//     const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     const foundComments = await q.comment.read.allByPostId(
//       testUser._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS, null, { foundComments });
//
//     assert(deletedComment === null);
//     assert(foundPost.totalComments === 0);
//     assert(foundPost.comments.length === 0);
//     assert(foundComments === null);
//   });
//
//   it("Test user comments his own post and then new user tries to delete test users comment", async () => {
//     const newComment = await q.comment.create.new(
//       testUser._id,
//       testPost._id,
//       {
//         postId: testPost._id,
//         userId: testUser._id,
//         content: `Hi this is a test comment by @${testUser.info.username}`,
//         createdAt: new Date(),
//         modifiedAt: new Date()
//       }
//     );
//
//     th.logger.log(lG, lS, null, { newComment });
//
//     const deletedComment = await q.comment.delete.byId(
//       newUser._id,
//       newComment._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedComment });
//
//     const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     const foundComments = await q.comment.read.allByPostId(
//       testUser._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS, null, { foundComments });
//
//     assert(deletedComment === false);
//     assert(foundPost.totalComments === 2);
//     assert(foundPost.comments.length === 2);
//     assert(foundComments.length === 2);
//     assert(foundComments !== null);
//   });
// });
