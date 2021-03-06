const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "COLLECTION-R-BY-ID"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (readerId, collectionId) =>
  await q.features.collection.read.byId(readerId, collectionId);

describe("\n query function: collection.read.byId()", async function() {
  this.timeout(0);

  let data;
  let testUserId;

  before(async () => {
    data = await testData.collection.all();
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
      const collectionId = data.adminOnly.user1.collection1.id;
      const funcResults = await queryFunc(testUserId, collectionId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("account permissions not ADMIN", async () => {
      await update.user.account.permissions.readWrite(testUserId);
      const collectionId = data.adminOnly.user1.collection1.id;
      const funcResults = await queryFunc(testUserId, collectionId);
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
      const collectionId = data.selfOnly.testUser.collection1.id;
      const funcResults = await queryFunc(testUserId, collectionId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("document from other user", async () => {
      const collectionId = data.selfOnly.user1.collection1.id;
      const funcResults = await queryFunc(testUserId, collectionId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n account status", async () => {
    describe("\n self", async () => {
      it("account status is ACTIVE", async () => {
        await update.user.account.status.active(testUserId);
        const collectionId = data.accountStatus.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const collectionId = data.accountStatus.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const collectionId = data.accountStatus.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const collectionId = data.accountStatus.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
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
        const collectionId = data.accountPermissions.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const collectionId = data.accountPermissions.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const collectionId = data.accountPermissions.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
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
      const collectionId = data.many.testUser.collection1.id;
      const funcResults = await queryFunc(testUserId, collectionId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
  });

  describe("\n empty documents", async () => {
    it("no documents", async () => {
      const collectionId = data.empty.testUser.collection1.id;
      const funcResults = await queryFunc(testUserId, collectionId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
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
      const collectionId = data.nonexistent.testUser.collection1.id;
      const funcResults = await queryFunc(testUserId, collectionId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      // assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  // expect that ref documents are found or not found...
  describe("\n ref documents", async () => {
    describe("\n account status", async () => {
      it("user account status is ACTIVE", async () => {
        // await update.user.account.status.active(userId);
        const collectionId = data.refs.accountStatus.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const collectionId = data.refs.accountStatus.testUser.collection2.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const collectionId = data.refs.accountStatus.testUser.collection3.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const collectionId = data.refs.accountStatus.testUser.collection4.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("user account is deleted", async () => {
        const collectionId = data.refs.accountStatus.testUser.collection5.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      // after(async () => await update.user.account.status.active(userId));
    });
    describe("\n social connections", async () => {
      it("private user, following", async () => {
        const collectionId =
          data.refs.socialConnections.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("public user, following", async () => {
        const collectionId =
          data.refs.socialConnections.testUser.collection2.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, following, blocked testUser", async () => {
        const collectionId =
          data.refs.socialConnections.testUser.collection3.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("public user, following, blocked testUser", async () => {
        const collectionId =
          data.refs.socialConnections.testUser.collection4.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, not following", async () => {
        const collectionId =
          data.refs.socialConnections.testUser.collection5.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("public user, not following", async () => {
        const collectionId =
          data.refs.socialConnections.testUser.collection6.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, not following, blocked testUser", async () => {
        const collectionId =
          data.refs.socialConnections.testUser.collection7.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("public user, not following, blocked testUser", async () => {
        const collectionId =
          data.refs.socialConnections.testUser.collection8.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
    });
    describe("\n nonexistent documents", async () => {
      it("nonexistent document", async () => {
        const collectionId = data.refs.nonexistent.testUser.collection1.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("nonexistent document", async () => {
        const collectionId = data.refs.nonexistent.testUser.collection2.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("nonexistent document", async () => {
        const collectionId = data.refs.nonexistent.testUser.collection3.id;
        const funcResults = await queryFunc(testUserId, collectionId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
    });
  });
});
