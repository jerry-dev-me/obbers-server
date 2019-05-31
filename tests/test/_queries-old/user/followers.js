// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// let testUser;
//
// describe("User Model followers Tests", async () => {
//   describe("Read followers", () => {
//     let numOfFollowersToCreate = 3;
//
//     beforeEach(async () => {
//       testUser = await q.user.create.new(th.fakeFields.user());
//
//       th.logger.log(lG, lS, null, { testUserId: testUser._id });
//
//       await createFollowers(numOfFollowersToCreate);
//     });
//
//     it("testUser has 3 followers, testUser reads his followers", async () => {
//       const foundFollowers = await q.user.read.followers(
//         testUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { foundFollowers });
//
//       assert(foundFollowers.length === numOfFollowersToCreate);
//     });
//
//     it("newUser reads testUser followers, but one user has blocked newUser", async () => {
//       const followers = await q.user.read.followers(testUser._id, testUser._id);
//
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       const updatedUser = await q.user.update.addBlocked(
//         followers[0]._id,
//         newUser._id
//       );
//
//       const foundFollowers = await q.user.read.followers(
//         newUser._id,
//         testUser._id
//       );
//
//       th.logger.log(lG, lS, null, { followers });
//       th.logger.log(lG, lS, null, { newUser });
//       th.logger.log(lG, lS, null, { updatedUser });
//       th.logger.log(lG, lS, null, { foundFollowers });
//
//       assert(foundFollowers.length === numOfFollowersToCreate - 1);
//     });
//   });
//
//   describe("Read many followers with skip and limit", async function() {
//     this.timeout(0);
//
//     let numOfFollowersToCreate = 50;
//
//     beforeEach(async () => {
//       testUser = await q.user.create.new(th.fakeFields.user());
//
//       th.logger.log(lG, lS, null, { testUserId: testUser._id });
//
//       await createFollowers(numOfFollowersToCreate);
//     });
//
//     // it('testUser has 50 followers, read with skip and limit and desc order', async () => {
//     //
//     // });
//   });
// });
//
// const createFollowers = async numOfFollowersToCreate => {
//   for (let i = 0; i < numOfFollowersToCreate; i++) {
//     const follower = await q.user.create.new(th.fakeFields.user());
//
//     const updatedUser = await q.user.update.addFollower(
//       testUser._id,
//       follower._id
//     );
//
//     th.logger.log(lG, lS, null, { follower });
//     th.logger.log(lG, lS, null, { updatedUser });
//   };
// };
