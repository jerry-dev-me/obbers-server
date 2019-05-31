const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "COMMENT-LIKES"; // logSubgroup

describe("\ntest data creators: create comment likes", async function() {
  this.timeout(0);

  let users;
  let comments;
  let commentIds;

  beforeEach(async () => {
    users = await create.users.newPublicUsers(2);
    comments = await create.comments.fromNewUsersOnNewPosts(3, 1, 1);
    commentIds = comments.ids;
    console.log("\nuserIds");
    console.log(users.ids);
    console.log("\ncomments");
    console.log(comments);
    console.log("\ncommentIds");
    console.log(commentIds);
  });

  it("likes from existing users on existing comments", async () => {
    const commentLikes = await create.commentLikes
      .existingUsersLikeExistingComments(users.ids, commentIds);
    console.log("\ncommentLikes");
    console.log(commentLikes);
  });

  it("likes from existing users on new comments", async () => {
    const commentLikes = await create.commentLikes
      .existingUsersLikeNewComments(users.ids, 3);
    console.log("\ncommentLikes");
    console.log(commentLikes);
  });

  it("likes from new users on existing comments", async () => {
    const commentLikes = await create.commentLikes
      .newUsersLikeExistingComments(3, commentIds);
    console.log("\ncommentLikes");
    console.log(commentLikes);
  });

  it("likes from new users on new comments", async () => {
    const commentLikes = await create.commentLikes
      .newUsersLikeNewComments(3, 2);
    console.log("\ncommentLikes");
    console.log(commentLikes);
  });
});
