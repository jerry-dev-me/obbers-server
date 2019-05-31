// const q = require("../../../app/queries");
// const stringifyCircular = require("../stringifyCircular");
// const fakeFields = require("../fakeFields");
//
// const mongoose = require("mongoose");
// const User = mongoose.model("user");
// // const User = require("../../../app/models/user");
//
// module.exports = async () => {
//   let supertest = require("supertest");
//   let app = require("../../../server");
//
//   supertest("http:127.0.0.1:5000/");
//   let agent = supertest.agent(app);
//
//   return agent;
// }
//
// // module.exports = async (o) => {
// const promises = async (o) => {
//
//   const supertest = require("supertest");
//   const app = require("../../../server");
//   const async = require("async");
//
//   supertest("http:127.0.0.1:5000/");
//   const agent = supertest.agent(app);
//
//   let testUser;
//   let testUserId;
//   let createResourcesFunctionsResults = [];
//   let response;
//   let responseStatus;
//   let responseBody;
//
//   const email = "test@mail.com";
//   const password = "12345678Az";
//
//   try {
//     const authenticateUser = () => {
//       return new Promise(function(resolve, reject) {
//         if (o && o.authenticationRequired
//         && o.authenticationRequired === true) {
//           return agent.post('/auth/local/signup')
//           .send({ email, password })
//           .end((error, res) => {
//             if (error) return reject(error);
//             // testUser = await User.findOne({ "local.email": email });
//             return resolve(res);
//           });
//         } else {
//           // const newUser = new User(fakeFields.user());
//           // testUser = await newUser.save();
//           console.log("\n Auth was not requiered");
//           return resolve("Authentication was not required to test this route");
//         };
//         // testUserId = testUser._id;
//         // console.log(testUserId);
//       });
//     };
//
//     const createTestResources = () => {
//       return new Promise(async function(resolve, reject) {
//         if (o && o.authenticationRequired
//         && o.authenticationRequired === true) {
//           testUser = await User.findOne({ "local.email": email });
//         } else {
//           const newUser = new User(fakeFields.user());
//           testUser = await newUser.save();
//         };
//         testUserId = testUser._id;
//         console.log(testUserId);
//
//           if (o && o.createTestResourcesFunctions
//             && o.createTestResourcesFunctions.length > 0) {
//             await Promise.all(
//               o.createTestResourcesFunctions.map(async createTestResourcesFunc => {
//                 const createHelper = require("../createHelper");
//                 const stringToEval = `createHelper.${createTestResourcesFunc}`;
//                 // const execFunction = async () => await eval(stringToEval);
//                 const execFunction = await eval(stringToEval);
//
//                 createResourcesFunctionsResults.push({
//                   function: createTestResourcesFunc,
//                   // results: await execFunction()
//                   results: execFunction
//                 });
//               })
//             );
//             // .then(promiseAllResults => {
//             //   // console.log("\n\n\n resourcesFunctionsPromiseAllResults");
//             //   console.log("promiseAllResults");
//             //   console.log(promiseAllResults);
//             //   // // createResourcesFunctionsResults = promiseAllResults;
//             // }).catch(error => {
//             //   reject(error);
//             //   // createResourcesFunctionsResults = error;
//             // })
//           };
//
//           // if (testUser === null || createResourcesFunctionsResults === "error") {
//           //   return reject({ testUser: null });
//           // };
//
//           let resourcesObject = {
//             testUser,
//             testUserId,
//             createResourcesFunctionsResults
//           };
//
//           return resolve(resourcesObject);
//       });
//     };
//
//     const testRoute = () => {
//       // route helper...
//       // check if o.params exists...
//       // if is there, map and for each string found in this array,
//       // try to
//       // then create a new route string... and use it below...
//
//       return new Promise(function(resolve, reject) {
//         if (o.method === "GET") {
//           agent.get(o.route)
//           .end((error, res) => agentCb(error, res))
//         }
//         if (o.method === "POST") {
//           agent.post(o.route)
//           .send(o.body)
//           .end((error, res) => agentCb(error, res))
//         }
//         if (o.method === "PUT") {
//           agent.put(o.route)
//           .send(o.body)
//           .end((error, res) => agentCb(error, res))
//         }
//         if (o.method === "DELETE") {
//           agent.delete(o.route)
//           .end((error, res) => agentCb(error, res))
//         }
//         const agentCb = (error, res) => {
//           if (error) return reject(error);
//           return resolve(res);
//         }
//       });
//     };
//
//     await Promise.all([
//       await authenticateUser(),
//       await createTestResources(),
//       await testRoute()
//     ])
//     .then(promise1Resolved => {
//       const fixCircular = stringifyCircular(promise1Resolved[0]);
//       // console.log(fixCircular.req);
//       // console.log(fixCircular.status);
//       // console.log(promise1Resolved[0]);
//       // console.log(fixCircular);
//       return promise1Resolved;
//     })
//     .then(promise2Resolved => {
//       // console.log(promise2Resolved[1]);
//       return promise2Resolved;
//     })
//     .then(promise3Resolved => {
//       response = promise3Resolved[2];
//       responseStatus = promise3Resolved[2].status;
//       responseBody = promise3Resolved[2].text;
//       return promise3Resolved;
//     })
//     .catch(error => {
//       return error;
//     });
//   }
//   catch (error) {
//     return error;
//   };
//
//   return {
//     testUser,
//     testUserId,
//     createResourcesFunctionsResults,
//     response,
//     responseStatus,
//     responseBody
//   };
// };
//
// // THIS FUNCTION EXPECTS TO RECEIVE AN OBJECT:
// /*
// OBJECT TO RECEIVE:
//   {
//     authenticationRequired: true or false,
//     createTestResourcesFunctions: [
//       array of functions
//     ],
//     route: "/api/auth" string,
//     method: "string" "GET" "POST" "PUT" "DELETE",
//     body: object { key: "value" } .. if method is POST or PUT
//   }
//
//
//
// // it("GET /api/actions", async () => {
// //   const routeTest = await th.routeTester({
// //     authenticationRequired: true,
// //     createTestResourcesFunctions: [
// //       "createUsersFollowingAndActions(testUserId);"
// //     ],
// //     route: "/api/actions",
// //     method: "GET",
// //     body: { name: "test collection" }
// //   });
// //
// //   console.log(routeTest.responseStatus);
// //   console.log(routeTest.responseBody);
// //   console.log(routeTest.createResourcesFunctionsResults);
// //
// //   assert(routeTest.responseStatus === 200);
// // });
// */
//
// // THIS FUNCTION RETURNS THE NEXT OBJECT:
// /*
// OBJECT TO EXPORT:
//   {
//     testUser: {},
//     testUserId: "12345",
//     createResourcesFunctions: [
//       {
//         functionName: "createUsersFollowingAndActions(testUserId);",
//         functionResults: [] or {} whatever...
//       },
//       {},
//       {}
//     ],
//     response: {},
//     responseStatus: 200,
//     responseBody: {}
//   }
// */
//
//
//
// const asyncSeries = (o) => {
//   // supertest("http:127.0.0.1:5000/"); // already declared at the top
//   // const agent = supertest.agent(app); // already declared at the top
//
//   let testUser;
//   let testUserId;
//   let arrayOfCreateResourcesFunctions = [];
//   let response;
//   let responseStatus;
//   let responseBody;
//
//   const email = "test@mail.com";
//   const password = "12345678Az";
//
// console.log("\n BEFORE ASYNC SERIES");
//
// async.series([
//
//     // Signup to generate an auth user
//     function(callback) {
//       if (o && o.authenticationRequired
//       && o.authenticationRequired === true) {
//         // agent.post('/auth/local/signup')
//         //      .send({ email: '789@mail.com', password: "1234" })
//         //      // .end(callback);
//         //      .end(function(error, res) {
//         //        if (error) console.log(error);
//         //        callback();
//         //      });
//         return agent.post('/auth/local/signup')
//         .send({ email, password })
//         .end((error, res) => {
//           if (error) return (error);
//           callback();
//         });
//       } else {
//         callback();
//       }
//
//     },
//
//     // Visit a protected route
//     function(callback) {
//
//       const createTestResources = (async function() {
//
//             if (0 && o.authenticationRequired
//             && o.authenticationRequired === true) {
//               testUser = await User.findOne({ "local.email": email });
//             } else if (o.authenticationRequired === false) {
//               const newUser = new User(fakeFields.user());
//               testUser = await newUser.save();
//             };
//             testUserId = testUser._id;
//             console.log(testUserId);
//
//             if (o && o.createTestResourcesFunctions
//             && o.createTestResourcesFunctions.length > 0) {
//               await Promise.all(
//                 o.createTestResourcesFunctions.map(async createTestResourcesFunc => {
//                   const createHelper = require("../createHelper");
//                   const stringToEval = `createHelper.${createTestResourcesFunc}`;
//                   // const execFunction = async () => await eval(stringToEval);
//                   const execFunction = await eval(stringToEval);
//
//                   arrayOfCreateResourcesFunctions.push({
//                     function: createTestResourcesFunc,
//                     // results: await execFunction()
//                     results: execFunction
//                   });
//                 })
//               )
//               // .then(promiseAllResults => {
//               //   // console.log("\n\n\n resourcesFunctionsPromiseAllResults");
//               //   // console.log("promiseAllResults");
//               //   // console.log(promiseAllResults);
//               //   // // arrayOfCreateResourcesFunctions = promiseAllResults;
//               // }).catch(error => {
//               //   reject(error);
//               //   // arrayOfCreateResourcesFunctions = error;
//               // })
//             }
//
//             // if (testUser === null || arrayOfCreateResourcesFunctions === "error") {
//             //   return reject({ testUser: null });
//             // };
//
//             // let resourcesObject = {
//             //   testUser,
//             //   testUserId,
//             //   arrayOfCreateResourcesFunctions
//             // };
//
//             // return resolve(resourcesObject);
//
//       })();
//
//     },
//
//     // Create/POST a document on a protected route
//     function(callback) {
//       // route helper...
//       // check if o.params exists...
//       // if is there, map and for each string found in this array,
//       // try to
//       // then create a new route string... and use it below...
//
//       if (o.method === "GET") {
//         agent.get(o.route)
//         .end((error, res) => agentCb(error, res))
//       }
//       if (o.method === "POST") {
//         agent.post(o.route)
//         .send(o.body)
//         .end((error, res) => agentCb(error, res))
//       }
//       if (o.method === "PUT") {
//         agent.put(o.route)
//         .send(o.body)
//         .end((error, res) => agentCb(error, res))
//       }
//       if (o.method === "DELETE") {
//         agent.delete(o.route)
//         .end((error, res) => agentCb(error, res))
//       }
//       const agentCb = (error, res) => {
//         if (error) return error;
//         response = res;
//         responseStatus = res.status;
//         responseBody = res.text;
//         callback(res);
//         // return res;
//       }
//       // agent.post('/api/collections')
//       //      .send({ name: "test Collection" })
//       //      // .end(callback);
//       //      .end((error, res) => {
//       //        if (error) console.log(error);
//       //        console.log(res.body);
//       //        callback();
//       //      })
//     }
// ]);
//
// console.log("\n AFTER ASYNC SERIES");
//
// let objectToReturn = {
//   testUser,
//   testUserId,
//   arrayOfCreateResourcesFunctions,
//   response,
//   responseStatus,
//   responseBody
// }
//
// console.log(objectToReturn);
//
// return objectToReturn;
//
// // return {
// //   testUser,
// //   testUserId,
// //   arrayOfCreateResourcesFunctions,
// //   response,
// //   responseStatus,
// //   responseBody
// // };
//
// }
