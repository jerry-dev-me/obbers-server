const assert = require("assert");
const q = require("../../../../app/queries");
const th = require("../../../testHelpers");
const testData = th.testDataCreators;
const logger = require("../../../../lib/logger");

const lG = "TESTS-QUERIES"; // logGroup
const lS = "VERIFY-USER"; // logSubgroup

// _q: query functions used in this file
const _q = {
  createTestUser: async () => await q.crud.create.user.new(th.fakeFields.user()),
  addFollowing: async (userId, followingId) => {
    const fields = { following: followingId };
    return await q.crud.update.user.findByIdAndAddToSet(userId, fields);
  },
  addFollower: async (userId, followerId) => {
    const fields = { followers: followerId };
    return await q.crud.update.user.findByIdAndAddToSet(userId, fields);
  },
  isUserFollowing: async (user1Id, user2Id) => {
    return await q.verifyUser.isUserFollowing.checkId(user1Id, user2Id);
  }
}


describe("\nqueries verify user: isUserFollowing()", async function() {
  this.timeout(0);

  let testUser1;
  let testUser1Id;
  let testUser2;
  let testUser2Id;

  before(async () => {
    testUser1 = await _q.createTestUser();
    testUser1Id = testUser1._id;
    testUser2 = await _q.createTestUser();
    testUser2Id = testUser2._id;
  });

  describe("\ncheckId()", async function() {
    it("isUserFollowing === false", async () => {
      const isUserFollowing = await _q.isUserFollowing(testUser1Id, testUser2Id);
      console.log("isUserFollowing: " + isUserFollowing);
      assert(isUserFollowing === false);
    });
    it("isUserFollowing === true", async () => {
      await _q.addFollowing(testUser1Id, testUser2Id);
      await _q.addFollower(testUser2Id, testUser1Id);
      const isUserFollowing = await _q.isUserFollowing(testUser1Id, testUser2Id);
      console.log("isUserFollowing: " + isUserFollowing);
      assert(isUserFollowing === true);
    });
  });
  describe("\ncheckDocument()", async function() {
    it("isUserFollowing === true", async () => {});
    it("isUserFollowing === false", async () => {});
  });

});
