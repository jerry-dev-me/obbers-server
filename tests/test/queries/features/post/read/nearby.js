const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "POST-R-NEARBY"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (readerId, readerLocation, maxDistance) =>
  await q.features.post.read.nearby(readerId, readerLocation, maxDistance);

describe("\n query function: post.read.nearby()", async function() {
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
      const postId = data.adminOnly.user1.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("account permissions not ADMIN", async () => {
      await update.user.account.permissions.readWrite(testUserId);
      const postId = data.adminOnly.user1.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
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
      const postId = data.selfOnly.testUser.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("document from other user", async () => {
      const postId = data.selfOnly.user1.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n account status", async () => {
    describe("\n self", async () => {
      it("account status is ACTIVE", async () => {
        await update.user.account.status.active(testUserId);
        const postId = data.accountStatus.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const postId = data.accountStatus.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const postId = data.accountStatus.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const postId = data.accountStatus.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
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
        const postId = data.accountStatus.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const postId = data.accountStatus.user2.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const postId = data.accountStatus.user3.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const postId = data.accountStatus.user4.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account is deleted", async () => {
        const postId = data.accountStatus.user5.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
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
        const postId = data.accountPermissions.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const postId = data.accountPermissions.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const postId = data.accountPermissions.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
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
      const postId = data.many.user1.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
  });

  describe("\n empty documents", async () => {
    it("no documents", async () => {
      const postId = data.empty.user1.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
  });

  describe("\n social connections", async () => {
    it("private user, following", async () => {
      const postId = data.socialConnections.user1.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("public user, following", async () => {
      const postId = data.socialConnections.user2.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("private user, following, blocked testUser", async () => {
      const postId = data.socialConnections.user3.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, following, blocked testUser", async () => {
      const postId = data.socialConnections.user4.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("private user, not following", async () => {
      const postId = data.socialConnections.user5.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, not following", async () => {
      const postId = data.socialConnections.user6.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("private user, not following, blocked testUser", async () => {
      const postId = data.socialConnections.user7.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, not following, blocked testUser", async () => {
      const postId = data.socialConnections.user8.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n nonexistent documents", async () => {
    it("nonexistent document", async () => {
      const postId = data.nonexistent.user1.post1.id;
      const funcResults = await queryFunc(testUserId, location, maxDistance);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n ref documents", async () => {
    describe("\n account status", async () => {
      it("user account status is ACTIVE", async () => {
        // await update.user.account.status.active(userId);
        const postId = data.refs.accountStatus.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const postId = data.refs.accountStatus.user1.post2.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("user account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const postId = data.refs.accountStatus.user1.post3.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const postId = data.refs.accountStatus.user1.post4.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("user account is deleted", async () => {
        const postId = data.refs.accountStatus.user1.post5.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      // after(async () => await update.user.account.status.active(userId));
    });
    describe("\n social connections", async () => {
      it("private user, following", async () => {
        const postId = data.socialConnections.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("public user, following", async () => {
        const postId = data.socialConnections.user1.post2.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, following, blocked testUser", async () => {
        const postId = data.socialConnections.user1.post3.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, following, blocked testUser", async () => {
        const postId = data.socialConnections.user1.post4.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("private user, not following", async () => {
        const postId = data.socialConnections.user1.post5.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following", async () => {
        const postId = data.socialConnections.user1.post6.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("private user, not following, blocked testUser", async () => {
        const postId = data.socialConnections.user1.post7.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following, blocked testUser", async () => {
        const postId = data.socialConnections.user1.post8.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
    describe("\n nonexistent documents", async () => {
      it("nonexistent document", async () => {
        const postId = data.refs.nonexistent.user1.post1.id;
        const funcResults = await queryFunc(testUserId, location, maxDistance);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
  });
});
