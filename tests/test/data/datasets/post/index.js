const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const datasets = require("../../../../data/datasets");
const create = require("../../../../data/crud/create");
const logger = require("../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "DATASETS-POST"; // logSubgroup

describe("\n test data datasets post", async function() {
  this.timeout(0);

  let testUser;
  let testUserId;

  beforeEach(async () => {
    testUser = await q.crud.create.user.new(h.fakeFields.user());
    testUserId = testUser._id;
  });

  it("fields", async () => {
    const data = await datasets.post.fields(testUserId);
    console.log(data);
  });

  it("admin only documents", async () => {
    const data = await datasets.post.adminOnly(testUserId);
    console.log(data);
  });

  it("self only documents", async () => {
    const data = await datasets.post.selfOnly(testUserId);
    console.log(data);
  });

  it("account status documents", async () => {
    const data = await datasets.post.accountStatus(testUserId);
    console.log(data);
  });

  it("account permissions documents", async () => {
    const data = await datasets.post.accountPermissions(testUserId);
    console.log(data);
  });

  it("many documents", async () => {
    const data = await datasets.post.many(testUserId);
    console.log(data);
  });

  it("empty documents", async () => {
    const data = await datasets.post.empty(testUserId);
    console.log(data);
  });

  it("social connections", async () => {
    const data = await datasets.post.socialConnections(testUserId);
    console.log(data);
  });

  it("nonexistent documents", async () => {
    const data = await datasets.post.nonexistent(testUserId);
    console.log(data);
  });

  it("ref documents, account status", async () => {
    const data = await datasets.post.refs.accountStatus(testUserId);
    console.log(data);
  });

  it("ref documents, social connections", async () => {
    const data = await datasets.post.refs.socialConnections(testUserId);
    console.log(data);
  });

  it("ref documents, nonexistent", async () => {
    const data = await datasets.post.refs.nonexistent(testUserId);
    console.log(data);
  });

  it("all", async () => {
    const data = await datasets.post.all(testUserId);
    console.log(data);
  });
});
