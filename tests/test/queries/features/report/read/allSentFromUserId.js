const logger = require("../../../../../../lib/logger");
const lG = "TEST-QUERIES-FEATURES"; // logGroup
const lS = "REPORT-R-SENT-FROM"; // logSubgroup

const assert = require("assert");
const c = require("../../../../../../app/config/constants");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const update = require("../../../../../data/crud").update;

const queryFunc = async (readerId, sentFromUserId) =>
  await q.features.report.read.allSentFromUserId(readerId, sentFromUserId);

describe("\n query function: report.read.allSentFromUserId()", async function() {
  this.timeout(0);

  let data;
  let testUserId;

  before(async () => {
    data = await testData.report.all();
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
    it("document from self", async () => {});
    it("document from other user", async () => {});
  });

  describe("\n account status", async () => {
    describe("\n self", async () => {
      it("account status is ACTIVE", async () => {});
      it("account status is INACTIVE", async () => {});
      it("account status is SUSPENDED", async () => {
        // await update.user.account.status.suspended(testUserId);
      });
      it("account status is BANNED", async () => {
        // await update.user.account.status.banned(testUserId);
      });
      it("account is deleted", async () => {});
      // after(async () => await update.user.account.status.active(testUserId));
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
        // await update.user.account.permissions.readWrite(testUserId);
      });
      it("account permissions is READ_ONLY", async () => {
        // await update.user.account.permissions.readOnly(testUserId);
      });
      it("account permissions is ADMIN", async () => {
        // await update.user.account.permissions.admin(testUserId);
      });
      // after(
      //   async () => await update.user.account.permissions.readWrite(testUserId)
      // );
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
      await update.user.account.permissions.admin(testUserId);
      const userId = data.many.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    after(
      async () => await update.user.account.permissions.readWrite(testUserId)
    );
  });

  describe("\n empty documents", async () => {
    it("no documents", async () => {
      await update.user.account.permissions.admin(testUserId);
      const userId = data.empty.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(!(funcResults instanceof Error));
    });
    after(
      async () => await update.user.account.permissions.readWrite(testUserId)
    );
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
      await update.user.account.permissions.admin(testUserId);
      const userId = data.nonexistent.user1.id;
      const funcResults = await queryFunc(testUserId, userId);
      logger.log(lG, lS, null, { funcResults });
      assert(funcResults instanceof Error);
      assert(funcResults.customErr);
    });
    after(
      async () => await update.user.account.permissions.readWrite(testUserId)
    );
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
