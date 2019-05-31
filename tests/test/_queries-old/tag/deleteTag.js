// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "D-TAG"; // logSubgroup
//
// let testUser1;
// let testUser2;
// let testPost;
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
//   const foundUser = await q.user.read.byId(testUser1._id, testUser2._id);
//   const foundUserTaggedPosts = foundUser.taggedPosts;
//
//   th.logger.log(lG, lS, null, { foundPost });
//   th.logger.log(lG, lS, null, { foundTag });
//   th.logger.log(lG, lS, null, { foundUser });
//   th.logger.log(lG, lS, null, { foundUserTaggedPosts });
//
//   return {
//     postTags: foundPost.tags,
//     tag: foundTag,
//     userTaggedPosts: foundUserTaggedPosts
//   };
// };
//
// describe("Tag Model Delete Tests", async function() {
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
//   it(`testUser1 is post creator and can delete tag`, async () => {
//     const deletedTag = await q.tag.delete.byId(
//       testUser1._id,
//       testPost._id,
//       testTag._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedTag });
//     assert(deletedTag === null)
//   });
//
//   it(`testUser2 is tagged user and can delete tag`, async () => {
//     const deletedTag = await q.tag.delete.byId(
//       testUser2._id,
//       testPost._id,
//       testTag._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedTag });
//     assert(deletedTag === null)
//   });
//
//   it(`testUser3 is not post creator or tagged user,
//     cannot delete tag`, async () => {
//     testUser3 = await q.user.create.new(th.fakeFields.user());
//     th.logger.log(lG, lS, null, { testUser3Id: testUser3._id });
//
//     const deletedTag = await q.tag.delete.byId(
//       testUser3._id,
//       testPost._id,
//       testTag._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedTag });
//     assert(deletedTag === false)
//   });
// });
//
//
// // create a testUser1 and testUser2, testUser3
// // testUser1 creates a post with no tags
// // then testUser1 tags testUser2 on an existent post...
// // testTag will be created
//
// // then call DeleteTag.byId() QUERY and make sure we delete the testTag
// // make sure it has been deleted by reading the next stuff:
// // read post tags and make sure testTag._id exists
// // read testUser2 tags and testTag._id must be there
// // read testTag from ReadTag.byId QUERY
//
// // make 3 IT blocks to test the above...
// // 1 - testUser1 post creator deletes tag (succes)
// // 2 - testUser2 is not post creator but is taggedUser, deletes tag (success)
// // 3 - testUser3 is not post creator nor taggedUser, deletes tag (failure)
