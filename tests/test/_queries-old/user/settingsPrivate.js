// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// describe("User Model Update Settings Private Tests", async () => {
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   it("testUser updates his settings private to true", async () => {
//     const updatedUser = await q.user.update.settingsPrivate(testUser._id, true);
//
//     th.logger.log(lG, lS,
//     `updatedUser.settings`, { settings: updatedUser.settings });
//
//     assert(updatedUser.settings.private === true);
//   });
// });
