const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "USERS"; // logSubgroup

describe("\ntest data creators: create users", async function() {
  this.timeout(0);

  beforeEach(async () => {

  });

  it("create new public users", async () => {
    const users = await create.users.newPublicUsers(3);
    console.log("\nusers");
    console.log(users);
  });

  it("create new private users", async () => {
    const users = await create.users.newPrivateUsers(3);
    console.log("\nusers");
    console.log(users);
  });

  it("existing public users become private", async () => {
    const publicUsers = await create.users.newPublicUsers(3);
    const publicUsersNowPrivate = await create.users
      .updateUsersSettingsPrivateToTrue(publicUsers.ids);
    console.log("\npublicUsers");
    console.log(publicUsers.documents);
    console.log("\npublicUsersNowPrivate");
    console.log(publicUsersNowPrivate.documents);
  });

  it("existing private users become public", async () => {
    const privateUsers = await create.users.newPrivateUsers(3);
    const privateUsersNowPublic = await create.users
      .updateUsersSettingsPrivateToFalse(privateUsers.ids);
    console.log("\nprivateUsers");
    console.log(privateUsers.documents);
    console.log("\nprivateUsersNowPublic");
    console.log(privateUsersNowPublic.documents);
  });

  it("create new users with user account permissions ADMIN", async () => {
    console.log("\n NEW USER ACCOUNT PERMISSIONS ARE NOW ADMIN:");
    const newUsersAdmin = await create.users.newUsersAdmin(3);
    console.log("\nnewUsersAdmin");
    console.log(newUsersAdmin.documents);
    assert(newUsersAdmin.documents[0].account.permissions === "ADMIN");
    assert(newUsersAdmin.documents[1].account.permissions === "ADMIN");
    assert(newUsersAdmin.documents[2].account.permissions === "ADMIN");
  });

  it("existing user account permissions become ADMIN", async () => {
    const nonAdminUsers = await create.users.newPublicUsers(3);
    const nonAdminUsersNowAdmin = await create.users
      .makeExistingUsersAdmin(nonAdminUsers.ids);
    console.log("\nnonAdminUsers");
    console.log(nonAdminUsers.documents);
    console.log("\nnonAdminUsersNowAdmin");
    console.log(nonAdminUsersNowAdmin.documents);
    assert(nonAdminUsersNowAdmin.documents[0].account.permissions === "ADMIN");
    assert(nonAdminUsersNowAdmin.documents[1].account.permissions === "ADMIN");
    assert(nonAdminUsersNowAdmin.documents[2].account.permissions === "ADMIN");
  });
});
