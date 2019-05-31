const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "REQUEST-U-ACCEPTED"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (writerId, requestId) =>
  await q.features.request.update.status.accepted(writerId, requestId);

describe("\n query function: request.update.status.accepted()", async function() {
  this.timeout(0);

  let data;
  let testUserId;

  before(async () => {
    data = await testData.request.all();
    testUserId = data.testUser.id;
  });

  describe("\n document model fields validation", async () => {
    it("valid fields", async () => {});
    it("invalid fields", async () => {});
    it("other userId refId fields", async () => {});
    it("deleted refId fields", async () => {});
    it("empty fields", async () => {});
    it("missing fields", async () => {});
  });

  describe("\n ADMIN only", async () => {
    it("account permissions ADMIN", async () => {
      // await update.user.account.permissions.admin(testUserId);
    });
    it("account permissions not ADMIN", async () => {
      // await update.user.account.permissions.readWrite(testUserId);
    });
    // after(
    //   async () => await update.user.account.permissions.readWrite(testUserId)
    // );
  });

  describe("\n self only", async () => {
    it("document from self", async () => {
      const requestId = data.selfOnly.testUser.sent.request1.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("document from self", async () => {
      const requestId = data.selfOnly.testUser.received.request1.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("document from other user", async () => {
      const requestId = data.selfOnly.user1.sent.request1.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("document from other user", async () => {
      const requestId = data.selfOnly.user1.received.request1.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n account status", async () => {
    describe("\n self", async () => {
      beforeEach(async () => {
        data = await testData.request.all();
      });
      it("account status is ACTIVE", async () => {
        await update.user.account.status.active(testUserId);
        const requestId = data.accountStatus.testUser.received.request1.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const requestId = data.accountStatus.testUser.received.request1.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const requestId = data.accountStatus.testUser.received.request1.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const requestId = data.accountStatus.testUser.received.request1.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account is deleted", async () => {});
      after(async () => await update.user.account.status.active(testUserId));
    });
    describe("\n other user", async () => {
      it("account status is ACTIVE", async () => {
        // await update.user.account.status.active(userId);
        const requestId = data.accountStatus.testUser.received.request1.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const requestId = data.accountStatus.testUser.received.request2.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const requestId = data.accountStatus.testUser.received.request3.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const requestId = data.accountStatus.testUser.received.request4.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account is deleted", async () => {
        // await update.user.account.status.banned(userId);
        const requestId = data.accountStatus.testUser.received.request5.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      // after(async () => await update.user.account.status.active(userId));
    });
  });

  describe("\n account permissions", async () => {
    describe("\n self", async () => {
      beforeEach(async () => {
        data = await testData.request.all();
      });
      it("account permissions is READ_WRITE", async () => {
        await update.user.account.permissions.readWrite(testUserId);
        const requestId = data.accountPermissions.testUser.received.request1.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const requestId = data.accountPermissions.testUser.received.request1.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const requestId = data.accountPermissions.testUser.received.request1.id;
        const funcResults = await queryFunc(testUserId, requestId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      after(
        async () => await update.user.account.permissions.readWrite(testUserId)
      );
    });
    describe("\n other user", async () => {
      it("account permissions is READ_WRITE", async () => {
        // await update.user.account.permissions.readWrite(userId);
      });
      it("account permissions is READ_ONLY", async () => {
        // await update.user.account.permissions.readOnly(userId);
      });
      it("account permissions is ADMIN", async () => {
        // await update.user.account.permissions.admin(userId);
      });
      // after(async () => await update.user.account.permissions.readWrite(userId));
    });
  });

  describe("\n many documents", async () => {
    it("skip and limit", async () => {});
  });

  describe("\n empty documents", async () => {
    it("no documents", async () => {});
  });

  describe("\n social connections", async () => {
    it("private user, following", async () => {
      const requestId = data.socialConnections.testUser.received.request1.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("public user, following", async () => {
      const requestId = data.socialConnections.testUser.received.request2.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("private user, following, blocked testUser", async () => {
      const requestId = data.socialConnections.testUser.received.request3.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, following, blocked testUser", async () => {
      const requestId = data.socialConnections.testUser.received.request4.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("private user, not following", async () => {
      const requestId = data.socialConnections.testUser.received.request5.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("public user, not following", async () => {
      const requestId = data.socialConnections.testUser.received.request6.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("private user, not following, blocked testUser", async () => {
      const requestId = data.socialConnections.testUser.received.request7.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, not following, blocked testUser", async () => {
      const requestId = data.socialConnections.testUser.received.request8.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n nonexistent documents", async () => {
    it("nonexistent document", async () => {
      const requestId = data.nonexistent.testUser.received.request1.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("nonexistent document", async () => {
      const requestId = data.nonexistent.testUser.received.request2.id;
      const funcResults = await queryFunc(testUserId, requestId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n ref documents", async () => {
    describe("\n account status", async () => {
      it("user account status is ACTIVE", async () => {
        // await update.user.account.status.active(userId);
      });
      it("user account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
      });
      it("user account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
      });
      it("user account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
      });
      it("user account is deleted", async () => {});
      // after(async () => await update.user.account.status.active(userId));
    });
    describe("\n social connections", async () => {
      it("private user, following", async () => {});
      it("public user, following", async () => {});
      it("private user, following, blocked testUser", async () => {});
      it("public user, following, blocked testUser", async () => {});
      it("private user, not following", async () => {});
      it("public user, not following", async () => {});
      it("private user, not following, blocked testUser", async () => {});
      it("public user, not following, blocked testUser", async () => {});
    });
    describe("\n nonexistent documents", async () => {
      it("nonexistent document", async () => {});
      it("nonexistent document", async () => {});
    });
  });
});
