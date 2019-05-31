const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "ACTIVITY-R-BY-ID"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (readerId, activityId) =>
  await q.features.activity.read.byId(readerId, activityId);

describe("\n query function: activity.read.byId()", async function() {
  this.timeout(0);

  let data;
  let testUserId;

  before(async () => {
    data = await testData.activity.all();
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
        const activityId = data.accountStatus.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const activityId = data.accountStatus.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const activityId = data.accountStatus.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const activityId = data.accountStatus.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
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
        const activityId = data.accountStatus.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const activityId = data.accountStatus.user2.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const activityId = data.accountStatus.user3.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const activityId = data.accountStatus.user4.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account is deleted", async () => {
        const activityId = data.accountStatus.user5.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        console.log(funcResults);
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
        const activityId = data.accountPermissions.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const activityId = data.accountPermissions.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const activityId = data.accountPermissions.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
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
      const activityId = data.socialConnections.user1.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("public user, following", async () => {
      const activityId = data.socialConnections.user2.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    it("private user, following, blocked testUser", async () => {
      const activityId = data.socialConnections.user3.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, following, blocked testUser", async () => {
      const activityId = data.socialConnections.user4.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("private user, not following", async () => {
      const activityId = data.socialConnections.user5.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, not following", async () => {
      const activityId = data.socialConnections.user6.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("private user, not following, blocked testUser", async () => {
      const activityId = data.socialConnections.user7.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("public user, not following, blocked testUser", async () => {
      const activityId = data.socialConnections.user8.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n nonexistent documents", async () => {
    it("nonexistent document", async () => {
      const activityId = data.nonexistent.user1.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    it("nonexistent document", async () => {
      const activityId = data.nonexistent.user2.activity1.id;
      const funcResults = await queryFunc(testUserId, activityId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
  });

  describe("\n ref documents", async () => {
    describe("\n account status", async () => {
      it("account status is ACTIVE", async () => {
        // await update.user.account.status.active(userId);
        const activityId = data.refs.accountStatus.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const activityId = data.refs.accountStatus.user1.activity2.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const activityId = data.refs.accountStatus.user1.activity3.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const activityId = data.refs.accountStatus.user1.activity4.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account is deleted", async () => {
        const activityId = data.refs.accountStatus.user1.activity5.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      // after(async () => await update.user.account.status.active(userId));
    });
    describe("\n social connections", async () => {
      it("private user, following", async () => {
        const activityId = data.refs.socialConnections.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("public user, following", async () => {
        const activityId = data.refs.socialConnections.user1.activity2.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, following, blocked testUser", async () => {
        const activityId = data.refs.socialConnections.user1.activity3.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, following, blocked testUser", async () => {
        const activityId = data.refs.socialConnections.user1.activity4.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("private user, not following", async () => {
        const activityId = data.refs.socialConnections.user1.activity5.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following", async () => {
        const activityId = data.refs.socialConnections.user1.activity6.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("private user, not following, blocked testUser", async () => {
        const activityId = data.refs.socialConnections.user1.activity7.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("public user, not following, blocked testUser", async () => {
        const activityId = data.refs.socialConnections.user1.activity8.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
    describe("\n nonexistent documents", async () => {
      it("nonexistent document", async () => {
        const activityId = data.refs.nonexistent.user1.activity1.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("nonexistent document", async () => {
        const activityId = data.refs.nonexistent.user1.activity2.id;
        const funcResults = await queryFunc(testUserId, activityId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
    });
  });
});
