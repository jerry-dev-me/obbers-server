const assert = require("assert");
const q = require("../../../../app/queries");
const th = require("../../../testHelpers");
const testData = th.testDataCreators;
const logger = require("../../../../lib/logger");

const lG = "TESTS-QUERIES"; // logGroup
const lS = "VERIFY-USER"; // logSubgroup

describe("\nqueries verify user: isPermissions()", async function() {
  this.timeout(0);

  before(async () => {
  });

  beforeEach(async () => {
  });

  describe("\ncheckId()", async function() {
    it("testUser account permissions are ADMIN", async () => {
      const fields = th.fakeFields.user({ account: { permissions: "ADMIN" } });
      const testUser = await q.crud.create.user.new(fields);
      const permissions = await q.verifyUser.isPermissions.admin.checkId(
        testUser._id
      );
      console.log("isAdmin: " + permissions);
      assert(permissions === true);
    });
    it("testUser account permissions are READ_ONLY", async () => {
      const fields = th.fakeFields.user({ account: { permissions: "READ_ONLY" } });
      const testUser = await q.crud.create.user.new(fields);
      const permissions = await q.verifyUser.isPermissions.readOnly.checkId(
        testUser._id
      );
      console.log("isReadOnly: " + permissions);
      assert(permissions === true);
    });
    it("testUser account permissions are READ_WRITE", async () => {
      const fields = th.fakeFields.user({ account: { permissions: "READ_WRITE" } });
      const testUser = await q.crud.create.user.new(fields);
      const permissions = await q.verifyUser.isPermissions.readWrite.checkId(
        testUser._id
      );
      console.log("isReadWrite: " + permissions);
      assert(permissions === true);
    });
  });

  describe("\ncheckDocument()", async function() {
    it("user", async () => {
    });
  });

});
