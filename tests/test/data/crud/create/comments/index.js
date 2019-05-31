const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "COMMENTS"; // logSubgroup

describe("\ntest data creators: create comments", async function() {
  this.timeout(0);

  let users;
  let userIds;
  let user1Id;
  let user2Id;
  let posts;
  let postIds;

  beforeEach(async () => {
    users = await create.users.newPublicUsers(2);
    user1Id = users.ids[0];
    user2Id = users.ids[1];
    posts = await create.posts.fromNewUsers(3, 1);
    postIds = posts.ids;
    console.log("\nuser1Id");
    console.log(user1Id);
    console.log("\nuser2Id");
    console.log(user2Id);
    console.log("\nposts");
    console.log(posts);
  });

  it("comments from existing users on existing posts", async () => {
    const comments = await create.comments
      .fromExistingUsersOnExistingPosts(users.ids, posts.ids, 1);
    console.log("\ncomments");
    console.log(comments);
  });

  it("comments from existing users on new posts", async () => {
    const comments = await create.comments
      .fromExistingUsersOnNewPosts(users.ids, 3, 1);
    console.log("\ncomments");
    console.log(comments);
  });

  it("comments from new users on existing posts", async () => {
    const comments = await create.comments
      .fromNewUsersOnExistingPosts(2, posts.ids, 1);
    console.log("\ncomments");
    console.log(comments);
  });

  it("comments from new users on new posts", async () => {
    const comments = await create.comments
      .fromNewUsersOnNewPosts(2, 3, 1);
    console.log("\ncomments");
    console.log(comments);
  });
});
