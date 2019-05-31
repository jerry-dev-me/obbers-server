// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-RESPONSE"; // logSubgroup
//
// describe("Response Model Create Tests", async function() {
//   this.timeout(0);
//
//   let testUser1;
//   let testUser2;
//   let testPost;
//   let testComment;
//   let testResponse;
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//
//     testPost = await q.post.create.new(
//       testUser1._id,
//       th.fakeFields.post({ userId: testUser1._id })
//     );
//
//     th.logger.log(lG, lS, null, { testPost });
//
//   });
//
//   it("testUser2 responds to testUser1 comment", async () => {
//     testComment = await q.comment.create.new(
//       testUser1._id,
//       testPost._id,
//       {
//         postId: testPost._id,
//         userId: testUser1._id,
//         content: `Hi this is a test comment by @${testUser1.info.username}`,
//         createdAt: new Date(),
//         modifiedAt: new Date()
//       }
//     );
//
//     testResponse = await q.response.create.new(
//       testUser2._id,
//       testComment._id,
//       {
//         commentId: testComment._id,
//         userId: testUser2._id,
//         content: `Hi this is a test response from testUser2 @${
//           testUser2.info.username
//         }`,
//         createdAt: new Date(),
//         modifiedAt: new Date()
//       }
//     );
//
//     const foundPost = await q.post.read.byId(testUser1._id, testPost._id);
//
//     const foundComments = await q.comment.read.allByPostId(
//       testUser1._id,
//       testPost._id
//     );
//
//     const foundResponses = await q.response.read.allByCommentId(
//       testUser1._id,
//       testComment._id
//     );
//
//     th.logger.log(lG, lS, null, { testComment });
//     th.logger.log(lG, lS, null, { testResponse });
//     th.logger.log(lG, lS, null, { foundPost });
//     th.logger.log(lG, lS, null, { foundComments });
//     th.logger.log(lG, lS, null, { foundResponses });
//
//     assert(foundPost.comments.length === 1);
//     assert(foundComments[0].userId.toString() === testUser1._id.toString());
//     assert(foundResponses[0].userId.toString() === testUser2._id.toString());
//   });
// });
