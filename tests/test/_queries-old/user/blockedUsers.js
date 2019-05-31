// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-USER"; // logSubgroup
//
// describe("Model Tests", async () => {
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   it("testUser blocks 3 newUsers", async () => {
//     let usersToCreate = 3;
//
//     for (let i = 0; i < usersToCreate; i++) {
//       const newUser = await q.user.create.new(th.fakeFields.user());
//
//       const updatedUser = await q.user.update.addBlocked(
//         testUser._id,
//         newUser._id
//       );
//
//       th.logger.log(lG, lS, null, { newUserId: newUser._id });
//       th.logger.log(lG, lS, null, { updatedUser });
//     };
//
//     const blockedUsers = await q.user.read.blockedUsers(
//       testUser._id,
//       testUser._id
//     );
//
//     th.logger.log(lG, lS, null, { blockedUsers });
//
//     await Promise.all(
//       blockedUsers.map(async blockedUser => {
//         th.logger.log(lG, lS, null, { blockedUsers });
//
//         const blockedUserReadsProfile = await q.user.read.profileById(
//           blockedUser._id,
//           testUser._id
//         );
//
//         th.logger.log(lG, lS,
//           `A blocked userId ${blockedUser._id} reads testUser profile`,
//           { blockedUserReadsProfile }
//         );
//
//         assert(blockedUserReadsProfile === null);
//       })
//     );
//   });
// });
