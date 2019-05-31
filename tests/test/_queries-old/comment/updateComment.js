// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-COMMENT"; // logSubgroup
//
// describe("Comment Model - Update Query Tests", async function() {
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
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
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
//   it(`New user updates his own comment's content`, async () => {
//     const updatedContent =
//     `Hi this is a test updated comment by @${newUser.info.username}`;
//
//     const updatedComment = await q.comment.update.content(
//       newUser._id,
//       testComment._id,
//       updatedContent
//     );
//
//     th.logger.log(lG, lS, null, { updatedComment });
//
//     assert(typeof updatedComment === "object");
//     assert(updatedComment.content === updatedContent);
//   });
//
//   it(`Test user tries to update new user's comment's content`, async () => {
//     const updatedContent =
//     `Hi this is a test updated comment by @${testUser.info.username}`;
//
//     const updatedComment = await q.comment.update.content(
//       testUser._id,
//       testComment._id,
//       updatedContent
//     );
//
//     th.logger.log(lG, lS, null, { updatedComment });
//
//     assert(updatedComment === false);
//   });
// });
