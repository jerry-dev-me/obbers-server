// const assert = require("assert");
//
// describe("\nquery function: action.create.new()", async function() {
//   this.timeout(0);
//
//   describe("\ntest: create operations, validate model fields", async function() {
//
//     before(async () => { console.log("BEFORE"); });
//
//     beforeEach(async () => { console.log("BEFORE_EACH"); });
//
//     it("create a new action document with valid fields", async () => { console.log("IT TEST"); });
//
//     it("create a new action document with invalid fields", async () => { console.log("IT TEST"); });
//
//     it("create a new action document with invalid fields", async () => { console.log("IT TEST"); });
//
//     afterEach(async () => { console.log("AFTER_EACH"); });
//
//     after(async () => { console.log("AFTER"); });
//
//   });
//
// });

// ============================================================================

//  // FULL FILE TEMPLATE #1
//
// const assert = require("assert");
// const q = require("../../../../app/queries");
// const th = require("../../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "C-ACTION"; // logSubgroup
//
// describe("\nquery function: action.create.new()", async function() {
//   this.timeout(0);
//
//   const testData = await th.testData.actions();
//
//   describe("\ntest: create operations, validate model fields", async function() {
//
//     before(async () => { console.log("BEFORE"); });
//
//     beforeEach(async () => { console.log("BEFORE_EACH"); });
//
//     it("create a new action document with valid fields", async () => { console.log("IT TEST"); });
//
//     it("create a new action document with invalid fields", async () => { console.log("IT TEST"); });
//
//     afterEach(async () => { console.log("AFTER_EACH"); });
//
//     after(async () => { console.log("AFTER"); });
//   });
//
//   describe("\ntest: crud operations executed based on self user account status and permissions", async function() {
//
//     before(async () => { console.log("BEFORE"); });
//
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
//
//     afterEach(async () => { console.log("AFTER_EACH"); });
//
//     after(async () => { console.log("AFTER"); });
//   });
//
//   describe("\ntest: crud operations executed based on other user account status", async function() {
//
//     before(async () => { console.log("BEFORE"); });
//
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
//
//     afterEach(async () => { console.log("AFTER_EACH"); });
//
//     after(async () => { console.log("AFTER"); });
//   });
//
//   describe("\ntest: crud operations executed based on social connections", async function() {
//
//     before(async () => { console.log("BEFORE"); });
//
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
//
//     afterEach(async () => { console.log("AFTER_EACH"); });
//
//     after(async () => { console.log("AFTER"); });
//   });
//
//   describe("\ntest: crud operations that must be executed by self only", async function() {
//
//     before(async () => { console.log("BEFORE"); });
//
//     beforeEach(async () => {});
//
//     it("testUser does_crud_operation model_document from self", async () => {});
//
//     it("testUser does_crud_operation model_document from other userId", async () => {});
//
//     afterEach(async () => { console.log("AFTER_EACH"); });
//
//     after(async () => { console.log("AFTER"); });
//   });
//
//   describe("\ntest: crud operations where documents exist but query results are equal to an empty array or null", async function() {
//
//     before(async () => { console.log("BEFORE"); });
//
//     beforeEach(async () => {});
//
//     it("testUser does_crud_operation model_document but model_document is null, empty or not found", async () => {});
//
//     afterEach(async () => { console.log("AFTER_EACH"); });
//
//     after(async () => { console.log("AFTER"); });
//   });
//
//   describe("\ntest: crud operations where documents do not exist, undefined", async function() {
//
//     before(async () => { console.log("BEFORE"); });
//
//     beforeEach(async () => {});
//
//     it("testUser does_crud_operation model_document but model_document does not exist", async () => {});
//
//     afterEach(async () => { console.log("AFTER_EACH"); });
//
//     after(async () => { console.log("AFTER"); });
//   });
//
//   describe("\ntest: delete operations, document _id reference should no longer exist", async function() {
//
//     before(async () => { console.log("BEFORE"); });
//
//     beforeEach(async () => {});
//
//     it("testUser deletes model_document, model_document _id ref should no longer exist", async () => {});
//
//     afterEach(async () => { console.log("AFTER_EACH"); });
//
//     after(async () => { console.log("AFTER"); });
//   });
// });

// // ============================================================================
//
//  // FULL FILE TEMPLATE #2
//
// const assert = require("assert");
// const q = require("../../../../app/queries");
// const th = require("../../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "CRUD_OPERATION-MODEL_NAME"; // logSubgroup
//
// let testUserId;
// let _testData;
//
// const _queryFunction = async (args1, args2, args3) =>
//   await q.featuresmodel_name.crud_operation.query_function_name(args1, args2, args3);
//
// describe("\nquery function: model_name.crud_operation.query_function_name()", async function() {
//   this.timeout(0);
//
//   before(async () => {
//     testUserId = testData.testUserId;
//     _testData = testData.model_name;
//   });
//
//   describe("\ntest: crud operations, validate model fields", async function() {
//     describe("\n testUser crud_operation a new model_name document ", async function() {
//       it("with valid fields", async () => {
//       });
//       it("with invalid fields", async () => {
//       });
//     });
//   });
//
//   describe("\ntest: crud operations executed based on self user account status and permissions", async function() {
//     describe("\n testUser crud_operation a new model_name document", async function() {
//       it("testUser account status is ACTIVE", async () => {
//       });
//       it("testUser account status is INACTIVE", async () => {
//       });
//       it("testUser account status is SUSPENDED", async () => {
//       });
//       it("testUser account status is BANNED", async () => {
//       });
//       it("testUser account status is DELETED", async () => {
//       });
//     });
//   });
//
//   describe("\ntest: crud operations executed based on other user account status", async function() {
//     describe("\n testUser crud_operation a model_name document from a 2nd or 3rd userId", async function() {
//       it("userId account status is ACTIVE", async () => {
//       });
//       it("userId account status is INACTIVE", async () => {
//       });
//       it("userId account status is SUSPENDED", async () => {
//       });
//       it("userId account status is BANNED", async () => {
//       });
//       it("userId account status is DELETED", async () => {
//       });
//     });
//   });
//
//   describe("\ntest: crud operations executed based on social connections", async function() {
//     describe("\n testUser crud_operation a model_name document from other userId", async function() {
//       it("testUser is following private userId", async () => {
//       });
//       it("testUser is following public userId", async () => {
//       });
//       it("testUser is following private userId, but userId has blocked testUser", async () => {
//       });
//       it("testUser is following public userId, but userId has blocked testUser", async () => {
//       });
//       it("testUser is not following private userId", async () => {
//       });
//       it("testUser is not following public userId", async () => {
//       });
//     });
//   });
//
//   describe("\ntest: crud operations that must be executed by ADMIN only", async function() {
//     describe("\n testUser crud_operation a model_name document", async function() {
//       it("from self", async () => {
//       });
//       it("from other userId", async () => {
//       });
//       it("from admin userId", async () => {
//       });
//     });
//   });
//
//   describe("\ntest: crud operations that must be executed by self only", async function() {
//     describe("\n testUser crud_operation a model_name document", async function() {
//       it("from self", async () => {
//       });
//       it("from other userId", async () => {
//       });
//     });
//   });
//
//   describe("\ntest: crud operations where documents exist but query results are equal to an empty array or null", async function() {
//     describe("\n testUser crud_operation a model_name document", async function() {
//       it("model_name document is null, empty or not found", async () => {
//       });
//     });
//   });
//
//   describe("\ntest: crud operations where documents do not exist, undefined", async function() {
//     describe("\n testUser crud_operation a model_name document", async function() {
//       it("model_name document does not exist", async () => {
//       });
//     });
//   });
//
//   describe("\ntest: delete operations, document _id references should no longer exist", async function() {
//     describe("\n testUser deletes a model_name document, _id ref should not be found in", async function() {
//       it("some_user other_document_fields", async () => {
//       });
//     });
//   });
// });

// #TEMPLATE v3000
//
// describe("\n query function: activity.create.new()", async function() {
//   describe("\n document model fields validation", async () => {
//     it("valid fields", async () => {
//       const newDocument = await featureOperation(argumentz);
//       assert(newDocument);
//       assert(newDocument.userId === d.fields.valid.userId);
//       assert(newDocument.someField === d.fields.valid.someField);
//       assert(newDocument.refModel === d.fields.valid.refModel);
//       assert(newDocument.refId === d.fields.valid.refId);
//       assert(newDocument.createdAt === d.fields.valid.createdAt);
//       assert(newDocument.modifiedAt === d.fields.valid.modifiedAt);
//     });
//     it("invalid fields", async () => {
//       const newDocument = await featureOperation(argumentz);
//       assert(newDocument instanceof Error);
//       assert(newDocument.errors.userId);
//       assert(newDocument.errors.someField);
//       assert(newDocument.errors.refModel);
//       assert(newDocument.errors.refId);
//     });
//     it("other userId refId fields", async () => {
//       const newDocument = await featureOperation(argumentz);
//       assert(newDocument instanceof Error);
//       assert(newDocument.errors.userId);
//       assert(newDocument.errors.someField);
//       assert(newDocument.errors.refModel);
//       assert(newDocument.errors.refId);
//     });
//     it("deleted refId fields", async () => {
//       const newDocument = await featureOperation(argumentz);
//       assert(newDocument instanceof Error);
//       assert(newDocument.errors.userId);
//       assert(newDocument.errors.someField);
//       assert(newDocument.errors.refModel);
//       assert(newDocument.errors.refId);
//     });
//     it("empty fields", async () => {
//       const newDocument = await featureOperation(argumentz);
//       assert(newDocument instanceof Error);
//       assert(newDocument.errors.userId);
//       assert(newDocument.errors.someField);
//       assert(newDocument.errors.refModel);
//       assert(newDocument.errors.refId);
//     });
//     it("missing fields", async () => {
//       const newDocument = await featureOperation(argumentz);
//       assert(newDocument instanceof Error);
//       assert(newDocument.errors.userId);
//       assert(newDocument.errors.someField);
//       assert(newDocument.errors.refModel);
//       assert(newDocument.errors.refId);
//     });
//   });
//
//   describe("\n ADMIN only", async () => {
//     const updateUser = data.crud.update.user;
//     it("account permissions ADMIN", async () => {
//       await updateUser.account.permissions.admin(testUserId);
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//     });
//     it("account permissions not ADMIN", async () => {
//       await updateUser.account.permissions.readWrite(testUserId);
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation instanceof Error);
//     });
//     after(
//       async () => await updateUser.account.permissions.readWrite(testUserId)
//     );
//   });
//
//   describe("\n self only", async () => {
//     it("document from self", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//     });
//     it("document from other user", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation instanceof Error);
//     });
//   });
//
//   describe("\n account status", async () => {
//     const updateUser = data.crud.update.user;
//     describe("\n self", async () => {
//       it("account status is ACTIVE", async () => {
//         await updateUser.account.status.active(testUserId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//       });
//       it("account status is INACTIVE", async () => {
//         await updateUser.account.status.inactive(testUserId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account status is SUSPENDED", async () => {
//         await updateUser.account.status.suspended(testUserId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account status is BANNED", async () => {
//         await updateUser.account.status.banned(testUserId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       after(async () => await updateUser.account.status.active(testUserId));
//     });
//     describe("\n other user", async () => {
//       it("account status is ACTIVE", async () => {
//         // await updateUser.account.status.active(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account status is INACTIVE", async () => {
//         // await updateUser.account.status.inactive(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account status is SUSPENDED", async () => {
//         // await updateUser.account.status.suspended(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account status is BANNED", async () => {
//         // await updateUser.account.status.banned(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       // after(async () => await updateUser.account.status.active(userId));
//     });
//   });
//
//   describe("\n account permissions", async () => {
//     const updateUser = data.crud.update.user;
//     describe("\n self", async () => {
//       it("account permissions is READ_WRITE", async () => {
//         await updateUser.account.permissions.readWrite(testUserId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account permissions is READ_ONLY", async () => {
//         await updateUser.account.permissions.readOnly(testUserId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account permissions is NONE", async () => {
//         await updateUser.account.permissions.none(testUserId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account permissions is ADMIN", async () => {
//         await updateUser.account.permissions.admin(testUserId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       after(
//         async () => await updateUser.account.permissions.readWrite(testUserId)
//       );
//     });
//     describe("\n other user", async () => {
//       it("account permissions is READ_WRITE", async () => {
//         // await updateUser.account.permissions.readWrite(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account permissions is READ_ONLY", async () => {
//         // await updateUser.account.permissions.readOnly(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account permissions is NONE", async () => {
//         // await updateUser.account.permissions.none(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("account permissions is ADMIN", async () => {
//         // await updateUser.account.permissions.admin(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       // after(async () => await updateUser.account.permissions.readWrite(userId));
//     });
//   });
//
//   describe("\n many documents", async () => {
//     it("skip and limit", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//   });
//
//   describe("\n empty documents", async () => {
//     it("no documents", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//   });
//
//   describe("\n social connections", async () => {
//     it("private user, following", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//     it("public user, following", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//     it("private user, following, blocked testUser", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//     it("public user, following, blocked testUser", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//     it("private user, not following", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//     it("public user, not following", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//     it("private user, not following, blocked testUser", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//     it("public user, not following, blocked testUser", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//   });
//
//   describe("\n nonexistent documents", async () => {
//     it("nonexistent document", async () => {
//       const featureOperation = await featureOperation(argumentz);
//       assert(featureOperation);
//       assert(featureOperation instanceof Error);
//     });
//   });
//
//   describe("\n ref documents", async () => {
//     describe("\n account status", async () => {
//       const updateUser = data.crud.update.user;
//       it("user account status is ACTIVE", async () => {
//         // await updateUser.account.status.active(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("user account status is INACTIVE", async () => {
//         // await updateUser.account.status.inactive(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("user account status is SUSPENDED", async () => {
//         // await updateUser.account.status.suspended(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("user account status is BANNED", async () => {
//         // await updateUser.account.status.banned(userId);
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       // after(async () => await updateUser.account.status.active(userId));
//     });
//     describe("\n social connections", async () => {
//       it("private user, following", async () => {
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("public user, following", async () => {
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("private user, following, blocked testUser", async () => {
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("public user, following, blocked testUser", async () => {
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("private user, not following", async () => {
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("public user, not following", async () => {
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("private user, not following, blocked testUser", async () => {
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//       it("public user, not following, blocked testUser", async () => {
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//     });
//     describe("\n nonexistent documents", async () => {
//       it("nonexistent document", async () => {
//         const featureOperation = await featureOperation(argumentz);
//         assert(featureOperation);
//         assert(featureOperation instanceof Error);
//       });
//     });
//   });
// });
