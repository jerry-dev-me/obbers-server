// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-TAG"; // logSubgroup
//
// let testUser1;
// let testUser2;
// let testPost;
// let testTag;
//
// let newValidTagPosition = { x: -250, y: 250 };
// let newInvalidTagPosition = "THIS IS INVALID";
//
// describe("Tag Model Update Tests", async function() {
//   this.timeout(0);
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
//     testTag = await q.tag.create.new(
//       testUser1._id,
//       testPost._id,
//       {
//         userId: testUser2._id,
//         username: testUser2.info.username,
//         position: { x: 300, y: 0 },
//         createdAt: new Date()
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testPost });
//     th.logger.log(lG, lS, null, { testTag });
//   });
//
//   it(`Update tag position with correct position values`, async () => {
//     const updatedTag = await q.tag.update.position(
//       testUser1._id,
//       testPost._id,
//       testTag._id,
//       newValidTagPosition
//     );
//
//     th.logger.log(lG, lS, null, { updatedTag });
//
//     assert(updatedTag.position.x === newValidTagPosition.x);
//     assert(updatedTag.position.y === newValidTagPosition.y);
//   });
//
//   it(`update tag position with incorrect position values`, async () => {
//     const updatedTag = await q.tag.update.position(
//       testUser1._id,
//       testPost._id,
//       testTag._id,
//       newInvalidTagPosition
//     );
//
//     th.logger.log(lG, lS, null, { updatedTag });
//
//     assert(updatedTag === false);
//   });
//
//   it(`testUser2 is the tagged user, cannot update position`, async () => {
//     const updatedTag = await q.tag.update.position(
//       testUser2._id,
//       testPost._id,
//       testTag._id,
//       newValidTagPosition
//     );
//
//     th.logger.log(lG, lS, null, { updatedTag });
//
//     assert(updatedTag === false);
//   });
//
//   it(`testUser3 is a random user, cannot update position`, async () => {
//     const testUser3 = await q.user.create.new(th.fakeFields.user());
//
//     const updatedTag = await q.tag.update.position(
//       testUser3._id,
//       testPost._id,
//       testTag._id,
//       newValidTagPosition
//     );
//
//     th.logger.log(lG, lS, null, { updatedTag });
//
//     assert(updatedTag === false);
//   });
//
//   afterEach(async () => {
//     const foundPost = await q.post.read.byId(
//       testUser1._id,
//       testPost._id
//     );
//
//     const foundTag = await q.tag.read.byId(
//       testUser1._id,
//       testPost._id,
//       testTag._id
//     );
//
//     const foundUser = await q.user.read.byId(testUser1._id, testUser2._id);
//     const foundUserTaggedPosts = foundUser.taggedPosts;
//
//     th.logger.log(lG, lS, null, { foundPost });
//     th.logger.log(lG, lS, null, { foundTag });
//     th.logger.log(lG, lS, null, { foundUser });
//     th.logger.log(lG, lS, null, { foundUserTaggedPosts });
//   });
// });
