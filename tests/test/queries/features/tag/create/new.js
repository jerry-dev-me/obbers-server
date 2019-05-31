// const logger = require("../../../../../../lib/logger");
// const lG = "TEST-QUERIES-FEATURES"; // logGroup
// const lS = "TAG-C-NEW"; // logSubgroup
//
// const assert = require("assert");
// const c = require("../../../../../../app/config/constants");
// const q = require("../../../../../../app/queries");
// const h = require("../../../../../helpers");
// const update = require("../../../../../data/crud").update;
//
// const queryFunc = async (readerId, fields) =>
//   await q.features.tag.create.new(readerId, fields);
//
// describe("\n query function: tag.create.new()", async function() {
//   this.timeout(0);
//
//   let data;
//   let testUserId;
//
//   before(async () => {
//     data = await testData.tag.create();
//     testUserId = data.testUser.id;
//   });
//
//   describe("\n document model fields validation", async () => {
//     it("valid fields", async () => {
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       // assert(funcResults.userId === fields.userId);
//       // assert(funcResults.username === fields.username);
//       // assert(funcResults.position === fields.position);
//       // assert(funcResults.createdAt === fields.createdAt);
//     });
//     it("invalid fields", async () => {
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       // assert(funcResults.moreInfo.error.errors.userId);
//       // assert(funcResults.moreInfo.error.errors.username);
//       // assert(funcResults.moreInfo.error.errors.position);
//     });
//     it("other userId refId fields", async () => {
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       // assert(funcResults.moreInfo.error.errors.userId);
//       // assert(funcResults.moreInfo.error.errors.username);
//       // assert(funcResults.moreInfo.error.errors.position);
//     });
//     it("deleted refId fields", async () => {
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       // assert(funcResults.moreInfo.error.errors.userId);
//       // assert(funcResults.moreInfo.error.errors.username);
//       // assert(funcResults.moreInfo.error.errors.position);
//     });
//     it("empty fields", async () => {
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       // assert(funcResults.moreInfo.error.errors.userId);
//       // assert(funcResults.moreInfo.error.errors.username);
//       // assert(funcResults.moreInfo.error.errors.position);
//     });
//     it("missing fields", async () => {
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       // assert(funcResults.moreInfo.error.errors.userId);
//       // assert(funcResults.moreInfo.error.errors.username);
//       // assert(funcResults.moreInfo.error.errors.position);
//     });
//   });
//
//   describe("\n ADMIN only", async () => {
//     it("account permissions ADMIN", async () => {
//       await update.user.account.permissions.admin(testUserId);
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("account permissions not ADMIN", async () => {
//       await update.user.account.permissions.readWrite(testUserId);
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     after(
//       async () => await update.user.account.permissions.readWrite(testUserId)
//     );
//   });
//
//   describe("\n self only", async () => {
//     it("document from self", async () => {
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("document from other user", async () => {
//       const fields = data;
//       const funcResults = await queryFunc(testUserId, fields);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//   });
//
//   describe("\n account status", async () => {
//     describe("\n self", async () => {
//       it("account status is ACTIVE", async () => {
//         await update.user.account.status.active(testUserId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("account status is INACTIVE", async () => {
//         await update.user.account.status.inactive(testUserId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("account status is SUSPENDED", async () => {
//         await update.user.account.status.suspended(testUserId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("account status is BANNED", async () => {
//         await update.user.account.status.banned(testUserId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("account is deleted", async () => {});
//       after(async () => await update.user.account.status.active(testUserId));
//     });
//     describe("\n other user", async () => {
//       it("account status is ACTIVE", async () => {
//         // await update.user.account.status.active(userId);
//       });
//       it("account status is INACTIVE", async () => {
//         // await update.user.account.status.inactive(userId);
//       });
//       it("account status is SUSPENDED", async () => {
//         // await update.user.account.status.suspended(userId);
//       });
//       it("account status is BANNED", async () => {
//         // await update.user.account.status.banned(userId);
//       });
//       it("account is deleted", async () => {});
//       // after(async () => await update.user.account.status.active(userId));
//     });
//   });
//
//   describe("\n account permissions", async () => {
//     describe("\n self", async () => {
//       it("account permissions is READ_WRITE", async () => {
//         await update.user.account.permissions.readWrite(testUserId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("account permissions is READ_ONLY", async () => {
//         await update.user.account.permissions.readOnly(testUserId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("account permissions is ADMIN", async () => {
//         await update.user.account.permissions.admin(testUserId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       after(
//         async () => await update.user.account.permissions.readWrite(testUserId)
//       );
//     });
//     describe("\n other user", async () => {
//       it("account permissions is READ_WRITE", async () => {
//         // await update.user.account.permissions.readWrite(userId);
//       });
//       it("account permissions is READ_ONLY", async () => {
//         // await update.user.account.permissions.readOnly(userId);
//       });
//       it("account permissions is ADMIN", async () => {
//         // await update.user.account.permissions.admin(userId);
//       });
//       // after(async () => await update.user.account.permissions.readWrite(userId));
//     });
//   });
//
//   describe("\n many documents", async () => {
//     it("skip and limit", async () => {});
//   });
//
//   describe("\n empty documents", async () => {
//     it("no documents", async () => {});
//   });
//
//   describe("\n social connections", async () => {
//     it("private user, following", async () => {});
//     it("public user, following", async () => {});
//     it("private user, following, blocked testUser", async () => {});
//     it("public user, following, blocked testUser", async () => {});
//     it("private user, not following", async () => {});
//     it("public user, not following", async () => {});
//     it("private user, not following, blocked testUser", async () => {});
//     it("public user, not following, blocked testUser", async () => {});
//   });
//
//   describe("\n nonexistent documents", async () => {
//     it("nonexistent document", async () => {});
//   });
//
//   describe("\n ref documents", async () => {
//     describe("\n account status", async () => {
//       it("user account status is ACTIVE", async () => {
//         // await update.user.account.status.active(userId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("user account status is INACTIVE", async () => {
//         // await update.user.account.status.inactive(userId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("user account status is SUSPENDED", async () => {
//         // await update.user.account.status.suspended(userId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("user account status is BANNED", async () => {
//         // await update.user.account.status.banned(userId);
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("user account is deleted", async () => {});
//       // after(async () => await update.user.account.status.active(userId));
//     });
//     describe("\n social connections", async () => {
//       it("private user, following", async () => {
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, following", async () => {
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("private user, following, blocked testUser", async () => {
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, following, blocked testUser", async () => {
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("private user, not following", async () => {
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, not following", async () => {
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("private user, not following, blocked testUser", async () => {
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, not following, blocked testUser", async () => {
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//     });
//     describe("\n nonexistent documents", async () => {
//       it("nonexistent document", async () => {
//         const fields = data;
//         const funcResults = await queryFunc(testUserId, fields);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//     });
//   });
// });
