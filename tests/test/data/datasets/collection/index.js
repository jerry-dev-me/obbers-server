const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const datasets = require("../../../../data/datasets");
const create = require("../../../../data/crud/create");
const logger = require("../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "DATASETS-COLLECTION"; // logSubgroup

const findPostUserId = async postId => {
  const postDoc = await q.crud.read.post.findById(postId);
  return postDoc.userId;
};

const userAccountStatus = async userId => {
  const foundUser = await q.crud.read.user.findById(userId);
  if (!foundUser) return null;
  return foundUser.account.status;
};

describe("\n test data datasets collection", async function() {
  this.timeout(0);

  let testUser;
  let testUserId;

  beforeEach(async () => {
    testUser = await q.crud.create.user.new(h.fakeFields.user());
    testUserId = testUser._id;
  });

  it("fields", async () => {
    const data = await datasets.collection.fields(testUserId);
    // console.log(data);

    assert(data.valid1 !== null);
    assert(data.valid2 !== null);
    assert(data.invalid !== null);
    assert(data.otherUserId !== null);
    assert(data.deletedRefId !== null);
    assert(data.empty !== null);
    assert(data.missing !== null);
    assert(data.withUsersStatusRefs !== null);
    assert(data.withSocialConnectionsRefs !== null);
    assert(data.withNonexistentRefs !== null);
  });

  it("fields withUsersStatusRefs", async () => {
    const data = await datasets.collection.fields(testUserId);
    // console.log(data);

    const {
      fields1,
      fields2,
      fields3,
      fields4,
      fields5
    } = data.withUsersStatusRefs;

    const user1Id = await findPostUserId(fields1.posts[0]);
    const user2Id = await findPostUserId(fields2.posts[0]);
    const user3Id = await findPostUserId(fields3.posts[0]);
    const user4Id = await findPostUserId(fields4.posts[0]);
    const user5Id = await findPostUserId(fields5.posts[0]);

    const accountStatus1 = await userAccountStatus(user1Id);
    const accountStatus2 = await userAccountStatus(user2Id);
    const accountStatus3 = await userAccountStatus(user3Id);
    const accountStatus4 = await userAccountStatus(user4Id);
    const accountStatus5 = await userAccountStatus(user5Id);

    assert(accountStatus1 === "ACTIVE");
    assert(accountStatus2 === "INACTIVE");
    assert(accountStatus3 === "SUSPENDED");
    assert(accountStatus4 === "BANNED");
    assert(accountStatus5 === null);
  });

  it("admin only documents", async () => {
    const data = await datasets.collection.adminOnly(testUserId);
    console.log(data);
  });

  it("self only documents", async () => {
    const data = await datasets.collection.selfOnly(testUserId);
    console.log(data);
  });

  it("account status documents", async () => {
    const data = await datasets.collection.accountStatus(testUserId);
    console.log(data);
  });

  it("account permissions documents", async () => {
    const data = await datasets.collection.accountPermissions(testUserId);
    console.log(data);
  });

  it("many documents", async () => {
    const data = await datasets.collection.many(testUserId);
    console.log(data);
  });

  it("empty documents", async () => {
    const data = await datasets.collection.empty(testUserId);
    console.log(data);
  });

  it("social connections", async () => {
    const data = await datasets.collection.socialConnections(testUserId);
    console.log(data);
  });

  it("nonexistent documents", async () => {
    const data = await datasets.collection.nonexistent(testUserId);
    console.log(data);
  });

  it("ref documents, account status", async () => {
    const data = await datasets.collection.refs.accountStatus(testUserId);
    console.log(data);
  });

  it("ref documents, social connections", async () => {
    const data = await datasets.collection.refs.socialConnections(testUserId);
    console.log(data);
  });

  it("ref documents, nonexistent", async () => {
    const data = await datasets.collection.refs.nonexistent(testUserId);
    console.log(data);
  });

  it("all", async () => {
    const data = await datasets.collection.all(testUserId);
    console.log(data);
  });
});
