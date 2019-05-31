const assert = require("assert");
const q = require("../../../../../app/queries");
const h = require("../../../../helpers");
const datasets = require("../../../../data/datasets");
const create = require("../../../../data/crud/create");

// console.log("\n NEW DATE");
// const date = new Date();
// console.log("\n TO UTC STRING");
// console.log(date.toUTCString());

// user has a response from self refs...
// user reads response from user following, not following post creator (case1: post is private) (case2: post is public)
// user reads response from user following, on comment from following, following post creator
// user reads response from user following, on comment from following, on post from following but post creator blocked testUser
// user reafs response from public user on public post
// user reafs response from public user on private post

describe("\n testing operation: create", async function() {
  this.timeout(0);

  describe("\n testing restriction: selfOnly", async function() {
    describe("\n testing refType: documentFields", async function() {
      describe("\n testing allRefs: false", async function() {
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
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "selfOnly", allRefs: false }
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
              operation: "create",
              model: "response",
              adminOnly: true
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "selfOnly", allRefs: true }
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
              operation: "create",
              model: "response",
              adminOnly: true
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "selfOnly", allRefs: false }
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
              operation: "create",
              model: "response",
              adminOnly: true
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "selfOnly", allRefs: true }
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
              operation: "create",
              model: "response",
              adminOnly: true
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "selfOnly", allRefs: false }
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
              operation: "create",
              model: "response",
              adminOnly: true
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "selfOnly", allRefs: true }
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
              operation: "create",
              model: "response",
              adminOnly: true
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "selfOnly", allRefs: false }
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
              operation: "create",
              model: "response",
              adminOnly: true
            },
            references: [
              {
                refType: "refObject",
                value: {
                  model: "response",
                  id: testData.testUser.response2.id
                },
                restriction: { type: "selfOnly", allRefs: true }
              }
            ]
          });
          console.log(validation);
        });
      });
    });
  });
});
