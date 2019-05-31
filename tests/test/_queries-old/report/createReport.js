// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-REPORT"; // logSubgroup
//
// let testUser1;
// let testUser2;
// let testReport;
//
// const reportCategory = "OTHER";
// const reportDescription = "User is ugly";
// const reportStatus = "UNREAD";
//
// describe("Report Model Create Tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//   });
//
//   it(`testUser1 reports testUser2`, async () => {
//     testReport = await q.report.create.new(
//       testUser1._id,
//       {
//         fromUserId: testUser1._id,
//         toUserId: testUser2._id,
//         category: reportCategory,
//         createdAt: new Date(),
//         description: reportDescription,
//         status: reportStatus
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testReport });
//
//     assert(testReport.fromUserId.toString() === testUser1._id.toString());
//     assert(testReport.toUserId.toString() === testUser2._id.toString());
//     assert(testReport.category === reportCategory);
//     assert(testReport.description === reportDescription);
//     assert(testReport.status === reportStatus);
//   });
//
//   it(`testUser1 is INACTIVE cannot report testUser2`, async () => {
//     await q.user.update.accountStatus(testUser1._id, "INACTIVE");
//
//     testReport = await q.report.create.new(
//       testUser1._id,
//       {
//         fromUserId: testUser1._id,
//         toUserId: testUser2._id,
//         category: reportCategory,
//         createdAt: new Date(),
//         description: reportDescription,
//         status: reportStatus
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testReport });
//
//     assert(testReport === false);
//   });
//
//   it(`testUser1 is SUSPENDED cannot report testUser2`, async () => {
//     await q.user.update.accountStatus(testUser1._id, "SUSPENDED");
//
//     testReport = await q.report.create.new(
//       testUser1._id,
//       {
//         fromUserId: testUser1._id,
//         toUserId: testUser2._id,
//         category: reportCategory,
//         createdAt: new Date(),
//         description: reportDescription,
//         status: reportStatus
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testReport });
//
//     assert(testReport === false);
//   });
//
//   it(`testUser1 is BANNED cannot report testUser2`, async () => {
//     await q.user.update.accountStatus(testUser1._id, "BANNED");
//
//     testReport = await q.report.create.new(
//       testUser1._id,
//       {
//         fromUserId: testUser1._id,
//         toUserId: testUser2._id,
//         category: reportCategory,
//         createdAt: new Date(),
//         description: reportDescription,
//         status: reportStatus
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testReport });
//
//     assert(testReport === false);
//   });
//
//   it(`testUser1 is DELETED cannot report testUser2`, async () => {
//     await q.user.update.accountStatus(testUser1._id, "DELETED");
//
//     testReport = await q.report.create.new(
//       testUser1._id,
//       {
//         fromUserId: testUser1._id,
//         toUserId: testUser2._id,
//         category: reportCategory,
//         createdAt: new Date(),
//         description: reportDescription,
//         status: reportStatus
//       }
//     );
//
//     th.logger.log(lG, lS, null, { testReport });
//
//     assert(testReport === false);
//   });
//
//   // it(`testUser1 reports testUser2, invalid fields`, async () => {
//   // });
//
//   // it(`testUser1 reports testUser2, EXPLICIT_CONTENT`, async () => {
//   // });
//
//   // it(`testUser1 reports testUser2, AGGRESSIVE_BEHAVIOUR`, async () => {
//   // });
//
//   // it(`testUser1 reports testUser2, SPAM_BEHAVIOUR`, async () => {
//   // });
// });
