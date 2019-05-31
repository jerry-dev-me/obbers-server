const assert = require("assert");
const q = require("../../../../app/queries");
const th = require("../../../testHelpers");
const testData = th.testDataCreators;
const logger = require("../../../../lib/logger");

const lG = "TESTS-QUERIES"; // logGroup
const lS = "VERIFY-USER"; // logSubgroup

describe("\nqueries verify user: canUserWrite()", async function() {
  this.timeout(0);

  before(async () => {
  });

  describe("\ncheckId()", async function() {
    it("testUser account permissions are ADMIN", async () => {
      const testUser = await q.crud.create.user.new(th.fakeFields.user());
      const fields = { "account.permissions": "ADMIN" };
      await q.crud.update.user.findByIdAndUpdate(testUser._id, fields);
      const canUserWrite = await q.verifyUser.canUserWrite.checkId(testUser._id);
      console.log("canUserWrite: " + canUserWrite);
      assert(canUserWrite === true);
    });
    it("testUser account permissions are READ_ONLY", async () => {
      const testUser = await q.crud.create.user.new(th.fakeFields.user());
      const fields = { "account.permissions": "READ_ONLY" };
      await q.crud.update.user.findByIdAndUpdate(testUser._id, fields);
      const canUserWrite = await q.verifyUser.canUserWrite.checkId(testUser._id);
      console.log("canUserWrite: " + canUserWrite);
      assert(canUserWrite === false);
    });
    it("testUser account status is ACTIVE", async () => {
      const testUser = await q.crud.create.user.new(th.fakeFields.user());
      const fields = { "account.status": "ACTIVE" };
      await q.crud.update.user.findByIdAndUpdate(testUser._id, fields);
      const canUserWrite = await q.verifyUser.canUserWrite.checkId(testUser._id);
      console.log("canUserWrite: " + canUserWrite);
      assert(canUserWrite === true);
    });
    it("testUser account status is INACTIVE", async () => {
      const testUser = await q.crud.create.user.new(th.fakeFields.user());
      const fields = { "account.status": "INACTIVE" };
      await q.crud.update.user.findByIdAndUpdate(testUser._id, fields);
      const canUserWrite = await q.verifyUser.canUserWrite.checkId(testUser._id);
      console.log("canUserWrite: " + canUserWrite);
      assert(canUserWrite === false);
    });
    it("testUser account status is SUSPENDED", async () => {
      const testUser = await q.crud.create.user.new(th.fakeFields.user());
      const fields = { "account.status": "SUSPENDED" };
      await q.crud.update.user.findByIdAndUpdate(testUser._id, fields);
      const canUserWrite = await q.verifyUser.canUserWrite.checkId(testUser._id);
      console.log("canUserWrite: " + canUserWrite);
      assert(canUserWrite === false);
    });
    it("testUser account status is BANNED", async () => {
      const testUser = await q.crud.create.user.new(th.fakeFields.user());
      const fields = { "account.status": "BANNED" };
      await q.crud.update.user.findByIdAndUpdate(testUser._id, fields);
      const canUserWrite = await q.verifyUser.canUserWrite.checkId(testUser._id);
      console.log("canUserWrite: " + canUserWrite);
      assert(canUserWrite === false);
    });
  });

  describe("\ncheckDocument()", async function() {
  });
});
