// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-RESPONSE"; // logSubgroup
//
// describe("Response Model Update Tests", async function() {
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
//     testPost = await q.post.create.new(
//       testUser1._id,
//       th.fakeFields.post({ userId: testUser1._id })
//     );
//
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
//         content: `Hi this is a test response by @${testUser2.info.username}`,
//         createdAt: new Date(),
//         modifiedAt: new Date()
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testPost });
//     th.logger.log(lG, lS, null, { testComment });
//     th.logger.log(lG, lS, null, { testResponse });
//   });
//
//   it("testUser2 updates his response content", async () => {
//     const updatedContent =
//     `Hi this is a test updated response by testUser2 @${testUser2.info.username}`;
//
//     const updatedResponse = await q.response.update.content(
//       testUser2._id,
//       testResponse._id,
//       updatedContent
//     );
//
//     th.logger.log(lG, lS, null, { updatedResponse });
//
//     assert(typeof updatedResponse === "object");
//     assert(updatedResponse.content === updatedContent);
//   });
//
//   it("testUser1 attempts to update testUser2 response content", async () => {
//     const updatedContent =
//     `Hi this is a test updated response by testUser1 @${testUser1.info.username}`;
//
//     const updatedResponse = await q.response.update.content(
//       testUser1._id,
//       testResponse._id,
//       updatedContent
//     );
//
//     th.logger.log(lG, lS, null, { updatedResponse });
//
//     assert(updatedResponse === false);
//   });
// });
