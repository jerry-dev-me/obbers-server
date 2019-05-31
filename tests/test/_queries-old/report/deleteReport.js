// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "D-REPORT"; // logSubgroup
//
// let testUser1;
// let testUser2;
// let testUser3;
// let testUser4;
// let testReport;
//
// const reportCategory = "OTHER";
// const reportDescription = "User is ugly";
// const reportStatus = "UNREAD";
//
// describe("Report Model Read Tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//     testUser2 = await q.user.create.new(th.fakeFields.user());
//
//     testUser3 = await q.user.create.new(th.fakeFields.user());
//     testUser4 = await q.user.create.new(
//       th.fakeFields.user({ account: { permissions: "ADMIN" } })
//     );
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
//     th.logger.log(lG, lS, null, { testUser1Id: testUser1._id });
//     th.logger.log(lG, lS, null, { testUser2Id: testUser2._id });
//     th.logger.log(lG, lS, null, { testUser3Id: testUser3._id });
//     th.logger.log(lG, lS, null, { testUser4Id: testUser4._id });
//     th.logger.log(lG, lS, null, { testReport });
//   });
//
//   it(`only testUser4 can delete testReport beacuse is ADMIN`, async () => {
//     const testUser3DeletesReport = await q.report.delete.byId(
//       testUser3._id,
//       testReport._id
//     );
//
//     const testUser4DeletesReport = await q.report.delete.byId(
//       testUser4._id,
//       testReport._id
//     );
//
//     th.logger.log(lG, lS, null, { testUser3DeletesReport });
//     th.logger.log(lG, lS, null, { testUser4DeletesReport });
//
//     assert(testUser3DeletesReport === false);
//     assert(testUser4DeletesReport === null);
//   });
// });
