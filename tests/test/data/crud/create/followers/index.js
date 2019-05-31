const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "FOLLOWERS"; // logSubgroup

describe("\ntest data creators: create users followers", async function() {
  this.timeout(0);

  beforeEach(async () => {});

  it("new public users followers of existing users", async () => {
    const users = await create.users.newPublicUsers(2);
    const testUser1Id = users.ids[0];
    const testUser2Id = users.ids[1];
    const followers = await create.followers.newPublicUsersFollowExistingUsers(
      3,
      [testUser1Id, testUser2Id]
    );
    console.log("\ntestUser1Id");
    console.log(testUser1Id);
    console.log("\ntestUser2Id");
    console.log(testUser2Id);
    console.log("\nfollowers");
    console.log(followers);
  });

  it("new private users followers of existing users", async () => {
    const users = await create.users.newPublicUsers(2);
    const testUser1Id = users.ids[0];
    const testUser2Id = users.ids[1];
    const followers = await create.followers.newPrivateUsersFollowExistingUsers(
      3,
      [testUser1Id, testUser2Id]
    );
    console.log("\ntestUser1Id");
    console.log(testUser1Id);
    console.log("\ntestUser2Id");
    console.log(testUser2Id);
    console.log("\nfollowers");
    console.log(followers);
  });

  it("existing users followers of existing users", async () => {
    const usersFollowers = await create.users.newPublicUsers(2);
    const usersToFollow = await create.users.newPrivateUsers(2);
    const userFollower1Id = usersFollowers.ids[0];
    const userFollower2Id = usersFollowers.ids[1];
    const usersToFollow1Id = usersToFollow.ids[0];
    const usersToFollow2Id = usersToFollow.ids[1];
    const followers = await create.followers.existingUsersFollowExistingUsers(
      [userFollower1Id, userFollower2Id],
      [usersToFollow1Id, usersToFollow2Id]
    );

    console.log("\nusersFollowers");
    console.log(usersFollowers.ids);

    console.log("\nusersToFollow");
    console.log(usersToFollow.ids);

    // console.log("\nfollowers");
    // console.log(followers);

    console.log("\nfollowers by userId");
    console.log(followers.documentsByUserId);

    const o = followers.documentsByUserId;

    const key1 = Object.keys(o)[0];
    const val1 = o[key1];

    const key2 = Object.keys(o)[1];
    const val2 = o[key2];

    console.log("\n user1: " + key1);
    console.log("followers are:");
    val1.map(user => {
      console.log("userId: " + user._id);
      console.log("following:");
      console.log(user.following);
    });

    console.log("\n user2: " + key2);
    console.log("followers are:");
    val2.map(user => {
      console.log("userId: " + user._id);
      console.log("following:");
      console.log(user.following);
    });
  });
});
