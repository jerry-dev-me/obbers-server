const assert = require("assert");
const q = require("../../../../../../../../../app/queries");
const h = require("../../../../../../../../helpers");
const datasets = require("../../../../../../../../data/datasets");
const create = require("../../../../../../../../data/crud/create");
const update = require("../../../../../../../../data/crud").update;

describe("\n testing operation: create", async function() {
  this.timeout(0);

  // before(async function() {
  //   await update.user.account.permissions.admin(testUserId);
  // });
  // after(async function() {
  //   await update.user.account.permissions.readWrite(testUserId);
  // });

  describe("\n testing restriction: adminOnly", async function() {

    describe("\n testing refType: document", async function() {

      it("\n validation fail", async function() {
        const testUserId = testData.testUserId;
        const docs = testData.adminOnlyRestriction;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testUserId,
                operation: "create",
                model: "response",
                adminOnly: true
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  }
                },
                {
                  refType: "document",
                  model: "comment",
                  value: (async function() {
                    return await q.crud.read.comment.findById(doc.id);
                  })()
                }
              ]
            });
            // console.log(validation);
            assert(validation === false);
          })
        );
      });

      it("\n validation success", async function() {
        const testUserId = testData.testUserId;
        const docs = testData.adminOnlyRestriction;

        await update.user.account.permissions.admin(testUserId);

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testUserId,
                operation: "create",
                model: "response",
                adminOnly: true
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  }
                },
                {
                  refType: "document",
                  model: "comment",
                  value: (async function() {
                    return await q.crud.read.comment.findById(doc.id);
                  })()
                }
              ]
            });

            // console.log(validation);
            assert(validation !== false);
          })
        );

        await update.user.account.permissions.readWrite(testUserId);
      });
    });
  });
});
