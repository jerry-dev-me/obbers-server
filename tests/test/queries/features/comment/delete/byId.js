const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "COMMENT-D-BY-ID"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (writerId, commentId) =>
  await q.features.comment.delete.byId(writerId, commentId);

describe("\n query function: comment.delete.byId()", async function() {
  this.timeout(0);

  let data;
  let testUserId;

  before(async () => {
    data = await testData.comment.all();
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
      const commentId = data.adminOnly.user1.comment1.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("account permissions not ADMIN", async () => {
      await update.user.account.permissions.readWrite(testUserId);
      const commentId = data.adminOnly.user1.comment1.id;
      const funcResults = await queryFunc(testUserId, commentId);
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
      const commentId = data.selfOnly.testUser.comment1.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("document from self", async () => {
      const commentId = data.selfOnly.testUser.post1.comment1.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("document from other user", async () => {
      const commentId = data.selfOnly.user1.comment1.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n account status", async () => {
    describe("\n self", async () => {
      it("account status is ACTIVE", async () => {
        await update.user.account.status.active(testUserId);
        const commentId = data.accountStatus.testUser.comment1.id;
        const funcResults = await queryFunc(testUserId, commentId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const commentId = data.accountStatus.testUser.comment2.id;
        const funcResults = await queryFunc(testUserId, commentId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const commentId = data.accountStatus.testUser.comment2.id;
        const funcResults = await queryFunc(testUserId, commentId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const commentId = data.accountStatus.testUser.comment2.id;
        const funcResults = await queryFunc(testUserId, commentId);
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
        const commentId = data.accountStatus.testUser.post1.comment1.id;
        const funcResults = await queryFunc(testUserId, commentId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const commentId = data.accountStatus.testUser.post1.comment2.id;
        const funcResults = await queryFunc(testUserId, commentId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const commentId = data.accountStatus.testUser.post1.comment3.id;
        const funcResults = await queryFunc(testUserId, commentId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const commentId = data.accountStatus.testUser.post1.comment4.id;
        const funcResults = await queryFunc(testUserId, commentId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account is deleted", async () => {
        const commentId = data.accountStatus.testUser.post1.comment5.id;
        const funcResults = await queryFunc(testUserId, commentId);
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
        const commentId = data.accountPermissions.testUser.comment1.id;
        const funcResults = await queryFunc(testUserId, commentId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const commentId = data.accountPermissions.testUser.comment2.id;
        const funcResults = await queryFunc(testUserId, commentId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const commentId = data.accountPermissions.testUser.comment2.id;
        const funcResults = await queryFunc(testUserId, commentId);
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
      const commentId = data.socialConnections.testUser.post1.comment1.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("public user, following", async () => {
      const commentId = data.socialConnections.testUser.post1.comment2.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("private user, following, blocked testUser", async () => {
      const commentId = data.socialConnections.testUser.post1.comment3.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, following, blocked testUser", async () => {
      const commentId = data.socialConnections.testUser.post1.comment4.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("private user, not following", async () => {
      const commentId = data.socialConnections.testUser.post1.comment5.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("public user, not following", async () => {
      const commentId = data.socialConnections.testUser.post1.comment6.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("private user, not following, blocked testUser", async () => {
      const commentId = data.socialConnections.testUser.post1.comment7.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, not following, blocked testUser", async () => {
      const commentId = data.socialConnections.testUser.post1.comment8.id;
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n nonexistent documents", async () => {
    it("nonexistent document", async () => {
      const funcResults = await queryFunc(testUserId, commentId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
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
    });
  });
});
