// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "R-COMMENT"; // logSubgroup
//
// describe("Comment Model Read Tests", async function() {
//   this.timeout(0);
//
//   let testUser;
//   let testPost;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//
//     testPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.post({ userId: testUser._id })
//     );
//
//     th.logger.log(lG, lS, null, { testPost });
//   });
//
//   it("Test user has 1 post with 50 comments from different users", async () => {
//     let usersToCreate = 50;
//
//     th.logger.log(lG, lS,
//     `Creating ${usersToCreate} users and 1 comment per user, please wait...`);
//
//     for (let i = 0; i < usersToCreate; i++) {
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       th.logger.log(lG, lS, null, { newUser });
//
//       const newComment = await q.comment.create.new(
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
//       th.logger.log(lG, lS, null, { newComment });
//     };
//
//     const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     th.logger.log(lG, lS,
//     `foundPost.totalComments`,
//     { foundPostTotalComments: foundPost.totalComments });
//
//     const foundComments = await q.comment.read.allByPostId(
//       testUser._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS, null, { foundComments });
//
//     th.logger.log(lG, lS,
//     `foundComments.length`,
//     { foundCommentsLength: foundComments.length });
//
//     foundComments.map(foundComment => {
//       assert(foundComment !== null);
//     });
//
//     assert(foundPost.comments.length === 50);
//     assert(foundPost.totalComments === 50);
//     assert(foundComments.length === 50);
//   });
//
//   // it('non-blocked follower attempts to read public user testComment', async () => {
//   // });
//
//   // it('non-blocked non-follower attempts to read public user testComment', async () => {
//   // });
//
//   // it('non-blocked follower attempts to read private user testComment', async () => {
//   // });
//
//   // it('non-blocked non-follower attempts to read private user testComment', async () => {
//   // });
//
//   // it('blocked follower attempts to read public user testComment', async () => {
//   // });
//
//   // it('blocked non-follower attempts to read public user testComment', async () => {
//   // });
//
//   // it('blocked follower attempts to read private user testComment', async () => {
//   // });
//
//   // it('blocked non-follower attempts to read private user testComment', async () => {
//   // });
//
//   // it(`non-blocked follower reads all 50 private user's testPost's comments`, async () => {
//   //     // Sort by Recent Date first. Skip and Limit by 20.
//   // });
//
//   // it(`non-blocked non-follower reads all 50 public user's testPost's comments`, async () => {
//   //     // Sort by Recent Date first. Skip and Limit by 20.
//   // });
// });
