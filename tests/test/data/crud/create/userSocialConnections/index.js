const mongoose = require("mongoose");
const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const u = require("../../../../../../utils");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "USER-SOCIAL-CONNECTIONS"; // logSubgroup

describe("\ntest data creators: create user social connections", async function() {
  this.timeout(0);

  let testUserId;

  before(async () => {
    const testUser = await q.crud.create.user.new(h.fakeFields.user());
    testUserId = testUser._id;
  });

  it("social connections", async () => {
    const testUserSocialConnections = await create.userSocialConnections(
      testUserId
    );

    const testUserDoc = await q.crud.read.user.findById(testUserId);

    const user1Doc = await q.crud.read.user.findById(
      testUserSocialConnections.user1.id
    );
    const user2Doc = await q.crud.read.user.findById(
      testUserSocialConnections.user2.id
    );
    const user3Doc = await q.crud.read.user.findById(
      testUserSocialConnections.user3.id
    );
    const user4Doc = await q.crud.read.user.findById(
      testUserSocialConnections.user4.id
    );
    const user5Doc = await q.crud.read.user.findById(
      testUserSocialConnections.user5.id
    );
    const user6Doc = await q.crud.read.user.findById(
      testUserSocialConnections.user6.id
    );
    const user7Doc = await q.crud.read.user.findById(
      testUserSocialConnections.user7.id
    );
    const user8Doc = await q.crud.read.user.findById(
      testUserSocialConnections.user8.id
    );

    // user1: private profile, testUser is following this user
    assert(user1Doc.account.status === "ACTIVE");
    assert(user1Doc.settings.private === true);
    assert(u.isIdFoundInArray(user1Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user1Doc.followers) === true);
    assert(u.isIdFoundInArray(testUserId, user1Doc.blockedUsers) === false);

    // user2: public profile, testUser is following this user
    assert(user2Doc.account.status === "ACTIVE");
    assert(user2Doc.settings.private === false);
    assert(u.isIdFoundInArray(user2Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user2Doc.followers) === true);
    assert(u.isIdFoundInArray(testUserId, user2Doc.blockedUsers) === false);

    // user3: private profile, testUser is following this user, has blocked testUser
    assert(user3Doc.account.status === "ACTIVE");
    assert(user3Doc.settings.private === true);
    assert(u.isIdFoundInArray(user3Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user3Doc.followers) === true);
    assert(u.isIdFoundInArray(testUserId, user3Doc.blockedUsers) === true);

    // user4: public profile, testUser is following this user, has blocked testUser
    assert(user4Doc.account.status === "ACTIVE");
    assert(user4Doc.settings.private === false);
    assert(u.isIdFoundInArray(user4Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user4Doc.followers) === true);
    assert(u.isIdFoundInArray(testUserId, user4Doc.blockedUsers) === true);

    // user5: private profile, testUser is not following this user
    assert(user5Doc.account.status === "ACTIVE");
    assert(user5Doc.settings.private === true);
    assert(u.isIdFoundInArray(user5Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user5Doc.followers) === false);
    assert(u.isIdFoundInArray(testUserId, user5Doc.blockedUsers) === false);

    // user6: public profile, testUser is not following this user
    assert(user6Doc.account.status === "ACTIVE");
    assert(user6Doc.settings.private === false);
    assert(u.isIdFoundInArray(user6Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user6Doc.followers) === false);
    assert(u.isIdFoundInArray(testUserId, user6Doc.blockedUsers) === false);

    // user7: private profile, testUser is not following this user, has blocked testUser
    assert(user7Doc.account.status === "ACTIVE");
    assert(user7Doc.settings.private === true);
    assert(u.isIdFoundInArray(user7Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user7Doc.followers) === false);
    assert(u.isIdFoundInArray(testUserId, user7Doc.blockedUsers) === true);

    // user8: public profile, testUser is not following this user, has blocked testUser
    assert(user8Doc.account.status === "ACTIVE");
    assert(user8Doc.settings.private === false);
    assert(u.isIdFoundInArray(user8Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user8Doc.followers) === false);
    assert(u.isIdFoundInArray(testUserId, user8Doc.blockedUsers) === true);
  });
});
