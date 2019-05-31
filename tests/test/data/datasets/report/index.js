const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const datasets = require("../../../../data/datasets");
const create = require("../../../../data/crud/create");
const logger = require("../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "DATASETS-REPORT"; // logSubgroup

describe("\n test data datasets report", async function() {
  this.timeout(0);

  let testUser;
  let testUserId;

  beforeEach(async () => {
    testUser = await q.crud.create.user.new(h.fakeFields.user());
    testUserId = testUser._id;
  });

  it("fields", async () => {
    const data = await datasets.report.fields(testUserId);
    console.log(data);
  });

  it("admin only documents", async () => {
    const data = await datasets.report.adminOnly(testUserId);
    console.log(data);
  });

  it("self only documents", async () => {
    const data = await datasets.report.selfOnly(testUserId);
    console.log(data);
  });

  it("account status documents", async () => {
    const data = await datasets.report.accountStatus(testUserId);
    console.log(data);
  });

  it("account permissions documents", async () => {
    const data = await datasets.report.accountPermissions(testUserId);
    console.log(data);
  });

  it("many documents", async () => {
    const data = await datasets.report.many(testUserId);
    console.log(data);
  });

  it("empty documents", async () => {
    const data = await datasets.report.empty(testUserId);
    console.log(data);
  });

  it("social connections", async () => {
    const data = await datasets.report.socialConnections(testUserId);
    console.log(data);
  });

  it("nonexistent documents", async () => {
    const data = await datasets.report.nonexistent(testUserId);
    console.log(data);
  });

  it("ref documents, account status", async () => {
    const data = await datasets.report.refs.accountStatus(testUserId);
    console.log(data);
  });

  it("ref documents, social connections", async () => {
    const data = await datasets.report.refs.socialConnections(testUserId);
    console.log(data);
  });

  it("ref documents, nonexistent", async () => {
    const data = await datasets.report.refs.nonexistent(testUserId);
    console.log(data);
  });

  it("all", async () => {
    const data = await datasets.report.all(testUserId);
    console.log(data);
  });
});
