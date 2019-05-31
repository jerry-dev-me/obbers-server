const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "ARCHIVED-POSTS"; // logSubgroup

describe("\ntest data creators: create archived posts", async function() {
  this.timeout(0);

  beforeEach(async () => {

  });

  it("existing user archives existing posts", async () => {
    const users = await create.users.newPublicUsers(1);
    const posts = await create.posts.fromExistingUserIds(users.ids, 3);
    const archivedPosts = await create.archivedPosts
      .existingUserArchiveExistingPosts(users.ids[0], posts.ids);
    // console.log("\nuserIds");
    // console.log(userIds);
    // console.log("\nposts");
    // console.log(posts);
    console.log("\narchivedPosts");
    console.log(archivedPosts);
  });

  it("existing users archive new posts", async () => {
    const users = await create.users.newPublicUsers(2);
    const archivedPosts = await create.archivedPosts
      .existingUsersArchiveNewPosts(users.ids, 3);
    // console.log("\nusers");
    // console.log(users);
    console.log("\narchivedPosts");
    console.log(archivedPosts);
  });

  it("new users archive new posts", async () => {
    const archivedPosts = await create.archivedPosts
      .newUsersArchiveNewPosts(2, 3);
    console.log("\narchivedPosts");
    console.log(archivedPosts);
  });
});
