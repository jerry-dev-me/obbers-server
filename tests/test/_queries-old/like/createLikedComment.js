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
//   let testPost;
//   let testComment;
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//     testUser3 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testUser3Id: testUser3._id });
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
//   });
//
//   it("Like a comment", async () => {
//     const commentLike1 = await q.like.create.commentLike(
//       testUser1._id,
//       testComment._id
//     );
//
//     const commentLike2 = await q.like.create.commentLike(
//       testUser2._id,
//       testComment._id
//     );
//
//     const commentLike3 = await q.like.create.commentLike(
//       testUser3._id,
//       testComment._id
//     );
//
//     th.logger.log(lG, lS, null, { commentLike1 });
//     th.logger.log(lG, lS, null, { commentLike2 });
//     th.logger.log(lG, lS, null, { commentLike3 });
//
//     const commentLikes = await q.comment.read.likes(
//       testUser1._id,
//       testComment._id
//     );
//
//     th.logger.log(lG, lS, null, { commentLikes });
//
//     assert(commentLikes.length === 3);
//   });
// });
