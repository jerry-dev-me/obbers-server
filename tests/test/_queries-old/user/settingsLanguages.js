// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "R-USER"; // logSubgroup
//
// describe("User Model Update Settings Languages Tests", async () => {
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser });
//   });
//
//   it("testUser updates his settings languages to a new language", async () => {
//     const updatedUser = await q.user.update.settingsLanguage(
//       testUser._id,
//       "spanish"
//     );
//
//     th.logger.log(lG, lS,
//     `updatedUser.settings`, { settings: updatedUser.settings });
//
//     assert(updatedUser.settings.language === "spanish");
//   });
// });
