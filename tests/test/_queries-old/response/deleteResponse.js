// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "D-RESPONSE"; // logSubgroup
//
// describe("Response Model Delete Tests", async function() {
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
//         content: "Hi this is a test response from testUser2",
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
//   it("testUser1 deletes testUser2 response on testUser1 comment", async () => {
//     const deletedResponse = await q.response.delete.byId(
//       testUser1._id,
//       testResponse._id
//     );
//
//     const foundResponses = await q.response.read.allByCommentId(
//       testUser1._id,
//       testComment._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedResponse });
//     th.logger.log(lG, lS, null, { foundResponses });
//
//     if (foundResponses && foundResponses.length)
//       th.logger.log(lG, lS,
//       `foundResponses.length`, { foundResponsesLength: foundResponses.length });
//
//     assert(deletedResponse === null);
//     assert(foundResponses === null);
//   });
//
//   it("testUser2 deletes the response he left on testUser1 comment", async () => {
//     const deletedResponse = await q.response.delete.byId(
//       testUser2._id,
//       testResponse._id
//     );
//
//     const foundResponses = await q.response.read.allByCommentId(
//       testUser1._id,
//       testComment._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedResponse });
//     th.logger.log(lG, lS, null, { foundResponses });
//
//     if (foundResponses && foundResponses.length)
//       th.logger.log(lG, lS,
//       `foundResponses.length`, { foundResponsesLength: foundResponses.length });
//
//     assert(deletedResponse === null);
//     assert(foundResponses === null);
//   });
//
//   it("testUser3 attempts to delete a response he did not create on a post he did not create", async () => {
//     const testUser3 = await q.user.create.new(th.fakeFields.user());
//
//     const deletedResponse = await q.response.delete.byId(
//       testUser3._id,
//       testResponse._id
//     );
//
//     const foundResponses = await q.response.read.allByCommentId(
//       testUser1._id,
//       testComment._id
//     );
//
//     th.logger.log(lG, lS, null, { testUser3Id: testUser3._id });
//     th.logger.log(lG, lS, null, { deletedResponse });
//     th.logger.log(lG, lS, null, { foundResponses });
//
//     if (foundResponses && foundResponses.length)
//       th.logger.log(lG, lS,
//       `foundResponses.length`, { foundResponsesLength: foundResponses.length });
//
//     assert(deletedResponse === false);
//     assert(foundResponses !== null);
//     assert(foundResponses.length === 1);
//   });
// });
