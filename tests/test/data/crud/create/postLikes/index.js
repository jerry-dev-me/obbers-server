const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "POST-LIKES"; // logSubgroup

describe("\ntest data creators: create post likes", async function() {
  this.timeout(0);

  let users;
  let userIds;
  let posts;
  let postIds;

  beforeEach(async () => {
    users = await create.users.newPublicUsers(2);
    userIds = users.ids;
    posts = await create.posts.fromNewUsers(3, 1);
    postIds = posts.ids;
    console.log("\nuserIds");
    console.log(userIds);
    console.log("\npostIds");
    console.log(postIds);
  });

  it("likes from existing users on existing posts", async () => {
    const likes = await create.postLikes.existingUsersLikeExistingPosts(users.ids, posts.ids);
    console.log("\nlikes");
    console.log(likes);
  });

  it("likes from existing users on new posts", async () => {
    const likes = await create.postLikes.existingUsersLikeNewPosts(users.ids, 3);
    console.log("\nlikes");
    console.log(likes);
  });

  it("likes from new users on existing posts", async () => {
    const likes = await create.postLikes.newUsersLikeExistingPosts(2, posts.ids);
    console.log("\nlikes");
    console.log(likes);
  });

  it("likes from new users on new posts", async () => {
    const likes = await create.postLikes.newUsersLikeNewPosts(3, 3);
    console.log("\nlikes");
    console.log(likes);
  });
});
