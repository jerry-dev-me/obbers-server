// const assert = require("assert");
// const q = require("../../../../app/queries");
// const th = require("../../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-ACTION"; // logSubgroup
//
// describe("\ntesting query function: action.create.new", async function() {
//   this.timeout(0);
//
//   describe("\ntest: model fields validation", async function() {
//     beforeEach(async () => {});
//
//     it("create a new action document with valid fields", async () => {});
//
//     it("create a new action document with invalid fields", async () => {});
//   });
//
//   describe("\ntest: crud operations based on self user account status and user account permissions", async function() {
//     beforeEach(async () => {});
//
//     it("create a new action document, testUser account status is ACTIVE", async () => {});
//
//     it("create a new action document, testUser account status is INACTIVE", async () => {});
//
//     it("create a new action document, testUser account status is SUSPENDED", async () => {});
//
//     it("create a new action document, testUser account status is BANNED", async () => {});
//
//     it("create a new action document, testUser account status is DELETED", async () => {});
//   });
//
//   describe("\ntest: crud operations based on 2nd or 3rd user account status", async function() {
//     beforeEach(async () => {});
//
//     it("create a document from a 2nd userId, userId account status is ACTIVE", async () => {});
//
//     it("create a document from a 2nd userId, userId account status is INACTIVE", async () => {});
//
//     it("create a document from a 2nd userId, userId account status is SUSPENDED", async () => {});
//
//     it("create a document from a 2nd userId, userId account status is BANNED", async () => {});
//
//     it("create a document from a 2nd userId, userId account status is DELETED", async () => {});
//   });
//
//   describe("\ntest: crud operations based on social connections", async function() {
//     beforeEach(async () => {});
//
//     it("create a document from another user, testUser is following private userId", async () => {});
//
//     it("create a document from another user, testUser is following public userId", async () => {});
//
//     it("create a document from another user, testUser is following private userId, but userId has blocked testUser", async () => {});
//
//     it("create a document from another user, testUser is following public userId, but userId has blocked testUser", async () => {});
//
//     it("create a document from another user, testUser is not following private userId", async () => {});
//
//     it("create a document from another user, testUser is not following public userId", async () => {});
//   });
//
//   describe("\ntest: crud operations that must be executed by self only", async function() {
//     beforeEach(async () => {});
//
//     it("testUser does_crud_operation model_document from self", async () => {});
//
//     it("testUser does_crud_operation model_document from other userId", async () => {});
//   });
//
//   describe("\ntest: crud operations where documents exist but they are empty", async function() {
//     beforeEach(async () => {});
//
//     it("testUser does_crud_operation model_document but model_document is null, empty or not found", async () => {});
//   });
//
//   describe("\ntest: crud operations where documents does not exist", async function() {
//     beforeEach(async () => {});
//
//     it("testUser does_crud_operation model_document but model_document does not exist", async () => {});
//   });
// });
