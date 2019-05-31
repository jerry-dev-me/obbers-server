// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-COMMENT"; // logSubgroup
//
// describe("Comment Model - Create Query Tests", async function() {
//   this.timeout(0);
//
//   let testUser1;
//   let testUser2;
//   let testPost;
//   let testComment;
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//
//     testPost = await q.post.create.new(
//       testUser1._id,
//       th.fakeFields.post({ userId: testUser1._id })
//     );
//
//     th.logger.log(lG, lS, null, { testPost });
//   });
//
//   it("Test user has 1 post with 1 comment", async () => {
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//
//     testComment = await q.comment.create.new(
//       testUser2._id,
//       testPost._id,
//       {
//         postId: testPost._id,
//         userId: testUser2._id,
//         content: `Hi this is a test comment by @${testUser2.info.username}`,
//         createdAt: new Date(),
//         modifiedAt: new Date()
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testComment });
//
//     const foundPost = await q.post.read.byId(testUser1._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     const foundComments = await q.comment.read.allByPostId(
//       testUser1._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS, null, { foundComments });
//
//     assert(foundPost.comments.length === 1);
//     assert(foundPost.totalComments === 1);
//     assert(foundComments.length === 1);
//     assert(foundComments[0].userId.toString() === testUser2._id.toString());
//   });
// });
