const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const datasets = require("../../../../data/datasets");
const create = require("../../../../data/crud/create");

describe("\n testing operation: write", async function() {
  this.timeout(0);

  describe("\n testing restriction: valueFoundInFields", async function() {
    describe("\n testing refType: documentFields", async function() {
      describe("\n testing allRefs: false", async function() {
        it("validateOperation", async function() {
          const validation = await q.validateOperation({
            info: {
              userId: testData.testUser.id,
              operation: "read",
              model: "comment",
              adminOnly: false
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "valueFoundInFields", allRefs: true }
              }
            ]
          });
          console.log(validation);
        });
      });
      describe("\n testing allRefs: true", async function() {
        it("validateOperation", async function() {
          const validation = await q.validateOperation({
            info: {
              userId: testData.testUser.id,
              operation: "read",
              model: "comment",
              adminOnly: false
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "valueFoundInFields", allRefs: true }
              }
            ]
          });
          console.log(validation);
        });
      });
    });
    describe("\n testing refType: document", async function() {
      describe("\n testing allRefs: false", async function() {
        it("validateOperation", async function() {
          const validation = await q.validateOperation({
            info: {
              userId: testData.testUser.id,
              operation: "read",
              model: "comment",
              adminOnly: false
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "valueFoundInFields", allRefs: true }
              }
            ]
          });
          console.log(validation);
        });
      });
      describe("\n testing allRefs: true", async function() {
        it("validateOperation", async function() {
          const validation = await q.validateOperation({
            info: {
              userId: testData.testUser.id,
              operation: "read",
              model: "comment",
              adminOnly: false
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "valueFoundInFields", allRefs: true }
              }
            ]
          });
          console.log(validation);
        });
      });
    });
    describe("\n testing refType: refObject", async function() {
      describe("\n testing allRefs: false", async function() {
        it("validateOperation", async function() {
          const validation = await q.validateOperation({
            info: {
              userId: testData.testUser.id,
              operation: "read",
              model: "comment",
              adminOnly: false
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "valueFoundInFields", allRefs: true }
              }
            ]
          });
          console.log(validation);
        });
      });
      describe("\n testing allRefs: true", async function() {
        it("validateOperation", async function() {
          const validation = await q.validateOperation({
            info: {
              userId: testData.testUser.id,
              operation: "read",
              model: "comment",
              adminOnly: false
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "valueFoundInFields", allRefs: true }
              }
            ]
          });
          console.log(validation);
        });
      });
    });
    describe("\n testing refType: arrayOfRefObjects", async function() {
      describe("\n testing allRefs: false", async function() {
        it("validateOperation", async function() {
          const validation = await q.validateOperation({
            info: {
              userId: testData.testUser.id,
              operation: "read",
              model: "comment",
              adminOnly: false
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "valueFoundInFields", allRefs: true }
              }
            ]
          });
          console.log(validation);
        });
      });
      describe("\n testing allRefs: true", async function() {
        it("validateOperation", async function() {
          const validation = await q.validateOperation({
            info: {
              userId: testData.testUser.id,
              operation: "read",
              model: "comment",
              adminOnly: false
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "valueFoundInFields", allRefs: true }
              }
            ]
          });
          console.log(validation);
        });
      });
    });
  });
});
