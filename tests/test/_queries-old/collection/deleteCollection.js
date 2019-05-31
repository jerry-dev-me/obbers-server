// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "D-COLLECTION"; // logSubgroup
//
// describe("Collection Model - Delete Query Tests", () => {
//   let testUser;
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUserId: testUser._id });
//   });
//
//   it("Create a new empty collection and then delete it", async () => {
//     let collectionName = "Funny Memes";
//     const newCollection = await q.collection.create.new(
//       testUser._id,
//       th.fakeFields.collection({
//         userId: testUser._id,
//         name: collectionName
//       })
//     );
//
//     th.logger.log(lG, lS, null, { newCollection });
//
//     const deletedCollection = await q.collection.delete.byId(
//       testUser._id,
//       newCollection._id
//     );
//
//     th.logger.log(lG, lS, null, { deletedCollection });
//
//     assert(deletedCollection === null);
//   });
// });
