const assert = require("assert");
const q = require("../../../../app/queries");
const th = require("../../../testHelpers");
const testData = th.testDataCreators;
const logger = require("../../../../lib/logger");

const lG = "TESTS-QUERIES"; // logGroup
const lS = "VERIFY-USER"; // logSubgroup

const _q = {
  createTestUser: async () => await q.crud.create.user.new(th.fakeFields.user()),
  setAccountStatusActive: async userId => {
    const fields = { account: { status: "ACTIVE" } };
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  setAccountStatusInactive: async userId => {
    const fields = { account: { status: "INACTIVE" } };
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  setAccountStatusSuspended: async userId => {
    const fields = { account: { status: "SUSPENDED" } };
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  setAccountStatusBanned: async userId => {
    const fields = { account: { status: "BANNED" } };
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  setSettingsPrivateTrue: async userId => {
    const fields = { settings: { private: true } };
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  setSettingsPrivateFalse: async userId => {
    const fields = { settings: { private: false } };
    return await q.crud.update.user.findByIdAndUpdate(userId, fields)
  },
  addFollowing: async (userId, followingId) => {
    const fields = { following: followingId };
    return await q.crud.update.user.findByIdAndAddToSet(userId, fields);
  },
  addFollower: async (userId, followerId) => {
    const fields = { followers: followerId };
    return await q.crud.update.user.findByIdAndAddToSet(userId, fields);
  },
  addBlocked: async (userId, userIdToBlock) => {
    const fields = { blockedUsers: userIdToBlock };
    return await q.crud.update.user.findByIdAndAddToSet(userId, fields);
  },
  canUserReadUser: async (readerId, userIdToRead) => {
    return await q.verifyUser.canUserReadUser(readerId, userIdToRead);
  }
}

describe("\nqueries verify user: canUserReadUser()", async function() {
  this.timeout(0);

  let testUser1;
  let testUser2;

  beforeEach(async () => {
    testUser1 = await _q.createTestUser();
    testUser2 = await _q.createTestUser();
  });

  describe("\n testUser1 account status", async function() {
    let case1 = `
    testUser1 reads tesUser2,
    testUser1 account status is ACTIVE
    testUser1 does not follow testUser2,
    testUser2 settings private is false`;
    it(case1, async () => {
      await _q.setAccountStatusActive(testUser1._id);
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === true);
    });

    let case2 = `
    testUser1 reads tesUser2,
    testUser1 account status is INACTIVE
    testUser1 does not follow testUser2,
    testUser2 settings private is false`;
    it(case2, async () => {
      await _q.setAccountStatusInactive(testUser1._id);
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === false);
    });

    let case3 = `
    testUser1 reads tesUser2,
    testUser1 account status is SUSPENDED
    testUser1 does not follow testUser2,
    testUser2 settings private is false`;
    it(case3, async () => {
      await _q.setAccountStatusSuspended(testUser1._id);
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === true);
    });

    let case4 = `
    testUser1 reads tesUser2,
    testUser1 account status is BANNED
    testUser1 does not follow testUser2,
    testUser2 settings private is false`;
    it(case4, async () => {
      await _q.setAccountStatusBanned(testUser1._id);
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === false);
    });
  });

  describe("\n testUser2 account status", async function() {
    let case1 = `
    testUser1 reads tesUser2,
    testUser1 account status is ACTIVE,
    testUser1 does not follow testUser2,
    testUser2 account status is ACTIVE,
    testUser2 settings private is false`;
    it(case1, async () => {
      await _q.setAccountStatusActive(testUser1._id);
      await _q.setAccountStatusActive(testUser2._id);
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === true);
    });

    let case2 = `
    testUser1 reads tesUser2,
    testUser1 account status is ACTIVE,
    testUser1 does not follow testUser2,
    testUser2 account status is INACTIVE,
    testUser2 settings private is false`;
    it(case2, async () => {
      await _q.setAccountStatusActive(testUser1._id);
      await _q.setAccountStatusInactive(testUser2._id);
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === false);
    });

    let case3 = `
    testUser1 reads tesUser2,
    testUser1 account status is ACTIVE,
    testUser1 does not follow testUser2,
    testUser2 account status is SUSPENDED,
    testUser2 settings private is false`;
    it(case3, async () => {
      await _q.setAccountStatusActive(testUser1._id);
      await _q.setAccountStatusSuspended(testUser2._id);
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === true);
    });

    let case4 = `
    testUser1 reads tesUser2,
    testUser1 account status is ACTIVE,
    testUser1 does not follow testUser2,
    testUser2 account status is BANNED,
    testUser2 settings private is false`;
    it(case4, async () => {
      await _q.setAccountStatusActive(testUser1._id);
      await _q.setAccountStatusBanned(testUser2._id);
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === false);
    });
  });

  describe("\n social connections", async function() {
    let case1 = `
    testUser1 reads tesUser2,
    testUser1 does not follow testUser2,
    testUser2 settings private is false`;
    it(case1, async () => {
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === true);
    });

    let case2 = `
    testUser1 reads tesUser2,
    testUser1 does not follow testUser2,
    testUser2 account settings private is true`;
    it(case2, async () => {
      await _q.setSettingsPrivateTrue(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === false);
    });

    let case3 = `
    testUser1 reads tesUser2,
    testUser1 follows testUser2,
    testUser2 settings private is false`;
    it(case3, async () => {
      await _q.addFollowing(testUser1._id, testUser2._id);
      await _q.addFollower(testUser2._id, testUser1._id);
      await _q.setSettingsPrivateFalse(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === true);
    });

    let case4 = `
    testUser1 reads tesUser2,
    testUser1 follows testUser2,
    testUser2 account settings private is true`;
    it(case4, async () => {
      await _q.addFollowing(testUser1._id, testUser2._id);
      await _q.addFollower(testUser2._id, testUser1._id);
      await _q.setSettingsPrivateTrue(testUser2._id);
      const canUserReadUser =
        await _q.canUserReadUser(testUser1._id, testUser2._id);
      console.log("canUserReadUser: " + canUserReadUser);
      assert(canUserReadUser === true);
    });

    describe("\n social connections blocked user", async function() {
      let case1 = `
      testUser1 reads tesUser2,
      testUser1 does not follow testUser2,
      testUser2 account settings private is false,
      testUser2 has blocked testUser1`;
      it(case1, async () => {
        await _q.setSettingsPrivateFalse(testUser2._id);
        await _q.addBlocked(testUser2._id, testUser1._id);
        const canUserReadUser =
          await _q.canUserReadUser(testUser1._id, testUser2._id);
        console.log("canUserReadUser: " + canUserReadUser);
        assert(canUserReadUser === false);
      });

      let case2 = `
      testUser1 reads tesUser2,
      testUser1 does not follow testUser2,
      testUser2 account settings private is true,
      testUser2 has blocked testUser1`;
      it(case2, async () => {
        await _q.setSettingsPrivateTrue(testUser2._id);
        await _q.addBlocked(testUser2._id, testUser1._id);
        const canUserReadUser =
          await _q.canUserReadUser(testUser1._id, testUser2._id);
        console.log("canUserReadUser: " + canUserReadUser);
        assert(canUserReadUser === false);
      });

      let case3 = `
      testUser1 reads tesUser2,
      testUser1 follows testUser2,
      testUser2 account settings private is false,
      testUser2 has blocked testUser1`;
      it(case3, async () => {
        await _q.addFollowing(testUser1._id, testUser2._id);
        await _q.addFollower(testUser2._id, testUser1._id);
        await _q.setSettingsPrivateFalse(testUser2._id);
        await _q.addBlocked(testUser2._id, testUser1._id);
        const canUserReadUser =
          await _q.canUserReadUser(testUser1._id, testUser2._id);
        console.log("canUserReadUser: " + canUserReadUser);
        assert(canUserReadUser === false);
      });

      let case4 = `
      testUser1 reads tesUser2,
      testUser1 follows testUser2,
      testUser2 account settings private is true,
      testUser2 has blocked testUser1`;
      it(case4, async () => {
        await _q.addFollowing(testUser1._id, testUser2._id);
        await _q.addFollower(testUser2._id, testUser1._id);
        await _q.setSettingsPrivateTrue(testUser2._id);
        await _q.addBlocked(testUser2._id, testUser1._id);
        const canUserReadUser =
          await _q.canUserReadUser(testUser1._id, testUser2._id);
        console.log("canUserReadUser: " + canUserReadUser);
        assert(canUserReadUser === false);
      });
    });
  });
});
