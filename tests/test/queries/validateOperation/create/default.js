const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const datasets = require("../../../../data/datasets");
const create = require("../../../../data/crud/create");

describe("\n testing operation: create", async function() {
  this.timeout(0);

  describe("\n testing restriction: default", async function() {
    describe("\n testing refType: fields", async function() {
      it("\n testing allRefs: false", async function() {
        const docsWithDirectRefs = testData.defaultRestriction.directRefs;
        const docs = docsWithDirectRefs.validationSuccessExpected;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testData.testUserId,
                operation: "create",
                model: "response",
                adminOnly: false
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testData.testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  },
                  restriction: { type: "selfOnly", allRefs: false }
                }
              ]
            });
            // console.log(validation);
            assert(validation !== false);
          })
        );
      });
      it("\n testing allRefs: true", async function() {
        const docsWithDeepRefs = testData.defaultRestriction.deepRefs;
        const docs = docsWithDeepRefs.validationSuccessExpected;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testData.testUserId,
                operation: "create",
                model: "response",
                adminOnly: false
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testData.testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  },
                  restriction: { type: "selfOnly", allRefs: true }
                }
              ]
            });
            // console.log(validation);
            assert(validation !== false);
          })
        );
      });
    });

    describe("\n testing refType: document", async function() {
      it("\n testing allRefs: false", async function() {
        const docsWithDirectRefs = testData.defaultRestriction.directRefs;
        const docs = docsWithDirectRefs.validationSuccessExpected;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testData.testUserId,
                operation: "create",
                model: "response",
                adminOnly: false
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testData.testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  },
                  restriction: { type: "selfOnly", allRefs: false }
                },
                {
                  refType: "refObject",
                  value: {
                    model: doc.model,
                    id: doc.id
                  },
                  restriction: { type: "default", allRefs: false }
                }
              ]
            });
            // console.log(validation);
            assert(validation !== false);
          })
        );
      });
      it("\n testing allRefs: true", async function() {
        const docsWithDirectRefs = testData.defaultRestriction.directRefs;
        const docs = docsWithDirectRefs.validationSuccessExpected;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testData.testUserId,
                operation: "create",
                model: "response",
                adminOnly: false
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testData.testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  },
                  restriction: { type: "selfOnly", allRefs: false }
                },
                {
                  refType: "refObject",
                  value: {
                    model: doc.model,
                    id: doc.id
                  },
                  restriction: { type: "default", allRefs: false }
                }
              ]
            });
            // console.log(validation);
            assert(validation !== false);
          })
        );
      });
    });

    describe("\n testing refType: refObject", async function() {
      it("\n testing allRefs: false", async function() {
        const docsWithDirectRefs = testData.defaultRestriction.directRefs;
        const docs = docsWithDirectRefs.validationSuccessExpected;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testData.testUserId,
                operation: "create",
                model: "response",
                adminOnly: false
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testData.testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  },
                  restriction: { type: "selfOnly", allRefs: false }
                },
                {
                  refType: "refObject",
                  value: {
                    model: doc.model,
                    id: doc.id
                  },
                  restriction: { type: "default", allRefs: false }
                }
              ]
            });
            // console.log(validation);
            assert(validation !== false);
          })
        );
      });
      it("\n testing allRefs: true", async function() {
        const docsWithDirectRefs = testData.defaultRestriction.directRefs;
        const docs = docsWithDirectRefs.validationSuccessExpected;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testData.testUserId,
                operation: "create",
                model: "response",
                adminOnly: false
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testData.testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  },
                  restriction: { type: "selfOnly", allRefs: false }
                },
                {
                  refType: "refObject",
                  value: {
                    model: doc.model,
                    id: doc.id
                  },
                  restriction: { type: "default", allRefs: false }
                }
              ]
            });
            // console.log(validation);
            assert(validation !== false);
          })
        );
      });
    });

    describe("\n testing refType: arrayOfRefObjects", async function() {
      it("\n testing allRefs: false", async function() {
        const docsWithDirectRefs = testData.defaultRestriction.directRefs;
        const docs = docsWithDirectRefs.validationSuccessExpected;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testData.testUserId,
                operation: "create",
                model: "response",
                adminOnly: false
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testData.testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  },
                  restriction: { type: "selfOnly", allRefs: false }
                },
                {
                  refType: "refObject",
                  value: {
                    model: doc.model,
                    id: doc.id
                  },
                  restriction: { type: "default", allRefs: false }
                }
              ]
            });
            // console.log(validation);
            assert(validation !== false);
          })
        );
      });
      it("\n testing allRefs: true", async function() {
        const docsWithDirectRefs = testData.defaultRestriction.directRefs;
        const docs = docsWithDirectRefs.validationSuccessExpected;

        await Promise.all(
          docs.map(async doc => {
            if (doc.model === "response") return;

            const validation = await q.validateOperation({
              info: {
                userId: testData.testUserId,
                operation: "create",
                model: "response",
                adminOnly: false
              },
              references: [
                {
                  refType: "fields",
                  model: "response",
                  value: {
                    userId: testData.testUserId,
                    commentId: doc.id,
                    content: "test response by testUser"
                  },
                  restriction: { type: "selfOnly", allRefs: false }
                },
                {
                  refType: "refObject",
                  value: {
                    model: doc.model,
                    id: doc.id
                  },
                  restriction: { type: "default", allRefs: false }
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
