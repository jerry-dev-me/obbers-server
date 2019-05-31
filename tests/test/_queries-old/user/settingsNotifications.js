// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// describe("User Model Update Settings Notifications Tests", async () => {
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser });
//   });
//
//   it("testUser updates his settings notifications to false", async () => {
//     const updatedUser = await q.user.update.settingsNotifications(
//       testUser._id,
//       false
//     );
//
//     th.logger.log(lG, lS,
//     `updatedUser.settings`, { settings: updatedUser.settings });
//
//     assert(updatedUser.settings.notifications === false);
//   });
// });
