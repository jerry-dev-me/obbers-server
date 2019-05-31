// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// describe("User Model Update Password Tests", async () => {
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   it("testUser updates his password successfully", async () => {
//     let oldPass = testUser.local.password;
//     let newPass = "newPassword";
//
//     const updatedPassword = await q.user.update.password(
//       testUser._id,
//       oldPass,
//       newPass
//     );
//
//     th.logger.log(lG, lS, null, { updatedPassword });
//
//     assert(updatedPassword !== false);
//
//     // unhash updatedPassword and make sure it is === newPass
//   });
//
//   it("testUser updates his password unsuccessfully with false old pass", async () => {
//     let oldPass = "some false old password";
//     let newPass = "newPassword";
//
//     const updatedPassword = await q.user.update.password(
//       testUser._id,
//       oldPass,
//       newPass
//     );
//
//     th.logger.log(lG, lS, null, { updatedPassword });
//
//     assert(updatedPassword === null);
//   });
// });
