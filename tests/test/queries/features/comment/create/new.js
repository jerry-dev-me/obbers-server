const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "COMMENT-C-NEW"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (writerId, fields) =>
  await q.features.comment.create.new(writerId, fields);

describe("\n query function: comment.create.new()", async function() {
  this.timeout(0);

  let data;
  let testUserId;

  before(async () => {
    data = await testData.comment.create();
    testUserId = data.testUser.id;
  });

  describe("\n document model fields validation", async () => {
    it("valid fields", async () => {
      const fields = data.valid;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(funcResults.userId === fields.userId);
      assert(funcResults.postId === fields.postId);
      assert(funcResults.content === fields.content);
      // assert(funcResults.likes === fields.likes);
      // assert(funcResults.responses === fields.responses);
      assert(funcResults.createdAt === fields.createdAt);
      assert(funcResults.modifiedAt === fields.modifiedAt);
    });
    it("invalid fields", async () => {
      const fields = data.invalid;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
    });
    it("other userId refId fields", async () => {
      const fields = data.otherUserId;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
      // assert(funcResults.moreInfo.error.errors.postId);
      // assert(funcResults.moreInfo.error.errors.content);
      // assert(funcResults.moreInfo.error.errors.likes);
      // assert(funcResults.moreInfo.error.errors.responses);
    });
    it("deleted refId fields", async () => {
      const fields = data.deletedRefId;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
      // assert(funcResults.moreInfo.error.errors.postId);
      // assert(funcResults.moreInfo.error.errors.content);
      // assert(funcResults.moreInfo.error.errors.likes);
      // assert(funcResults.moreInfo.error.errors.responses);
    });
    it("empty fields", async () => {
      const fields = data.empty;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
      // assert(funcResults.moreInfo.error.errors.postId);
      // assert(funcResults.moreInfo.error.errors.content);
      // assert(funcResults.moreInfo.error.errors.likes);
      // assert(funcResults.moreInfo.error.errors.responses);
    });
    it("missing fields", async () => {
      const fields = data.missing;
      const funcResults = await queryFunc(testUserId, fields);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
      // assert(funcResults.moreInfo.error.errors.userId);
      // assert(funcResults.moreInfo.error.errors.postId);
      // assert(funcResults.moreInfo.error.errors.content);
      // assert(funcResults.moreInfo.error.errors.likes);
      // assert(funcResults.moreInfo.error.errors.responses);
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
        const fields = data.valid;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const fields = data.valid;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const fields = data.valid;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const fields = data.valid;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
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
      // after(async () => await update.user.account.status.active(userId));
    });
  });

  describe("\n account permissions", async () => {
    describe("\n self", async () => {
      it("account permissions is READ_WRITE", async () => {
        await update.user.account.permissions.readWrite(testUserId);
        const fields = data.valid;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const fields = data.valid;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const fields = data.valid;
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

  describe("\n ref documents", async () => {
    describe("\n account status", async () => {
      it("user account status is ACTIVE", async () => {
        // await update.user.account.status.active(userId);
        const fields = data.withUsersStatusRefs.fields1;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const fields = data.withUsersStatusRefs.fields2;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("user account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const fields = data.withUsersStatusRefs.fields3;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const fields = data.withUsersStatusRefs.fields4;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("user account is deleted", async () => {
        const fields = data.withUsersStatusRefs.fields5;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      // after(async () => await update.user.account.status.active(userId));
    });
    describe("\n social connections", async () => {
      it("private user, following", async () => {
        const fields = data.withSocialConnectionsRefs.fields1;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("public user, following", async () => {
        const fields = data.withSocialConnectionsRefs.fields2;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, following, blocked testUser", async () => {
        const fields = data.withSocialConnectionsRefs.fields3;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, following, blocked testUser", async () => {
        const fields = data.withSocialConnectionsRefs.fields4;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("private user, not following", async () => {
        const fields = data.withSocialConnectionsRefs.fields5;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following", async () => {
        const fields = data.withSocialConnectionsRefs.fields6;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, not following, blocked testUser", async () => {
        const fields = data.withSocialConnectionsRefs.fields7;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following, blocked testUser", async () => {
        const fields = data.withSocialConnectionsRefs.fields8;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
    describe("\n nonexistent documents", async () => {
      it("nonexistent document 1", async () => {
        const fields = data.withNonexistentRefs.fields1;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("nonexistent document 2", async () => {
        const fields = data.withNonexistentRefs.fields2;
        const funcResults = await queryFunc(testUserId, fields);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
  });
});
