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
// const lS = "POSTS"; // logSubgroup
//
// describe.skip("/api/posts routes and controllers tests", async function() {
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
//       if (isTestUserCreated === false) { authRoute = "/auth/local/signup"; };
//       if (isTestUserCreated === true) { authRoute = "/auth/local/signin"; };
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
//             testData = await th.testData.posts(testUser._id);
//             console.log("Test Data Created Successfully:");
//             // console.log(testData);
//             isTestDataCreated = true;
//           }
//           resolve(res);
//         });
//     });
//
//   });
//
//   // POST /api/posts
//   // createPost()
//   it("POST /api/posts", async () => {
//     const userId = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .post(`/api/posts`)
//         .send({})
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/posts/:id
//   // readPostById()
//   it("GET /api/posts/:id", async () => {
//     const userId = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`GET /api/posts/${id}`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // DELETE /api/posts/:id
//   // deletePostById()
//   it("DELETE /api/posts/:id", async () => {
//     const userId = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .delete(`GET /api/posts/${id}`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/posts/users/:userId
//   // readAllPostsByUserId()
//   it("GET /api/posts/users/:userId", async () => {
//     const userId = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .delete(`/api/posts/users/${userId}`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/posts/:id/tags
//   // readPostTags()
//   it("GET /api/posts/:id/tags", async () => {
//     const id = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/posts/${id}/tags`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/posts/:id/likes
//   // readPostLikes()
//   it("GET /api/posts/:id/likes", async () => {
//     const id = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/posts/${id}/likes`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/posts/:id/comments
//   // readPostComments()
//   it("GET /api/posts/:id/comments", async () => {
//     const id = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/posts/${id}/comments`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // PUT /api/posts/:id/caption
//   // updatePostCaption()
//   it("PUT /api/posts/:id/caption", async () => {
//     const caption = "updated post caption";
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/posts/${id}/caption`)
//         .send(caption);
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // PUT /api/posts/:id/comments-enabled
//   // updatePostCommentsEnabled()
//   it("PUT /api/posts/:id/comments-enabled", async () => {
//     const newValue = false;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/posts/${id}/comments-enabled`)
//         .send(newValue);
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
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
//   after(async () => { await th.dropCollections.all() });
// });
