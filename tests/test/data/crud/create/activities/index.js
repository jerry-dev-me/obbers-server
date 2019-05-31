const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "ACTIVITIES"; // logSubgroup

describe("\ntest data creators: create activities", async function() {
  this.timeout(0);

  let testUser1Id;
  let testUser2Id;
  let testUser3Id;

  beforeEach(async () => {
    const testUser1 = await q.crud.create.user.new(h.fakeFields.user());
    testUser1Id = testUser1._id;

    const testUser2 = await q.crud.create.user.new(h.fakeFields.user());
    testUser2Id = testUser2._id;

    const testUser3 = await q.crud.create.user.new(h.fakeFields.user());
    testUser3Id = testUser3._id;
  });

  it("NEW_POST", async () => {
    const postActivity = await create.activities.newPost(
      [testUser1Id, testUser2Id],
      2
    );
    console.log(postActivity);
  });

  it("NEW_COMMENT", async () => {
    const commentActivity = await create.activities.newComment(
      [testUser1Id, testUser2Id],
      2
    );
    console.log(commentActivity);
  });

  it("NEW_RESPONSE", async () => {
    const responseActivity = await create.activities.newResponse(
      [testUser1Id, testUser2Id],
      2
    );
    console.log(responseActivity);
  });

  it("POST_LIKE", async () => {
    const postActivity = await create.activities.postLike(
      [testUser1Id, testUser2Id],
      2
    );
    console.log(postActivity);
  });

  it("COMMENT_LIKE", async () => {
    const postActivity = await create.activities.commentLike(
      [testUser1Id, testUser2Id],
      2
    );
    console.log(postActivity);
  });

  it("RESPONSE_LIKE", async () => {
    const postActivity = await create.activities.responseLike(
      [testUser1Id, testUser2Id],
      2
    );
    console.log(postActivity);
  });

  it("NEW_FOLLOWING", async () => {
    const postActivity = await create.activities.newFollowing(
      [testUser1Id, testUser2Id],
      2
    );
    console.log(postActivity);
  });

  it("ALL", async () => {
    const allActivities = await create.activities.all(
      [testUser1Id, testUser2Id],
      1
    );
    console.log(allActivities);
  });
});
