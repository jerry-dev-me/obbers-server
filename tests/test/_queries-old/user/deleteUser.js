// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "D-USER"; // logSubgroup
//
// describe("Model Tests", () => {
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   it("testUser deletes himself", async () => {
//     const deletedUser = await q.user.delete.byId(testUser._id, testUser._id);
//
//     th.logger.log(lG, lS, null, { deletedUser });
//
//     assert(deletedUser === null);
//   });
//
//   it("A newUser tries to delete testUser", async () => {
//     const newUser = await q.user.create.new(th.fakeFields.user());
//
//     const deletedUser = await q.user.delete.byId(newUser._id, testUser._id);
//
//     th.logger.log(lG, lS, null, { newUserId: newUser._id });
//     th.logger.log(lG, lS, null, { deletedUser });
//
//     assert(deletedUser === false);
//   });
// });
