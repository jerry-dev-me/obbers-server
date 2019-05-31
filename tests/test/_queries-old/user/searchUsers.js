// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "R-USER"; // logSubgroup
//
// describe("User Model search and find Tests", () => {
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
//   // Find by username
//
//   it("testUser1 finds himself by username", async () => {
//     th.logger.log(lG, lS,
//     `Username to find is: ${testUser1.info.username}`,
//     { testUser1InfoUsername: testUser1.info.username });
//
//     const foundUser = await q.user.read.findByUsername(
//       testUser1._id,
//       testUser1.info.username
//     );
//
//     th.logger.log(lG, lS, null, { foundUser });
//
//     assert(foundUser._id);
//     assert(foundUser.avatar === testUser1.info.avatar);
//     assert(foundUser.username === testUser1.info.username);
//     assert(foundUser.name === testUser1.info.name);
//     assert(foundUser.following === undefined);
//   });
//
//   it("testUser1 finds testUser2 by username", async () => {
//     th.logger.log(lG, lS,
//     `Username to find is: ${testUser2.info.username}`,
//     { testUser2InfoUsername: testUser2.info.username });
//
//     const foundUser = await q.user.read.findByUsername(
//       testUser1._id,
//       testUser2.info.username
//     );
//
//     th.logger.log(lG, lS, null, { foundUser });
//
//     assert(foundUser._id);
//     assert(foundUser.avatar === testUser2.info.avatar);
//     assert(foundUser.username === testUser2.info.username);
//     assert(foundUser.name === testUser2.info.name);
//     assert(foundUser.following !== undefined);
//     assert(foundUser.following === true || foundUser.following === false);
//   });
//
//   it("testUser1 searches testUser2 by username, but testUser2 has blocked testUser1", async () => {
//     th.logger.log(lG, lS,
//     `Username to find is: ${testUser2.info.username}`,
//     { testUser2InfoUsername: testUser2.info.username });
//
//     const updatedUser = await q.user.update.addBlocked(
//       testUser2._id,
//       testUser1._id
//     );
//
//     const foundUser = await q.user.read.findByUsername(
//       testUser1._id,
//       testUser2.info.username
//     );
//
//     th.logger.log(lG, lS, null, { updatedUser });
//     th.logger.log(lG, lS, null, { foundUser });
//
//     assert(foundUser === false);
//     // foundUser should be 'null'... meanwhile leave 'false'
//   });
//
//   // Find by name
//
//   it("testUser1 finds himself by name", async () => {
//     th.logger.log(lG, lS,
//     `Name to find is: ${testUser1.info.name}`,
//     { testUser1InfoName: testUser1.info.name });
//
//     const foundUsers = await q.user.read.findByName(
//       testUser1._id,
//       testUser1.info.name
//     );
//
//     th.logger.log(lG, lS, null, { foundUsers });
//
//     assert(Array.isArray(foundUsers) === true);
//
//     await Promise.all(
//       foundUsers.map(foundUser => {
//         if (foundUser._id.toString() === testUser1._id.toString()) {
//           assert(foundUser.avatar === testUser1.info.avatar);
//           assert(foundUser.username === testUser1.info.username);
//           assert(foundUser.name === testUser1.info.name);
//           assert(foundUser.following === undefined);
//         }
//       })
//     );
//   });
//
//   it("testUser1 finds testUser2 by name", async () => {
//     th.logger.log(lG, lS,
//     `Name to find is: ${testUser2.info.name}`,
//     { testUser2InfoName: testUser2.info.name });
//
//     const foundUsers = await q.user.read.findByName(
//       testUser1._id,
//       testUser2.info.name
//     );
//
//     th.logger.log(lG, lS, null, { foundUsers });
//
//     assert(Array.isArray(foundUsers) === true);
//
//     await Promise.all(
//       foundUsers.map(foundUser => {
//         assert(foundUser._id);
//         assert(foundUser.avatar === testUser2.info.avatar);
//         assert(foundUser.username === testUser2.info.username);
//         assert(foundUser.name === testUser2.info.name);
//         assert(foundUser.following !== undefined);
//         assert(foundUser.following === true || foundUser.following === false);
//       })
//     );
//   });
//
//   it("testUser1 finds testUser2 by name, but testUser2 has blocked testUser1", async () => {
//     th.logger.log(lG, lS,
//     `Name to find is: ${testUser2.info.name}`,
//     { testUser2InfoName: testUser2.info.name });
//
//     const updatedUser = await q.user.update.addBlocked(
//       testUser2._id,
//       testUser1._id
//     );
//
//     const foundUsers = await q.user.read.findByName(
//       testUser1._id,
//       testUser2.info.name
//     );
//
//     th.logger.log(lG, lS, null, { updatedUser });
//     th.logger.log(lG, lS, null, { foundUsers });
//
//     assert(foundUsers !== null);
//     assert(Array.isArray(foundUsers) === true);
//     assert(foundUsers.length == 0);
//   });
//
//   // Find all users matching the same name
//
//   it("Find all users matching the same name", async () => {
//     let usersWithTheSameName = 3;
//
//     let newUser;
//
//     for (let i = 0; i < usersWithTheSameName; i++) {
//       newUser = await q.user.create.new(
//         th.fakeFields.user({ info: { name: "Dave" } })
//       );
//
//       th.logger.log(lG, lS,
//       `newUser id ${newUser._id} info.name is: ${newUser.info.name}`);
//     }
//
//     let matchingName = newUser.info.name;
//
//     const foundUsers = await q.user.read.findByName(testUser1._id, matchingName);
//
//     th.logger.log(lG, lS, null, { foundUsers });
//
//     assert(foundUsers.length === 3);
//
//     await Promise.all(
//       foundUsers.map(foundUser => {
//         assert(foundUser.name === matchingName);
//       })
//     );
//   });
//
//   it("Find all users matching the same name, 1 user has blocked testUser1", async () => {
//     let usersWithTheSameName = 3;
//
//     let newUser;
//
//     for (let i = 0; i < usersWithTheSameName; i++) {
//       newUser = await q.user.create.new(
//         th.fakeFields.user({ info: { name: "Dave" } })
//       );
//
//       th.logger.log(lG, lS,
//       `newUser id ${newUser._id} info.name is: ${newUser.info.name}`);
//
//       if (i === 0) await q.user.update.addBlocked(newUser._id, testUser1._id);
//     }
//
//     let matchingName = newUser.info.name;
//
//     const foundUsers = await q.user.read.findByName(testUser1._id, matchingName);
//
//     th.logger.log(lG, lS, null, { foundUsers });
//
//     assert(foundUsers.length === 2);
//   });
// });
