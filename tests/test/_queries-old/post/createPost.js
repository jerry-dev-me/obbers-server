// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-POST"; // logSubgroup
//
// describe("Post Model Create Tests", async function() {
//   this.timeout(0);
//
//   let testUser;
//   let testPost;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   afterEach(async () => {
//     const allPostsFoundByUserId = await q.post.read.allByUserId(
//       testUser._id,
//       testUser._id
//     );
//
//     th.logger.log(lG, lS, null, { allPostsFoundByUserId });
//   });
//
//   it("Test user creates a new post", async () => {
//     testPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.post({ userId: testUser._id })
//     );
//
//     th.logger.log(lG, lS, null, { testPost });
//
//     const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     assert(foundPost._id.toString() === testPost._id.toString());
//   });
//
//   it("Test user creates a new post with 3 different content urls", async () => {
//     testPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.post(
//         {
//           userId: testUser._id,
//           content: [
//             "http://lorempixel.com/640/480/",
//             "http://lorempixel.com/640/480/",
//             "http://lorempixel.com/640/480/"
//           ]
//         }
//       )
//     );
//
//     th.logger.log(lG, lS, null, { testPost });
//
//     const foundPost = await q.post.read.byId(testUser._id, testPost._id);;
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     assert(testPost.content.length === 3);
//   });
//
//   it("Test user creates a new post with invalid fields", async () => {
//     const invalidPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.invalidPost({ userId: testUser._id })
//     );
//
//     th.logger.log(lG, lS, null, { invalidPost });
//
//     for(let key in invalidPost) {
//       th.logger.log(lG, lS, null, { key });
//     };
//
//     th.logger.log(lG, lS,
//     `invalidPost.errors`, { invalidPostErrors: invalidPost.errors });
//
//     assert(invalidPost.errors);
//   });
// });
