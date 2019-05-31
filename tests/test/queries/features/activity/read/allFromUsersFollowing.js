const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "ACTIVITY-R-ALL-FROM-FOLLOWING"; // logSubgroup

const assert = require("assert");
const u = require("../../../../../../utils");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async readerId =>
  await q.features.activity.read.allFromUsersFollowing(readerId);

describe("\n query function: activity.read.allFromUsersFollowing()", async function() {
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
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is INACTIVE", async () => {
        await update.user.account.status.inactive(testUserId);
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(funcResults instanceof Error);
        assert(funcResults.customErr);
      });
      it("account status is SUSPENDED", async () => {
        await update.user.account.status.suspended(testUserId);
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account status is BANNED", async () => {
        await update.user.account.status.banned(testUserId);
        const funcResults = await queryFunc(testUserId);
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
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const userId = data.accountStatus.user2.id;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const userId = data.accountStatus.user3.id;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const userId = data.accountStatus.user4.id;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("account is deleted", async () => {
        const userId = data.accountStatus.user5.id;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      // after(async () => await update.user.account.status.active(userId));
    });
  });

  describe("\n account permissions", async () => {
    describe("\n self", async () => {
      it("account permissions is READ_WRITE", async () => {
        await update.user.account.permissions.readWrite(testUserId);
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is READ_ONLY", async () => {
        await update.user.account.permissions.readOnly(testUserId);
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
      });
      it("account permissions is ADMIN", async () => {
        await update.user.account.permissions.admin(testUserId);
        const funcResults = await queryFunc(testUserId);
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
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
  });

  describe("\n empty documents", async () => {
    it("no documents", async () => {
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
  });

  describe("\n social connections", async () => {
    it("private user, following", async () => {
      const userId = data.socialConnections.user1.id;
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId));
    });
    it("public user, following", async () => {
      const userId = data.socialConnections.user2.id;
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId));
    });
    it("private user, following, blocked testUser", async () => {
      const userId = data.socialConnections.user3.id;
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(!u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId));
    });
    it("public user, following, blocked testUser", async () => {
      const userId = data.socialConnections.user4.id;
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(!u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId));
    });
    it("private user, not following", async () => {
      const userId = data.socialConnections.user5.id;
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(!u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId));
    });
    it("public user, not following", async () => {
      const userId = data.socialConnections.user6.id;
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(!u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId));
    });
    it("private user, not following, blocked testUser", async () => {
      const userId = data.socialConnections.user7.id;
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(!u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId));
    });
    it("public user, not following, blocked testUser", async () => {
      const userId = data.socialConnections.user8.id;
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(!u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId));
    });
  });

  describe("\n nonexistent documents", async () => {
    it("nonexistent document", async () => {
      const userId = data.nonexistent.user1.id;
      const funcResults = await queryFunc(testUserId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
      assert(!u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId));
    });
  });

  describe("\n ref documents", async () => {
    describe("\n account status", async () => {
      it("user account status is ACTIVE", async () => {
        // await update.user.account.status.active(userId);
        const userId = data.refs.accountStatus.user1.activity1.userId;
        const funcResults = await queryFunc(testUserId);
        assert(!(funcResults instanceof Error));
        assert(
          u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("user account status is INACTIVE", async () => {
        // await update.user.account.status.inactive(userId);
        const userId = data.refs.accountStatus.user1.activity2.userId;
        const funcResults = await queryFunc(testUserId);
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("user account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(userId);
        const userId = data.refs.accountStatus.user1.activity3.userId;
        const funcResults = await queryFunc(testUserId);
        assert(!(funcResults instanceof Error));
        assert(
          u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("user account status is BANNED", async () => {
        // await update.user.account.status.banned(userId);
        const userId = data.refs.accountStatus.user1.activity4.userId;
        const funcResults = await queryFunc(testUserId);
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("user account is deleted", async () => {
        const userId = data.refs.accountStatus.user1.activity5.userId;
        const funcResults = await queryFunc(testUserId);
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      // after(async () => await update.user.account.status.active(userId));
    });
    describe("\n social connections", async () => {
      it("private user, following", async () => {
        const userId = data.refs.socialConnections.user1.activity1.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("public user, following", async () => {
        const userId = data.refs.socialConnections.user1.activity2.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("private user, following, blocked testUser", async () => {
        const userId = data.refs.socialConnections.user1.activity3.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("public user, following, blocked testUser", async () => {
        const userId = data.refs.socialConnections.user1.activity4.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("private user, not following", async () => {
        const userId = data.refs.socialConnections.user1.activity5.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("public user, not following", async () => {
        const userId = data.refs.socialConnections.user1.activity6.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("private user, not following, blocked testUser", async () => {
        const userId = data.refs.socialConnections.user1.activity7.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("public user, not following, blocked testUser", async () => {
        const userId = data.refs.socialConnections.user1.activity8.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
    });
    describe("\n nonexistent documents", async () => {
      it("nonexistent document", async () => {
        const userId = data.refs.nonexistent.user1.activity1.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
      it("nonexistent document", async () => {
        const userId = data.refs.nonexistent.user1.activity2.userId;
        const funcResults = await queryFunc(testUserId);
        logger.log(lG, lS, null, { funcResults });
        assert(!(funcResults instanceof Error));
        assert(
          !u.isIdFoundInArrayOfObjectsByProp(funcResults, "userId", userId)
        );
      });
    });
  });
});
