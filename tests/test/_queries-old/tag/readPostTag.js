// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "R-TAG"; // logSubgroup
//
// let testUser1;
// let testUser2;
// let testUser3;
// let testPost;
//
// describe("Tag Model Read Tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//     testUser1 = await await q.user.create.new(th.fakeFields.user());
//     testUser2 = await await q.user.create.new(th.fakeFields.user());
//     testUser3 = await await q.user.create.new(th.fakeFields.user());
//
//     const tags = [
//       {
//         userId: testUser2._id,
//         username: testUser2.info.username,
//         position: { x:10, y:0 },
//         createdAt: new Date()
//       }
//     ];
//
//     testPost = await q.post.create.new(
//       testUser1._id,
//       th.fakeFields.post({
//         userId: testUser1._id,
//         tags
//       })
//     );
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testUser3Id: testUser3._id });
//     th.logger.log(lG, lS, null, { testPost });
//   });
//
//   // when reading foundPost.tags or q.post.read.tags make sure the tags
//   // are populated with username, _id and imgCoords
//
//   describe("Simple read", async function() {
//     it("testUser3 reads testPost from testUser1", async () => {
//       const foundPost = await q.post.read.byId(testUser3._id, testPost._id);
//
//       const postTags = await q.post.read.tags(testUser3._id, testPost._id);
//
//       th.logger.log(lG, lS, null, { foundPost });
//
//       th.logger.log(lG, lS,
//       `foundPost.tags`, { foundPostTags: foundPost.tags });
//
//       th.logger.log(lG, lS, null, { postTags });
//
//       assert(foundPost.tags !== null);
//       assert(foundPost.tags.constructor === Array);
//       assert(foundPost.tags[0].userId.toString() === testUser2._id.toString());
//     });
//   });
//
//   describe("Read tags under all user account status", async function() {
//     it("Read testPost tags, testUser2 is DELETED", async () => {
//       const deletedUser = await q.user.delete.byId(testUser2._id, testUser2._id);
//
//       th.logger.log(lG, lS, null, { deletedUser });
//
//       // Set back to 'ACTIVE' and tags must not be there anymore
//     });
//
//     it("Read testPost tags, testUser2 is BANNED", async () => {
//       const updatedUser = await q.user.update.accountStatus(
//         testUser2._id,
//         "BANNED"
//       );
//
//       th.logger.log(lG, lS,
//       `updatedUser.account`, { updatedUserAccount: updatedUser.account });
//
//       // Set back to 'ACTIVE' and tags must not be there anymore
//     });
//
//     it("Read testPost tags, testUser2 is SUSPENDED", async () => {
//       const updatedUser = await q.user.update.accountStatus(
//         testUser2._id,
//         "SUSPENDED"
//       );
//
//       th.logger.log(lG, lS,
//       `updatedUser.account`, { updatedUserAccount: updatedUser.account });
//
//       // Set back to 'ACTIVE' and tags must be there again
//     });
//
//     it("Read testPost tags, testUser2 is INACTIVE", async () => {
//       const updatedUser = await q.user.update.accountStatus(
//         testUser2._id,
//         "INACTIVE"
//       );
//
//       th.logger.log(lG, lS,
//       `updatedUser.account`, { updatedUserAccount: updatedUser.account });
//
//       // Set back to 'ACTIVE' and tags must be there again
//     });
//
//     it("testUser1 reads his testPost tags, testUser2 has blocked testUser1 creator of tag", async () => {
//       const updatedUser = await q.user.update.addBlocked(
//         testUser2._id,
//         testUser1._id
//       );
//
//       th.logger.log(lG, lS,
//       `updatedUser.blockedUsers`,
//       { updatedUserBlockedUsers: updatedUser.blockedUsers });
//
//       // testUser2 unblocks testUser1 who created the tag
//       // tag must not be there anymore
//     });
//
//     afterEach(async () => {
//       readPost(testUser1._id);
//
//       readUserTaggedPosts();
//     });
//   });
//
//   describe(
//     `testUser3 reads post tags but has been blocked by some tagged users`,
//     async function() {
//       it(
//         `testUser3 reads testPost tags, testUser2 has blocked testUser3`,
//         async () => {
//           const updatedUser = await q.user.update.addBlocked(
//             testUser2._id,
//             testUser3._id
//           );
//
//           th.logger.log(lG, lS,
//           `updatedUser.blockedUsers`,
//           { updatedUserBlockedUsers: updatedUser.blockedUsers });
//
//           // testUser1 reads testPost and will see testUser2 tagged in testPost
//           // testUser3 reads testPost and will not see testUser2 tagged in testPost
//
//           // testUser2 unblocks testUser3
//           // testUser3 reads testPost and will now again see testUser2 tagged in testPost
//
//           readPost(testUser3._id);
//
//           readUserTaggedPosts();
//       });
//   });
//
//   const readPost = async readerId => {
//     const foundPost = await q.post.read.byId(readerId, testPost._id);
//
//     const postTags = await q.post.read.tags(readerId, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     th.logger.log(lG, lS,
//     `foundPost.tags`, { foundPostTags: foundPost.tags });
//
//     th.logger.log(lG, lS, null, { postTags });
//   };
//
//   const readUserTaggedPosts = async () => {
//     const userTaggedPosts = await q.user.read.taggedPosts(
//       testUser2._id,
//       testUser2._id
//     );
//
//     th.logger.log(lG, lS, null, { userTaggedPosts });
//
//     if (userTaggedPosts !== null && userTaggedPosts.length > 0) {
//       th.logger.log(lG, lS,
//       `userTaggedPosts.length`, { userTaggedPostsLength: userTaggedPosts.length });
//     };
//   };
//
// });
