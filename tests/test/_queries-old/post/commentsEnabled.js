// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-POST"; // logSubgroup
//
// describe("Post Model commentsEnabled Tests", async function() {
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
//   it("Toggle post commentsEnabled settings between true and false", async () => {
//     let testUsersToCreate = 3;
//
//     for (let i = 0; i < testUsersToCreate; i++) {
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       th.logger.log(lG, lS, null, { newUserId: newUser._id });
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
//       th.logger.log(lG, lS, null, { testComment });
//     };
//
//     let foundPost;
//
//     const readPostComments = async () => {
//       foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//       th.logger.log(lG, lS, null, { foundPost });
//
//       if (foundPost.comments !== null) {
//         th.logger.log(lG, lS,
//         `foundPost.comments.length`,
//         { foundPostCommentsLength: foundPost.comments.length });
//       } else {
//         th.logger.log(lG, lS,
//         `foundPost.comments`, { foundPostComments: foundPost.comments });
//       };
//
//       th.logger.log(lG, lS,
//       `foundPost.totalComments`,
//       { foundPostTotalComments: foundPost.totalComments });
//
//       const foundComments = await q.comment.read.allByPostId(
//         testUser._id,
//         testPost._id
//       );
//
//       th.logger.log(lG, lS, null, { foundComments });
//     };
//
//     const toggleCommentsEnabled = async () => {
//       foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//       th.logger.log(lG, lS, null, { foundPost });
//
//       let value = foundPost.commentsEnabled ? false : true;
//
//       const updatedPost = await q.post.update.commentsEnabled(
//         testUser._id,
//         testPost._id,
//         value
//       );
//
//       th.logger.log(lG, lS, null, { updatedPost });
//
//       th.logger.log(lG, lS,
//       `updatedPost.commentsEnabled`,
//       { commentsEnabled: updatedPost.commentsEnabled });
//     };
//
//     await readPostComments();
//     assert(foundPost.commentsEnabled === true);
//     assert(foundPost.totalComments === 3);
//     assert(foundPost.comments.length === 3);
//
//     await toggleCommentsEnabled();
//     await readPostComments();
//     assert(foundPost.commentsEnabled === false);
//     assert(foundPost.totalComments === 3);
//     assert(foundPost.comments === null);
//
//     await toggleCommentsEnabled();
//     await readPostComments();
//     assert(foundPost.commentsEnabled === true);
//     assert(foundPost.totalComments === 3);
//     assert(foundPost.comments.length === 3);
//   });
// });
