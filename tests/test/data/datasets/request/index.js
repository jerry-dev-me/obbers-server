const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const datasets = require("../../../../data/datasets");
const create = require("../../../../data/crud/create");
const logger = require("../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "DATASETS-REQUEST"; // logSubgroup

describe("\n test data datasets request", async function() {
  this.timeout(0);

  let testUser;
  let testUserId;

  beforeEach(async () => {
    testUser = await q.crud.create.user.new(h.fakeFields.user());
    testUserId = testUser._id;
  });

  it("fields", async () => {
    const data = await datasets.request.fields(testUserId);
    console.log(data);
  });

  it("admin only documents", async () => {
    const data = await datasets.request.adminOnly(testUserId);
    console.log(data);
  });

  it("self only documents", async () => {
    const data = await datasets.request.selfOnly(testUserId);
    console.log(data);
  });

  it("account status documents", async () => {
    const data = await datasets.request.accountStatus(testUserId);
    console.log(data);
  });

  it("account permissions documents", async () => {
    const data = await datasets.request.accountPermissions(testUserId);
    console.log(data);
  });

  it("many documents", async () => {
    const data = await datasets.request.many(testUserId);
    console.log(data);
  });

  it("empty documents", async () => {
    const data = await datasets.request.empty(testUserId);
    console.log(data);
  });

  it("social connections", async () => {
    const data = await datasets.request.socialConnections(testUserId);
    console.log(data);
  });

  it("nonexistent documents", async () => {
    const data = await datasets.request.nonexistent(testUserId);
    console.log(data);
  });

  it("ref documents, account status", async () => {
    const data = await datasets.request.refs.accountStatus(testUserId);
    console.log(data);
  });

  it("ref documents, social connections", async () => {
    const data = await datasets.request.refs.socialConnections(testUserId);
    console.log(data);
  });

  it("ref documents, nonexistent", async () => {
    const data = await datasets.request.refs.nonexistent(testUserId);
    console.log(data);
  });

  it("all", async () => {
    const data = await datasets.request.all(testUserId);
    console.log(data);
  });
});
