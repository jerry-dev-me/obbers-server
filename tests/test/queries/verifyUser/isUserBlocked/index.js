const assert = require("assert");
const q = require("../../../../app/queries");
const th = require("../../../testHelpers");
const testData = th.testDataCreators;
const logger = require("../../../../lib/logger");

const lG = "TESTS-QUERIES"; // logGroup
const lS = "VERIFY-USER"; // logSubgroup

describe("\nqueries verify user: isUserBlocked()", async function() {
  this.timeout(0);

  let testUser;
  let testUserId;

  before(async () => {
    testUser = await q.crud.create.user.new(th.fakeFields.user());
    testUserId = testUser._id;
  });

  describe("\ncheckId()", async function() {
    it("isUserBlocked === true", async () => {
      const newUser = await q.crud.create.user.new(th.fakeFields.user());
      const fields = { blockedUsers: testUserId };
      await q.crud.update.user.findByIdAndAddToSet(newUser._id, fields);
      const isUserBlocked = await q.verifyUser.isUserBlocked.checkId(
        testUserId,
        newUser._id
      );
      console.log("isUserBlocked: " + isUserBlocked);
      assert(isUserBlocked === true);
    });
    it("isUserBlocked === false", async () => {
      const newUser = await q.crud.create.user.new(th.fakeFields.user());
      const isUserBlocked = await q.verifyUser.isUserBlocked.checkId(
        testUserId,
        newUser._id
      );
      console.log("isUserBlocked: " + isUserBlocked);
      assert(isUserBlocked === false);
    });
  });
  describe("\ncheckDocument()", async function() {
    it("isUserBlocked === true", async () => {});
    it("isUserBlocked === false", async () => {});
  });
});
