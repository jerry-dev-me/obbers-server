// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "R-USER"; // logSubgroup
//
// describe("User Model Read Profile Tests", () => {
//   let testUser1;
//   let testUser2;
//
//   let foundProfile;
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//   });
//
//   afterEach(async () => {
//     th.logger.log(lG, lS, null, { foundProfile });
//   });
//
//   describe("NULL is expected to be returned", () => {
//     afterEach(async () => {
//       foundProfile = await q.user.read.profileById(testUser1._id, testUser2._id);
//       assert(foundProfile === null);
//     });
//
//     it("testUser1 reads testUser2 public user profile but testUser2 account status is SUSPENDED", async () => {
//       const updatedUser = await q.user.update.accountStatus(
//         testUser2._id,
//         "SUSPENDED"
//       );
//       th.logger.log(lG, lS, null, { updatedUser });
//       assert(updatedUser.account.status === "SUSPENDED");
//     });
//
//     it("testUser1 reads testUser2 public user profile but testUser2 account status is BANNED", async () => {
//       const updatedUser = await q.user.update.accountStatus(
//         testUser2._id,
//         "BANNED"
//       );
//       th.logger.log(lG, lS, null, { updatedUser });
//       assert(updatedUser.account.status === "BANNED");
//     });
//
//     it("testUser1 reads testUser2 public user profile but testUser2 account status is DELETED", async () => {
//       const updatedUser = await q.user.update.accountStatus(
//         testUser2._id,
//         "DELETED"
//       );
//       th.logger.log(lG, lS, null, { updatedUser });
//       assert(updatedUser.account.status === "DELETED");
//     });
//
//     it("testUser1 reads testUser2 public user profile but testUser2 account status is INACTIVE", async () => {
//       const updatedUser = await q.user.update.accountStatus(
//         testUser2._id,
//         "INACTIVE"
//       );
//       th.logger.log(lG, lS, null, { updatedUser });
//       assert(updatedUser.account.status === "INACTIVE");
//     });
//
//     it("testUser1 is a blocked follower of testUser2 and reads testUser2 public user profile", async () => {
//       const updatedUserFollowers = await q.user.update.addFollower(
//         testUser2._id,
//         testUser1._id
//       );
//
//       const updatedUserBlocked = await q.user.update.addBlocked(
//         testUser2._id,
//         testUser1._id
//       );
//
//       th.logger.log(lG, lS, null, { updatedUserFollowers });
//       th.logger.log(lG, lS, null, { updatedUserBlocked });
//     });
//
//     it("testUser1 is a blocked non-follower of testUser2 and reads testUser2 public user profile", async () => {
//       const updatedUser = await q.user.update.addBlocked(
//         testUser2._id,
//         testUser1._id
//       );
//       th.logger.log(lG, lS, null, { updatedUser });
//     });
//
//     it("testUser1 is a blocked follower of testUser2 and reads testUser2 private user profile", async () => {
//       const updatedUserSettings = await q.user.update.settingsPrivate(
//         testUser2._id,
//         true
//       );
//
//       const updatedUserFollowers = await q.user.update.addFollower(
//         testUser2._id,
//         testUser1._id
//       );
//
//       const updatedUserBlocked = await q.user.update.addBlocked(
//         testUser2._id,
//         testUser1._id
//       );
//
//       th.logger.log(lG, lS, null, { updatedUserSettings });
//       th.logger.log(lG, lS, null, { updatedUserFollowers });
//       th.logger.log(lG, lS, null, { updatedUserBlocked });
//     });
//
//     it("testUser1 is a blocked non-follower of testUser2 and reads testUser2 private user profile", async () => {
//       const updatedUserSettings = await q.user.update.settingsPrivate(
//         testUser2._id,
//         true
//       );
//
//       const updatedUserBlocked = await q.user.update.addBlocked(
//         testUser2._id,
//         testUser1._id
//       );
//
//       th.logger.log(lG, lS, null, { updatedUserSettings });
//       th.logger.log(lG, lS, null, { updatedUserBlocked });
//     });
//   });
//
//   describe("User fullProfile object is expected to be returned", () => {
//     afterEach(async () => {
//       foundProfile = await q.user.read.profileById(testUser1._id, testUser2._id);
//
//       th.logger.log(lG, lS, null, { foundProfile });
//
//       assert(foundProfile !== null);
//       assert(typeof foundProfile === "object");
//       assert(foundProfile._id.toString() === testUser2._id.toString());
//     });
//
//     it("testUser1 reads testUser2 public user profile but testUser2 account status is ACTIVE", async () => {
//       const updatedUser = await q.user.update.accountStatus(
//         testUser2._id,
//         "ACTIVE"
//       );
//
//       th.logger.log(lG, lS, null, { updatedUser });
//
//       assert(updatedUser.account.status === "ACTIVE");
//     });
//
//     it("testUser1 is a non-blocked follower of testUser2 and reads testUser2 public user profile", async () => {
//       const updatedUser = await q.user.update.addFollower(
//         testUser2._id,
//         testUser1._id
//       );
//
//       th.logger.log(lG, lS, null, { updatedUser });
//     });
//
//     // it("testUser1 is a non-blocked non-follower of testUser2 and reads testUser2 public user profile", async () => {});
//
//     it("testUser1 is a non-blocked follower of testUser2 and reads testUser2 private user profile", async () => {
//       const updatedUserSettings = await q.user.update.settingsPrivate(
//         testUser2._id,
//         true
//       );
//
//       const updatedUserFollowing = await q.user.update.addFollowing(
//         testUser1._id,
//         testUser2._id
//       );
//
//       const updatedUserFollowers = await q.user.update.addFollower(
//         testUser2._id,
//         testUser1._id
//       );
//
//       th.logger.log(lG, lS, null, { updatedUserSettings });
//       th.logger.log(lG, lS, null, { updatedUserFollowing });
//       th.logger.log(lG, lS, null, { updatedUserFollowers });
//     });
//   });
//
//   describe("User basicProfile object is expected to be returned", () => {
//     afterEach(async () => {
//       foundProfile = await q.user.read.profileById(testUser1._id, testUser2._id);
//
//       th.logger.log(lG, lS, null, { foundProfile });
//
//       assert(foundProfile !== null);
//       assert(typeof foundProfile === "object");
//       assert(foundProfile._id.toString() === testUser2._id.toString());
//     });
//
//     it("testUser1 is a non-blocked non-follower of testUser2 and reads testUser2 private user profile", async () => {
//       const updatedUser = await q.user.update.settingsPrivate(
//         testUser2._id,
//         true
//       );
//       th.logger.log(lG, lS, null, { updatedUser });
//     });
//   });
//
//   describe("User personalProfile object is expected to be returned", () => {
//     afterEach(async () => {
//       foundProfile = await q.user.read.profileById(testUser1._id, testUser1._id);
//
//       th.logger.log(lG, lS, null, { foundProfile });
//
//       assert(foundProfile !== null);
//       assert(typeof foundProfile === "object");
//       assert(foundProfile._id.toString() === testUser1._id.toString());
//     });
//
//     it("testUser1 reads own personal user profile", async () => {});
//   });
// });
