// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-TAG"; // logSubgroup
//
// let testUser1;
// let testUser2;
// let testPost;
//
// describe("Tag Model Create Tests", async function() {
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
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testPost });
//   });
//
//   it(`testUser1 tags testUser2 after testPost creation`, async () => {
//     let testTag = await q.tag.create.new(
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
//     assert(testTag.userId.toString() === testUser2._id.toString());
//     assert(testTag.username === testUser2.info.username);
//
//     const foundPost = await q.post.read.byId(testUser1._id, testPost._id);
//     const foundPostTags = foundPost.tags;
//
//     foundPostTags.map(tag => {
//       if(tag._id.toString() === testTag._id.toString()) {
//         assert(tag._id.toString() === testTag._id.toString());
//         assert(tag.userId.toString() === testUser2._id.toString());
//         assert(tag.username === testUser2.info.username);
//       };
//     });
//
//     const foundUser = await q.user.read.byId(testUser1._id, testUser2._id);
//     const foundUserTaggedPosts = foundUser.taggedPosts;
//
//     foundUserTaggedPosts.map(postId => {
//       if (postId.toString() === testPost._id.toString()) {
//         assert(postId.toString() === testPost._id.toString());
//       }
//     })
//
//     const foundTag = await q.tag.read.byId(testUser1._id, testPost._id, testTag._id);
//     assert(foundTag._id.toString() === testTag._id.toString());
//     assert(foundTag.userId.toString() === testUser2._id.toString());
//     assert(foundTag.username === testUser2.info.username);
//
//     th.logger.log(lG, lS, null, { testTag });
//     th.logger.log(lG, lS, null, { foundPost });
//     th.logger.log(lG, lS, null, { foundPostTags });
//     th.logger.log(lG, lS, null, { foundUser });
//     th.logger.log(lG, lS, null, { foundUserTaggedPosts });
//     th.logger.log(lG, lS, null, { foundTag });
//   });
//
//   it(`testUser1 tags testUser2 but it is already tagged`, async () => {
//     let testTag1 = await q.tag.create.new(
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
//     th.logger.log(lG, lS, null, { testTag1 });
//
//     // setTimeout(async function () {
//     //   let testTag2 = await q.tag.create.new(
//     //     testUser1._id,
//     //     testPost._id,
//     //     {
//     //       userId: testUser2._id,
//     //       username: testUser2.info.username,
//     //       position: { x: 30, y: 0 },
//     //       createdAt: new Date()
//     //     }
//     //   );
//     //   th.logger.log(lG, lS, null, { testTag2 });
//     //
//     //   assert(testTag2 === false);
//     // }, 5000);
//
//     let testTag2 = await q.tag.create.new(
//       testUser1._id,
//       testPost._id,
//       {
//         userId: testUser2._id,
//         username: testUser2.info.username,
//         position: { x: 30, y: 0 },
//         createdAt: new Date()
//       }
//     );
//     th.logger.log(lG, lS, null, { testTag2 });
//
//     assert(testTag2 === false);
//
//   });
//
//   it(`create a tag with invalid tag fields`, async () => {
//     let testTag1 = await q.tag.create.new(
//       testUser1._id,
//       testPost._id,
//       {
//         userId: "anInvalidField",
//         username: 123456,
//         position: "anInvalidField",
//         createdAt: "anInvalidField"
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testTag1 });
//
//     assert(testTag1.name === "CastError");
//   });
//
//   // it(`testUser1 tags testUser who has blocked him`, async () => {
//   // });
// });
