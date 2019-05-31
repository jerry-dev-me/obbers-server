const assert = require("assert");
const q = require("../../../../app/queries");
const th = require("../../../testHelpers");
const testData = th.testDataCreators;
const logger = require("../../../../lib/logger");

const lG = "TESTS-QUERIES"; // logGroup
const lS = "VERIFY-USER"; // logSubgroup

describe("\nqueries verify user: isSameUser()", async function() {
  this.timeout(0);

  let testUser1;
  let testUser2;
  let testUser1Id;
  let testUser2Id;
  let post;

  before(async () => {
    testUser1 = await q.crud.create.user.new(th.fakeFields.user());
    testUser2 = await q.crud.create.user.new(th.fakeFields.user());
    testUser1Id = testUser1._id;
    testUser2Id = testUser2._id;

    const fields = th.fakeFields.post({ userId: testUser1Id });
    post = await q.crud.create.post.new(fields);
  });

  it("isSameUser === true", async () => {
    const isSameUser = await q.verifyUser.isSameUser(testUser1Id, post.userId);
    console.log("isSameUser === " + isSameUser);
    assert(isSameUser === true);
  });

  it("isSameUser === false", async () => {
    const isSameUser = await q.verifyUser.isSameUser(testUser2Id, post.userId);
    console.log("isSameUser === " + isSameUser);
    assert(isSameUser === false);
  });

});
