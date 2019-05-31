// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "D-TAG"; // logSubgroup
//
// describe("Tag Model Delete Tests", async function() {
//   this.timeout(0);
//
//   let testUser1;
//   let testUser2;
//   let testUser3;
//   let testPost;
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//     testUser3 = await q.user.create.new(th.fakeFields.user());
//
//     const tags = [
//       {
//         userId: testUser2._id,
//         username: testUser2.info.username,
//         position: { x:-10, y:0},
//         createdAt: new Date()
//       },
//       {
//         userId: testUser3._id,
//         username: testUser3.info.username,
//         position: { x:10, y:0 },
//         createdAt: new Date()
//       }
//     ];
//
//     testPost = await q.post.create.new(
//       testUser1._id,
//       th.fakeFields.post({
//         userId: testUser1._id,
//         tags
//       })
//     );
//
//     console.log(testPost);
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testPost });
//   });
//
//   it("Delete post where testUser2 was tagged and then read testUser2 taggedPosts", async () => {
//
//     return;
//
//     const deletedPost = await q.post.delete.byId(testUser1._id, testPost._id);
//
//     const taggedPosts = await q.user.read.taggedPosts(
//       testUser2._id,
//       testUser2._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedPost });
//     th.logger.log(lG, lS, null, { taggedPosts });
//
//     assert(deletedPost === null);
//     assert(taggedPosts === null);
//   });
//
//   it("Delete testUser2 and read testPost tags", async () => {
//     const deletedUser = await q.user.delete.byId(testUser2._id, testUser2._id);
//
//     const foundPost = await q.post.read.byId(testUser1._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { deletedUser });
//     th.logger.log(lG, lS, null, { foundPost });
//     th.logger.log(lG, lS,
//       `foundPost.tags`, { foundPostTags: foundPost.tags });
//
//     assert(deletedUser === null);
//     assert(foundPost.tags !== null);
//     assert(foundPost.tags.length === 0);
//     assert(foundPost.tags.constructor === Array);
//   });
// });
