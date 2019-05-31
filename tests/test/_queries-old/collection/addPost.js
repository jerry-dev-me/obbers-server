// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "U-COLLECTION"; // logSubgroup
//
// describe("Collection Model - Update Query Tests", async function() {
//   this.timeout(0);
//
//   let testUser1;
//   let newCollection;
//   let collectionName = "My New Collection";
//
//   beforeEach(async function() {
//     this.timeout(0);
//
//     testUser1 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS,
//     null, { testUser1Id: testUser1._id });
//
//     newCollection = await q.collection.create.new(
//       testUser1._id,
//       th.fakeFields.collection({ userId: testUser1._id })
//     );
//
//     th.logger.log(lG, lS,
//     null, { newCollection });
//   });
//
//   it("Add a post to this collection", async function() {
//     const testUser2 = await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS,
//     null, { testUser2Id: testUser2._id });
//
//     const testPost = await q.post.create.new(
//       testUser2._id,
//       th.fakeFields.post({ userId: testUser2._id })
//     );
//
//     th.logger.log(lG, lS,
//     null, { testPost });
//
//     const updatedCollection = await q.collection.update.addPost(
//       testUser1._id,
//       newCollection._id,
//       testPost._id
//     );
//
//     th.logger.log(lG, lS,
//     null, { updatedCollection });
//
//     assert(updatedCollection.posts[0].toString() === testPost._id.toString());
//   });
// });
