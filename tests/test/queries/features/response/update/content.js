const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "RESPONSE-U-CONTENT"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (writerId, responseId, updatedContent) =>
  await q.features.response.update.content(
    writerId,
    responseId,
    updatedContent
  );

describe("\n query function: response.update.content()", async function() {
  this.timeout(0);

  let data;
  let testUserId;

  before(async () => {
    data = await testData.response.all();
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
      await update.user.account.permissions.admin(testUserId);
      const responseId = data.adminOnly.user1.response1.id;
      const funcResults = await queryFunc(testUserId, responseId, "newcont");
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("account permissions not ADMIN", async () => {
      await update.user.account.permissions.readWrite(testUserId);
      const responseId = data.adminOnly.user1.response1.id;
      const funcResults = await queryFunc(testUserId, responseId, "newcont");
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    after(
      async () => await update.user.account.permissions.readWrite(testUserId)
    );
  });

  describe("\n self only", async () => {
    it("document from self", async () => {
      const responseId = data.selfOnly.testUser.response1.id;
      const funcResults = await queryFunc(testUserId, responseId, "newcont");
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("document from other user", async () => {
      const responseId = data.selfOnly.user1.response1.id;
      const funcResults = await queryFunc(testUserId, responseId, "newcont");
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n account status", async () => {
    describe("\n self", async () => {
      it("account status is ACTIVE", async () => {
        await update.user.account.status.active(testUserId);
        const responseId = data.accountStatus.testUser.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const responseId = data.accountStatus.testUser.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const responseId = data.accountStatus.testUser.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const responseId = data.accountStatus.testUser.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
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
      });
      it("account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
      });
      it("account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
      });
      it("account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
      });
      it("account is deleted", async () => {});
      // after(async () => await update.user.account.status.active(userId));
    });
  });

  describe("\n account permissions", async () => {
    describe("\n self", async () => {
      it("account permissions is READ_WRITE", async () => {
        await update.user.account.permissions.readWrite(testUserId);
        const responseId = data.accountPermissions.testUser.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const responseId = data.accountPermissions.testUser.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const responseId = data.accountPermissions.testUser.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
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
    it("nonexistent document", async () => {
      const responseId = data.nonexistent.testUser.response1.id;
      const funcResults = await queryFunc(testUserId, responseId, "newcont");
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  // post reference
  // comment reference
  describe("\n ref documents", async () => {
    describe("\n account status", async () => {
      it("user account status is ACTIVE", async () => {
        // await update.user.account.status.active(userId);
        const responseId = data.refs.accountStatus.user1.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const responseId = data.refs.accountStatus.user1.response2.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("user account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const responseId = data.refs.accountStatus.user1.response3.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const responseId = data.refs.accountStatus.user1.response4.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("user account is deleted", async () => {
        const responseId = data.refs.accountStatus.user1.response5.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      // after(async () => await update.user.account.status.active(userId));
    });
    describe("\n social connections", async () => {
      it("private user, following", async () => {
        const responseId = data.socialConnections.user1.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("public user, following", async () => {
        const responseId = data.socialConnections.user1.response2.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, following, blocked testUser", async () => {
        const responseId = data.socialConnections.user1.response3.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, following, blocked testUser", async () => {
        const responseId = data.socialConnections.user1.response4.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("private user, not following", async () => {
        const responseId = data.socialConnections.user1.response5.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following", async () => {
        const responseId = data.socialConnections.user1.response6.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("private user, not following, blocked testUser", async () => {
        const responseId = data.socialConnections.user1.response7.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following, blocked testUser", async () => {
        const responseId = data.socialConnections.user1.response8.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
    describe("\n nonexistent documents", async () => {
      it("nonexistent document", async () => {
        const responseId = data.refs.nonexistent.user1.response1.id;
        const funcResults = await queryFunc(testUserId, responseId, "newcont");
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
  });
});
