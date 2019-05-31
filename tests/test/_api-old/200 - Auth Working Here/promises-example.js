// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const assert = require("assert");
//
// const config = require("../config");
// const host = config.host;
// const email = config.testEmail;
// const password = config.testPassword;
//
// let agent;
//
// let authenticateUser;
// let createTestResources;
// let routeTest;
//
// let expectedStatusCode;
// let expectedResponseBody;
//
// const User = require("../../../app/models/user");
// let testUser;
//
// let testDescription;
//
// const lG = "AT"; // logGroup
// const lS = "C-ACTIVITIES"; // logSubgroup
//
// describe("/api/actions routes tests", async function() {
//   this.timeout(0);
//
//   beforeEach(async () => {
//
//     const TestData1 = require("../../testHelpers/createHelper/functions/TestData1");
//     await TestData1();
//
//     const supertest = require("supertest");
//     const app = require("../../../server");
//     supertest(host);
//     agent = supertest.agent(app);
//
//     authenticateUser = () => new Promise(function(resolve, reject) {
//       return agent.post('/auth/local/signup')
//       .send({ email, password })
//       .end(async (error, res) => {
//         if (error) return reject(error);
//         testUser = await User.findOne({ "local.email": email });
//         return resolve(res);
//       });
//     });
//   });
//
//   testDescription = `GET /api/actions
//   readAllActivitiesFromUsersFollowing()`;
//   it(testDescription, async () => {
//     let params = null;
//     let query = null;
//     let body = null;
//     expectedStatusCode = 200;
//     expectedResponseBody = [];
//
//     createTestResources = () => new Promise(async function(resolve, reject) {
//       // const testResources = await th.create.createTestData();
//       const testResources = await th.create.createUsersFollowingAndActions(
//         testUser._id
//       );
//       if (testResources === "error") return reject(error);
//       return resolve(testResources);
//     });
//
//     testRoute = () => new Promise(function(resolve, reject) {
//       agent.get("/api/actions")
//       .end((error, res) => {
//         if (error) return reject(error);
//         return resolve(res);
//       })
//     });
//   });
//
//
//   // // controller: readAllActivitiesFromUsersFollowing()
//   // it("GET | /api/actions", async () => {
//   //   const req = { params: null, query: null, body: null };
//   //   const res = { expectedStatus: 200, expectedBody: [] };
//   //   testRoute = () => new Promise(function(resolve, reject) {
//   //     agent.get("/api/actions")
//   //     .end((error, res) => {
//   //       if (error) return reject(error);
//   //       return resolve(res);
//   //     })
//   //   });
//   // });
//
//   afterEach(async () => {
//     await Promise.all([
//       await authenticateUser(),
//       await createTestResources(),
//       await testRoute()
//     ])
//     .then(testRouteResolved => {
//       const response = testRouteResolved[2];
//       const responseStatus = testRouteResolved[2].status;
//       const responseBody = testRouteResolved[2].text;
//       console.log(responseStatus);
//       console.log(responseBody);
//       assert(responseStatus === expectedStatusCode);
//       assert(responseBody === expectedResponseBody);
//       return testRouteResolved;
//     })
//     .catch(error => {
//       return error;
//     });
//   });
// });
