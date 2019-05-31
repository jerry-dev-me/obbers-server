// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const assert = require("assert");
// const config = require("../config");
//
// let agent;
// let testUser;
// let testData;
// let routeTest;
// let isTestUserCreated = false;
// let isTestDataCreated = false;
//
// const lG = "TESTS-API"; // logGroup
// const lS = "ACTIONS"; // logSubgroup
//
// describe("/api/collections route tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//     // super test agent
//     const supertest = require("supertest");
//     const app = require("../../../server");
//     supertest(config.host);
//     agent = supertest.agent(app);
//
//     // user authentication
//     return new Promise(async (resolve, reject) => {
//       let authRoute;
//       if (isTestUserCreated === false) {
//         authRoute = "/auth/local/signup";
//       }
//       if (isTestUserCreated === true) {
//         authRoute = "/auth/local/signin";
//       }
//
//       agent
//         .post(authRoute)
//         .send({ email: config.testEmail, password: config.testPassword })
//         .end(async (error, res) => {
//           if (error) return reject(error);
//           const User = require("../../../app/models/user");
//           testUser = await User.findOne({ "local.email": config.testEmail });
//           isTestUserCreated = true;
//           console.log("\n authenticated UserId is: " + testUser._id);
//
//           // create test data
//           if (isTestDataCreated === false) {
//             console.log("\nCreating Test Data...");
//             testData = await th.testData.collections(testUser._id);
//             console.log("Test Data Created Successfully:");
//             // console.log(testData);
//             isTestDataCreated = true;
//           }
//           resolve(res);
//         });
//     });
//   });
//
//   // // controller: createCollection()
//   // it("POST /api/collections", async () => {
//   //   const body = { name: "New API Posts Collection" };
//   //   routeTest = () => new Promise(function(resolve, reject) {
//   //     agent
//   //       .post("/api/collections")
//   //       .send(body)
//   //       .expect("Content-type",/json/)
//   //       .expect(200)
//   //       .end((error, res) => {
//   //         if (error) return reject(error);
//   //         return resolve(res);
//   //       })
//   //   });
//   // });
//   //
//   // // controller: readAllCollectionsFromSelf()
//   // it("GET /api/collections", async () => {
//   //   routeTest = () => new Promise(function(resolve, reject) {
//   //     agent
//   //       .get("/api/collections")
//   //       .expect("Content-type",/json/)
//   //       .expect(200)
//   //       .end((error, res) => {
//   //         if (error) return reject(error);
//   //         return resolve(res);
//   //       })
//   //   });
//   // });
//   //
//   // // controller: readCollectionByIdFromSelf()
//   // it("GET /api/collections/self/:id", async () => {
//   //   const id = testData.collection1Id;
//   //   routeTest = () => new Promise(function(resolve, reject) {
//   //     agent
//   //       .get(`/api/collections/self/${id}`)
//   //       .expect("Content-type",/json/)
//   //       .expect(200)
//   //       .end((error, res) => {
//   //         if (error) return reject(error);
//   //         return resolve(res);
//   //       })
//   //   });
//   // });
//   //
//   // // controller: updateCollectionAddPost()
//   // it("PUT /api/collections/:id/add/posts/:postId", async () => {
//   //   const id = testData.collection3Id;
//   //   const postId = testData.post2Id;
//   //   routeTest = () => new Promise(function(resolve, reject) {
//   //     agent
//   //       .put(`/api/collections/${id}/add/posts/${postId}`)
//   //       .expect("Content-type",/json/)
//   //       .expect(200)
//   //       .end((error, res) => {
//   //         if (error) return reject(error);
//   //         return resolve(res);
//   //       })
//   //   });
//   // });
//   //
//   // // controller: updateCollectionRemovePostFromCollection()
//   // it("PUT /api/collections/:id/remove/posts/:postId", async () => {
//   //   const id = testData.collection3Id;
//   //   const postId = testData.post2Id;
//   //   routeTest = () => new Promise(function(resolve, reject) {
//   //     agent
//   //       .put(`/api/collections/${id}/remove/posts/${postId}`)
//   //       .expect("Content-type",/json/)
//   //       .expect(200)
//   //       .end((error, res) => {
//   //         if (error) return reject(error);
//   //         return resolve(res);
//   //       })
//   //   });
//   // });
//   //
//   // // controller: updateCollectionRemovePostFromAllCollections()
//   // it("PUT /api/collections/remove/posts/:postId", async () => {
//   //   const postId = testData.postId1;
//   //   routeTest = () => new Promise(function(resolve, reject) {
//   //     agent
//   //       .put(`/api/collections/remove/posts/${postId}`)
//   //       .expect("Content-type",/json/)
//   //       .expect(200)
//   //       .end((error, res) => {
//   //         if (error) return reject(error);
//   //         return resolve(res);
//   //       })
//   //   });
//   // });
//   //
//   // // controller: updateCollectionName()
//   // it("PUT /api/collections/:id", async () => {
//   //   const id = testData.collection3Id;
//   //   routeTest = () => new Promise(function(resolve, reject) {
//   //     agent
//   //       .put(`/api/collections/${testData.collection3Id}`)
//   //       .expect("Content-type",/json/)
//   //       .expect(200)
//   //       .end((error, res) => {
//   //         if (error) return reject(error);
//   //         return resolve(res);
//   //       })
//   //   });
//   // });
//   //
//   // // controller: deleteCollectionById()
//   // it("DELETE /api/collections/:id", async () => {
//   //   const id = testData.collection3Id;
//   //   routeTest = () => new Promise(function(resolve, reject) {
//   //     agent
//   //       .delete(`/api/collections/${id}`)
//   //       .expect("Content-type",/json/)
//   //       .expect(200)
//   //       .end((error, res) => {
//   //         if (error) return reject(error);
//   //         return resolve(res);
//   //       })
//   //   });
//   // });
//
//   afterEach(async () => {
//     await Promise.all([await routeTest()])
//       .then(promisesResults => {
//         const responseStatus = promisesResults[0].status;
//         const responseBody = promisesResults[0].text;
//         console.log("\nResponse Body is:");
//         console.log(responseBody);
//       })
//       .catch(error => {
//         return error;
//       });
//   });
//
//   after(async () => {
//     await th.dropCollections.all();
//   });
// });
