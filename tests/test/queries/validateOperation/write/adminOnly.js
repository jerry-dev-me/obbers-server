const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const datasets = require("../../../../data/datasets");
const create = require("../../../../data/crud/create");
const update = require("../../../../data/crud").update;

describe("\n testing operation: create", async function() {
  this.timeout(0);

  before(async function() {
    await update.user.account.permissions.admin(testData.testUser.id);
  });
  after(async function() {
    await update.user.account.permissions.readWrite(testData.testUser.id);
  });

  describe("\n testing restriction: adminOnly", async function() {


    describe("\n testing refType: document", async function() {
      describe("\n testing allRefs: false", async function() {
      });
      describe("\n testing allRefs: true", async function() {
      });
      it("validateOperation", async function() {
        const validation = await q.validateOperation({
          info: {
            userId: testData.testUser.id,
            operation: "create",
            model: "response",
            adminOnly: true
          },
          references: [
            {
              refType: "documentFields",
              value: {
                userId: adminUserId,
                commentId: testData.testUser.response2.id,
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
      describe("\n testing allRefs: false", async function() {
      });
      describe("\n testing allRefs: true", async function() {
      });
      it("validateOperation", async function() {
        const validation = await q.validateOperation({
          info: {
            userId: testData.testUser.id,
            operation: "create",
            model: "response",
            adminOnly: true
          },
          references: [
            {
              refType: "documentFields",
              value: {
                userId: adminUserId,
                commentId: testData.testUser.response2.id,
                content: "test response by admin user"
              }
            },
            {
              refType: "refObject",
              value: {
                model: "response",
                id: testData.testUser.response2.id
              },
              restriction: { type: "adminOnly", allRefs: true }
            }
          ]
        });
        console.log(validation);
      });
    });

    describe("\n testing refType: arrayOfRefObjects", async function() {
      describe("\n testing allRefs: false", async function() {
      });
      describe("\n testing allRefs: true", async function() {
      });
      it("validateOperation", async function() {
        const validation = await q.validateOperation({
          info: {
            userId: testData.testUser.id,
            operation: "create",
            model: "response",
            adminOnly: true
          },
          references: [
            {
              refType: "documentFields",
              value: {
                userId: adminUserId,
                commentId: testData.testUser.response2.id,
                content: "test response by admin user"
              }
            },
            {
              refType: "refObjectsArr",
              value: [
                { model: "response", id: id },
                { model: "response", id: id },
                { model: "response", id: id }
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
