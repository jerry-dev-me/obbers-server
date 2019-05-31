// /* ATTEMPT TO ADD REPETITIVE LIKES FROM THE SAME USER MANY TIMES */
// /* EXPECT: LIKE FROM THE SAME USER CAN ONLY BE ONCE */
//
// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-LIKE"; // logSubgroup
//
// describe("Like Model - Create Query Tests", async function() {
//   this.timeout(0);
//
//   let testUser1;
//   let testUser2;
//   let testUser3;
//   let testUser4;
//   let testPost;
//   let testComment;
//   let testResponse;
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//     testUser3 = await q.user.create.new(th.fakeFields.user());
//     testUser4 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testUser3Id: testUser3._id });
//     th.logger.log(lG, lS, null, { testUser3Id: testUser4._id });
//
//     testPost = await q.post.create.new(
//       testUser1._id,
//       th.fakeFields.post({ userId: testUser1._id })
//     );
//
//     th.logger.log(lG, lS, null, { testPost });
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
//     testResponse = await q.response.create.new(
//       testUser3._id,
//       testComment._id,
//       {
//         commentId: testComment._id,
//         userId: testUser3._id,
//         content: `Hi this is a test response by ${testUser3.info.name}`,
//         createdAt: new Date(),
//         modifiedAt: new Date()
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testResponse });
//   });
//
//   it("Like a response", async () => {
//     const responseLike1 = await q.like.create.responseLike(
//       testUser4._id,
//       testResponse._id
//     );
//
//     const responseLike2 = await q.like.create.responseLike(
//       testUser1._id,
//       testResponse._id
//     );
//
//     const responseLike3 = await q.like.create.responseLike(
//       testUser2._id,
//       testResponse._id
//     );
//
//     th.logger.log(lG, lS, null, { responseLike1 });
//     th.logger.log(lG, lS, null, { responseLike2 });
//     th.logger.log(lG, lS, null, { responseLike3 });
//
//     const responseLikes = await q.response.read.likes(
//       testUser1._id,
//       testResponse._id
//     );
//
//     th.logger.log(lG, lS,
//     `responseLikes.length`, { responseLikesLength: responseLikes.length });
//
//     th.logger.log(lG, lS, null, { responseLikes });
//
//     assert(responseLikes.length === 3);
//   });
// });
