const assert = require("assert");
const q = require("../../../../../app/queries");
const th = require("../../../../helpers");
const testData = th.testDataCreators;
const logger = require("../../../../../lib/logger");

const lG = "TESTS-QUERIES"; // logGroup
const lS = "VERIFY-DOCUMENT"; // logSubgroup

let user;
let userId;

let post;
let postId;

let comment;
let commentId;

describe("\nqueries verify document functions", async function() {
  this.timeout(0);

  before(async () => {
    user = await q.crud.create.user.new(th.fakeFields.user());
    userId = user._id;

    let postFields = th.fakeFields.post({ userId });
    post = await q.crud.create.post.new(postFields);
    postId = post._id;

    let commentFields = th.fakeFields.comment({ userId, postId });
    comment = await q.crud.create.comment.new(commentFields);
    commentId = comment._id;
  });

  beforeEach(async () => {});

  describe("\nexists", async function() {
    describe("\n.checkId()", async function() {
      it("post", async () => {
        const exists_true = await q.verifyDocument.exists.post.checkId(postId);

        const postFields = th.fakeFields.post({ userId });
        const postToDelete = await q.crud.create.post.new(postFields);
        const postToDeleteId = postToDelete._id;

        const deletePost = await q.crud.delete.post.findByIdAndRemove(
          postToDeleteId
        );

        const exists_false = await q.verifyDocument.exists.post.checkId(
          postToDeleteId
        );

        console.log("\nexists_true:\n" + exists_true);
        console.log("\nexists_false: " + exists_false);

        assert(typeof exists_true === "object");
        assert(exists_false === false);
      });
    });
    describe("\n.checkDocument()", async function() {
      it("post", async () => {
        const exists_true = await q.verifyDocument.exists.post.checkDocument(
          post
        );

        const postFields = th.fakeFields.post({ userId });
        const postToDelete = await q.crud.create.post.new(postFields);
        const postToDeleteId = postToDelete._id;

        const deletePost = await q.crud.delete.post.findByIdAndRemove(
          postToDeleteId
        );

        const exists_false = await q.verifyDocument.exists.post.checkDocument(
          postToDelete
        );

        console.log("\nexists_true:\n" + exists_true);
        console.log("\nexists_false: " + exists_false);

        assert(typeof exists_true === "object");
        assert(exists_false === false);
      });
    });
  });
});
