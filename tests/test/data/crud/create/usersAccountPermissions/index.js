const mongoose = require("mongoose");
const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const u = require("../../../../../../utils");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "USER-SOCIAL-CONNECTIONS"; // logSubgroup

describe("\ntest data creators: create users account permissions", async function() {
  this.timeout(0);

  let testUserId;

  before(async () => {
    const testUser = await q.crud.create.user.new(h.fakeFields.user());
    testUserId = testUser._id;
  });

  it("social connections", async () => {
    const usersAccountPermissions = await create.usersAccountPermissions(
      testUserId
    );

    // console.log(usersAccountPermissions);

    const testUserDoc = await q.crud.read.user.findById(testUserId);

    const user1Doc = await q.crud.read.user.findById(
      usersAccountPermissions.user1.id
    );
    const user2Doc = await q.crud.read.user.findById(
      usersAccountPermissions.user2.id
    );
    const user3Doc = await q.crud.read.user.findById(
      usersAccountPermissions.user3.id
    );
    const user4Doc = await q.crud.read.user.findById(
      usersAccountPermissions.user4.id
    );
    const user5Doc = await q.crud.read.user.findById(
      usersAccountPermissions.user5.id
    );
    const user6Doc = await q.crud.read.user.findById(
      usersAccountPermissions.user6.id
    );
    const user7Doc = await q.crud.read.user.findById(
      usersAccountPermissions.user7.id
    );
    const user8Doc = await q.crud.read.user.findById(
      usersAccountPermissions.user8.id
    );
    const user9Doc = await q.crud.read.user.findById(
      usersAccountPermissions.user9.id
    );

    // user1: private profile, testUser is following this user, account permissions READ_WRITE
    assert(user1Doc.account.status === "ACTIVE");
    assert(user1Doc.settings.private === true);
    assert(u.isIdFoundInArray(user1Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user1Doc.followers) === true);
    assert(user1Doc.account.permissions === "READ_WRITE");

    // user2: private profile, testUser is following this user, account permissions READ_ONLY
    assert(user2Doc.account.status === "ACTIVE");
    assert(user2Doc.settings.private === true);
    assert(u.isIdFoundInArray(user2Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user2Doc.followers) === true);
    assert(user2Doc.account.permissions === "READ_ONLY");

    // user3: public profile, testUser is following this user, account permissions READ_WRITE
    assert(user3Doc.account.status === "ACTIVE");
    assert(user3Doc.settings.private === false);
    assert(u.isIdFoundInArray(user3Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user3Doc.followers) === true);
    assert(user3Doc.account.permissions === "READ_WRITE");

    // user4: public profile, testUser is following this user, account permissions READ_ONLY
    assert(user4Doc.account.status === "ACTIVE");
    assert(user4Doc.settings.private === false);
    assert(u.isIdFoundInArray(user4Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user4Doc.followers) === true);
    assert(user4Doc.account.permissions === "READ_ONLY");

    // user5: private profile, testUser is not following this user, account permissions READ_WRITE
    assert(user5Doc.account.status === "ACTIVE");
    assert(user5Doc.settings.private === true);
    assert(u.isIdFoundInArray(user5Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user5Doc.followers) === false);
    assert(user5Doc.account.permissions === "READ_WRITE");

    // user6: private profile, testUser is not following this user, account permissions READ_ONLY
    assert(user6Doc.account.status === "ACTIVE");
    assert(user6Doc.settings.private === true);
    assert(u.isIdFoundInArray(user6Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user6Doc.followers) === false);
    assert(user6Doc.account.permissions === "READ_ONLY");

    // user7: public profile, testUser is not following this user, account permissions READ_WRITE
    assert(user7Doc.account.status === "ACTIVE");
    assert(user7Doc.settings.private === false);
    assert(u.isIdFoundInArray(user7Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user7Doc.followers) === false);
    assert(user7Doc.account.permissions === "READ_WRITE");

    // user8: public profile, testUser is not following this user, account permissions READ_ONLY
    assert(user8Doc.account.status === "ACTIVE");
    assert(user8Doc.settings.private === false);
    assert(u.isIdFoundInArray(user8Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user8Doc.followers) === false);
    assert(user8Doc.account.permissions === "READ_ONLY");

    // user9: public profile, testUser is following this user, account permissions ADMIN
    assert(user9Doc.account.status === "ACTIVE");
    assert(user9Doc.settings.private === false);
    assert(u.isIdFoundInArray(user9Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user9Doc.followers) === false);
    assert(user9Doc.account.permissions === "ADMIN");
  });
});
