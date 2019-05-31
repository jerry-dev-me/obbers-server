const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "BLOCKED-USERS"; // logSubgroup

describe("\ntest data creators: create blocked users", async function() {
  this.timeout(0);

  beforeEach(async () => {});

  it("existing users block existing users", async () => {
    const users1 = await create.users.newPrivateUsers(2);
    const users2 = await create.users.newPrivateUsers(2);
    const blockedUsers = await create.blockedUsers.existingUsersBlockExistingUsers(
      users1.ids,
      users2.ids
    );
    console.log("\nusers1");
    console.log(users1.ids);
    console.log("\nusers2");
    console.log(users2.ids);
    console.log("\nblockedUsers");
    console.log(blockedUsers);
  });

  it("existing users block new users", async () => {
    const users = await create.users.newPublicUsers(2);
    const blockedUsers = await create.blockedUsers.existingUsersBlockNewUsers(
      users.ids,
      2
    );
    console.log("\nuserIds");
    console.log(users.ids);
    console.log("\nblockedUsers");
    console.log(blockedUsers);
  });

  it("new users block existing users", async () => {
    const users = await create.users.newPublicUsers(2);
    const blockedUsers = await create.blockedUsers.newUsersBlockExistingUsers(
      2,
      users.ids
    );
    console.log("\nuserIds");
    console.log(users.ids);
    console.log("\nblockedUsers");
    console.log(blockedUsers);
  });

  it("new users block new users", async () => {
    const blockedUsers = await create.blockedUsers.newUsersBlockNewUsers(2, 2);
    console.log("\nblockedUsers");
    console.log(blockedUsers);
  });
});
