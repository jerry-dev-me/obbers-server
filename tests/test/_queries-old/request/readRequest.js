// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "R-REQUEST"; // logSubgroup
//
// describe("Request Model Read Tests", async () => {
//   let testUser1;
//   let testUser2;
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser1 });
//     th.logger.log(lG, lS, null, { testUser2 });
//   });
//
//   it("Read request by id", async () => {
//     const testRequest = await q.request.create.new(testUser1._id, testUser2._id);
//
//     th.logger.log(lG, lS, null, { testRequest });
//
//     const foundRequest = await q.request.read.byId(
//       testUser2._id,
//       testRequest._id
//     );
//
//     th.logger.log(lG, lS, null, { foundRequest });
//
//     assert(typeof foundRequest === "object");
//     assert(foundRequest._id.toString() === testRequest._id.toString());
//   });
// });
