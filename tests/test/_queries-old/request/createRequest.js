// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-REQUEST"; // logSubgroup
//
// const mongoose = require("mongoose");
// const User = mongoose.model('user');
//
// describe("Request Model Create Tests", async () => {
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
//   it("testUser1 sends a follow request to testUser2", async () => {
//     const testRequest = await q.request.create.new(testUser1._id, testUser2._id);
//
//     th.logger.log(lG, lS, null, { testRequest });
//
//     const foundRequests = await q.user.read.requests(
//       testUser2._id,
//       testUser2._id
//     );
//
//     th.logger.log(lG, lS,
//     `foundRequests.length`, { foundRequestsLength: foundRequests.length });
//
//     th.logger.log(lG, lS, null, { foundRequests });
//
//     assert(foundRequests.length === 1);
//     assert(foundRequests[0]._id.toString() === testRequest._id.toString());
//   });
//
//   // afterEach(async () => {
//   //
//   //     let totalRequests;
//   //     const foundUser = await User.findOne({ _id: testUser1._id });
//   //     if(foundUser && foundUser.totalRequests) {
//   //         totalRequests = foundUser.totalRequests;
//   //         console.log('\n user.totalRequests are: ' + totalRequests);
//   //     } else {
//   //         totalRequests = 0;
//   //         console.log('\n user.totalRequests are: ' + totalRequests);
//   //     };
//   //
//   // });
// });
