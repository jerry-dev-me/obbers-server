const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "RESPONSES"; // logSubgroup

describe("\ntest data creators: create responses", async function() {
  this.timeout(0);

  let users;
  let comments;

  beforeEach(async () => {
    users = await create.users.newPublicUsers(2);
    comments = await create.comments.fromNewUsersOnNewPosts(1, 1, 1);
    console.log("\nusers");
    console.log(users.ids);
    console.log("\ncomments");
    console.log(comments.ids);
  });

  it("responses from existing users on existing comments", async () => {
    const responses = await create.responses
      .fromExistingUsersOnExistingComments(users.ids, comments.ids, 3);
    console.log("\nresponses");
    console.log(responses);
  });

  it("responses from existing users on new comments", async () => {
    const responses = await create.responses
      .fromExistingUsersOnNewComments(users.ids, 3, 1);
    console.log("\nresponses");
    console.log(responses);
  });

  it("responses from new users on existing comments", async () => {
    const responses = await create.responses
      .fromNewUsersOnExistingComments(3, comments.ids, 3);
    console.log("\nresponses");
    console.log(responses);
  });

  it("responses from new users on new comments", async () => {
    const responses = await create.responses
      .fromNewUsersOnNewComments(3, 3, 1);
    console.log("\nresponses");
    console.log(responses);
  });
});
