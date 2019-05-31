const mongoose = require("mongoose");
const assert = require("assert");
const q = require("../../../../../../app/queries");
const h = require("../../../../../helpers");
const u = require("../../../../../../utils");
const create = require("../../../../../data/crud/create");
const logger = require("../../../../../../lib/logger");

const lG = "TESTS-TEST-DATA"; // logGroup
const lS = "USER-SOCIAL-CONNECTIONS"; // logSubgroup

describe("\ntest data creators: create users account status", async function() {
  this.timeout(0);

  let testUserId;

  before(async () => {
    const testUser = await q.crud.create.user.new(h.fakeFields.user());
    testUserId = testUser._id;
  });

  it("social connections", async () => {
    const usersAccountStatus = await create.usersAccountStatus(testUserId);

    const testUserDoc = await q.crud.read.user.findById(testUserId);

    const user1Doc = await q.crud.read.user.findById(
      usersAccountStatus.user1.id
    );
    const user2Doc = await q.crud.read.user.findById(
      usersAccountStatus.user2.id
    );
    const user3Doc = await q.crud.read.user.findById(
      usersAccountStatus.user3.id
    );
    const user4Doc = await q.crud.read.user.findById(
      usersAccountStatus.user4.id
    );
    const user5Doc = await q.crud.read.user.findById(
      usersAccountStatus.user5.id
    );
    const user6Doc = await q.crud.read.user.findById(
      usersAccountStatus.user6.id
    );
    const user7Doc = await q.crud.read.user.findById(
      usersAccountStatus.user7.id
    );
    const user8Doc = await q.crud.read.user.findById(
      usersAccountStatus.user8.id
    );
    const user9Doc = await q.crud.read.user.findById(
      usersAccountStatus.user9.id
    );
    const user10Doc = await q.crud.read.user.findById(
      usersAccountStatus.user10.id
    );
    const user11Doc = await q.crud.read.user.findById(
      usersAccountStatus.user11.id
    );
    const user12Doc = await q.crud.read.user.findById(
      usersAccountStatus.user12.id
    );
    const user13Doc = await q.crud.read.user.findById(
      usersAccountStatus.user13.id
    );
    const user14Doc = await q.crud.read.user.findById(
      usersAccountStatus.user14.id
    );
    const user15Doc = await q.crud.read.user.findById(
      usersAccountStatus.user15.id
    );
    const user16Doc = await q.crud.read.user.findById(
      usersAccountStatus.user16.id
    );
    const user17Doc = await q.crud.read.user.findById(
      usersAccountStatus.user17.id
    );
    const user18Doc = await q.crud.read.user.findById(
      usersAccountStatus.user18.id
    );
    const user19Doc = await q.crud.read.user.findById(
      usersAccountStatus.user19.id
    );
    const user20Doc = await q.crud.read.user.findById(
      usersAccountStatus.user20.id
    );

    // user1: private profile, testUser is following this user, account status ACTIVE
    assert(user1Doc.account.status === "ACTIVE");
    assert(user1Doc.settings.private === true);
    assert(u.isIdFoundInArray(user1Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user1Doc.followers) === true);

    // user2: private profile, testUser is following this user, account status INACTIVE
    assert(user2Doc.account.status === "INACTIVE");
    assert(user2Doc.settings.private === true);
    assert(u.isIdFoundInArray(user2Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user2Doc.followers) === true);

    // user3: private profile, testUser is following this user, account status SUSPENDED
    assert(user3Doc.account.status === "SUSPENDED");
    assert(user3Doc.settings.private === true);
    assert(u.isIdFoundInArray(user3Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user3Doc.followers) === true);

    // user4: private profile, testUser is following this user, account status BANNED
    assert(user4Doc.account.status === "BANNED");
    assert(user4Doc.settings.private === true);
    assert(u.isIdFoundInArray(user4Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user4Doc.followers) === true);

    // user5: private profile, testUser is following this user, user account is deleted
    assert(user5Doc === null);

    // user6: public profile, testUser is following this user, account status ACTIVE
    assert(user6Doc.account.status === "ACTIVE");
    assert(user6Doc.settings.private === false);
    assert(u.isIdFoundInArray(user6Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user6Doc.followers) === true);

    // user7: public profile, testUser is following this user, account status INACTIVE
    assert(user7Doc.account.status === "INACTIVE");
    assert(user7Doc.settings.private === false);
    assert(u.isIdFoundInArray(user7Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user7Doc.followers) === true);

    // user8: public profile, testUser is following this user, account status SUSPENDED
    assert(user8Doc.account.status === "SUSPENDED");
    assert(user8Doc.settings.private === false);
    assert(u.isIdFoundInArray(user8Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user8Doc.followers) === true);

    // user9: public profile, testUser is following this user, account status BANNED
    assert(user9Doc.account.status === "BANNED");
    assert(user9Doc.settings.private === false);
    assert(u.isIdFoundInArray(user9Doc._id, testUserDoc.following) === true);
    assert(u.isIdFoundInArray(testUserDoc._id, user9Doc.followers) === true);

    // user10: public profile, testUser is following this user, user account is deleted
    assert(user10Doc === null);

    // user11: private profile, testUser is not following this user, account status ACTIVE
    assert(user11Doc.account.status === "ACTIVE");
    assert(user11Doc.settings.private === true);
    assert(u.isIdFoundInArray(user11Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user11Doc.followers) === false);

    // user12: private profile, testUser is not following this user, account status INACTIVE
    assert(user12Doc.account.status === "INACTIVE");
    assert(user12Doc.settings.private === true);
    assert(u.isIdFoundInArray(user12Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user12Doc.followers) === false);

    // user13: private profile, testUser is not following this user, account status SUSPENDED
    assert(user13Doc.account.status === "SUSPENDED");
    assert(user13Doc.settings.private === true);
    assert(u.isIdFoundInArray(user13Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user13Doc.followers) === false);

    // user14: private profile, testUser is not following this user, account status BANNED
    assert(user14Doc.account.status === "BANNED");
    assert(user14Doc.settings.private === true);
    assert(u.isIdFoundInArray(user14Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user14Doc.followers) === false);

    // user15: private profile, testUser is not following this user, user account is deleted
    assert(user15Doc === null);

    // user16: public profile, testUser is not following this user, account status ACTIVE
    assert(user16Doc.account.status === "ACTIVE");
    assert(user16Doc.settings.private === false);
    assert(u.isIdFoundInArray(user16Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user16Doc.followers) === false);

    // user17: public profile, testUser is not following this user, account status INACTIVE
    assert(user17Doc.account.status === "INACTIVE");
    assert(user17Doc.settings.private === false);
    assert(u.isIdFoundInArray(user17Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user17Doc.followers) === false);

    // user18: public profile, testUser is not following this user, account status SUSPENDED
    assert(user18Doc.account.status === "SUSPENDED");
    assert(user18Doc.settings.private === false);
    assert(u.isIdFoundInArray(user18Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user18Doc.followers) === false);

    // user19: public profile, testUser is not following this user, account status BANNED
    assert(user19Doc.account.status === "BANNED");
    assert(user19Doc.settings.private === false);
    assert(u.isIdFoundInArray(user19Doc._id, testUserDoc.following) === false);
    assert(u.isIdFoundInArray(testUserDoc._id, user19Doc.followers) === false);

    // user20: public profile, testUser is not following this user, user account is deleted
    assert(user20Doc === null);
  });
});
