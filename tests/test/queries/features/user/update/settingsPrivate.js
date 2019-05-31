// const logger = require("../../../../../../lib/logger");
// const lG = "TEST-QUERIES-FEATURES"; // logGroup
// const lS = "USER-U-SETTINGS-PRIVATE"; // logSubgroup
//
// const assert = require("assert");
// const c = require("../../../../../../app/config/constants");
// const q = require("../../../../../../app/queries");
// const h = require("../../../../../helpers");
// const update = require("../../../../../data/crud").update;
//
// const queryFunc = {
//   true: async writerId => {
//     return await q.user.update.settingsPrivate.true(writerId);
//   },
//   false: async writerId => {
//     return await q.user.update.settingsPrivate.false(writerId);
//   },
//   toggle: async writerId => {
//     return await q.user.update.settingsPrivate.toggle(writerId);
//   }
// };
//
// // const queryFunc = async () => await q.user.update.settingsPrivate(writerId);
//
// describe("\n query function: user.update.settingsPrivate()", async function() {
//   this.timeout(0);
//
//   let data;
//   let testUserId;
//
//   before(async () => {
//     data = await testData.user.all();
//     testUserId = data.testUser.id;
//   });
//
//   describe("\n document model fields validation", async () => {
//     it("valid fields", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults.userId === d.fields.valid.userId);
//       assert(funcResults.someField === d.fields.valid.someField);
//       assert(funcResults.refModel === d.fields.valid.refModel);
//       assert(funcResults.refId === d.fields.valid.refId);
//       assert(funcResults.createdAt === d.fields.valid.createdAt);
//       assert(funcResults.modifiedAt === d.fields.valid.modifiedAt);
//     });
//     it.skip("invalid fields", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       assert(funcResults.errors.userId);
//       assert(funcResults.errors.someField);
//       assert(funcResults.errors.refModel);
//       assert(funcResults.errors.refId);
//     });
//     it.skip("other userId refId fields", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       assert(funcResults.errors.userId);
//       assert(funcResults.errors.someField);
//       assert(funcResults.errors.refModel);
//       assert(funcResults.errors.refId);
//     });
//     it.skip("deleted refId fields", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       assert(funcResults.errors.userId);
//       assert(funcResults.errors.someField);
//       assert(funcResults.errors.refModel);
//       assert(funcResults.errors.refId);
//     });
//     it.skip("empty fields", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       assert(funcResults.errors.userId);
//       assert(funcResults.errors.someField);
//       assert(funcResults.errors.refModel);
//       assert(funcResults.errors.refId);
//     });
//     it.skip("missing fields", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       assert(funcResults.errors.userId);
//       assert(funcResults.errors.someField);
//       assert(funcResults.errors.refModel);
//       assert(funcResults.errors.refId);
//     });
//   });
//
//   describe("\n ADMIN only", async () => {
//     it("account permissions ADMIN", async () => {
//       await update.user.account.permissions.admin(testUserId);
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it.skip("account permissions not ADMIN", async () => {
//       await update.user.account.permissions.readWrite(testUserId);
//       const funcResults = await queryFunc(argumentz);
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
//     it.skip("document from self", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it.skip("document from other user", async () => {
//       const funcResults = await queryFunc(argumentz);
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
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it.skip("account status is INACTIVE", async () => {
//         await update.user.account.status.inactive(testUserId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account status is SUSPENDED", async () => {
//         await update.user.account.status.suspended(testUserId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account status is BANNED", async () => {
//         await update.user.account.status.banned(testUserId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account is deleted", async () => {});
//       after(async () => await update.user.account.status.active(testUserId));
//     });
//     describe("\n other user", async () => {
//       it("account status is ACTIVE", async () => {
//         // await update.user.account.status.active(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account status is INACTIVE", async () => {
//         // await update.user.account.status.inactive(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account status is SUSPENDED", async () => {
//         // await update.user.account.status.suspended(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account status is BANNED", async () => {
//         // await update.user.account.status.banned(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account is deleted", async () => {});
//       // after(async () => await update.user.account.status.active(userId));
//     });
//   });
//
//   describe("\n account permissions", async () => {
//     describe("\n self", async () => {
//       it.skip("account permissions is READ_WRITE", async () => {
//         await update.user.account.permissions.readWrite(testUserId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account permissions is READ_ONLY", async () => {
//         await update.user.account.permissions.readOnly(testUserId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account permissions is ADMIN", async () => {
//         await update.user.account.permissions.admin(testUserId);
//         const funcResults = await queryFunc(argumentz);
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
//       it.skip("account permissions is READ_WRITE", async () => {
//         // await update.user.account.permissions.readWrite(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account permissions is READ_ONLY", async () => {
//         // await update.user.account.permissions.readOnly(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("account permissions is ADMIN", async () => {
//         // await update.user.account.permissions.admin(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       // after(async () => await update.user.account.permissions.readWrite(userId));
//     });
//   });
//
//   describe("\n many documents", async () => {
//     it.skip("skip and limit", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//   });
//
//   describe("\n empty documents", async () => {
//     it.skip("no documents", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//   });
//
//   describe("\n social connections", async () => {
//     it.skip("private user, following", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it.skip("public user, following", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it.skip("private user, following, blocked testUser", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it.skip("public user, following, blocked testUser", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it.skip("private user, not following", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it.skip("public user, not following", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it.skip("private user, not following, blocked testUser", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it.skip("public user, not following, blocked testUser", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//   });
//
//   describe("\n nonexistent documents", async () => {
//     it.skip("nonexistent document", async () => {
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//   });
//
//   describe("\n ref documents", async () => {
//     describe("\n account status", async () => {
//       it.skip("user account status is ACTIVE", async () => {
//         // await update.user.account.status.active(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("user account status is INACTIVE", async () => {
//         // await update.user.account.status.inactive(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("user account status is SUSPENDED", async () => {
//         // await update.user.account.status.suspended(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("user account status is BANNED", async () => {
//         // await update.user.account.status.banned(userId);
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("user account is deleted", async () => {});
//       // after(async () => await update.user.account.status.active(userId));
//     });
//     describe("\n social connections", async () => {
//       it.skip("private user, following", async () => {
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("public user, following", async () => {
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("private user, following, blocked testUser", async () => {
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("public user, following, blocked testUser", async () => {
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("private user, not following", async () => {
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("public user, not following", async () => {
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("private user, not following, blocked testUser", async () => {
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it.skip("public user, not following, blocked testUser", async () => {
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//     });
//     describe("\n nonexistent documents", async () => {
//       it.skip("nonexistent document", async () => {
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//     });
//   });
// });
