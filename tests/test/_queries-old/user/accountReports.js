// const assert = require("assert");
// const q = require("../../../app/queries");
// const h = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// describe("User Model account.reports Tests", async () => {
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(fakeFields.user());
//     console.log("\n User reports are: \n" + testUser.account.reports);
//   });
//
//   it("Update user reports", async () => {
//     // Create testReport
//
//     const foundUser = await q.user.read.profileById(testUser._id, testUser._id);
//     console.log("\n Found user reports are: \n" + foundUser.account.reports);
//   });
// });
