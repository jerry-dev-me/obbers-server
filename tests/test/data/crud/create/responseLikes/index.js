const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "RESPONSE-LIKES"; // logSubgroup

describe("\ntest data creators: create response likes", async function() {
  this.timeout(0);

  let users;
  let responses;

  beforeEach(async () => {
    users = await create.users.newPublicUsers(2);
    responses = await create.responses.fromNewUsersOnNewComments(3, 1, 1);
    console.log("\nusers");
    console.log(users.ids);
    console.log("\nresponses");
    console.log(responses.ids);
  });

  it("likes from existing users on existing responses", async () => {
    const likes = await create.responseLikes
      .existingUsersLikeExistingResponses(users.ids, responses.ids);
    console.log("\nlikes");
    console.log(likes);
  });

  it("likes from existing users on new responses", async () => {
    const likes = await create.responseLikes
      .existingUsersLikeNewResponses(users.ids, 3);
    console.log("\nlikes");
    console.log(likes);
  });

  it("likes from new users on existing responses", async () => {
    const likes = await create.responseLikes
      .newUsersLikeExistingResponses(3, responses.ids);
    console.log("\nlikes");
    console.log(likes);
  });

  it("likes from new users on new responses", async () => {
    const likes = await create.responseLikes
      .newUsersLikeNewResponses(3, 3);
    console.log("\nlikes");
    console.log(likes);
  });
});
