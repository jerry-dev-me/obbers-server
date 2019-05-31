// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-COLLECTION"; // logSubgroup
//
// describe("Collection Model - Update Query Tests", () => {
//   let testUser;
//   let newCollection;
//   let collectionName = "My New Collection";
//   let updatedName = "An Updated Name";
//
//   beforeEach(async () => {
//     testUser = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS,
//     null, { testUserId: testUser._id });
//
//     newCollection = await q.collection.create.new(
//       testUser._id,
//       th.fakeFields.collection({ userId: testUser._id })
//     );
//
//     th.logger.log(lG, lS, null, { newCollection });
//   });
//
//   it("Update the collection name", async () => {
//     const updatedCollection = await q.collection.update.name(
//       testUser._id,
//       newCollection._id,
//       updatedName
//     );
//
//     th.logger.log(lG, lS, null, { updatedCollection });
//
//     assert(updatedCollection.name !== collectionName);
//     assert(updatedCollection.name === updatedName);
//   });
// });
