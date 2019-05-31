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

  describe("\nisUserIdCreator()", async function() {
    describe("\n.checkId()", async function() {
      it("post", async () => {
        const otherUser = await q.crud.create.user.new(th.fakeFields.user());
        const otherUserId = otherUser._id;

        const isUserIdCreator_true = await q.verifyDocument.isUserIdCreator.post.checkId(
          userId,
          postId
        );
        console.log("\nisUserIdCreator_true");
        console.log(isUserIdCreator_true);

        const isUserIdCreator_false = await q.verifyDocument.isUserIdCreator.post.checkId(
          otherUserId,
          postId
        );
        console.log("\nisUserIdCreator_false");
        console.log(isUserIdCreator_false);

        assert(isUserIdCreator_true === true);
        assert(isUserIdCreator_false === false);
      });
    });
    describe("\n.checkDocument()", async function() {
      it("post", async () => {
        const otherUser = await q.crud.create.user.new(th.fakeFields.user());
        const otherUserId = otherUser._id;

        const isUserIdCreator_true = q.verifyDocument.isUserIdCreator.post.checkDocument(
          userId,
          post
        );
        console.log("\nisUserIdCreator_true");
        console.log(isUserIdCreator_true);

        const isUserIdCreator_false = q.verifyDocument.isUserIdCreator.post.checkDocument(
          otherUserId,
          post
        );
        console.log("\nisUserIdCreator_false");
        console.log(isUserIdCreator_false);

        assert(isUserIdCreator_true === true);
        assert(isUserIdCreator_false === false);
      });
    });
  });
});
