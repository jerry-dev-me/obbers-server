// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "R-RESPONSE"; // logSubgroup
//
// describe("Response Model Read Tests", async function() {
//   this.timeout(0);
//
//   let testUser;
//   let testPost;
//   let testComment;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     testPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.post({ userId: testUser._id })
//     );
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//     th.logger.log(lG, lS, null, { testPost });
//   });
//
//   it("testUser post has 3 comments and each comment has 3 responses all from different users", async () => {
//     let totalComments = 3;
//     let totalResposes = 3;
//
//     th.logger.log(lG, lS,
//     `Creating ${totalComments} comments and
//     ${totalResposes} responses per comment`);
//
//     for (let i = 0; i < totalComments; i++) {
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       testComment = await q.comment.create.new(
//         newUser._id,
//         testPost._id,
//         {
//           postId: testPost._id,
//           userId: newUser._id,
//           content: `Hi this is a test comment by @${newUser.info.username}`,
//           createdAt: new Date(),
//           modifiedAt: new Date()
//         }
//       );
//
//       th.logger.log(lG, lS, null, { newUserId: newUser._id });
//       th.logger.log(lG, lS, null, { testComment });
//
//       for (let j = 0; j < totalResposes; j++) {
//         const newUser = await q.user.create.new(th.fakeFields.user());
//
//         const newResponse = await q.response.create.new(
//           newUser._id,
//           testComment._id,
//           {
//             commentId: testComment._id,
//             userId: newUser._id,
//             content: `Hi this is a test response by @${newUser.info.username}`,
//             createdAt: new Date(),
//             modifiedAt: new Date()
//           }
//         );
//
//         th.logger.log(lG, lS, null, { newUserId: newUser._id });
//         th.logger.log(lG, lS, null, { newResponse });
//       }
//     }
//
//     const foundComments = await q.comment.read.allByPostId(
//       testUser._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS, null, { foundComments });
//     th.logger.log(lG, lS,
//     `foundComments.length`, { foundCommentsLength: foundComments.length });
//
//     assert(foundComments.length === 3);
//
//     await Promise.all(
//       foundComments.map(async foundComment => {
//         const foundResponses = await q.response.read.allByCommentId(
//           testUser._id,
//           foundComment._id
//         );
//
//         th.logger.log(lG, lS,
//         `Responses found in foundComment._id: ${foundComment._id}
//         are ${foundResponses.length}`,
//         { foundResponses });
//
//         assert(foundResponses.length === 3);
//       })
//     );
//   });
//
//   // it('non-blocked follower attempts to read public user testResponse', async () => {
//   // });
//
//   // it('non-blocked non-follower attempts to read public user testResponse', async () => {
//   // });
//
//   // it('non-blocked follower attempts to read private user testResponse', async () => {
//   // });
//
//   // it('non-blocked non-follower attempts to read private user testResponse', async () => {
//   // });
//
//   // it('blocked follower attempts to read public user testResponse', async () => {
//   // });
//
//   // it('blocked non-follower attempts to read public user testResponse', async () => {
//   // });
//
//   // it('blocked follower attempts to read private user testResponse', async () => {
//   // });
//
//   // it('blocked non-follower attempts to read private user testResponse', async () => {
//   // });
//
//   // it(`non-blocked follower reads all 50 private user's testPost's testComment's responses`, async () => {
//   //     // Sort by Recent Date first. Skip and Limit by 20.
//   // });
//
//   // it(`non-blocked non-follower reads all 50 public user's testPost's testComment's responses`, async () => {
//   //     // Sort by Recent Date first. Skip and Limit by 20.
//   // });
// });
