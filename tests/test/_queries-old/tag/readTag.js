// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "R-TAG"; // logSubgroup
//
// let testUser1;
// let testUser2;
// let testReader;
// let testPost;
// let testTag;
//
// const getTags = async () => {
//   const foundPost = await q.post.read.byId(
//     testReader._id,
//     testPost._id
//   );
//
//   const foundTag = await q.tag.read.byId(
//     testReader._id,
//     testPost._id,
//     testTag._id
//   );
//
//   th.logger.log(lG, lS, null, { foundPost });
//   th.logger.log(lG, lS, null, { foundTag });
//
//   return {
//     postTags: foundPost.tags,
//     tag: foundTag
//   };
// };
//
// describe("Tag Model Read Tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//     testReader = await q.user.create.new(th.fakeFields.user());
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
//         position: { x: 30, y: 0 },
//         createdAt: new Date()
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testReaderId: testReader._id });
//     th.logger.log(lG, lS, null, { testPost });
//     th.logger.log(lG, lS, null, { testTag });
//   });
//
//   it(`Everything should be fine here`, async () => {
//     const tags = await getTags();
//     th.logger.log(lG, lS, null, { tags });
//     assert(tags.postTags.length === 1);
//     assert(tags.postTags[0].userId.toString() === testUser2._id.toString());
//     assert(tags.tag.userId.toString() === testUser2._id.toString());
//   });
//
//   it(`tagged testUser2 has blocked testReader`, async () => {
//     await q.user.update.addBlocked(testUser2._id, testReader._id);
//     const tags = await getTags();
//     th.logger.log(lG, lS, null, { tags });
//     assert(tags.postTags.length === 0);
//     assert(tags.tag === false);
//   });
//
//   it(`tagged testUser2 account is now private and testReader is not follower`, async () => {
//     await q.user.update.settingsPrivate(testUser2._id, true);
//     const tags = await getTags();
//     th.logger.log(lG, lS, null, { tags });
//     assert(tags.postTags.length === 0);
//     assert(tags.tag === false);
//   });
//
//   it(`tagged testUser2 account is now private but testReader is follower`, async () => {
//     await q.user.update.settingsPrivate(testUser2._id, true);
//     await q.user.update.addFollower(testUser2._id, testReader._id);
//     const tags = await getTags();
//     th.logger.log(lG, lS, null, { tags });
//     assert(tags.postTags.length === 1);
//     assert(tags.postTags[0].userId.toString() === testUser2._id.toString());
//     assert(tags.tag.userId.toString() === testUser2._id.toString());
//   });
//
//   it(`tagged testUser2 account status is now INACTIVE`, async () => {
//     await q.user.update.accountStatus(testUser2._id, "INACTIVE");
//     const tags = await getTags();
//     th.logger.log(lG, lS, null, { tags });
//     assert(tags.postTags.length === 0);
//     assert(tags.tag === false);
//   });
//
//   it(`tagged testUser2 account status is now BANNED`, async () => {
//     await q.user.update.accountStatus(testUser2._id, "BANNED");
//     const tags = await getTags();
//     th.logger.log(lG, lS, null, { tags });
//     assert(tags.postTags.length === 0);
//     assert(tags.tag === false);
//   });
//
//   it(`tagged testUser2 account status is now SUSPENDED`, async () => {
//     await q.user.update.accountStatus(testUser2._id, "SUSPENDED");
//     const tags = await getTags();
//     th.logger.log(lG, lS, null, { tags });
//     assert(tags.postTags.length === 1);
//     assert(tags.postTags[0].userId.toString() === testUser2._id.toString());
//     assert(tags.tag.userId.toString() === testUser2._id.toString());
//   });
//
//   it(`tagged testUser2 account status is now DELETED`, async () => {
//     await q.user.update.accountStatus(testUser2._id, "DELETED");
//     const tags = await getTags();
//     th.logger.log(lG, lS, null, { tags });
//     assert(tags.postTags.length === 0);
//     assert(tags.tag === false);
//   });
// });
