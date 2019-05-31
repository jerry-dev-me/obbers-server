// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// describe("User Model account.status Tests", async () => {
//   let testUser1;
//   let testUser2;
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//   });
//
//   it("testUser1 reads testUser2 profile, testUser2 account status is INACTIVE", async () => {
//     const updatedUser = await q.user.update.accountStatus(
//       testUser2._id,
//       "INACTIVE"
//     );
//
//     const foundUser = await q.user.read.profileById(
//       testUser1._id,
//       testUser2._id
//     );
//
//     th.logger.log(lG, lS, null, { updatedUser });
//     th.logger.log(lG, lS, null, { foundUser });
//
//     assert(foundUser === null);
//   });
//
//   it("testUser1 reads testUser2 profile, testUser2 account status is SUSPENDED", async () => {
//     const updatedUser = await q.user.update.accountStatus(
//       testUser2._id,
//       "SUSPENDED"
//     );
//
//     const foundUser = await q.user.read.profileById(
//       testUser1._id,
//       testUser2._id
//     );
//
//     th.logger.log(lG, lS, null, { updatedUser });
//     th.logger.log(lG, lS, null, { foundUser });
//
//     assert(foundUser === null);
//   });
//
//   it("testUser1 reads testUser2 profile, testUser2 account status is BANNED", async () => {
//     const updatedUser = await q.user.update.accountStatus(
//       testUser2._id,
//       "BANNED"
//     );
//
//     const foundUser = await q.user.read.profileById(
//       testUser1._id,
//       testUser2._id
//     );
//
//     th.logger.log(lG, lS, null, { updatedUser });
//     th.logger.log(lG, lS, null, { foundUser });
//
//     assert(foundUser === null);
//   });
//
//   it("testUser1 reads testUser2 profile, testUser2 account status is DELETED", async () => {
//     const updatedUser = await q.user.update.accountStatus(
//       testUser2._id,
//       "DELETED"
//     );
//
//     const foundUser = await q.user.read.profileById(
//       testUser1._id,
//       testUser2._id
//     );
//
//     th.logger.log(lG, lS, null, { updatedUser });
//     th.logger.log(lG, lS, null, { foundUser });
//
//     assert(foundUser === null);
//   });
//
//   // for every user account status, attempt to create a post, comment,
//   // response, like post, like comment, like response
// });
