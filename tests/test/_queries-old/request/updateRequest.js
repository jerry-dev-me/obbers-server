// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-REQUEST"; // logSubgroup
//
// describe("Request Model Update Tests", async function() {
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
//   it("Accept a request", async () => {
//     const newRequest = await q.request.create.new(
//       testUser1._id,
//       testUser2._id
//     );
//
//     const foundRequest = await q.request.read.byId(
//       testUser2._id,
//       newRequest._id
//     );
//
//     const acceptedRequest = await q.request.update.statusAccepted(
//       testUser2._id,
//       newRequest._id
//     );
//
//     const foundAcceptedRequest = await q.request.read.byId(
//       testUser2._id,
//       newRequest._id
//     );
//
//     th.logger.log(lG, lS, null, { newRequest });
//     th.logger.log(lG, lS, null, { foundRequest });
//     th.logger.log(lG, lS, null, { acceptedRequest });
//     th.logger.log(lG, lS, null, { foundAcceptedRequest });
//
//     assert(acceptedRequest === null);
//     assert(foundAcceptedRequest === null);
//   });
//
//   it("Decline a request", async () => {
//     const newRequest = await q.request.create.new(
//       testUser1._id,
//       testUser2._id
//     );
//
//     const foundRequest = await q.request.read.byId(
//       testUser2._id,
//       newRequest._id
//     );
//
//     const declinedRequest = await q.request.update.statusDeclined(
//       testUser2._id,
//       newRequest._id
//     );
//
//     const foundDeclinedRequest = await q.request.read.byId(
//       testUser2._id,
//       newRequest._id
//     );
//
//     th.logger.log(lG, lS, null, { newRequest });
//     th.logger.log(lG, lS, null, { foundRequest });
//     th.logger.log(lG, lS, null, { declinedRequest });
//     th.logger.log(lG, lS, null, { foundDeclinedRequest });
//
//     assert(declinedRequest === null);
//     assert(foundDeclinedRequest === null);
//   });
// });
