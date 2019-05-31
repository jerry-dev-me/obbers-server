// const q = require("../../../../app/queries");
// const th = require("../../../testHelpers");
//
// const assert = require("assert");
// const config = require("../../config");
//
// let agent;
// let testUser;
// let testData;
// let routeTest;
// let isTestUserCreated = false;
// let isTestDataCreated = false;
//
// const lG = "TESTS-API"; // logGroup
// const lS = "ACTIVITIES"; // logSubgroup
//
// describe("\n GET /api/actions", async function() {
//   this.timeout(0);
//
//   // describe("/api/actions routes and controllers tests", async function() {
//   describe("readAllActivitiesFromUsersFollowing controller", async function() {
//     this.timeout(0);
//
//     beforeEach(async () => {
//       // super test agent
//       const supertest = require("supertest");
//       const app = require("../../../../server");
//       supertest(config.host);
//       agent = supertest.agent(app);
//
//       // user authentication
//       return new Promise(async (resolve, reject) => {
//         let authRoute;
//         if (isTestUserCreated === false) {
//           authRoute = "/auth/local/signup";
//         }
//         if (isTestUserCreated === true) {
//           authRoute = "/auth/local/signin";
//         }
//
//         agent
//           .post(authRoute)
//           .send({ email: config.testEmail, password: config.testPassword })
//           .end(async (error, res) => {
//             if (error) return reject(error);
//             const User = require("../../../../app/models/user");
//             testUser = await User.findOne({ "local.email": config.testEmail });
//             isTestUserCreated = true;
//             th.logger.log(lG, lS, null, { authRoute });
//             th.logger.log(lG, lS, null, { testUser });
//             console.log("\nTestUserId: " + testUser._id);
//
//             // create test data
//             if (isTestDataCreated === false) {
//               th.logger.log(lG, lS, "Creating Test Data...");
//               // testData = await th.testData.testCreateHelpers();
//               // testData = await th.testData.activities(testUser._id);
//               testData = await th.testData.collections(testUser._id);
//               // testData = await th.testData.comments(testUser._id);
//               // testData = await th.testData.likes(testUser._id);
//               // testData = await th.testData.posts(testUser._id);
//               // testData = await th.testData.reports(testUser._id);
//               // testData = await th.testData.requests(testUser._id);
//               // testData = await th.testData.responses(testUser._id);
//               // testData = await th.testData.tags(testUser._id);
//               // testData = await th.testData.users(testUser._id);
//               isTestDataCreated = true;
//               th.logger.log(lG, lS, null, { testData });
//               console.log("\nTestData is:");
//               console.log(testData);
//             }
//             resolve(res);
//           });
//       });
//     });
//
//     // GET /api/actions
//     // readAllActivitiesFromUsersFollowing()
//     // it("GET /api/actions", async () => {
//     it("readAllActivitiesFromUsersFollowing()", async () => {
//       const userId = testUser._id;
//       routeTest = () =>
//         new Promise(function(resolve, reject) {
//           agent
//             .get("/api/actions")
//             .expect("Content-type", /json/)
//             .expect(200)
//             .end((error, res) => {
//               if (error) return reject(error);
//               return resolve(res);
//             });
//         });
//     });
//
//     afterEach(async () => {
//       await Promise.all([await routeTest()])
//         .then(promisesResults => {
//           const responseStatus = promisesResults[0].status;
//           const responseBody = promisesResults[0].text;
//           console.log("\nResponse Body is:");
//           console.log(responseBody);
//           th.logger.log(lG, lS, null, { responseBody });
//         })
//         .catch(error => {
//           return error;
//         });
//     });
//
//     after(async () => {
//       await th.dropCollections.all();
//     });
//   });
//
// });
