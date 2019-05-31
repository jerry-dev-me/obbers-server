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

  describe("\ngetUserIdCreator()", async function() {
    describe("\n.checkId()", async function() {
      it("post", async () => {
        const userIdCreator = await q.verifyDocument.getUserIdCreator.post.checkId(
          postId
        );
        console.log(userIdCreator);
        assert(userIdCreator.toString() === userId.toString());
      });
      it("comment", async () => {
        const userIdCreator = await q.verifyDocument.getUserIdCreator.comment.checkId(
          commentId
        );
        console.log(userIdCreator);
        assert(userIdCreator.toString() === userId.toString());
      });
    });
    describe("\n.checkDocument()", async function() {
      it("post", async () => {
        const userIdCreator = q.verifyDocument.getUserIdCreator.post.checkDocument(
          post
        );
        console.log(userIdCreator);
        assert(userIdCreator === userId);
      });
      it("comment", async () => {
        const userIdCreator = q.verifyDocument.getUserIdCreator.comment.checkDocument(
          comment
        );
        console.log(userIdCreator);
        assert(userIdCreator === userId);
      });
    });
  });
});
