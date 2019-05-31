const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "TAGGED-POSTS"; // logSubgroup

describe("\ntest data creators: create tagged posts", async function() {
  this.timeout(0);

  beforeEach(async () => {

  });

  it("tag existing users on existing posts", async () => {
    const users = await create.users.newPublicUsers(2);
    const posts = await create.posts.fromNewUsers(1, 3);
    const taggedPosts = await create.taggedPosts
      .tagExistingUsersOnExistingPosts(users.ids, posts.ids);
    console.log("\nusers.ids");
    console.log(users.ids);
    console.log("\nposts");
    console.log(posts);
    console.log("\ntaggedPosts");
    console.log(taggedPosts);
  });

  it("tag new users on existing posts", async () => {
    const posts = await create.posts.fromNewUsers(1, 3);
    const taggedPosts = await create.taggedPosts
      .tagNewUsersOnExistingPosts(2, posts.ids);
    console.log("\nposts");
    console.log(posts);
    console.log("\ntaggedPosts");
    console.log(taggedPosts);
  });

  it("tag existing users on new posts", async () => {
    const users = await create.users.newPublicUsers(2);
    const taggedPosts = await create.taggedPosts
      .tagExistingUsersOnNewPosts(users.ids, 3);
    console.log("\nusers.ids");
    console.log(users.ids);
    console.log("\ntaggedPosts");
    console.log(taggedPosts);
  });

  it("tag new users on new posts", async () => {
    const taggedPosts = await create.taggedPosts
      .tagNewUsersOnNewPosts(2, 3);
    console.log("\ntaggedPosts");
    console.log(taggedPosts);
  });
});
