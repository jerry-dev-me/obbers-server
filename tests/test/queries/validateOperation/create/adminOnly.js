const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const datasets = require("../../../../data/datasets");
const create = require("../../../../data/crud/create");
const update = require("../../../../data/crud").update;

describe("\n testing operation: create", async function() {
  this.timeout(0);

  before(async function() {
    await update.user.account.permissions.admin(testUserId);
  });
  after(async function() {
    await update.user.account.permissions.readWrite(testUserId);
  });

  // const testUserId = testData.testUserId;
  // const comment1 = testData.documentsWithDeeperRefs.fromUsersStatus.comment11;
  // const comment2 = testData.documentsWithDirectRefs.fromUsersStatus.comment11;
  // const comment3 = testData.fromSocialConnections.fromUsersStatus.comment7;

  describe("\n testing restriction: adminOnly", async function() {
    describe("\n testing refType: documentFields", async function() {
      it("validateOperation", async function() {
        const validation = await q.validateOperation({
          info: {
            userId: testUserId,
            operation: "create",
            model: "response",
            adminOnly: true
          },
          references: [
            {
              refType: "documentFields",
              value: {
                userId: testUserId,
                commentId: comment1Id,
                content: "test response by admin user"
              }
            }
          ]
        });
        console.log(validation);
      });
    });

    describe("\n testing refType: document", async function() {
      it("validateOperation", async function() {
        const validation = await q.validateOperation({
          info: {
            userId: testUserId,
            operation: "create",
            model: "response",
            adminOnly: true
          },
          references: [
            {
              refType: "documentFields",
              value: {
                userId: testUserId,
                commentId: comment1Id,
                content: "test response by admin user"
              }
            },
            {
              refType: "document",
              value: {
                // comment document
              },
              restriction: { type: "adminOnly", allRefs: true }
            }
          ]
        });
        console.log(validation);
      });
    });

    describe("\n testing refType: refObject", async function() {
      it("validateOperation", async function() {
        const validation = await q.validateOperation({
          info: {
            userId: testUserId,
            operation: "create",
            model: "response",
            adminOnly: true
          },
          references: [
            {
              refType: "documentFields",
              value: {
                userId: testUserId,
                commentId: comment1Id,
                content: "test response by admin user"
              }
            },
            {
              refType: "refObject",
              value: {
                model: "comment",
                id: comment1Id
              },
              restriction: { type: "adminOnly", allRefs: true }
            }
          ]
        });
        console.log(validation);
      });
    });

    describe("\n testing refType: arrayOfRefObjects", async function() {
      it("validateOperation", async function() {
        const validation = await q.validateOperation({
          info: {
            userId: testUserId,
            operation: "create",
            model: "response",
            adminOnly: true
          },
          references: [
            {
              refType: "documentFields",
              value: {
                userId: testUserId,
                commentId: comment1Id,
                content: "test response by admin user"
              }
            },
            {
              refType: "refObjectsArr",
              value: [
                { model: "comment", id: comment1Id },
                { model: "comment", id: comment2Id },
                { model: "comment", id: comment3Id }
              ],
              restriction: { type: "adminOnly", allRefs: true }
            }
          ]
        });
        console.log(validation);
      });
    });
  });
});
