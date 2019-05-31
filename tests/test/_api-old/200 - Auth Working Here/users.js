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
// const lS = "USERS"; // logSubgroup
//
// describe("/api/users routes and controllers tests", async function() {
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
//             testData = await th.testData.users(testUser._id);
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
//   // POST /api/users
//   // createUser()
//   it("POST /api/users", async () => {
//     const userId = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .post("/api/users")
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
//   // GET /api/users/:id
//   // readUserById()
//   it("GET /api/users/:id", async () => {
//     const userId = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/users/${id}`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // DELETE /api/users/:id
//   // deleteUserById()
//   it("DELETE /api/users/:id", async () => {
//     const userId = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .deete(`/api/users/${id}`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/:id/profile
//   // readUserProfileById()
//   it("GET /api/users/:id/profile", async () => {
//     const userId = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/users/${id}/profile`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/search?username=username
//   // readUserFindByUsername()
//   it("GET /api/users/search?username=username", async () => {
//     const username = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/users/search?username=${username}`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/search?name=name
//   // readUserFindByName()
//   it("GET /api/users/search?name=name", async () => {
//     const name = testUser._id;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/users/search?name=${name}`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/self/archived
//   // readUserSelfArchivedPosts()
//   it("GET /api/users/self/archived", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get("/api/users/self/archived")
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/self/collections
//   // readUserSelfCollections()
//   it("GET /api/users/self/collections", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get("/api/users/self/collections")
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/:id/following
//   // readUsersFollowing()
//   it("GET /api/users/:id/following", async () => {
//     const id = testData.userId;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/users/${id}/following`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/:id/followers
//   // readUsersFollowers()
//   it("GET /api/users/:id/followers", async () => {
//     const id = testData.userId;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/users/${id}/followers`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/self/requests
//   // readUserSelfRequests()
//   it("GET /api/users/self/requests", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get("/api/users/self/requests")
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/self/blocked
//   // readUserSelfBlockedUsers()
//   it("GET /api/users/self/blocked", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get("/api/users/self/blocked")
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/:id/tagged
//   // readUserTaggedPosts()
//   it("GET /api/users/:id/tagged", async () => {
//     const id = testData.userId;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get(`/api/users/${id}/tagged`)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // GET /api/users/self/liked-posts
//   // readUserSelfLikedPosts()
//   it("GET /api/users/self/liked-posts", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .get("/api/users/self/liked-posts")
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         })
//     });
//   });
//
//   // PUT /api/users/self/email
//   // updateUserSelfEmail()
//   it("PUT /api/users/self/email", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put("/api/users/self/email")
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
//   // PUT /api/users/self/password
//   // updateUserSelfPassword()
//   it("PUT /api/users/self/password", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put("/api/users/self/password")
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
//   // PUT /api/users/self/add/archived-posts/:postId
//   // updateUserAddArchivedPost()
//   it("PUT /api/users/self/add/archived-posts/:postId", async () => {
//     const postId = testData.postId;
//     routeTest = () => new PUTPromise(function(resolve, reject) {
//       agent
//         .put(`/api/users/self/add/archived-posts/${postId}`)
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
//   // PUT /api/users/self/remove/archived-posts/:postId
//   // updateUserRemoveArchivedPost()
//   it("PUT /api/users/self/remove/archived-posts/:postId", async () => {
//     const postId = testData.postId;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/users/self/remove/archived-posts/${postId}`)
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
//   // PUT /api/users/self/remove/following/:userId
//   // updateUserSelfRemoveFollowing()
//   it("PUT /api/users/self/remove/following/:userId", async () => {
//     const userId = testData.postId;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/users/self/remove/following/${userId}`)
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
//   // PUT /api/users/self/add/blocked/:userId
//   // updateUserAddBlocked()
//   it("PUT /api/users/self/add/blocked/:userId", async () => {
//     const userId = testData.postId;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/users/self/add/blocked/${userId}`)
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
//   // PUT /api/users/:id/account-status
//   // updateUserAccountStatus()
//   it("PUT /api/users/:id/account-status", async () => {
//     const id = testData.postId;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/users/${id}/account-status`)
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
//   // PUT /api/users/:id/account-permissions
//   // updateUserAccountPermissions()
//   it("PUT /api/users/:id/account-permissions", async () => {
//     const id = testData.postId;
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/users/${id}/account-permissions`)
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
//   // PUT /api/users/self/settings-private
//   // updateUserSettingsPrivate()
//   it("PUT /api/users/self/settings-private", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/users/self/settings-private`)
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
//   // PUT /api/users/self/settings-language
//   // updateUserSettingsLanguage()
//   it("PUT /api/users/self/settings-language", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/users/self/settings-language`)
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
//   // PUT /api/users/self/settings-notifications
//   // updateUserSettingsNotifications()
//   it("PUT /api/users/self/settings-notifications", async () => {
//     routeTest = () => new Promise(function(resolve, reject) {
//       agent
//         .put(`/api/users/self/settings-notifications`)
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
