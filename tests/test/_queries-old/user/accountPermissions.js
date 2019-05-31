// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// describe("User Model account.permissions Tests", async () => {
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS,
//     `testUser.account.permissions`,
//     { permissions: testUser.account.permissions });
//   });
//
//   it("Update user permissions", async () => {
//     const updatedUser = await q.user.update.accountPermissions(
//       testUser._id,
//       "READ_ONLY"
//     );
//
//     th.logger.log(lG, lS,
//     `updatedUser.account.permissions`,
//     { permissions: updatedUser.account.permissions });
//
//     const foundUser = await q.user.read.byId(testUser._id, testUser._id);
//
//     th.logger.log(lG, lS,
//     `foundUser.account.permissions`,
//     { permissions: foundUser.account.permissions });
//
//     assert(updatedUser.account.permissions === "READ_ONLY");
//     assert(foundUser.account.permissions === "READ_ONLY");
//   });
// });
