// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-POST"; // logSubgroup
//
// describe("Post Model Update Content Tests", async function() {
//   this.timeout(0);
//
//   let testUser;
//   let testPost;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser });
//
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
//   });
//
//   // it(
//   //   `testUser removes testPost content after the post has been created`,
//   //   async () => {
//   //
//   //   }
//   // );
//
//   // it(
//   //   "testUser adds testPost content after the post has been created",
//   //   async () => {
//   //
//   //   }
//   // );
// });
