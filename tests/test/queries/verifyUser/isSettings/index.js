const assert = require("assert");
const q = require("../../../../app/queries");
const th = require("../../../testHelpers");
const testData = th.testDataCreators;
const logger = require("../../../../lib/logger");

const lG = "TESTS-QUERIES"; // logGroup
const lS = "VERIFY-USER"; // logSubgroup

describe("\nqueries verify user: isSettings()", async function() {
  this.timeout(0);

  describe("\ncheckId()", async function() {
    it("testUser settings private is true", async () => {
      const fields = th.fakeFields.user({ settings: { private: true } });
      const testUser = await q.crud.create.user.new(fields);
      const isPrivate = await q.verifyUser.isSettings.private.checkId(
        testUser._id
      );
      console.log("isPrivate: " + isPrivate);
      assert(isPrivate === true);
    });
    it("testUser settings private is true", async () => {
      const fields = th.fakeFields.user({ settings: { private: false } });
      const testUser = await q.crud.create.user.new(fields);
      const isPrivate = await q.verifyUser.isSettings.private.checkId(
        testUser._id
      );
      console.log("isPrivate: " + isPrivate);
      assert(isPrivate === false);
    });
  });

  describe("\ncheckDocument()", async function() {
  });

});
