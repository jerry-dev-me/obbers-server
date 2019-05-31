// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-TAG"; // logSubgroup
//
// describe("Tag Model Create Tests", async function() {
//   this.timeout(0);
//
//   let testUser;
//   let testPost;
//   let taggedUsers = [];
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   it("testUser tags 3 users in a post", async () => {
//     let taggedUsersToCreate = 3;
//
//     for (let i = 0; i < taggedUsersToCreate; i++) {
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       taggedUsers.push(newUser);
//
//       th.logger.log(lG, lS, null, { newUserId: newUser._id });
//
//       th.logger.log(lG, lS,
//       `taggedUsers.length`, { taggedUsersLength: taggedUsers.length });
//
//       th.logger.log(lG, lS, null, { taggedUsers });
//     };
//
//     th.logger.log(lG, lS,
//     `taggedUsers.length`, { taggedUsersLength: taggedUsers.length });
//
//     th.logger.log(lG, lS, null, { taggedUsers });
//
//     let tagFields = [];
//
//     await Promise.all(
//       taggedUsers.map(taggedUser => {
//         let objectToPush = {
//           userId: taggedUser._id,
//           username: taggedUser.info.username,
//           position: { x:10, y:0 },
//           createdAt: new Date()
//         };
//
//         tagFields.push(objectToPush);
//
//         th.logger.log(lG, lS, null, { objectToPush });
//         th.logger.log(lG, lS, null, { tagFields });
//       })
//     );
//     th.logger.log(lG, lS, null, { tagFields });
//
//     testPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.post({
//         userId: testUser._id,
//         tags: tagFields
//       })
//     );
//
//     const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//     const postTags = await q.post.read.tags(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//     th.logger.log(lG, lS, null, { postTags });
//
//     taggedUsers.forEach(async taggedUser => {
//       const taggedPosts = await q.user.read.taggedPosts(
//         taggedUser._id,
//         taggedUser._id
//       );
//
//       th.logger.log(lG, lS, null, { taggedUsers });
//
//       assert(taggedPosts[0]._id.toString() === testPost._id.toString());
//     });
//   });
// });
