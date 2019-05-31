const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const d = require("../../../../data");
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
    user = await q.crud.create.user.new(h.fakeFields.user());
    userId = user._id;

    let postFields = h.fakeFields.post({ userId });
    post = await q.crud.create.post.new(postFields);
    postId = post._id;

    let commentFields = h.fakeFields.comment({ userId, postId });
    comment = await q.crud.create.comment.new(commentFields);
    commentId = comment._id;
  });

  beforeEach(async () => {});

  describe("\ngetAllRefIds", async function() {
    describe("\n.checkId()", async function() {
      it("response", async () => {
        const testUser = await q.crud.create.user.new(h.fakeFields.user());
        const users = await d.crud.create.userSocialConnections(testUser._id);

        // console.log("testUser");
        // console.log(testUser._id);
        //
        // console.log("userSocialConnections");
        // console.log(users);

        // response documents:
        // 1 - we can read all refIds [response1]
        // 2 - we cannot read comment refId [response2]
        // 3 - we cannot read post refId [response3]

        const responses1 = async () => {
          const responses = await d.crud.create.responses.fromExistingUsersOnNewComments(
            [users.user1.id],
            1,
            1
          );
          return { id: responses.ids[0], document: responses.documents[0] };
        };

        const responses2 = async () => {
          const comments = await d.crud.create.comments.fromExistingUsersOnNewPosts(
            [users.user3.id],
            1,
            1
          );
          const responses = await d.crud.create.responses.fromNewUsersOnExistingComments(
            1,
            [comments.ids[0]],
            1
          );
          return { id: responses.ids[0], document: responses.documents[0] };
        };

        const responses3 = async () => {
          const posts = await d.crud.create.posts.fromExistingUserIds(
            [users.user3.id],
            1
          );
          const comments = await d.crud.create.comments.fromNewPublicUsersOnExistingPosts(
            1,
            [posts.ids[0]],
            1
          );
          const responses = await d.crud.create.responses.fromNewUsersOnExistingComments(
            1,
            [comments.ids[0]],
            1
          );
          console.log("\n");
          console.log("PostID: " + posts.ids[0]);
          console.log("By UserID: " + users.user3.id);
          console.log("\n");
          console.log("CommentID: " + comments.ids[0]);
          console.log("By UserID: " + comments.documents[0].userId);
          console.log("\n");
          console.log("ResponseID: " + responses.ids[0]);
          console.log("By UserID: " + responses.documents[0].userId);
          return { id: responses.ids[0], document: responses.documents[0] };
        };

        // console.log("responses");
        // console.log(responses);

        const response1 = await responses1();
        const response2 = await responses2();
        const response3 = await responses3();

        // const refIds1 = await q.verifyDocument.getAllRefIds.response.checkId(response1.id);
        // console.log("\n refIds1");
        // console.log(refIds1);

        // const refIds2 = await q.verifyDocument.getAllRefIds.response.checkId(response2.id);
        // console.log("\n refIds2");
        // console.log(refIds2);
        //
        const refIds3 = await q.verifyDocument.getAllRefIds.response.checkId(response3.id);
        console.log("\n refIds3");
        console.log(refIds3);

        // all refIds from a response document...
        // from response document      { model: "user", id: "1" }
        // from response document      { model: "comment", id: "1" }
        // from comment document       { model: "user", id: "1" }
        // from comment document       { model: "post", id: "1" }
        // from post document          { model: "user", id: "1" }

      });
    });
    describe("\n.checkDocument()", async function() {
      it("response", async () => {
        // const getAllRefIds = await q.verifyDocument.getAllRefIds(userId, responseDocument);
      });
    });
  });
});
