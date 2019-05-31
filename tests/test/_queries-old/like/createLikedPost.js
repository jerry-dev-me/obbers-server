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
//   let testPost;
//   let testComment;
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
//   });
//
//   it("Like a post", async () => {
//     const postLike1 = await q.like.create.postLike(
//       testUser2._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS, null, { postLike1 });
//
//     const postLike2 = await q.like.create.postLike(
//       testUser1._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS, null, { postLike2 });
//
//     const foundPost = await q.post.read.byId(testUser1._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     const postLikes = await q.post.read.likes(testUser1._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { postLikes });
//
//     assert(postLikes.length === 2);
//   });
// });
