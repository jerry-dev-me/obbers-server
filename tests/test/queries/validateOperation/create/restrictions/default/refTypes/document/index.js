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

  describe("\n testing restriction: default", async function() {

    describe("\n testing refType: fields", async function() {

      it("\n validation fail", async function() {
        const testUserId = testData.testUserId;
        const docs = testData.defaultRestriction.directRefs.validationSuccessExpected;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testUserId,
                operation: "create",
                model: "response"
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

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testUserId,
                operation: "create",
                model: "response"
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
                }
              ]
            });

            // console.log(validation);
            assert(validation !== false);
          })
        );
      });
    });
  });
});
