// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-POST"; // logSubgroup
//
// describe("Post Model caption Tests", async function() {
//   this.timeout(0);
//
//   let testUser;
//   let updatedCaption = "This is an updated caption text.";
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   it("Update post caption", async () => {
//     testPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.post({ userId: testUser._id })
//     );
//
//     th.logger.log(lG, lS,
//     `testPost.caption`, { testPostCaption: testPost.caption });
//
//     const updatedPost = await q.post.update.caption(
//       testUser._id,
//       testPost._id,
//       updatedCaption
//     );
//
//     th.logger.log(lG, lS,
//     `updatedPost.caption`, { updatedPostCaption: updatedPost.caption });
//
//     assert(updatedPost.caption === updatedCaption);
//
//     const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     assert(foundPost.caption === updatedCaption);
//   });
// });
