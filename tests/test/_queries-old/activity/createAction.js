// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-ACTION"; // logSubgroup
//
// describe("Action Model - Create Query Tests", async function() {
//   this.timeout(0);
//
//   let testUser1;
//   let testUser2;
//   let testUser3;
//   let testUser4;
//   let testUser5;
//
//   let testUsers = [];
//   let testComments = [];
//   let testResponses = [];
//
//   beforeEach(async () => {
//     th.logger.log(lG, lS,
//       `We should only be able to read actions from users`
//       + ` that testUser1 is following, which are actions`
//       + ` from testUser2 and actions from testUser3...`);
//
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//     testUser3 = await q.user.create.new(th.fakeFields.user());
//     testUser4 = await q.user.create.new(th.fakeFields.user());
//     testUser5 = await q.user.create.new(th.fakeFields.user());
//
//     testUsers.push(testUser1);
//     testUsers.push(testUser2);
//     testUsers.push(testUser3);
//     testUsers.push(testUser4);
//     testUsers.push(testUser5);
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testUser3Id: testUser3._id });
//     th.logger.log(lG, lS, null, { testUser4Id: testUser4._id });
//     th.logger.log(lG, lS, null, { testUser5Id: testUser5._id });
//   });
//
//   it("See actions from users that testUser1 is following", async () => {
//     th.logger.log(lG, lS, "Creating testPost by testUser1");
//
//     const testPost = await q.post.create.new(
//       testUser1._id,
//       th.fakeFields.post({ userId: testUser1._id })
//     );
//     th.logger.log(lG, lS, "testPost is", { testPost });
//
//     th.logger.log(lG, lS,
//     "testUser1 will send follower requests to testUser2 and testUser3...");
//
//     const requestToTestUser2 = await q.request.create.new(
//       testUser1._id,
//       testUser2._id
//     );
//     th.logger.log(lG, lS, null, { requestToTestUser2 });
//
//     const requestToTestUser3 = await q.request.create.new(
//       testUser1._id,
//       testUser3._id
//     );
//     th.logger.log(lG, lS, null, { requestToTestUser3 });
//
//     th.logger.log(lG, lS,
//     "testUser2 and testUser3 will now accept testUser1 follow requests...");
//
//     const testUser2AcceptedRequest = await q.request.update.statusAccepted(
//       testUser2._id,
//       requestToTestUser2._id
//     );
//     th.logger.log(lG, lS,
//     "Accepted request was deleted returns null", { testUser2AcceptedRequest });
//
//     assert(testUser2AcceptedRequest === null);
//
//     const testUser3AcceptedRequest = await q.request.update.statusAccepted(
//       testUser3._id,
//       requestToTestUser3._id
//     );
//     th.logger.log(lG, lS,
//     "Accepted request was deleted returns null", { testUser3AcceptedRequest });
//
//     assert(testUser3AcceptedRequest === null);
//
//     // return;
//
//     const allUsersLikeAPost = async () => {
//       th.logger.log(lG, lS,
//       "Every user will now add a like to the post...");
//
//       return await Promise.all(
//         testUsers.map(async testUser => {
//           const postLike = await q.like.create.postLike(testUser._id, testPost._id);
//           th.logger.log(lG, lS, null, { postLike });
//         })
//       );
//     };
//     await allUsersLikeAPost();
//
//     // return;
//
//     const allUsersCommentPost = async () => {
//       th.logger.log(lG, lS,
//       "Every user will now add a comment to the post...");
//
//       let i = 2;
//       return await Promise.all(
//         testUsers.map(async testUser => {
//
//           th.logger.log(lG, lS,
//           `testUser id ${testUser._id} is liking post id ${testPost._id}...`);
//
//           const testComment = await q.comment.create.new(
//             testUser._id,
//             testPost._id,
//             th.fakeFields.comment({
//               userId: testUser._id,
//               postId: testPost._id,
//               content: `This is a test comment by testUser ${testUser._id}`,
//               createdAt: new Date(),
//               modifiedAt: new Date()
//             })
//           );
//
//           th.logger.log(lG, lS, null, { testComment });
//
//           testComments.push(testComment._id);
//           i++;
//         })
//       );
//     };
//     await allUsersCommentPost();
//
//     th.logger.log(lG, lS, null, { testComments });
//
//     // return;
//
//     const everyUserRespondsToEachComment = async () => {
//       th.logger.log(lG, lS,
//       "Every user will now add a response to each comment...");
//
//       return await Promise.all(
//         testComments.map(async commentId => {
//           let i = 2;
//           return await Promise.all(
//             testUsers.map(async testUser => {
//
//               th.logger.log(lG, lS,
//               `testUser id ${testUser._id} is responding comment id ${commentId}...`);
//
//               const testRespomse = await q.response.create.new(
//                 testUser._id,
//                 commentId,
//                 th.fakeFields.response({
//                   userId: testUser._id,
//                   commentId: commentId,
//                   content: `This is a test response by testUser ${testUser._id}`,
//                   createdAt: new Date(),
//                   modifiedAt: new Date()
//                 })
//               );
//
//               th.logger.log(lG, lS, null, { testRespomse });
//
//               testResponses.push(testRespomse._id);
//               i++;
//             })
//           );
//         })
//       );
//     };
//     await everyUserRespondsToEachComment();
//
//     th.logger.log(lG, lS, null, { testResponses });
//
//     // return;
//
//     const everyUserLikesEachComment = async () => {
//       th.logger.log(lG, lS,
//       "Every user will now add a like to each comment...");
//
//       return await Promise.all(
//         testComments.map(async commentId => {
//           return await Promise.all(
//             testUsers.map(async testUser => {
//
//               th.logger.log(lG, lS,
//               `testUser id ${testUser._id} is liking comment id ${commentId}...`);
//
//               const commentLike = await q.like.create.commentLike(
//                 testUser._id,
//                 commentId
//               );
//
//               th.logger.log(lG, lS, null, { commentLike });
//             })
//           );
//         })
//       );
//     };
//     await everyUserLikesEachComment();
//
//     // return;
//
//     const everyUserLikesEachResponse = async () => {
//       th.logger.log(lG, lS,
//       "Every user will now add a like to each response...");
//
//       return await Promise.all(
//         testResponses.map(async responseId => {
//           return await Promise.all(
//             testUsers.map(async testUser => {
//
//               th.logger.log(lG, lS,
//               `testUser id ${testUser._id} is liking response id ${responseId}...`);
//
//               const responseLike = await q.like.create.responseLike(
//                 testUser._id,
//                 responseId
//               );
//
//               th.logger.log(lG, lS, null, { responseLike });
//             })
//           );
//         })
//       );
//     };
//     await everyUserLikesEachResponse();
//
//     // return;
//
//     // test user 2 sends request to test user 4
//
//     const requestFromTestUser2ToTestUser4 = await q.request.create.new(
//       testUser2._id,
//       testUser4._id
//     );
//
//     th.logger.log(lG, lS,
//     null, { requestFromTestUser2ToTestUser4 });
//
//     // test user 4 accepts request from test user 2
//
//     const testUser4AcceptsTestUser2Request = await q.request.update.statusAccepted(
//       testUser4._id,
//       requestFromTestUser2ToTestUser4._id
//     );
//
//     th.logger.log(lG, lS,
//     null, { testUser4AcceptsTestUser2Request });
//
//     // test user 3 sending request to test user 5
//
//     const requestFromTestUser3ToTestUser5 = await q.request.create.new(
//       testUser3._id,
//       testUser5._id
//     );
//
//     th.logger.log(lG, lS,
//     null, { requestFromTestUser3ToTestUser5 });
//
//     // test user 5 accepts request from test user 3
//
//     const testUser5AcceptsTestUser3Request = await q.request.update.statusAccepted(
//       testUser5._id,
//       requestFromTestUser3ToTestUser5._id
//     );
//
//     th.logger.log(lG, lS,
//     null, { testUser5AcceptsTestUser3Request });
//
//     // test user 5 sends request to test user 3
//
//     const requestFromTestUser5ToTestUser3 = await q.request.create.new(
//       testUser5._id,
//       testUser3._id
//     );
//
//     th.logger.log(lG, lS,
//     null, { requestFromTestUser5ToTestUser3 });
//
//     // test user 3 accepts request from test user 5
//
//     const testUser3AcceptsTestUser5Request = await q.request.update.statusAccepted(
//       testUser3._id,
//       requestFromTestUser5ToTestUser3._id
//     );
//
//     th.logger.log(lG, lS,
//     null, { testUser3AcceptsTestUser5Request });
//
//     // return;
//
//     const everyUserCreatesAPost = async () => {
//       th.logger.log(lG, lS,
//       "Every user will now create a post...");
//
//       return await Promise.all(
//         testUsers.map(async testUser => {
//
//           th.logger.log(lG, lS,
//           `testUser id ${testUser._id} is creating a new post...`);
//
//           const newPost = await th.create.testPost(1, testUser._id);
//
//           th.logger.log(lG, lS, null, { newPost });
//         })
//       );
//     };
//     await everyUserCreatesAPost();
//
//     // return;
//
//     th.logger.log(lG, lS,
//     "Reading all actions from test users to whom testUser1 is following...");
//
//     const allActions = await q.activity.read.allFromUsersFollowing(testUser1._id);
//
//     th.logger.log(lG, lS,
//     `allActions.length: ${allActions.length}`);
//
//     th.logger.log(lG, lS,
//     "All actions from users to whom testUser1 is following are:",
//     { allActions }
//     );
//
//     allActions.map(action => {
//       assert(
//         action.userId.toString() === testUser2._id.toString()
//         || action.userId.toString() === testUser3._id.toString()
//       );
//       assert(
//         action.userId.toString() !== testUser4._id.toString()
//         || action.userId.toString() !== testUser5._id.toString()
//       );
//     });
//   });
// });
