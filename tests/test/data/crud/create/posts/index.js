const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "CREATE-POSTS"; // logSubgroup

describe("\ntest data creators: create posts", async function() {
  this.timeout(0);

  it("existing users create new posts", async () => {
    const users = await create.users.newPublicUsers(2);
    const posts = await create.posts.fromExistingUserIds(users.ids, 3);
    console.log("\nuserIds");
    console.log(users.ids);
    console.log("\nposts");
    console.log(posts);
  });

  it("new users create new posts", async () => {
    const posts = await create.posts.fromNewUsers(2, 3);
    console.log("\nposts");
    console.log(posts);
  });
});
