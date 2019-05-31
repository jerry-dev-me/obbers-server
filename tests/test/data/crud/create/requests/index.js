const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "REQUESTS"; // logSubgroup

describe("\ntest data creators: create requests", async function() {
  this.timeout(0);

  beforeEach(async () => {});

  it("existing users send requests to existing users", async () => {
    const users1 = await create.users.newPublicUsers(2);
    const users2 = await create.users.newPrivateUsers(3);
    const requests = await create.requests.fromExistingUsersToExistingUsers(
      users1.ids,
      users2.ids
    );
    console.log("\nusers1");
    console.log(users1);
    console.log("\nusers2");
    console.log(users2);
    console.log("\nrequests");
    console.log(requests);
  });

  it("new users send requests to existing users", async () => {
    const users2 = await create.users.newPrivateUsers(3);
    const requests = await create.requests.fromNewUsersToExistingUsers(
      2,
      users2.ids
    );
    console.log("\nusers2");
    console.log(users2);
    console.log("\nrequests");
    console.log(requests);
  });

  it("existing users send requests to new users", async () => {
    const users = await create.users.newPublicUsers(2);
    const requests = await create.requests.fromExistingUsersToNewUsers(
      users.ids,
      3
    );
    console.log("\nusers");
    console.log(users);
    console.log("\nrequests");
    console.log(requests);
  });

  it("new users send requests to new users", async () => {
    const requests = await create.requests.fromNewUsersToNewUsers(2, 3);
    console.log("\nrequests");
    console.log(requests);
  });
});
