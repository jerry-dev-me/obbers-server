const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "COLLECTIONS"; // logSubgroup

describe("\ntest data creators: create collections", async function() {
  this.timeout(0);

  let users;
  let user1Id;
  let user2Id;
  let posts;
  let user1Collections;
  let user2Collections;
  let collectionIds;

  beforeEach(async () => {
    users = await create.users.newPublicUsers(2);
    user1Id = users.ids[0];
    user2Id = users.ids[1];
    posts = await create.posts.fromNewUsers(3, 1);
    user1Collections = await create.collections.createCollections(user1Id, 2);
    user2Collections = await create.collections.createCollections(user2Id, 2);
    collectionIds = [...user1Collections.ids, ...user2Collections.ids];
    console.log("\nuser1Id");
    console.log(user1Id);
    console.log("\nuser2Id");
    console.log(user2Id);
    console.log("\nposts");
    console.log(posts);
    console.log("\nuser1CollectionIds");
    console.log(user1Collections);
    console.log("\nuser2CollectionIds");
    console.log(user2Collections);
  });

  it("existing users add existing posts to existing collections", async () => {
    const collections = await create.collections.existingUsersAddExistingPostsToExistingCollections(
      users.ids,
      posts.ids,
      collectionIds
    );
    console.log("\ncollections");
    console.log(collections);
  });

  it("existing users add new posts to existing collections", async () => {
    const collections = await create.collections.existingUsersAddNewPostsToExistingCollections(
      users.ids,
      3,
      collectionIds
    );
    console.log("\ncollections");
    console.log(collections);
  });

  it("existing users add existing posts to new collections", async () => {
    const collections = await create.collections.existingUsersAddExistingPostsToNewCollections(
      users.ids,
      posts.ids,
      2
    );
    console.log("\ncollections");
    console.log(collections);
  });

  it("existing users add new posts to new collections", async () => {
    const collections = await create.collections.existingUsersAddNewPostsToNewCollections(
      users.ids,
      2,
      2
    );
    console.log("\ncollections");
    console.log(collections);
  });

  it("new users add existing posts to new collections", async () => {
    const collections = await create.collections.newUsersAddExistingPostsToNewCollections(
      2,
      posts.ids,
      2
    );
    console.log("\ncollections");
    console.log(collections);
  });

  it("new users add new posts to new collections", async () => {
    const collections = await create.collections.newUsersAddNewPostsToNewCollections(
      2,
      2,
      2
    );
    console.log("\ncollections");
    console.log(collections);
  });
});
