// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// let testUser;
//
// describe("User Model following Tests", async () => {
//   describe("Read following users", () => {
//     let followingToCreate = 3;
//
//     beforeEach(async () => {
//       testUser = await q.user.create.new(th.fakeFields.user());
//
//       th.logger.log(lG, lS, null, { testUserId: testUser._id });
//
//       await createFollowing(followingToCreate);
//     });
//
//     it("testUser has 3 following users, testUser reads his following users", async () => {
//       const foundFollowing = await q.user.read.following(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { foundFollowing });
//
//       assert(foundFollowing.length === followingToCreate);
//     });
//
//     it("newUser reads testUser following, but one user has blocked newUser", async () => {
//       const followingUsers = await q.user.read.following(
//         testUser._id,
//         testUser._id
//       );
//
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       const updatedUser = await q.user.update.addBlocked(
//         followingUsers[0]._id,
//         newUser._id
//       );
//
//       const foundFollowing = await q.user.read.following(
//         newUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { followingUsers });
//       th.logger.log(lG, lS, null, { newUser });
//       th.logger.log(lG, lS, null, { updatedUser });
//       th.logger.log(lG, lS, null, { foundFollowing });
//
//       assert(foundFollowing.length === followingToCreate - 1);
//     });
//   });
//
//   describe("Read many following users with skip and limit", async function() {
//     this.timeout(0);
//
//     let followingToCreate = 50;
//
//     beforeEach(async () => {
//       testUser = await q.user.create.new(th.fakeFields.user());
//
//       th.logger.log(lG, lS, null, { testUser });
//
//       for (let i = 0; i < followingToCreate; i++) {
//         const newUser = await q.user.create.new(th.fakeFields.user());
//
//         const updatedUser = await q.user.update.addFollowing(
//           testUser._id,
//           newUser._id
//         );
//
//         th.logger.log(lG, lS, null, { newUser });
//         th.logger.log(lG, lS, null, { updatedUser });
//       }
//     });
//
//     // it('testUser is following 50 users, read with skip and limit and desc order', async () => {
//     //
//     // });
//   });
// });
//
// const createFollowing = async followingToCreate => {
//   for (let i = 0; i < followingToCreate; i++) {
//     const newUser = await q.user.create.new(th.fakeFields.user());
//
//     const updatedUser = await q.user.update.addFollowing(
//       testUser._id,
//       newUser._id
//     );
//
//     th.logger.log(lG, lS, null, { newUser });
//     th.logger.log(lG, lS, null, { updatedUser });
//   }
// };
