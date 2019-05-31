// const logger = require("../../../../../../lib/logger");
// const lG = "TEST-QUERIES-FEATURES"; // logGroup
// const lS = "USER-R-COLLECTIONS"; // logSubgroup
//
// const assert = require("assert");
// const c = require("../../../../../../app/config/constants");
// const q = require("../../../../../../app/queries");
// const h = require("../../../../../helpers");
// const update = require("../../../../../data/crud").update;
//
// const queryFunc = async readerId =>
//   await q.features.user.read.collections(readerId);
//
// describe("\n query function: user.read.collections()", async function() {
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
//     describe("\n ref documents", async () => {
//     describe("\n account status", async () => {
//       it("user account status is ACTIVE", async () => {
//         // await update.user.account.status.active(userId);
//         const doxumentId = data.refs.accountStatus.user1.doxument1.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("user account status is INACTIVE", async () => {
//         // await update.user.account.status.inactive(userId);
//         const doxumentId = data.refs.accountStatus.user1.doxument2.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("user account status is SUSPENDED", async () => {
//         // await update.user.account.status.suspended(userId);
//         const doxumentId = data.refs.accountStatus.user1.doxument3.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("user account status is BANNED", async () => {
//         // await update.user.account.status.banned(userId);
//         const doxumentId = data.refs.accountStatus.user1.doxument4.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("user account is deleted", async () => {
//         const doxumentId = data.refs.accountStatus.user1.doxument5.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       // after(async () => await update.user.account.status.active(userId));
//     });
//     describe("\n social connections", async () => {
//       it("private user, following", async () => {
//         const doxumentId = data.socialConnections.user1.doxument1.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("public user, following", async () => {
//         const doxumentId = data.socialConnections.user1.doxument2.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("private user, following, blocked testUser", async () => {
//         const doxumentId = data.socialConnections.user1.doxument3.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, following, blocked testUser", async () => {
//         const doxumentId = data.socialConnections.user1.doxument4.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("private user, not following", async () => {
//         const doxumentId = data.socialConnections.user1.doxument5.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, not following", async () => {
//         const doxumentId = data.socialConnections.user1.doxument6.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("private user, not following, blocked testUser", async () => {
//         const doxumentId = data.socialConnections.user1.doxument7.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, not following, blocked testUser", async () => {
//         const doxumentId = data.socialConnections.user1.doxument8.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//     });
//     describe("\n nonexistent documents", async () => {
//       it("nonexistent document", async () => {
//         const doxumentId = data.refs.nonexistent.user1.doxument1.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//     });
//   });
//   describe("\n document model fields validation", async () => {
//     it("valid fields", async () => {});
//     it("invalid fields", async () => {});
//     it("other userId refId fields", async () => {});
//     it("deleted refId fields", async () => {});
//     it("empty fields", async () => {});
//     it("missing fields", async () => {});
//   });
//
//   describe("\n ADMIN only", async () => {
//     it("account permissions ADMIN", async () => {
//       await update.user.account.permissions.admin(testUserId);
//       const doxumentId = data.adminOnly.user1.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("account permissions not ADMIN", async () => {
//       await update.user.account.permissions.readWrite(testUserId);
//       const doxumentId = data.adminOnly.user1.doxument1.id;
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
//     it("document from self", async () => {
//       const doxumentId = data.selfOnly.testUser.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("document from other user", async () => {
//       const doxumentId = data.selfOnly.user1.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//   });
//
// describe("\n account status", async () => {
//   describe("\n self", async () => {
//     it("account status is ACTIVE", async () => {
//       await update.user.account.status.active(testUserId);
//       const doxumentId = data.accountStatus.testUser.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("account status is INACTIVE", async () => {
//       await update.user.account.status.inactive(testUserId);
//       const doxumentId = data.accountStatus.testUser.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it("account status is SUSPENDED", async () => {
//       await update.user.account.status.suspended(testUserId);
//       const doxumentId = data.accountStatus.testUser.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("account status is BANNED", async () => {
//       await update.user.account.status.banned(testUserId);
//       const doxumentId = data.accountStatus.testUser.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it("account is deleted", async () => {});
//     after(async () => await update.user.account.status.active(testUserId));
//   });
//   describe("\n other user", async () => {
//     it("account status is ACTIVE", async () => {
//       // await update.user.account.status.active(userId);
//       const doxumentId = data.accountStatus.user1.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("account status is INACTIVE", async () => {
//       // await update.user.account.status.inactive(userId);
//       const doxumentId = data.accountStatus.user2.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it("account status is SUSPENDED", async () => {
//       // await update.user.account.status.suspended(userId);
//       const doxumentId = data.accountStatus.user3.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("account status is BANNED", async () => {
//       // await update.user.account.status.banned(userId);
//       const doxumentId = data.accountStatus.user4.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it("account is deleted", async () => {
//       const doxumentId = data.accountStatus.user5.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     // after(async () => await update.user.account.status.active(userId));
//   });
// });
//
//   describe("\n account permissions", async () => {
//     describe("\n self", async () => {
//       it("account permissions is READ_WRITE", async () => {
//         await update.user.account.permissions.readWrite(testUserId);
//         const doxumentId = data.accountPermissions.user1.doxument1.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("account permissions is READ_ONLY", async () => {
//         await update.user.account.permissions.readOnly(testUserId);
//         const doxumentId = data.accountPermissions.user1.doxument1.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("account permissions is ADMIN", async () => {
//         await update.user.account.permissions.admin(testUserId);
//         const doxumentId = data.accountPermissions.user1.doxument1.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
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
//     it("skip and limit", async () => {
//       const doxumentId = data.many.user1.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//   });
//
//   describe("\n empty documents", async () => {
//     it("no documents", async () => {
//       const doxumentId = data.empty.user1.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//   });
//
//   describe("\n social connections", async () => {
//     it("private user, following", async () => {
//       const doxumentId = data.socialConnections.user1.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("public user, following", async () => {
//       const doxumentId = data.socialConnections.user2.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//     });
//     it("private user, following, blocked testUser", async () => {
//       const doxumentId = data.socialConnections.user3.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it("public user, following, blocked testUser", async () => {
//       const doxumentId = data.socialConnections.user4.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it("private user, not following", async () => {
//       const doxumentId = data.socialConnections.user5.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it("public user, not following", async () => {
//       const doxumentId = data.socialConnections.user6.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(!(funcResults instanceof Error));
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it("private user, not following, blocked testUser", async () => {
//       const doxumentId = data.socialConnections.user7.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//     it("public user, not following, blocked testUser", async () => {
//       const doxumentId = data.socialConnections.user8.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//   });
//
//   describe("\n nonexistent documents", async () => {
//     it("nonexistent document", async () => {
//       const doxumentId = data.nonexistent.user1.doxument1.id;
//       const funcResults = await queryFunc(argumentz);
//       logger.log(lG, lS, null, { funcResults });
//       assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//     });
//   });
//
//   describe("\n ref documents", async () => {
//     describe("\n account status", async () => {
//       it("user account status is ACTIVE", async () => {
//         // await update.user.account.status.active(userId);
//         const doxumentId = data.refs.accountStatus.user1.doxument1.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("user account status is INACTIVE", async () => {
//         // await update.user.account.status.inactive(userId);
//         const doxumentId = data.refs.accountStatus.user1.doxument2.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("user account status is SUSPENDED", async () => {
//         // await update.user.account.status.suspended(userId);
//         const doxumentId = data.refs.accountStatus.user1.doxument3.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("user account status is BANNED", async () => {
//         // await update.user.account.status.banned(userId);
//         const doxumentId = data.refs.accountStatus.user1.doxument4.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("user account is deleted", async () => {
//         const doxumentId = data.refs.accountStatus.user1.doxument5.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       // after(async () => await update.user.account.status.active(userId));
//     });
//     describe("\n social connections", async () => {
//       it("private user, following", async () => {
//         const doxumentId = data.socialConnections.user1.doxument1.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("public user, following", async () => {
//         const doxumentId = data.socialConnections.user1.doxument2.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//       });
//       it("private user, following, blocked testUser", async () => {
//         const doxumentId = data.socialConnections.user1.doxument3.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, following, blocked testUser", async () => {
//         const doxumentId = data.socialConnections.user1.doxument4.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("private user, not following", async () => {
//         const doxumentId = data.socialConnections.user1.doxument5.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, not following", async () => {
//         const doxumentId = data.socialConnections.user1.doxument6.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(!(funcResults instanceof Error));
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("private user, not following, blocked testUser", async () => {
//         const doxumentId = data.socialConnections.user1.doxument7.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//       it("public user, not following, blocked testUser", async () => {
//         const doxumentId = data.socialConnections.user1.doxument8.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//     });
//     describe("\n nonexistent documents", async () => {
//       it("nonexistent document", async () => {
//         const doxumentId = data.refs.nonexistent.user1.doxument1.id;
//         const funcResults = await queryFunc(argumentz);
//         logger.log(lG, lS, null, { funcResults });
//         assert(funcResults instanceof Error);
// assert(funcResults.customErr);
//       });
//     });
//   });
// });
