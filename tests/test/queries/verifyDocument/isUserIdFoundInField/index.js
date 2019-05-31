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

  describe("\nisUserIdFoundInField()", async function() {
    describe("\n.checkId()", async function() {
      it("request", async () => {
        const otherUser = await q.crud.create.user.new(th.fakeFields.user());
        const otherUserId = otherUser._id;

        const requestFields = {
          sentFromUserId: userId,
          sentToUserId: otherUserId,
          createdAt: new Date()
        };

        const request = await q.crud.create.request.new(requestFields);

        const isUserFoundInField_true = await q.verifyDocument.isUserIdFoundInField.request.checkId(
          request._id,
          userId,
          "sentFromUserId"
        );

        const isUserFoundInField_false = await q.verifyDocument.isUserIdFoundInField.request.checkId(
          request._id,
          otherUserId,
          "sentFromUserId"
        );

        console.log(isUserFoundInField_true);
        console.log(isUserFoundInField_false);

        assert(isUserFoundInField_true === true);
        assert(isUserFoundInField_false === false);
      });
    });
  });
});
