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
// const lS = "REPORTS"; // logSubgroup
//
// describe("/api/reports routes and controllers tests", async function() {
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
//             testData = await th.testData.reports(testUser._id);
//             console.log("Test Data Created Successfully:");
//             // console.log(testData);
//             isTestDataCreated = true;
//           }
//           resolve(res);
//         });
//     });
//   });
//
//   // POST /api/reports
//   // createReport()
//   it("POST /api/reports", async () => {
//     const userId = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .post("/api/reports")
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
//   // GET /api/reports
//   // readAllReports()
//   it("GET /api/reports", async () => {
//     const userId = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .get("/api/reports")
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
//
//   // GET /api/reports/from/:userId
//   // readAllReportsFromUser()
//   it("GET /api/reports/from/userId", async () => {
//     const userId = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .get(`/api/reports/from/${userId}`)
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
//
//   // GET /api/reports/to/:userId
//   // readAllReportsToUser()
//   it("GET /api/reports/to/userId", async () => {
//     const userId = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .get(`/api/reports/to/${userId}`)
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
//
//   // GET /api/reports/:id
//   // readReportById()
//   it("GET /api/reports/:id", async () => {
//     const userId = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .get(`/api/reports/${id}`)
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
//
//   // PUT /api/reports/:id/status
//   // updateReportStatus()
//   it("PUT /api/reports/:id/status", async () => {
//     const userId = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .put(`/api/reports/${id}/status`)
//           .expect("Content-type", /json/)
//           .expect(200)
//           .end((error, res) => {
//             if (error) return reject(error);
//             return resolve(res);
//           });
//       });
//   });
//
//   // DELETE /api/reports/:id
//   // deleteReportById()
//   it("DELETE /api/reports/:id", async () => {
//     const userId = testUser._id;
//     routeTest = () =>
//       new Promise(function(resolve, reject) {
//         agent
//           .delete(`/api/reports/${id}`)
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
