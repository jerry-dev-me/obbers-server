const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "POST-R-ALL-BY-USER-ID"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (readerId, idToRead) =>
  await q.features.post.read.allByUserId(readerId, idToRead);

describe("\n query function: post.read.allByUserId()", async function() {
  this.timeout(0);

  let data;
  let testUserId;

  before(async () => {
    data = await testData.post.all();
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
      const userId = data.adminOnly.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("account permissions not ADMIN", async () => {
      await update.user.account.permissions.readWrite(testUserId);
      const userId = data.adminOnly.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
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
      const userId = data.selfOnly.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("document from other user", async () => {
      const userId = data.selfOnly.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n account status", async () => {
    describe("\n self", async () => {
      it("account status is ACTIVE", async () => {
        await update.user.account.status.active(testUserId);
        const userId = data.accountStatus.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const userId = data.accountStatus.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const userId = data.accountStatus.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const userId = data.accountStatus.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
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
        const userId = data.accountStatus.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const userId = data.accountStatus.user2.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const userId = data.accountStatus.user3.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const userId = data.accountStatus.user4.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account is deleted", async () => {
        const userId = data.accountStatus.user5.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      // after(async () => await update.user.account.status.active(userId));
    });
  });

  describe("\n account permissions", async () => {
    describe("\n self", async () => {
      it("account permissions is READ_WRITE", async () => {
        await update.user.account.permissions.readWrite(testUserId);
        const userId = data.accountPermissions.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const userId = data.accountPermissions.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const userId = data.accountPermissions.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
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
    it("skip and limit", async () => {
      const userId = data.many.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
  });

  describe("\n empty documents", async () => {
    it("no documents", async () => {
      const userId = data.empty.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
  });

  describe("\n social connections", async () => {
    it("private user, following", async () => {
      const userId = data.socialConnections.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("public user, following", async () => {
      const userId = data.socialConnections.user2.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("private user, following, blocked testUser", async () => {
      const userId = data.socialConnections.user3.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, following, blocked testUser", async () => {
      const userId = data.socialConnections.user4.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("private user, not following", async () => {
      const userId = data.socialConnections.user5.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, not following", async () => {
      const userId = data.socialConnections.user6.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("private user, not following, blocked testUser", async () => {
      const userId = data.socialConnections.user7.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, not following, blocked testUser", async () => {
      const userId = data.socialConnections.user8.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n nonexistent documents", async () => {
    it("nonexistent document", async () => {
      const userId = data.nonexistent.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n ref documents", async () => {
    describe("\n account status", async () => {
      it("user account status is ACTIVE", async () => {
        // await update.user.account.status.active(userId);
        const userId = data.refs.accountStatus.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const userId = data.refs.accountStatus.user1.user2.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("user account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const userId = data.refs.accountStatus.user1.user3.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const userId = data.refs.accountStatus.user1.user4.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("user account is deleted", async () => {
        const userId = data.refs.accountStatus.user1.user5.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      // after(async () => await update.user.account.status.active(userId));
    });
    describe("\n social connections", async () => {
      it("private user, following", async () => {
        const userId = data.socialConnections.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("public user, following", async () => {
        const userId = data.socialConnections.user1.user2.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, following, blocked testUser", async () => {
        const userId = data.socialConnections.user1.user3.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, following, blocked testUser", async () => {
        const userId = data.socialConnections.user1.user4.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("private user, not following", async () => {
        const userId = data.socialConnections.user1.user5.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following", async () => {
        const userId = data.socialConnections.user1.user6.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("private user, not following, blocked testUser", async () => {
        const userId = data.socialConnections.user1.user7.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following, blocked testUser", async () => {
        const userId = data.socialConnections.user1.user8.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
    describe("\n nonexistent documents", async () => {
      it("nonexistent document", async () => {
        const userId = data.refs.nonexistent.user1.id;
        const funcResults = await queryFunc(testUserId, userId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
  });
});
