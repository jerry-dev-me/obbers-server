const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "REPORTS"; // logSubgroup

describe("\ntest data creators: create reports", async function() {
  this.timeout(0);

  beforeEach(async () => {

  });

  it("existing users report existing users", async () => {
    const users1 = await create.users.newPublicUsers(2);
    const users2 = await create.users.newPublicUsers(3);
    const reports = await create.reports
      .fromExistingUsersToExistingUsers(users1.ids, users2.ids);
    console.log("\nusers1Ids");
    console.log(users1.ids);
    console.log("\nusers2Ids");
    console.log(users2.ids);
    console.log("\nreports");
    console.log(reports);
  });

  it("new users report existing users", async () => {
    const users = await create.users.newPublicUsers(3);
    const reports = await create.reports.fromNewUsersToExistingUsers(2, users.ids);
    console.log("\nuserIds");
    console.log(users);
    console.log("\nreports");
    console.log(reports);
  });

  it("existing users report new users", async () => {
    const users = await create.users.newPublicUsers(2);
    const reports = await create.reports.fromExistingUsersToNewUsers(users.ids, 3);
    console.log("\nuserIds");
    console.log(users);
    console.log("\nreports");
    console.log(reports);
  });

  it("new users report new users", async () => {
    const reports = await create.reports.fromNewUsersToNewUsers(2, 3);
    console.log("\nreports");
    console.log(reports);
  });
});
