const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "POST-C-NEW"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (writerId, fields) =>
  await q.features.post.create.new(writerId, fields);

describe("\n query function: post.create.new()", async function() {
  this.timeout(0);

  let data;
  let testUserId;

  before(async () => {
    data = await testData.post.create();
    testUserId = data.testUser.id;
  });

  describe("\n document model fields validation", async () => {
    it("valid fields 1", async () => {
      const fields = data.valid1;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(funcResults.userId === fields.userId);
      // assert(funcResults.location === fields.location);
      // assert(funcResults.geometry === fields.geometry);
      // assert(funcResults.content === fields.content);
      assert(funcResults.caption === fields.caption);
      // assert(funcResults.likes === fields.likes);
      // assert(funcResults.tags === fields.tags);
      assert(funcResults.commentsEnabled === fields.commentsEnabled);
      // assert(funcResults.comments === fields.comments);
      assert(funcResults.createdAt === fields.createdAt);
      assert(funcResults.modifiedAt === fields.modifiedAt);
    });
    it("valid fields 2", async () => {
      const fields = data.valid2;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("invalid fields 1", async () => {
      const fields = data.invalid1;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
      // assert(funcResults.moreInfo.error.errors.location);
      // assert(funcResults.moreInfo.error.errors.geometry);
      // assert(funcResults.moreInfo.error.errors.content);
      // assert(funcResults.moreInfo.error.errors.caption);
      // assert(funcResults.moreInfo.error.errors.likes);
      // assert(funcResults.moreInfo.error.errors.tags);
      // assert(funcResults.moreInfo.error.errors.commentsEnabled);
      // assert(funcResults.moreInfo.error.errors.comments);
    });
    it("invalid fields 2", async () => {
      const fields = data.invalid2;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("other userId refId fields", async () => {
      const fields = data.otherUserId;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
      // assert(funcResults.moreInfo.error.errors.location);
      // assert(funcResults.moreInfo.error.errors.geometry);
      // assert(funcResults.moreInfo.error.errors.content);
      // assert(funcResults.moreInfo.error.errors.caption);
      // assert(funcResults.moreInfo.error.errors.likes);
      // assert(funcResults.moreInfo.error.errors.tags);
      // assert(funcResults.moreInfo.error.errors.commentsEnabled);
      // assert(funcResults.moreInfo.error.errors.comments);
    });
    it("deleted refId fields", async () => {
      const fields = data.deletedRefId;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
      // assert(funcResults.moreInfo.error.errors.location);
      // assert(funcResults.moreInfo.error.errors.geometry);
      // assert(funcResults.moreInfo.error.errors.content);
      // assert(funcResults.moreInfo.error.errors.caption);
      // assert(funcResults.moreInfo.error.errors.likes);
      // assert(funcResults.moreInfo.error.errors.tags);
      // assert(funcResults.moreInfo.error.errors.commentsEnabled);
      // assert(funcResults.moreInfo.error.errors.comments);
    });
    it("empty fields 1", async () => {
      const fields = data.empty1;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
      // assert(funcResults.moreInfo.error.errors.location);
      // assert(funcResults.moreInfo.error.errors.geometry);
      // assert(funcResults.moreInfo.error.errors.content);
      // assert(funcResults.moreInfo.error.errors.caption);
      // assert(funcResults.moreInfo.error.errors.likes);
      // assert(funcResults.moreInfo.error.errors.tags);
      // assert(funcResults.moreInfo.error.errors.commentsEnabled);
      // assert(funcResults.moreInfo.error.errors.comments);
    });
    it("empty fields 2", async () => {
      const fields = data.empty2;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("missing fields", async () => {
      const fields = data.missing;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
      // assert(funcResults.moreInfo.error.errors.location);
      // assert(funcResults.moreInfo.error.errors.geometry);
      // assert(funcResults.moreInfo.error.errors.content);
      // assert(funcResults.moreInfo.error.errors.caption);
      // assert(funcResults.moreInfo.error.errors.likes);
      // assert(funcResults.moreInfo.error.errors.tags);
      // assert(funcResults.moreInfo.error.errors.commentsEnabled);
      // assert(funcResults.moreInfo.error.errors.comments);
    });
  });

  describe("\n ADMIN only", async () => {
    it("account permissions ADMIN", async () => {
      await update.user.account.permissions.admin(testUserId);
    });
    it("account permissions not ADMIN", async () => {
      await update.user.account.permissions.readWrite(testUserId);
    });
    after(
      async () => await update.user.account.permissions.readWrite(testUserId)
    );
  });

  describe("\n self only", async () => {
    it("document from self", async () => {});
    it("document from other user", async () => {});
  });

  describe("\n account status", async () => {
    describe("\n self", async () => {
      it("account status is ACTIVE", async () => {
        await update.user.account.status.active(testUserId);
        const fields = data.valid1;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const fields = data.valid1;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const fields = data.valid1;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const fields = data.valid1;
        const funcResults = await queryFunc(testUserId, fields);
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
        const fields = data.valid1;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const fields = data.valid1;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const fields = data.valid1;
        const funcResults = await queryFunc(testUserId, fields);
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
    it("nonexistent document", async () => {});
  });

  // pending tests
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
      it("nonexistent document 1", async () => {});
      it("nonexistent document 2", async () => {});
    });
  });
});
