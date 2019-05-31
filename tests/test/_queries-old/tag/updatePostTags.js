// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-TAG"; // logSubgroup
//
// let testUser;
// let testPost;
// let taggedUsers = [];
//
// describe("Tag Model Create Tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   it(
//     `testPost has 3 tagged users, update tags by remove tag and then add tag`,
//     async () => {
//
//     let taggedUsersToCreate = 3;
//
//     for (let i = 0; i < taggedUsersToCreate; i++) {
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       taggedUsers.push(newUser);
//
//       th.logger.log(lG, lS, null, { newUserId: newUser._id });
//       th.logger.log(lG, lS, null, { taggedUsers });
//     };
//
//     let tagFields = [];
//
//     await Promise.all(
//       taggedUsers.map(taggedUser => {
//         let tagObject = {
//           userId: taggedUser._id,
//           username: taggedUser.info.username,
//           position: { x:10, y:0 },
//           createdAt: new Date()
//         };
//         tagFields.push(tagObject);
//
//         th.logger.log(lG, lS, null, { tagObject });
//         th.logger.log(lG, lS, null, { tagFields });
//       })
//     );
//
//     testPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.post({
//         userId: testUser._id,
//         tags: tagFields
//       })
//     );
//
//     th.logger.log(lG, lS, null, { testPost });
//
//     await readTags();
//
//     assert(testPost.tags.length === 3);
//
//     // update post by removing all tags
//
//     const postTags = await q.post.read.tags(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { postTags });
//
//     assert(postTags.length === 3);
//
//     await Promise.all(
//       postTags.map(async postTag => {
//         th.logger.log(lG, lS, null, { postTag });
//
//         const updatedPost = await q.post.update.removeTag(
//           testUser._id,
//           testPost._id,
//           postTag._id,
//           postTag.userId
//         );
//
//         th.logger.log(lG, lS, null, { updatedPost });
//       })
//     );
//
//     await readTags();
//
//     // const foundPostTags = await q.post.read.tags(testUser._id, testPost._id);
//     // th.logger.log(lG, lS, null, { foundPostTags });
//     // assert(foundPostTags.length === 0);
//
//     // update post by adding again all tags
//
//     await Promise.all(
//       taggedUsers.map(async taggedUser => {
//         th.logger.log(lG, lS, null, { taggedUser });
//
//         let tagFields = {
//           userId: taggedUser._id,
//           username: taggedUser.info.username,
//           position: { x:10, y:0 },
//           createdAt: new Date()
//         };
//
//         const updatedPost = await q.post.update.addTag(
//           testUser._id,
//           testPost._id,
//           tagFields
//         );
//
//         th.logger.log(lG, lS, null, { updatedPost });
//       })
//     );
//
//     await readTags();
//
//     assert(testUser !== null)
//   });
//
//   // it('testUser2 has been tagged by testUser1 in a testPost, testUser2 removes tag', async () => {
//   //
//   // });
//
// });
//
// const readTags = async () => {
//   const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//   th.logger.log(lG, lS, null, { foundPost });
//
//   th.logger.log(lG, lS,
//   `foundPost.tags`, { foundPostTags: foundPost.tags });
//
//   const postTags = await q.post.read.tags(testUser._id, testPost._id);
//
//   th.logger.log(lG, lS, null, { postTags });
//
//   await Promise.all(
//     taggedUsers.map(async taggedUser => {
//       th.logger.log(lG, lS, null, { taggedUser });
//
//       const taggedPosts = await q.user.read.taggedPosts(
//         taggedUser._id,
//         taggedUser._id
//       );
//
//       th.logger.log(lG, lS, null, { taggedPosts });
//
//       if (taggedPosts !== null) {
//         th.logger.log(lG, lS,
//         `taggedPosts.length`, { taggedPostsLength: taggedPosts.length });
//       }
//     })
//   );
// };
