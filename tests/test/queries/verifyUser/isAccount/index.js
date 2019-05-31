const assert = require("assert");
const q = require("../../../../app/queries");
const th = require("../../../testHelpers");
const testData = th.testDataCreators;
const logger = require("../../../../lib/logger");

const lG = "TESTS-QUERIES"; // logGroup
const lS = "VERIFY-USER"; // logSubgroup

describe("\nqueries verify user: isAccount()", async function() {
  this.timeout(0);

  before(async () => {});

  beforeEach(async () => {});

  describe("\ncheckId()", async function() {
    it("testUser account status is ACTIVE", async () => {
      const fields = th.fakeFields.user({ account: { status: "ACTIVE" } });
      const testUser = await q.crud.create.user.new(fields);
      const status = await q.verifyUser.isAccount.statusActive.checkId(
        testUser._id
      );
      console.log("isActive: " + status);
      assert(status === true);
    });
    it("testUser account status is INACTIVE", async () => {
      const fields = th.fakeFields.user({ account: { status: "INACTIVE" } });
      const testUser = await q.crud.create.user.new(fields);
      const status = await q.verifyUser.isAccount.statusInactive.checkId(
        testUser._id
      );
      console.log("isInactive: " + status);
      assert(status === true);
    });
    it("testUser account status is SUSPENDED", async () => {
      const fields = th.fakeFields.user({ account: { status: "SUSPENDED" } });
      const testUser = await q.crud.create.user.new(fields);
      const status = await q.verifyUser.isAccount.statusSuspended.checkId(
        testUser._id
      );
      console.log("isSuspended: " + status);
      assert(status === true);
    });
    it("testUser account status is BANNED", async () => {
      const fields = th.fakeFields.user({ account: { status: "BANNED" } });
      const testUser = await q.crud.create.user.new(fields);
      const status = await q.verifyUser.isAccount.statusBanned.checkId(
        testUser._id
      );
      console.log("isBanned: " + status);
      assert(status === true);
    });
  });

  describe("\ncheckDocument()", async function() {
    it("testUser account status is ACTIVE", async () => {});
    it("testUser account status is INACTIVE", async () => {});
    it("testUser account status is SUSPENDED", async () => {});
    it("testUser account status is BANNED", async () => {});
  });
});
