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
// const lS = "COMMENTS"; // logSubgroup
//
// describe("/api/comments routes and controllers tests", async function() {
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
//             console.log("\nCreating COMMENTS Test Data...");
//             testData = await th.testData.comments(testUser._id);
//             console.log("Test Data Created Successfully:");
//             // console.log(testData);
//             isTestDataCreated = true;
//           }
//           resolve(res);
//         });
//     });
//   });
//
//   // POST /api/comments
//   // createComment()
//   it("POST /api/comments", async () => {
//     const userId = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .post("/api/comments")
//           .send()
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
//
//   // DELETE /api/comments/:id
//   // deleteCommentById()
//   it("DELETE /api/comments/:id", async () => {
//     const id = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .delete(`/api/comments/${id}`)
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
//
//   // GET /api/comments/posts/:postId
//   // readAllCommentsByPostId()
//   it("GET /api/comments/posts/:postId", async () => {
//     const id = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .get(`/api/comments/posts/${postId}`)
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
//
//   // GET /api/comments/:id/likes
//   // readCommentLikes()
//   it("GET /api/comments/:id/likes", async () => {
//     const id = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .get(`/api/comments/${id}/likes`)
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
//
//   // PUT /api/comments/:id/content
//   // updateCommentContent()
//   it("PUT /api/comments/:id/content", async () => {
//     const id = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .put(`/api/comments/${id}/content`)
//           .send({})
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
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
